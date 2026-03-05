# 🚀 Guia Rápido - PharmaSys

## ⚡ Início Rápido

```bash
# 1. Entre na pasta do projeto
cd nextjs-project

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev

# 4. Abra no navegador
# http://localhost:3000
```

## 📝 Principais Trechos de Código

### 1. Context API - Estado Global

```javascript
// context/PharmacyContext.jsx
import { createContext, useContext, useState } from 'react';

export const PharmacyProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [batches, setBatches] = useState([]);
  
  const addMedicine = (medData, batchData) => {
    // Lógica de cadastro com verificação de duplicidade
  };
  
  const processSale = (items, isDelivery, customerName) => {
    // Lógica FEFO (First Expired First Out)
  };
  
  return (
    <PharmacyContext.Provider value={{ medicines, addMedicine, processSale }}>
      {children}
    </PharmacyContext.Provider>
  );
};

// Usar em componentes
export const usePharmacy = () => useContext(PharmacyContext);
```

### 2. Componente com CSS Module

```javascript
// components/ui/Button.jsx
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', onClick }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
/* components/ui/Button.module.css */
.button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.primary {
  background: #6366f1;
  color: white;
}

.secondary {
  background: #e5e7eb;
  color: #1f2937;
}
```

### 3. Roteamento Next.js

```javascript
// app/page.jsx (Página Inicial)
'use client';

import { useRouter } from 'next/navigation';
import { usePharmacy } from '../context/PharmacyContext';

export default function Home() {
  const { role } = usePharmacy();
  const router = useRouter();
  
  useEffect(() => {
    if (role === 'employee') router.push('/pos');
    if (role === 'manager') router.push('/dashboard');
  }, [role]);
  
  return <AuthSelection />;
}
```

### 4. Layout Compartilhado

```javascript
// app/layout.jsx
import { PharmacyProvider } from '../context/PharmacyContext';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <PharmacyProvider>
          {children}
        </PharmacyProvider>
      </body>
    </html>
  );
}
```

### 5. Formulário com Estado

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = () => {
  console.log(formData);
};

return (
  <form>
    <Input 
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Nome"
    />
    <Button onClick={handleSubmit}>Enviar</Button>
  </form>
);
```

### 6. Gráficos com Recharts

```javascript
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Dipirona', vendas: 120 },
  { name: 'Amoxicilina', vendas: 80 },
];

export default function Chart() {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="vendas" fill="#6366f1" />
    </BarChart>
  );
}
```

### 7. Modal/Dialog

```javascript
const [showModal, setShowModal] = useState(false);

return (
  <>
    <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
    
    {showModal && (
      <div className={styles.modal} onClick={() => setShowModal(false)}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <h3>Título do Modal</h3>
          <p>Conteúdo aqui</p>
          <Button onClick={() => setShowModal(false)}>Fechar</Button>
        </div>
      </div>
    )}
  </>
);
```

```css
/* Modal CSS */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modalContent {
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
```

### 8. Lista com Map

```javascript
const { medicines } = usePharmacy();

return (
  <div className={styles.list}>
    {medicines.map(med => (
      <div key={med.id} className={styles.item}>
        <h4>{med.name}</h4>
        <p>{med.category}</p>
        <span>{med.manufacturer}</span>
      </div>
    ))}
    
    {medicines.length === 0 && (
      <p className={styles.empty}>Nenhum medicamento encontrado.</p>
    )}
  </div>
);
```

### 9. Busca/Filtro

```javascript
const [searchTerm, setSearchTerm] = useState('');

const filteredMedicines = medicines.filter(med => 
  med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  med.category.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <>
    <input 
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    
    {filteredMedicines.map(med => (
      <div key={med.id}>{med.name}</div>
    ))}
  </>
);
```

### 10. Carrinho de Compras

```javascript
const [cart, setCart] = useState([]);

const addToCart = (medicineId) => {
  const existing = cart.find(i => i.medicineId === medicineId);
  
  if (existing) {
    setCart(cart.map(i => 
      i.medicineId === medicineId 
        ? { ...i, quantity: i.quantity + 1 }
        : i
    ));
  } else {
    setCart([...cart, { medicineId, quantity: 1 }]);
  }
};

const removeFromCart = (medicineId) => {
  const existing = cart.find(i => i.medicineId === medicineId);
  
  if (existing && existing.quantity > 1) {
    setCart(cart.map(i => 
      i.medicineId === medicineId 
        ? { ...i, quantity: i.quantity - 1 }
        : i
    ));
  } else {
    setCart(cart.filter(i => i.medicineId !== medicineId));
  }
};

const getTotalItems = () => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};
```

## 🎨 CSS Útil

### Grid Responsivo
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

### Flexbox Centralizado
```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

### Card
```css
.card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Badge/Tag
```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badgeSuccess {
  background: #d1fae5;
  color: #065f46;
}

.badgeDanger {
  background: #fee2e2;
  color: #991b1b;
}
```

### Animação Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated {
  animation: fadeIn 0.3s ease;
}
```

## 🔧 Hooks Customizados

```javascript
// useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Uso
const [user, setUser] = useLocalStorage('user', null);
```

## 🐛 Debug

```javascript
// Console log com estilo
console.log('%c Debug Info', 'color: green; font-weight: bold', data);

// React DevTools
// Instale a extensão React DevTools no Chrome/Firefox

// Verificar renderizações
useEffect(() => {
  console.log('Componente renderizado');
}, []);
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Executar build localmente
npm start

# Deploy Vercel (recomendado para Next.js)
# 1. Crie conta em vercel.com
# 2. Conecte repositório GitHub
# 3. Deploy automático
```

## 🔍 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Matar processo na porta 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

### CSS não aplicado
```javascript
// Verifique se importou o .module.css
import styles from './Component.module.css';

// Use className, não class
<div className={styles.container}>
```

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Recharts Docs](https://recharts.org)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [MDN Web Docs](https://developer.mozilla.org)

---

**💡 Dica**: Mantenha este arquivo aberto enquanto desenvolve!
