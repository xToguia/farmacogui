'use client';

import { usePharmacy } from '../../context/PharmacyContext';
import { useRouter } from 'next/navigation';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children }) {
  const { role, setRole, toast } = usePharmacy();
  const router = useRouter();

  const getRoleLabel = () => {
    if (role === 'admin') return 'Administrador';
    if (role === 'manager') return 'Gerente';
    if (role === 'employee') return 'Funcionário';
    return '';
  };

  const handleLogout = () => {
    setRole(null);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      {/* Toast Notifications */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>
            <span className={styles.logoIcon}>💊</span>
            PharmaSys
          </h2>
          <p className={styles.roleLabel}>{getRoleLabel()}</p>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navTitle}>Menu Principal</div>
          {role === 'manager' || role === 'admin' ? (
            <div className={styles.navItem}>
              <span className={styles.navIcon}>📊</span>
              Dashboard
            </div>
          ) : null}
          {role === 'employee' ? (
            <div className={styles.navItem}>
              <span className={styles.navIcon}>🛒</span>
              Frente de Caixa
            </div>
          ) : null}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.navIcon}>🚪</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>
            {role === 'manager' || role === 'admin' 
              ? 'Painel de Gestão' 
              : 'Ponto de Venda'}
          </h1>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {role?.charAt(0).toUpperCase()}
            </div>
            <span className={styles.userName}>Usuário Conectado</span>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
