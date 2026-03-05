import React from 'react';
import { PharmacyProvider, usePharmacy } from './context/PharmacyContext';
import { AuthSelection } from './components/auth/AuthSelection';
import { DashboardLayout } from './components/shared/DashboardLayout';
import { ManagerDashboard } from './components/manager/ManagerDashboard';
import { EmployeePOS } from './components/employee/EmployeePOS';
import { Toaster } from 'sonner';

const AppContent: React.FC = () => {
  const { role } = usePharmacy();

  if (!role) {
    return <AuthSelection />;
  }

  return (
    <DashboardLayout>
      {role === 'employee' ? (
        <EmployeePOS />
      ) : (
        // Admin and Manager share the dashboard for this MVP, 
        // as Admin "Access Total" implies Manager features + more.
        <ManagerDashboard />
      )}
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <PharmacyProvider>
       <AppContent />
       <Toaster position="top-right" richColors />
    </PharmacyProvider>
  );
}
