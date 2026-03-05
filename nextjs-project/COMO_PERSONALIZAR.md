# 🎨 Como Personalizar o PharmaSys

Guia completo para customizar cores, estilos e funcionalidades.

## 🌈 Alterar Cores do Sistema

### 1. Cores Primárias (Indigo/Roxo)

**Arquivo**: `styles/globals.css` e todos os arquivos `.module.css`

```css
/* Substituir #6366f1 (Indigo) por sua cor preferida */

/* Exemplo: Trocar para Verde */
background: #10b981;  /* Verde */
color: #10b981;

/* Exemplo: Trocar para Laranja */
background: #f97316;  /* Laranja */
color: #f97316;

/* Exemplo: Trocar para Rosa */
background: #ec4899;  /* Rosa */
color: #ec4899;
```

### 2. Cores de Perfil (AuthSelection)

**Arquivo**: `components/auth/AuthSelection.module.css`

```css
/* Admin - Roxo */
.card.purple {
  border-top-color: #9333ea;  /* Mude para sua cor */
}

/* Gerente - Azul */
.card.blue {
  border-top-color: #2563eb;  /* Mude para sua cor */
}

/* Funcionário - Verde */
.card.green {
  border-top-color: #16a34a;  /* Mude para sua cor */
}
```

### 3. Cores de Status

**Arquivo**: Vários arquivos `.module.css`

```css
/* Sucesso - Verde */
.success {
  background: #d1fae5;
  color: #065f46;
}

/* Erro - Vermelho */
.danger {
  background: #fee2e2;
  color: #991b1b;
}

/* Aviso - Amarelo */
.warning {
  background: #fef3c7;
  color: #92400e;
}

/* Info - Azul */
.info {
  background: #dbeafe;
  color: #1e40af;
}
```

## 🖼️ Alterar Layout

### 1. Largura do Sidebar

**Arquivo**: `components/shared/DashboardLayout.module.css`

```css
.sidebar {
  width: 260px;  /* Mude para 200px, 300px, etc */
}
```

### 2. Tamanho da Logo

**Arquivo**: `components/shared/DashboardLayout.module.css`

```css
.logo {
  font-size: 1.25rem;  /* Mude para 1.5rem, 2rem, etc */
}

.logoIcon {
  font-size: 1.5rem;  /* Ajuste proporcionalmente */
}
```

### 3. Altura do Header

**Arquivo**: `components/shared/DashboardLayout.module.css`

```css
.header {
  padding: 16px 32px;  /* Mude para 20px 40px, etc */
}
```

## 📝 Trocar Emojis por Ícones SVG

### Opção 1: Usar Ícones Customizados

**Arquivo**: `components/ui/Icons.jsx` (já criado com 17 ícones)

```javascript
import { PillIcon, SearchIcon, ShoppingCartIcon } from '../ui/Icons';

// Usar assim:
<PillIcon size={24} color="#6366f1" />
```

### Opção 2: Instalar Biblioteca de Ícones

```bash
# React Icons (mais popular)
npm install react-icons

# Lucide React
npm install lucide-react

# Heroicons
npm install @heroicons/react
```

**Uso**:
```javascript
import { FaPills } from 'react-icons/fa';
import { Search, ShoppingCart } from 'lucide-react';
import { BeakerIcon } from '@heroicons/react/24/outline';

// Usar assim:
<FaPills size={24} />
<Search size={24} />
<BeakerIcon className="h-6 w-6" />
```

## 🔤 Alterar Fonte

### 1. Google Fonts

**Arquivo**: `app/layout.jsx`

```javascript
import { Inter, Roboto, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
// ou
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
// ou
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>  {/* ou roboto.className */}
        {children}
      </body>
    </html>
  );
}
```

### 2. Fonte Local

**Arquivo**: `styles/globals.css`

```css
@font-face {
  font-family: 'MinhaFonte';
  src: url('/fonts/minha-fonte.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'MinhaFonte', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

## 📊 Personalizar Gráficos

**Arquivo**: `components/manager/ManagerMetrics.jsx`

### 1. Cores dos Gráficos

```javascript
// Alterar cor da barra
<Bar dataKey="quantidade" fill="#10b981" />  // Verde

// Alterar cores do Pie Chart
const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];  // Vermelho, Laranja, Verde, Azul
```

### 2. Tamanho dos Gráficos

```javascript
// No componente
<ResponsiveContainer width="100%" height={400}>  // Mude 400 para outro valor
  <BarChart data={data}>
    ...
  </BarChart>
</ResponsiveContainer>
```

**Ou no CSS**:
```css
.chartContainer {
  height: 400px;  /* Mude para 300px, 500px, etc */
}
```

### 3. Adicionar Novos Gráficos

```javascript
import { LineChart, Line, AreaChart, Area } from 'recharts';

// Gráfico de Linha
<LineChart data={data}>
  <Line type="monotone" dataKey="vendas" stroke="#6366f1" />
</LineChart>

// Gráfico de Área
<AreaChart data={data}>
  <Area type="monotone" dataKey="vendas" stroke="#6366f1" fill="#c7d2fe" />
</AreaChart>
```

## 🎯 Adicionar Novos Campos

### 1. No Formulário de Medicamento

**Arquivo**: `components/manager/ManagerInventory.jsx`

```javascript
// 1. Adicionar no estado
const [formData, setFormData] = useState({
  // ... campos existentes
  preco: 0,           // NOVO CAMPO
  codigoBarras: '',   // NOVO CAMPO
});

// 2. Adicionar no formulário
<Input 
  label="Preço" 
  type="number"
  value={formData.preco} 
  onChange={e => setFormData({...formData, preco: e.target.value})}
/>

<Input 
  label="Código de Barras" 
  value={formData.codigoBarras} 
  onChange={e => setFormData({...formData, codigoBarras: e.target.value})}
/>

// 3. Incluir ao salvar
addMedicine({
  // ... campos existentes
  preco: Number(formData.preco),
  codigoBarras: formData.codigoBarras
}, batchData);
```

### 2. No Context

**Arquivo**: `context/PharmacyContext.jsx`

```javascript
// Adicionar estrutura de dados mock
const [medicines, setMedicines] = useState([
  { 
    id: '1', 
    name: 'Dipirona',
    // ... campos existentes
    preco: 5.50,           // NOVO
    codigoBarras: '123'    // NOVO
  }
]);
```

## 🔔 Personalizar Notificações Toast

**Arquivo**: `context/PharmacyContext.jsx`

```javascript
// Alterar posição
<div className="toast-container" style={{ top: '20px', right: '20px' }}>
  {/* Mude para: bottom: '20px', left: '20px', etc */}
</div>

// Alterar duração
const showToast = (message, type) => {
  setToast({ message, type });
  setTimeout(() => setToast(null), 5000);  // Mude 5000 para 3000, 10000, etc
};
```

**Arquivo**: `styles/globals.css`

```css
/* Alterar estilo do toast */
.toast {
  padding: 20px 30px;           /* Mude tamanho */
  border-radius: 12px;          /* Mude arredondamento */
  font-size: 1rem;              /* Mude tamanho da fonte */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  /* Mude sombra */
}
```

## 🖼️ Adicionar Logo

### 1. Logo Texto

**Arquivo**: `components/shared/DashboardLayout.module.css`

```css
.logo {
  font-family: 'Poppins', sans-serif;  /* Fonte especial */
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 2. Logo Imagem

**Arquivo**: `components/shared/DashboardLayout.jsx`

```javascript
import Image from 'next/image';

<div className={styles.sidebarHeader}>
  <Image 
    src="/logo.png" 
    alt="Logo" 
    width={120} 
    height={40}
  />
  <p className={styles.roleLabel}>{getRoleLabel()}</p>
</div>
```

## 📱 Ajustar Responsividade

**Arquivo**: Qualquer `.module.css`

```css
/* Mobile (até 768px) */
@media (max-width: 768px) {
  .container {
    padding: 12px;
    grid-template-columns: 1fr;
  }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 20px;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (acima de 1024px) */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## ⚡ Adicionar Animações

**Arquivo**: `styles/globals.css`

```css
/* Slide In */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Usar animações */
.animated {
  animation: slideIn 0.5s ease;
}

.bouncing {
  animation: bounce 1s infinite;
}

.pulsing {
  animation: pulse 2s infinite;
}
```

## 🎛️ Configurações Avançadas

### 1. Alterar Idioma

**Arquivo**: `app/layout.jsx`

```javascript
<html lang="en">  {/* ou 'es', 'fr', etc */}
```

### 2. Alterar Título e Metadados

**Arquivo**: `app/layout.jsx`

```javascript
export const metadata = {
  title: 'Meu Sistema de Farmácia',
  description: 'Sistema personalizado de gestão',
  icons: {
    icon: '/favicon.ico',
  },
};
```

### 3. Adicionar Tema Escuro

**Arquivo**: `styles/globals.css`

```css
/* Variáveis CSS */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}

[data-theme="dark"] {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

**Implementar toggle**:
```javascript
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
};
```

## 🚀 Otimizações

### 1. Lazy Loading de Componentes

```javascript
import dynamic from 'next/dynamic';

const ManagerMetrics = dynamic(() => import('./ManagerMetrics'), {
  loading: () => <p>Carregando gráficos...</p>
});
```

### 2. Memoização

```javascript
import { useMemo } from 'react';

const filteredMedicines = useMemo(() => {
  return medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [medicines, searchTerm]);
```

---

**💡 Dica Final**: Sempre teste suas alterações em diferentes tamanhos de tela!

```bash
# Desenvolvimento
npm run dev

# Build para produção (testa otimizações)
npm run build
npm start
```
