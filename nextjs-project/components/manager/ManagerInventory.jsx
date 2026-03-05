'use client';

import { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './ManagerInventory.module.css';

export default function ManagerInventory() {
  const { medicines, batches, addMedicine, getMedicineStock } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
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
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text"
            placeholder="Buscar por nome ou categoria..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          ➕ Novo Medicamento
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Fabricante</th>
              <th>Estoque Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map(med => {
              const stock = getMedicineStock(med.id);
              const isLow = stock <= med.minStockLevel;
              return (
                <tr key={med.id}>
                  <td>
                    <strong>{med.name}</strong>
                    <span className={styles.measure}>({med.measure})</span>
                  </td>
                  <td>{med.category}</td>
                  <td>{med.manufacturer}</td>
                  <td className={styles.stockCell}>{stock}</td>
                  <td>
                    {isLow ? (
                      <span className={`${styles.badge} ${styles.badgeDanger}`}>
                        Baixo Estoque
                      </span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                        Normal
                      </span>
                    )}
                  </td>
                  <td>
                    <button className={styles.actionButton}>✏️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredMedicines.length === 0 && (
          <div className={styles.emptyState}>Nenhum medicamento encontrado.</div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className={styles.modal} onClick={() => setShowAddModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Cadastro de Medicamento</h3>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Input 
                  label="Nome do Medicamento" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Dipirona"
                />
                <p className={styles.helpText}>
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
              <div className={styles.formGroupFull}>
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
                onChange={e => setFormData({...formData, minStockLevel: e.target.value})}
              />
              
              <div className={styles.divider}>
                <h4>Dados do Lote Inicial</h4>
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
                onChange={e => setFormData({...formData, quantity: e.target.value})}
              />
            </div>

            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancelar</Button>
              <Button onClick={handleSave}>Salvar Medicamento</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
