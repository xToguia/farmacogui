'use client';

import { usePharmacy } from '../context/PharmacyContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthSelection from '../components/auth/AuthSelection';

export default function Home() {
  const { role } = usePharmacy();
  const router = useRouter();

  useEffect(() => {
    if (role === 'employee') {
      router.push('/pos');
    } else if (role === 'manager' || role === 'admin') {
      router.push('/dashboard');
    }
  }, [role, router]);

  if (role) {
    return <div className="loading">Carregando...</div>;
  }

  return <AuthSelection />;
}
