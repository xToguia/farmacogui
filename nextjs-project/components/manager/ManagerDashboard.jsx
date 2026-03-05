'use client';

import { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import ManagerMetrics from './ManagerMetrics';
import ManagerInventory from './ManagerInventory';
import ManagerRegistry from './ManagerRegistry';
import styles from './ManagerDashboard.module.css';

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('metrics');
  const { role } = usePharmacy();

  const tabs = [
    { id: 'metrics', label: 'Métricas', icon: '📊' },
    { id: 'inventory', label: 'Gerenciar Medicamentos', icon: '📦' },
    { id: 'registry', label: 'Cadastros (UBS/Médicos)', icon: '👥' },
  ];

  if (role === 'admin') {
    tabs.push({ id: 'admin_settings', label: 'Configurações (Admin)', icon: '⚙️' });
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'metrics' && <ManagerMetrics />}
        {activeTab === 'inventory' && <ManagerInventory />}
        {activeTab === 'registry' && <ManagerRegistry />}
        {activeTab === 'admin_settings' && (
          <div className={styles.placeholder}>
            <h3>Área Administrativa</h3>
            <p>Configurações globais do sistema, logs de acesso e permissões de usuários.</p>
          </div>
        )}
      </div>
    </div>
  );
}
