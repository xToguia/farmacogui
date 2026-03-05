import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Building2, Stethoscope } from 'lucide-react';

export const ManagerRegistry: React.FC = () => {
  const { doctors, ubsList, addDoctor, addUBS } = usePharmacy();
  
  const [docForm, setDocForm] = useState({ name: '', crm: '', ubsId: '' });
  const [ubsForm, setUbsForm] = useState({ name: '', address: '' });

  const handleAddDoctor = () => {
    if (!docForm.name || !docForm.crm || !docForm.ubsId) return;
    addDoctor(docForm);
    setDocForm({ name: '', crm: '', ubsId: '' });
  };

  const handleAddUBS = () => {
    if (!ubsForm.name) return;
    addUBS(ubsForm);
    setUbsForm({ name: '', address: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* UBS Management */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <Building2 className="text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-800">Unidades Básicas de Saúde (UBS)</h3>
          </div>
          
          <div className="space-y-4 mb-6">
            <Input 
              placeholder="Nome da UBS" 
              value={ubsForm.name}
              onChange={e => setUbsForm({...ubsForm, name: e.target.value})}
            />
            <Input 
              placeholder="Endereço" 
              value={ubsForm.address}
              onChange={e => setUbsForm({...ubsForm, address: e.target.value})}
            />
            <Button onClick={handleAddUBS} className="w-full">
              <Plus size={16} className="mr-2" /> Cadastrar UBS
            </Button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {ubsList.map(ubs => (
              <div key={ubs.id} className="p-3 bg-gray-50 rounded border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{ubs.name}</p>
                  <p className="text-xs text-gray-500">{ubs.address}</p>
                </div>
              </div>
            ))}
            {ubsList.length === 0 && <p className="text-center text-gray-400 text-sm">Nenhuma UBS cadastrada.</p>}
          </div>
        </div>
      </div>

      {/* Doctor Management */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <Stethoscope className="text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Médicos Parceiros</h3>
          </div>
          
          <div className="space-y-4 mb-6">
            <Input 
              placeholder="Nome do Médico" 
              value={docForm.name}
              onChange={e => setDocForm({...docForm, name: e.target.value})}
            />
            <Input 
              placeholder="CRM (Ex: 12345-SP)" 
              value={docForm.crm}
              onChange={e => setDocForm({...docForm, crm: e.target.value})}
            />
            <select 
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              value={docForm.ubsId}
              onChange={e => setDocForm({...docForm, ubsId: e.target.value})}
            >
              <option value="">Selecione a UBS Vinculada</option>
              {ubsList.map(ubs => (
                <option key={ubs.id} value={ubs.id}>{ubs.name}</option>
              ))}
            </select>

            <Button onClick={handleAddDoctor} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" /> Cadastrar Médico
            </Button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {doctors.map(doc => {
              const ubs = ubsList.find(u => u.id === doc.ubsId);
              return (
                <div key={doc.id} className="p-3 bg-gray-50 rounded border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">CRM: {doc.crm} • {ubs?.name || 'UBS não encontrada'}</p>
                  </div>
                </div>
              );
            })}
             {doctors.length === 0 && <p className="text-center text-gray-400 text-sm">Nenhum médico cadastrado.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
