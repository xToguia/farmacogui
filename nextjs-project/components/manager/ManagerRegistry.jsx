'use client';

import { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './ManagerRegistry.module.css';

export default function ManagerRegistry() {
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
    <div className={styles.container}>
      {/* UBS Management */}
      <div className={styles.section}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.icon}>🏥</span>
            <h3 className={styles.cardTitle}>Unidades Básicas de Saúde (UBS)</h3>
          </div>
          
          <div className={styles.form}>
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
            <Button onClick={handleAddUBS} fullWidth>
              ➕ Cadastrar UBS
            </Button>
          </div>

          <div className={styles.list}>
            {ubsList.map(ubs => (
              <div key={ubs.id} className={styles.listItem}>
                <div>
                  <p className={styles.itemName}>{ubs.name}</p>
                  <p className={styles.itemDetails}>{ubs.address}</p>
                </div>
              </div>
            ))}
            {ubsList.length === 0 && (
              <p className={styles.emptyState}>Nenhuma UBS cadastrada.</p>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Management */}
      <div className={styles.section}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.icon}>🩺</span>
            <h3 className={styles.cardTitle}>Médicos Parceiros</h3>
          </div>
          
          <div className={styles.form}>
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
              className={styles.select}
              value={docForm.ubsId}
              onChange={e => setDocForm({...docForm, ubsId: e.target.value})}
            >
              <option value="">Selecione a UBS Vinculada</option>
              {ubsList.map(ubs => (
                <option key={ubs.id} value={ubs.id}>{ubs.name}</option>
              ))}
            </select>

            <Button onClick={handleAddDoctor} variant="blue" fullWidth>
              ➕ Cadastrar Médico
            </Button>
          </div>

          <div className={styles.list}>
            {doctors.map(doc => {
              const ubs = ubsList.find(u => u.id === doc.ubsId);
              return (
                <div key={doc.id} className={styles.listItem}>
                  <div>
                    <p className={styles.itemName}>{doc.name}</p>
                    <p className={styles.itemDetails}>
                      CRM: {doc.crm} • {ubs?.name || 'UBS não encontrada'}
                    </p>
                  </div>
                </div>
              );
            })}
            {doctors.length === 0 && (
              <p className={styles.emptyState}>Nenhum médico cadastrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
