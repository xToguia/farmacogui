import React from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Shield, Briefcase, User } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthSelection: React.FC = () => {
  const { setRole } = usePharmacy();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Sistema de Gestão Farmacêutica</h1>
          <p className="text-slate-600 text-lg">Selecione seu perfil de acesso para continuar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-600 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => setRole('admin')}
          >
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto text-purple-600">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Administrador</h3>
            <p className="text-center text-slate-500 text-sm">
              Acesso total ao sistema, dashboard completo e configurações globais.
            </p>
          </motion.div>

          {/* Manager */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => setRole('manager')}
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto text-blue-600">
              <Briefcase size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Gerente</h3>
            <p className="text-center text-slate-500 text-sm">
              Gestão de estoque, métricas, cadastros de médicos e UBS.
            </p>
          </motion.div>

          {/* Employee */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-600 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => setRole('employee')}
          >
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-green-600">
              <User size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Funcionário</h3>
            <p className="text-center text-slate-500 text-sm">
              Frente de caixa (PDV), busca de medicamentos e entregas.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
