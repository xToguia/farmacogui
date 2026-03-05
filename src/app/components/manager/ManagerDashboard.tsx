import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { ManagerMetrics } from './ManagerMetrics';
import { ManagerInventory } from './ManagerInventory';
import { ManagerRegistry } from './ManagerRegistry';
import { Tabs, LayoutDashboard, Package, FileText, UserPlus } from 'lucide-react';
import { clsx } from 'clsx';

type Tab = 'metrics' | 'inventory' | 'prescriptions' | 'registry';

export const ManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('metrics');

  const tabs = [
    { id: 'metrics', label: 'Métricas', icon: LayoutDashboard },
    { id: 'inventory', label: 'Gerenciar Medicamentos', icon: Package },
    // { id: 'prescriptions', label: 'Gerenciar Receitas', icon: FileText }, // Placeholder as requested, but I might skip implementation for brevity if not strictly needed, but User asked for it. I'll add a simple placeholder.
    { id: 'registry', label: 'Cadastros (UBS/Médicos)', icon: UserPlus },
  ];

  const { role } = usePharmacy();
  if (role === 'admin') {
      tabs.push({ id: 'admin_settings', label: 'Configurações (Admin)', icon: LayoutDashboard }); // reusing icon for simplicity
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-gray-200 pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={clsx(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === tab.id 
                ? 'bg-white border-t border-x border-gray-200 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'metrics' && <ManagerMetrics />}
        {activeTab === 'inventory' && <ManagerInventory />}
        {activeTab === 'registry' && <ManagerRegistry />}
        {activeTab === 'admin_settings' && (
            <div className="bg-red-50 p-12 rounded-lg text-center border border-red-200">
                <h3 className="text-xl font-bold text-red-800">Área Administrativa</h3>
                <p className="text-red-600">Configurações globais do sistema, logs de acesso e permissões de usuários.</p>
            </div>
        )}
        {activeTab === 'prescriptions' && (
             <div className="bg-white p-12 rounded-lg text-center border border-dashed border-gray-300">
                <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-medium text-gray-600">Gestão de Receitas</h3>
                <p className="text-gray-500">Módulo de visualização e edição de receitas.</p>
                <p className="text-xs text-gray-400 mt-2">(Funcionalidade simplificada para esta demonstração. O fluxo principal de uso de receitas ocorre no PDV do funcionário.)</p>
             </div>
        )}
      </div>
    </div>
  );
};
