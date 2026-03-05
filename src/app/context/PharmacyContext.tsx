import React, { createContext, useContext, useState, useEffect } from 'react';
import { Batch, Doctor, Medicine, Prescription, Role, Sale, UBS } from '../types';
import { toast } from 'sonner';

interface PharmacyContextType {
  role: Role | null;
  setRole: (role: Role | null) => void;
  
  // Data
  medicines: Medicine[];
  batches: Batch[];
  doctors: Doctor[];
  ubsList: UBS[];
  sales: Sale[];
  prescriptions: Prescription[];

  // Actions
  addMedicine: (med: Omit<Medicine, 'id'>, initialBatch: Omit<Batch, 'id' | 'medicineId'>) => void;
  updateStock: (medicineId: string, batchData: Omit<Batch, 'id' | 'medicineId'>) => void;
  processSale: (items: { medicineId: string; quantity: number }[], isDelivery: boolean, customerName?: string) => void;
  addDoctor: (doc: Omit<Doctor, 'id'>) => void;
  addUBS: (ubs: Omit<UBS, 'id'>) => void;
  addPrescription: (presc: Omit<Prescription, 'id'>) => void;
  
  // Helpers
  getMedicineStock: (medicineId: string) => number;
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

export const PharmacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  
  // Mock Data
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: '1', name: 'Dipirona', manufacturer: 'Medley', measure: '500mg', composition: 'Dipirona Monohidratada', category: 'Analgésico', minStockLevel: 100 },
    { id: '2', name: 'Amoxicilina', manufacturer: 'EMS', measure: '500mg', composition: 'Amoxicilina Tri-hidratada', category: 'Antibiótico', minStockLevel: 50 },
  ]);

  const [batches, setBatches] = useState<Batch[]>([
    { id: 'b1', medicineId: '1', lotNumber: 'L123', expiryDate: '2026-12-01', quantity: 150 },
    { id: 'b2', medicineId: '1', lotNumber: 'L124', expiryDate: '2025-06-01', quantity: 50 }, // Expires sooner
    { id: 'b3', medicineId: '2', lotNumber: 'L999', expiryDate: '2026-08-15', quantity: 80 },
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 'd1', name: 'Dr. Silva', crm: '12345-SP', ubsId: 'u1' },
  ]);

  const [ubsList, setUbsList] = useState<UBS[]>([
    { id: 'u1', name: 'UBS Centro', address: 'Rua Principal, 100' },
  ]);

  const [sales, setSales] = useState<Sale[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // LOGIC: Add Medicine (New or Existing)
  const addMedicine = (medData: Omit<Medicine, 'id'>, batchData: Omit<Batch, 'id' | 'medicineId'>) => {
    // Check if medicine exists by name (case insensitive for demo)
    const existingMed = medicines.find(m => m.name.toLowerCase() === medData.name.toLowerCase());

    if (existingMed) {
      toast.info('Medicamento já cadastrado. Adicionando ao estoque.');
      updateStock(existingMed.id, batchData);
    } else {
      const newMedId = Math.random().toString(36).substr(2, 9);
      const newMed: Medicine = { ...medData, id: newMedId };
      
      const newBatch: Batch = {
        ...batchData,
        id: Math.random().toString(36).substr(2, 9),
        medicineId: newMedId
      };

      setMedicines([...medicines, newMed]);
      setBatches([...batches, newBatch]);
      toast.success('Novo medicamento e lote cadastrados com sucesso!');
    }
  };

  // LOGIC: Update Stock / Add Batch
  const updateStock = (medicineId: string, batchData: Omit<Batch, 'id' | 'medicineId'>) => {
    // Check if a batch with same Expiry exists
    // Note: User prompt says "If validity is equal, add to existing lot". 
    // Usually lot number should also match, but we'll follow prompt logic or match strictness.
    // Let's match by Expiry AND Lot Number for safety, or just Expiry as prompt implies. 
    // Prompt: "Se a validade for igual, adiciona ao lote existente; se diferente, cria um Novo Lote."
    
    const existingBatchIndex = batches.findIndex(b => 
      b.medicineId === medicineId && 
      b.expiryDate === batchData.expiryDate
    );

    if (existingBatchIndex >= 0) {
      const updatedBatches = [...batches];
      updatedBatches[existingBatchIndex].quantity += batchData.quantity;
      setBatches(updatedBatches);
      toast.success('Estoque adicionado ao lote existente (mesma validade).');
    } else {
      const newBatch: Batch = {
        ...batchData,
        id: Math.random().toString(36).substr(2, 9),
        medicineId: medicineId
      };
      setBatches([...batches, newBatch]);
      toast.success('Novo lote criado (validade diferente).');
    }
  };

  // LOGIC: Process Sale (FIFO/FEFO - First Expired First Out)
  const processSale = (items: { medicineId: string; quantity: number }[], isDelivery: boolean, customerName?: string) => {
    let currentBatches = [...batches];
    const saleItems: any[] = [];
    let possible = true;

    // Validation pass
    for (const item of items) {
      const totalStock = currentBatches
        .filter(b => b.medicineId === item.medicineId)
        .reduce((sum, b) => sum + b.quantity, 0);
      
      if (totalStock < item.quantity) {
        toast.error(`Estoque insuficiente para o medicamento ID: ${item.medicineId}`);
        possible = false;
        break;
      }
    }

    if (!possible) return;

    // Execution pass
    items.forEach(item => {
      let qtyRemaining = item.quantity;
      
      // Get batches for this medicine, sort by expiry date ASC
      const medBatches = currentBatches
        .filter(b => b.medicineId === item.medicineId)
        .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

      for (const batch of medBatches) {
        if (qtyRemaining <= 0) break;

        const amountToTake = Math.min(batch.quantity, qtyRemaining);
        
        // Update batch in local copy
        const batchIndex = currentBatches.findIndex(b => b.id === batch.id);
        if (batchIndex >= 0) {
          currentBatches[batchIndex].quantity -= amountToTake;
          qtyRemaining -= amountToTake;
          
          saleItems.push({
            medicineId: item.medicineId,
            quantity: amountToTake,
            batchIdUsed: batch.id
          });
        }
      }
    });

    setBatches(currentBatches);
    
    const newSale: Sale = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      employeeId: 'current-user', // Placeholder
      items: saleItems,
      total: 0,
      isDelivery,
      customerName
    };

    setSales([...sales, newSale]);
    toast.success('Venda concluída com sucesso!');
  };

  const addDoctor = (doc: Omit<Doctor, 'id'>) => {
    setDoctors([...doctors, { ...doc, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const addUBS = (ubs: Omit<UBS, 'id'>) => {
    setUbsList([...ubsList, { ...ubs, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const addPrescription = (presc: Omit<Prescription, 'id'>) => {
    setPrescriptions([...prescriptions, { ...presc, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const getMedicineStock = (medicineId: string) => {
    return batches
      .filter(b => b.medicineId === medicineId)
      .reduce((acc, b) => acc + b.quantity, 0);
  };

  return (
    <PharmacyContext.Provider value={{
      role, setRole,
      medicines, batches, doctors, ubsList, sales, prescriptions,
      addMedicine, updateStock, processSale, addDoctor, addUBS, addPrescription,
      getMedicineStock
    }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (context === undefined) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};
