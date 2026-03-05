'use client';

import DashboardLayout from '../../components/shared/DashboardLayout';
import ManagerDashboard from '../../components/manager/ManagerDashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ManagerDashboard />
    </DashboardLayout>
  );
}
