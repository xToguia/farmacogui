# 📝 Snippets de Código - PharmaSys

Trechos de código prontos para copiar e colar.

## 🧩 Componentes

### Botão Customizado

```javascript
// components/ui/CustomButton.jsx
import styles from './CustomButton.module.css';

export default function CustomButton({ 
  children, 
  variant = 'primary',
  icon,
  loading = false,
  ...props 
}) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner}>⏳</span>
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
```

```css
/* components/ui/CustomButton.module.css */
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Card Responsivo

```javascript
// components/ui/Card.jsx
import styles from './Card.module.css';

export default function Card({ title, children, footer, hover = true }) {
  return (
    <div className={`${styles.card} ${hover ? styles.hover : ''}`}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
```

```css
/* components/ui/Card.module.css */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
}

.card.hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 700;
  font-size: 1.125rem;
}

.content {
  padding: 20px;
}

.footer {
  padding: 12px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
```

### Modal Reutilizável

```javascript
// components/ui/Modal.jsx
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Uso:
// <Modal isOpen={show} onClose={() => setShow(false)} title="Título">
//   <p>Conteúdo do modal</p>
// </Modal>
```

```css
/* components/ui/Modal.module.css */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 85vh;
  overflow: hidden;
  animation: slideUp 0.3s;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.closeButton {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.closeButton:hover {
  color: #1f2937;
}

.content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(85vh - 80px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 🔧 Hooks Customizados

### useDebounce

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Uso:
// const [search, setSearch] = useState('');
// const debouncedSearch = useDebounce(search, 500);
//
// useEffect(() => {
//   // Faz busca somente após 500ms sem digitação
//   fetchResults(debouncedSearch);
// }, [debouncedSearch]);
```

### useLocalStorage

```javascript
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// Uso:
// const [user, setUser] = useLocalStorage('user', null);
```

### useClickOutside

```javascript
// hooks/useClickOutside.js
import { useEffect } from 'react';

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Uso:
// const ref = useRef();
// useClickOutside(ref, () => setIsOpen(false));
// 
// return <div ref={ref}>Conteúdo</div>
```

## 📊 Componentes de Gráfico

### Gráfico de Linha

```javascript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', vendas: 4000 },
  { mes: 'Fev', vendas: 3000 },
  { mes: 'Mar', vendas: 5000 },
  { mes: 'Abr', vendas: 2780 },
  { mes: 'Mai', vendas: 1890 },
];

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="vendas" stroke="#6366f1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Gráfico de Pizza com Legenda

```javascript
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Categoria A', value: 400 },
  { name: 'Categoria B', value: 300 },
  { name: 'Categoria C', value: 300 },
  { name: 'Categoria D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function CategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

## 🎨 Estilos Úteis

### Gradiente de Fundo

```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-bg-2 {
  background: linear-gradient(to right, #ff6b6b, #feca57);
}

.gradient-bg-3 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Sombras Modernas

```css
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-colored {
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}
```

### Animações Suaves

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide In Right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale Up */
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}

/* Uso */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-in {
  animation: slideInRight 0.5s ease-out;
}

.animate-scale {
  animation: scaleUp 0.3s ease-out;
}

.animate-shake {
  animation: shake 0.5s;
}

.animate-pulse {
  animation: pulse 2s infinite;
}
```

## 🔔 Sistema de Notificações

### Toast Avançado

```javascript
// components/ui/Toast.jsx
import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return { toasts, addToast };
}

export function ToastContainer({ toasts }) {
  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          <span className={styles.icon}>
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'warning' && '⚠'}
            {toast.type === 'info' && 'ℹ'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

// Uso:
// const { toasts, addToast } = useToast();
// 
// <ToastContainer toasts={toasts} />
// <button onClick={() => addToast('Salvo com sucesso!', 'success')}>
//   Salvar
// </button>
```

```css
/* components/ui/Toast.module.css */
.container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  animation: slideInRight 0.3s ease;
  border-left: 4px solid;
}

.success {
  border-left-color: #10b981;
}

.error {
  border-left-color: #ef4444;
}

.warning {
  border-left-color: #f59e0b;
}

.info {
  border-left-color: #3b82f6;
}

.icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## 📋 Tabelas Responsivas

```javascript
// components/ui/Table.jsx
import styles from './Table.module.css';

export default function Table({ columns, data }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.key} data-label={col.label}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Uso:
// const columns = [
//   { key: 'name', label: 'Nome' },
//   { key: 'age', label: 'Idade' },
//   { 
//     key: 'actions', 
//     label: 'Ações',
//     render: (row) => <button>Editar</button>
//   }
// ];
//
// const data = [
//   { name: 'João', age: 25 },
//   { name: 'Maria', age: 30 }
// ];
//
// <Table columns={columns} data={data} />
```

```css
/* components/ui/Table.module.css */
.wrapper {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: #f9fafb;
}

.table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.table tbody tr:hover {
  background: #f9fafb;
}

@media (max-width: 768px) {
  .table thead {
    display: none;
  }

  .table tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .table td {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border: none;
    border-bottom: 1px solid #f3f4f6;
  }

  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }

  .table td:last-child {
    border-bottom: none;
  }
}
```

---

**🎉 Pronto para usar! Copie e cole estes snippets no seu projeto.**
