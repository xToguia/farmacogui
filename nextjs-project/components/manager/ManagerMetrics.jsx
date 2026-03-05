'use client';

import { usePharmacy } from '../../context/PharmacyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './ManagerMetrics.module.css';

export default function ManagerMetrics() {
  const { medicines, sales, doctors, ubsList } = usePharmacy();

  // Compute metrics from sales
  const medSales = sales.flatMap(s => s.items).reduce((acc, item) => {
    acc[item.medicineId] = (acc[item.medicineId] || 0) + item.quantity;
    return acc;
  }, {});

  const topMedicinesData = Object.entries(medSales).map(([id, qty]) => {
    const med = medicines.find(m => m.id === id);
    return { name: med?.name || 'Unknown', quantidade: qty };
  }).sort((a, b) => b.quantidade - a.quantidade).slice(0, 5);

  const demoDataMedicines = topMedicinesData.length > 0 ? topMedicinesData : [
    { name: 'Dipirona', quantidade: 120 },
    { name: 'Amoxicilina', quantidade: 80 },
    { name: 'Paracetamol', quantidade: 60 },
    { name: 'Ibuprofeno', quantidade: 40 },
    { name: 'Omeprazol', quantidade: 30 },
  ];

  const demoDataDoctors = [
    { name: 'Dr. Silva', receitas: 45 },
    { name: 'Dra. Ana', receitas: 32 },
    { name: 'Dr. Roberto', receitas: 28 },
  ];

  const demoDataUBS = [
    { name: 'UBS Centro', value: 400 },
    { name: 'UBS Norte', value: 300 },
    { name: 'UBS Sul', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={styles.grid}>
      {/* Chart 1: Top Medicines */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Medicamentos Mais Vendidos</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demoDataMedicines}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Top Doctors */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Médicos que Mais Receitam</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demoDataDoctors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="receitas" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: UBS Distribution */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Receitas por UBS</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={demoDataUBS}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {demoDataUBS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Placeholder */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Atendimentos por Funcionário</h3>
        <div className={`${styles.chartContainer} ${styles.placeholder}`}>
          <p>Dados insuficientes para gerar gráfico de performance.</p>
        </div>
      </div>
    </div>
  );
}
