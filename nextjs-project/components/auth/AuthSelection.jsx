'use client';

import { usePharmacy } from '../../context/PharmacyContext';
import styles from './AuthSelection.module.css';

export default function AuthSelection() {
  const { setRole } = usePharmacy();

  const roles = [
    {
      id: 'admin',
      title: 'Administrador',
      description: 'Acesso total ao sistema, dashboard completo e configurações globais.',
      icon: '🛡️',
      color: 'purple'
    },
    {
      id: 'manager',
      title: 'Gerente',
      description: 'Gestão de estoque, métricas, cadastros de médicos e UBS.',
      icon: '💼',
      color: 'blue'
    },
    {
      id: 'employee',
      title: 'Funcionário',
      description: 'Frente de caixa (PDV), busca de medicamentos e entregas.',
      icon: '👤',
      color: 'green'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sistema de Gestão Farmacêutica</h1>
          <p className={styles.subtitle}>Selecione seu perfil de acesso para continuar</p>
        </div>

        <div className={styles.cards}>
          {roles.map(role => (
            <div 
              key={role.id}
              className={`${styles.card} ${styles[role.color]}`}
              onClick={() => setRole(role.id)}
            >
              <div className={styles.icon}>{role.icon}</div>
              <h3 className={styles.cardTitle}>{role.title}</h3>
              <p className={styles.cardDescription}>{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
