import React from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { LogOut, LayoutDashboard, Pill, Users, Stethoscope, ShoppingCart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { role, setRole } = usePharmacy();

  const getRoleLabel = () => {
    if (role === 'admin') return 'Administrador';
    if (role === 'manager') return 'Gerente';
    if (role === 'employee') return 'Funcionário';
    return '';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Pill className="text-indigo-400" />
            PharmaSys
          </h2>
          <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">{getRoleLabel()}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            {/* Navigation could be dynamic, but for this single-page-app structure, 
                we might control views inside the page components. 
                This sidebar acts more as a status indicator and Logout for now, 
                or could have quick links if we used a router.
            */}
            <div className="px-4 py-2 text-slate-400 text-sm">
              Menu Principal
            </div>
             {/* Just visual items for now as navigation is handled in the dashboard content via tabs */}
             {role === 'manager' && (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 text-indigo-300 bg-slate-800 rounded-md">
                    <LayoutDashboard size={18} /> Dashboard
                  </div>
                </>
             )}
              {role === 'employee' && (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 text-indigo-300 bg-slate-800 rounded-md">
                    <ShoppingCart size={18} /> Frente de Caixa
                  </div>
                </>
             )}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={() => setRole(null)}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors w-full px-4 py-2 hover:bg-slate-800 rounded-md"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
           <h1 className="text-2xl font-semibold text-gray-800">
             {role === 'manager' ? 'Painel de Gestão' : role === 'employee' ? 'Ponto de Venda' : 'Painel Administrativo'}
           </h1>
           <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
               {role?.charAt(0).toUpperCase()}
             </div>
             <span className="text-sm font-medium text-gray-600">Usuário Conectado</span>
           </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
