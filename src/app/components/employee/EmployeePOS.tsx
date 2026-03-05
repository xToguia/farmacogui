import React, { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, ShoppingCart, Truck, Check, X, Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';

export const EmployeePOS: React.FC = () => {
  const { medicines, getMedicineStock, processSale } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ medicineId: string; quantity: number }[]>([]);
  const [isDelivery, setIsDelivery] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'delivery' | 'success'>('cart');

  const addToCart = (medicineId: string) => {
    const existing = cart.find(i => i.medicineId === medicineId);
    const stock = getMedicineStock(medicineId);
    const currentQtyInCart = existing ? existing.quantity : 0;

    if (currentQtyInCart + 1 > stock) {
      toast.error('Estoque insuficiente!');
      return;
    }

    if (existing) {
      setCart(cart.map(i => i.medicineId === medicineId ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { medicineId, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId: string) => {
    const existing = cart.find(i => i.medicineId === medicineId);
    if (existing && existing.quantity > 1) {
      setCart(cart.map(i => i.medicineId === medicineId ? { ...i, quantity: i.quantity - 1 } : i));
    } else {
      setCart(cart.filter(i => i.medicineId !== medicineId));
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('delivery');
  };

  const finalizeOrder = () => {
    processSale(cart, isDelivery, customerName);
    setCheckoutStep('success');
    setCart([]);
    setCustomerName('');
    setIsDelivery(false);
  };

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Left: Product Search */}
      <div className="lg:col-span-2 flex flex-col bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             <Input 
               placeholder="Buscar medicamento..." 
               className="pl-10 text-lg py-6"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedicines.map(med => {
             const stock = getMedicineStock(med.id);
             return (
              <div key={med.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{med.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{med.manufacturer} • {med.measure}</p>
                  <p className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded inline-block">{med.category}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className={clsx("text-sm font-medium", stock > 0 ? "text-green-600" : "text-red-600")}>
                    {stock > 0 ? `${stock} em estoque` : 'Sem estoque'}
                  </div>
                  <Button 
                    size="sm" 
                    disabled={stock <= 0}
                    onClick={() => addToCart(med.id)}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
             );
          })}
        </div>
      </div>

      {/* Right: Cart/Checkout */}
      <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 bg-indigo-50">
          <h3 className="font-bold text-indigo-900 flex items-center gap-2">
            <ShoppingCart size={20} /> 
            Pedido Atual
          </h3>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {checkoutStep === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
               <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                 <Check size={40} />
               </div>
               <h3 className="text-2xl font-bold text-gray-800">Pedido Concluído!</h3>
               <p className="text-gray-500 mt-2">O estoque foi atualizado automaticamente.</p>
               <Button className="mt-6" onClick={() => setCheckoutStep('cart')}>Novo Pedido</Button>
            </div>
          ) : checkoutStep === 'delivery' ? (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                   <h4 className="font-bold text-blue-900 mb-2">Opções de Entrega</h4>
                   <label className="flex items-center gap-3 p-3 bg-white rounded border border-blue-200 cursor-pointer">
                     <input 
                       type="checkbox" 
                       checked={isDelivery} 
                       onChange={e => setIsDelivery(e.target.checked)}
                       className="h-5 w-5 text-indigo-600 rounded"
                     />
                     <div className="flex-1">
                       <span className="font-medium text-gray-900 flex items-center gap-2">
                         <Truck size={18} /> Fazer Entrega?
                       </span>
                       <p className="text-xs text-gray-500">Marque para processar envio</p>
                     </div>
                   </label>
                </div>

                <div>
                   <Input 
                      label="Nome do Paciente/Cliente" 
                      value={customerName} 
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="Opcional"
                   />
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-3">
                   <Button variant="secondary" onClick={() => setCheckoutStep('cart')} className="flex-1">Voltar</Button>
                   <Button onClick={finalizeOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                     Concluir Pedido
                   </Button>
                </div>
             </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingCart size={48} className="mb-2 opacity-20" />
                  <p>Carrinho vazio</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => {
                    const med = medicines.find(m => m.id === item.medicineId);
                    if (!med) return null;
                    return (
                      <div key={item.medicineId} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100">
                        <div>
                          <p className="font-medium text-gray-800">{med.name}</p>
                          <p className="text-xs text-gray-500">{med.measure}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => removeFromCart(item.medicineId)} className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                            <Minus size={12} />
                          </button>
                          <span className="font-mono font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item.medicineId)} className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {checkoutStep === 'cart' && cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
             <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Itens:</span>
                <span className="font-bold text-gray-900">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
             </div>
             <Button className="w-full" onClick={handleCheckout}>
               Finalizar Pedido
             </Button>
          </div>
        )}
      </div>
    </div>
  );
};
