'use client';

import { useState } from 'react';
import { usePharmacy } from '../../context/PharmacyContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './EmployeePOS.module.css';

export default function EmployeePOS() {
  const { medicines, getMedicineStock, processSale } = usePharmacy();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isDelivery, setIsDelivery] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [checkoutStep, setCheckoutStep] = useState('cart');

  const addToCart = (medicineId) => {
    const existing = cart.find(i => i.medicineId === medicineId);
    const stock = getMedicineStock(medicineId);
    const currentQtyInCart = existing ? existing.quantity : 0;

    if (currentQtyInCart + 1 > stock) {
      alert('Estoque insuficiente!');
      return;
    }

    if (existing) {
      setCart(cart.map(i => i.medicineId === medicineId ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { medicineId, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
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
    <div className={styles.container}>
      {/* Left: Product Search */}
      <div className={styles.productsPanel}>
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              type="text"
              placeholder="Buscar medicamento..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.productGrid}>
          {filteredMedicines.map(med => {
            const stock = getMedicineStock(med.id);
            return (
              <div key={med.id} className={styles.productCard}>
                <div className={styles.productInfo}>
                  <h4 className={styles.productName}>{med.name}</h4>
                  <p className={styles.productMeta}>
                    {med.manufacturer} • {med.measure}
                  </p>
                  <span className={styles.productCategory}>{med.category}</span>
                </div>
                
                <div className={styles.productFooter}>
                  <div className={stock > 0 ? styles.stockAvailable : styles.stockUnavailable}>
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
      <div className={styles.cartPanel}>
        <div className={styles.cartHeader}>
          <h3 className={styles.cartTitle}>
            <span>🛒</span>
            Pedido Atual
          </h3>
        </div>

        <div className={styles.cartContent}>
          {checkoutStep === 'success' ? (
            <div className={styles.successScreen}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Pedido Concluído!</h3>
              <p className={styles.successText}>O estoque foi atualizado automaticamente.</p>
              <Button onClick={() => setCheckoutStep('cart')}>Novo Pedido</Button>
            </div>
          ) : checkoutStep === 'delivery' ? (
            <div className={styles.deliveryForm}>
              <div className={styles.deliveryOption}>
                <h4 className={styles.sectionTitle}>Opções de Entrega</h4>
                <label className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    checked={isDelivery} 
                    onChange={e => setIsDelivery(e.target.checked)}
                  />
                  <span>🚚 Fazer Entrega?</span>
                  <p className={styles.checkboxHelp}>Marque para processar envio</p>
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

              <div className={styles.deliveryActions}>
                <Button variant="secondary" onClick={() => setCheckoutStep('cart')}>
                  Voltar
                </Button>
                <Button variant="success" onClick={finalizeOrder}>
                  Concluir Pedido
                </Button>
              </div>
            </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <span className={styles.emptyCartIcon}>🛒</span>
                  <p>Carrinho vazio</p>
                </div>
              ) : (
                <div className={styles.cartItems}>
                  {cart.map(item => {
                    const med = medicines.find(m => m.id === item.medicineId);
                    if (!med) return null;
                    return (
                      <div key={item.medicineId} className={styles.cartItem}>
                        <div className={styles.cartItemInfo}>
                          <p className={styles.cartItemName}>{med.name}</p>
                          <p className={styles.cartItemMeta}>{med.measure}</p>
                        </div>
                        <div className={styles.cartItemControls}>
                          <button onClick={() => removeFromCart(item.medicineId)} className={styles.qtyButton}>
                            −
                          </button>
                          <span className={styles.qtyDisplay}>{item.quantity}</span>
                          <button onClick={() => addToCart(item.medicineId)} className={styles.qtyButton}>
                            +
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
          <div className={styles.cartFooter}>
            <div className={styles.cartSummary}>
              <span>Itens:</span>
              <strong>{cart.reduce((a, b) => a + b.quantity, 0)}</strong>
            </div>
            <Button fullWidth onClick={handleCheckout}>
              Finalizar Pedido
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
