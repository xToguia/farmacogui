'use client';

import { createContext, useContext, useState } from 'react';

const PharmacyContext = createContext(undefined);

export const PharmacyProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  
  // Mock Data
  const [medicines, setMedicines] = useState([
    { 
      id: '1', 
      name: 'Dipirona', 
      manufacturer: 'Medley', 
      measure: '500mg', 
      composition: 'Dipirona Monohidratada', 
      category: 'Analgésico', 
      minStockLevel: 100 
    },
    { 
      id: '2', 
      name: 'Amoxicilina', 
      manufacturer: 'EMS', 
      measure: '500mg', 
      composition: 'Amoxicilina Tri-hidratada', 
      category: 'Antibiótico', 
      minStockLevel: 50 
    },
  ]);

  const [batches, setBatches] = useState([
    { id: 'b1', medicineId: '1', lotNumber: 'L123', expiryDate: '2026-12-01', quantity: 150 },
    { id: 'b2', medicineId: '1', lotNumber: 'L124', expiryDate: '2025-06-01', quantity: 50 },
    { id: 'b3', medicineId: '2', lotNumber: 'L999', expiryDate: '2026-08-15', quantity: 80 },
  ]);

  const [doctors, setDoctors] = useState([
    { id: 'd1', name: 'Dr. Silva', crm: '12345-SP', ubsId: 'u1' },
  ]);

  const [ubsList, setUbsList] = useState([
    { id: 'u1', name: 'UBS Centro', address: 'Rua Principal, 100' },
  ]);

  const [sales, setSales] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Add Medicine (New or Existing)
  const addMedicine = (medData, batchData) => {
    const existingMed = medicines.find(m => m.name.toLowerCase() === medData.name.toLowerCase());

    if (existingMed) {
      showToast('Medicamento já cadastrado. Adicionando ao estoque.', 'info');
      updateStock(existingMed.id, batchData);
    } else {
      const newMedId = Math.random().toString(36).substr(2, 9);
      const newMed = { ...medData, id: newMedId };
      
      const newBatch = {
        ...batchData,
        id: Math.random().toString(36).substr(2, 9),
        medicineId: newMedId
      };

      setMedicines([...medicines, newMed]);
      setBatches([...batches, newBatch]);
      showToast('Novo medicamento e lote cadastrados com sucesso!');
    }
  };

  // Update Stock / Add Batch
  const updateStock = (medicineId, batchData) => {
    const existingBatchIndex = batches.findIndex(b => 
      b.medicineId === medicineId && 
      b.expiryDate === batchData.expiryDate
    );

    if (existingBatchIndex >= 0) {
      const updatedBatches = [...batches];
      updatedBatches[existingBatchIndex].quantity += batchData.quantity;
      setBatches(updatedBatches);
      showToast('Estoque adicionado ao lote existente (mesma validade).');
    } else {
      const newBatch = {
        ...batchData,
        id: Math.random().toString(36).substr(2, 9),
        medicineId: medicineId
      };
      setBatches([...batches, newBatch]);
      showToast('Novo lote criado (validade diferente).');
    }
  };

  // Process Sale (FIFO/FEFO - First Expired First Out)
  const processSale = (items, isDelivery, customerName) => {
    let currentBatches = [...batches];
    const saleItems = [];
    let possible = true;

    // Validation pass
    for (const item of items) {
      const totalStock = currentBatches
        .filter(b => b.medicineId === item.medicineId)
        .reduce((sum, b) => sum + b.quantity, 0);
      
      if (totalStock < item.quantity) {
        showToast(`Estoque insuficiente para o medicamento ID: ${item.medicineId}`, 'error');
        possible = false;
        break;
      }
    }

    if (!possible) return;

    // Execution pass
    items.forEach(item => {
      let qtyRemaining = item.quantity;
      
      const medBatches = currentBatches
        .filter(b => b.medicineId === item.medicineId)
        .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

      for (const batch of medBatches) {
        if (qtyRemaining <= 0) break;

        const amountToTake = Math.min(batch.quantity, qtyRemaining);
        
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
    
    const newSale = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      employeeId: 'current-user',
      items: saleItems,
      total: 0,
      isDelivery,
      customerName
    };

    setSales([...sales, newSale]);
    showToast('Venda concluída com sucesso!');
  };

  const addDoctor = (doc) => {
    setDoctors([...doctors, { ...doc, id: Math.random().toString(36).substr(2, 9) }]);
    showToast('Médico cadastrado com sucesso!');
  };

  const addUBS = (ubs) => {
    setUbsList([...ubsList, { ...ubs, id: Math.random().toString(36).substr(2, 9) }]);
    showToast('UBS cadastrada com sucesso!');
  };

  const addPrescription = (presc) => {
    setPrescriptions([...prescriptions, { ...presc, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const getMedicineStock = (medicineId) => {
    return batches
      .filter(b => b.medicineId === medicineId)
      .reduce((acc, b) => acc + b.quantity, 0);
  };

  return (
    <PharmacyContext.Provider value={{
      role, setRole,
      medicines, batches, doctors, ubsList, sales, prescriptions,
      addMedicine, updateStock, processSale, addDoctor, addUBS, addPrescription,
      getMedicineStock, toast
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
