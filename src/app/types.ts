export type Role = 'admin' | 'manager' | 'employee';

export interface Batch {
  id: string;
  medicineId: string;
  lotNumber: string;
  expiryDate: string; // ISO date
  quantity: number;
}

export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  measure: string; // e.g., '500mg'
  composition: string;
  category: string;
  minStockLevel: number;
}

export interface Doctor {
  id: string;
  name: string;
  crm: string;
  ubsId: string;
}

export interface UBS {
  id: string;
  name: string;
  address: string;
}

export interface SaleItem {
  medicineId: string;
  quantity: number;
  batchIdUsed: string; // For tracking specific batch if needed, though split might occur
}

export interface Sale {
  id: string;
  timestamp: string;
  employeeId: string;
  items: SaleItem[];
  total: number; // Placeholder, assuming price is involved or just tracking quantity
  isDelivery: boolean;
  customerName?: string;
  prescriptionId?: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorId: string;
  date: string;
  medicines: { medicineId: string; quantity: number }[];
  status: 'pending' | 'dispensed';
}
