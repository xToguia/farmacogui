import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Plus, Trash2, Edit, AlertCircle } from 'lucide-react';
import { Medicine, Batch } from '../../types';
import { format } from 'date-fns';

export const ManagerInventory: React.FC = () => {
  const { medicines, batches, addMedicine, updateStock, getMedicineStock } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Medicine Form State
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    measure: '',
    composition: '',
    category: '',
    minStockLevel: 10,
    lotNumber: '',
    expiryDate: '',
    quantity: 0
  });

  const handleSave = () => {
    if (!formData.name || !formData.expiryDate || !formData.quantity) return;
    
    addMedicine(
      {
        name: formData.name,
        manufacturer: formData.manufacturer,
        measure: formData.measure,
        composition: formData.composition,
        category: formData.category,
        minStockLevel: Number(formData.minStockLevel)
      },
      {
        lotNumber: formData.lotNumber,
        expiryDate: formData.expiryDate,
        quantity: Number(formData.quantity)
      }
    );
    setShowAddModal(false);
    setFormData({
        name: '', manufacturer: '', measure: '', composition: '', category: '', 
        minStockLevel: 10, lotNumber: '', expiryDate: '', quantity: 0
    });
  };

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Buscar por nome ou categoria..." 
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={18} className="mr-2" /> Novo Medicamento
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700">Nome</th>
              <th className="px-6 py-3 font-medium text-gray-700">Categoria</th>
              <th className="px-6 py-3 font-medium text-gray-700">Fabricante</th>
              <th className="px-6 py-3 font-medium text-gray-700 text-center">Estoque Total</th>
              <th className="px-6 py-3 font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 font-medium text-gray-700 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMedicines.map(med => {
              const stock = getMedicineStock(med.id);
              const isLow = stock <= med.minStockLevel;
              return (
                <tr key={med.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{med.name} <span className="text-gray-500 font-normal">({med.measure})</span></td>
                  <td className="px-6 py-4 text-gray-600">{med.category}</td>
                  <td className="px-6 py-4 text-gray-600">{med.manufacturer}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-700">{stock}</td>
                  <td className="px-6 py-4">
                    {isLow ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Baixo Estoque
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                    {/* Add delete logic later if needed */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredMedicines.length === 0 && (
          <div className="p-8 text-center text-gray-500">Nenhum medicamento encontrado.</div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cadastro de Medicamento</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input 
                   label="Nome do Medicamento" 
                   value={formData.name} 
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   placeholder="Ex: Dipirona"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se o nome já existir, o sistema irá adicionar um novo lote automaticamente.
                </p>
              </div>
              
              <Input 
                 label="Fabricante" 
                 value={formData.manufacturer} 
                 onChange={e => setFormData({...formData, manufacturer: e.target.value})}
              />
              <Input 
                 label="Medida (Ex: 500mg)" 
                 value={formData.measure} 
                 onChange={e => setFormData({...formData, measure: e.target.value})}
              />
              <div className="col-span-2">
                 <Input 
                    label="Composição" 
                    value={formData.composition} 
                    onChange={e => setFormData({...formData, composition: e.target.value})}
                 />
              </div>
              <Input 
                 label="Categoria" 
                 value={formData.category} 
                 onChange={e => setFormData({...formData, category: e.target.value})}
              />
              <Input 
                 label="Estoque Mínimo" 
                 type="number"
                 value={formData.minStockLevel} 
                 onChange={e => setFormData({...formData, minStockLevel: Number(e.target.value)})}
              />
              
              <div className="col-span-2 mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">Dados do Lote Inicial</h4>
              </div>
              
              <Input 
                 label="Número do Lote" 
                 value={formData.lotNumber} 
                 onChange={e => setFormData({...formData, lotNumber: e.target.value})}
              />
              <Input 
                 label="Data de Validade" 
                 type="date"
                 value={formData.expiryDate} 
                 onChange={e => setFormData({...formData, expiryDate: e.target.value})}
              />
              <Input 
                 label="Quantidade" 
                 type="number"
                 value={formData.quantity} 
                 onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancelar</Button>
              <Button onClick={handleSave}>Salvar Medicamento</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
