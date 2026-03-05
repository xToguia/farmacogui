# 📋 Estrutura Completa do Projeto PharmaSys

## 📂 Árvore de Diretórios

```
nextjs-project/
│
├── 📄 package.json                    # Dependências do projeto
├── 📄 next.config.js                  # Configuração do Next.js
├── 📄 jsconfig.json                   # Configuração JavaScript
├── 📄 .gitignore                      # Arquivos ignorados pelo Git
├── 📄 README.md                       # Documentação principal
├── 📄 ESTRUTURA_PROJETO.md            # Este arquivo
│
├── 📁 app/                            # App Router do Next.js 14
│   ├── 📄 layout.jsx                  # Layout raiz da aplicação
│   ├── 📄 page.jsx                    # Página inicial (AuthSelection)
│   │
│   ├── 📁 dashboard/
│   │   └── 📄 page.jsx                # Dashboard Gerente/Admin
│   │
│   └── 📁 pos/
│       └── 📄 page.jsx                # PDV Funcionário
│
├── 📁 components/                     # Componentes React
│   │
│   ├── 📁 auth/                       # Autenticação
│   │   ├── 📄 AuthSelection.jsx
│   │   └── 📄 AuthSelection.module.css
│   │
│   ├── 📁 shared/                     # Componentes compartilhados
│   │   ├── 📄 DashboardLayout.jsx
│   │   └── 📄 DashboardLayout.module.css
│   │
│   ├── 📁 manager/                    # Componentes do Gerente
│   │   ├── 📄 ManagerDashboard.jsx
│   │   ├── 📄 ManagerDashboard.module.css
│   │   ├── 📄 ManagerMetrics.jsx
│   │   ├── 📄 ManagerMetrics.module.css
│   │   ├── 📄 ManagerInventory.jsx
│   │   ├── 📄 ManagerInventory.module.css
│   │   ├── 📄 ManagerRegistry.jsx
│   │   └── 📄 ManagerRegistry.module.css
│   │
│   ├── 📁 employee/                   # Componentes do Funcionário
│   │   ├── 📄 EmployeePOS.jsx
│   │   └── 📄 EmployeePOS.module.css
│   │
│   └── 📁 ui/                         # Componentes UI reutilizáveis
│       ├── 📄 Button.jsx
│       ├── 📄 Button.module.css
│       ├── 📄 Input.jsx
│       ├── 📄 Input.module.css
│       └── 📄 Icons.jsx               # Ícones SVG customizados
│
├── 📁 context/                        # Context API
│   └── 📄 PharmacyContext.jsx         # Estado global da aplicação
│
└── 📁 styles/                         # Estilos globais
    └── 📄 globals.css                 # CSS global
```

## 🗂️ Descrição dos Arquivos Principais

### 🔧 Configuração

| Arquivo | Descrição |
|---------|-----------|
| `package.json` | Dependências (Next.js, React, Recharts, date-fns) |
| `next.config.js` | Configurações do Next.js |
| `jsconfig.json` | Configuração de paths JavaScript |

### 🎯 Rotas (App Router)

| Rota | Arquivo | Componente | Descrição |
|------|---------|-----------|-----------|
| `/` | `app/page.jsx` | `AuthSelection` | Seleção de perfil (Admin/Gerente/Funcionário) |
| `/dashboard` | `app/dashboard/page.jsx` | `ManagerDashboard` | Dashboard Gerente/Admin |
| `/pos` | `app/pos/page.jsx` | `EmployeePOS` | PDV Funcionário |

### 🧩 Componentes

#### Auth (Autenticação)
- **AuthSelection.jsx**: Tela de seleção de perfil com 3 cards

#### Shared (Compartilhados)
- **DashboardLayout.jsx**: Layout com sidebar, header e área de conteúdo

#### Manager (Gerente)
- **ManagerDashboard.jsx**: Container com sistema de tabs
- **ManagerMetrics.jsx**: Gráficos (Bar, Pie) usando Recharts
- **ManagerInventory.jsx**: Tabela de medicamentos + modal de cadastro
- **ManagerRegistry.jsx**: Formulários UBS e Médicos

#### Employee (Funcionário)
- **EmployeePOS.jsx**: PDV completo com busca, carrinho e checkout

#### UI (Interface)
- **Button.jsx**: Botão reutilizável (variantes: primary, secondary, danger, outline, blue, success)
- **Input.jsx**: Input reutilizável com label e error
- **Icons.jsx**: 17 ícones SVG customizados

### 🌐 Context

- **PharmacyContext.jsx**: 
  - Estado global (medicines, batches, doctors, ubsList, sales)
  - Lógica de negócio (addMedicine, updateStock, processSale)
  - Sistema de notificações toast

### 🎨 Estilos

- **globals.css**: Reset CSS, utilitários, animações
- ***.module.css**: CSS Modules isolados por componente

## 📊 Fluxo de Dados

```
PharmacyContext (Estado Global)
        ↓
    ┌───┴───┐
    │       │
Manager    Employee
Dashboard    POS
    │         │
┌───┼───┐     │
│   │   │     │
Met Inv Reg  Cart
rics ory try
```

## 🔄 Ciclo de Vida

### 1. Inicialização
```
app/layout.jsx → PharmacyProvider → app/page.jsx
```

### 2. Seleção de Perfil
```
AuthSelection → setRole() → Redirecionamento
```

### 3. Dashboard (Gerente/Admin)
```
/dashboard → DashboardLayout → ManagerDashboard → [Métricas | Inventário | Cadastros]
```

### 4. PDV (Funcionário)
```
/pos → DashboardLayout → EmployeePOS → [Busca | Carrinho | Checkout]
```

## 🎨 Sistema de Design

### Cores Principais
```css
Primary: #6366f1 (Indigo)
Secondary: #e5e7eb (Gray)
Success: #16a34a (Green)
Danger: #ef4444 (Red)
Blue: #2563eb (Blue)
```

### Tamanhos de Fonte
```css
xs: 0.75rem (12px)
sm: 0.875rem (14px)
base: 1rem (16px)
lg: 1.125rem (18px)
xl: 1.25rem (20px)
2xl: 1.5rem (24px)
```

### Espaçamentos
```css
1: 4px
2: 8px
3: 12px
4: 16px
6: 24px
8: 32px
```

### Border Radius
```css
sm: 4px
md: 6px
lg: 8px
xl: 12px
full: 9999px
```

## 🔐 Níveis de Acesso

| Perfil | Rota | Componentes Acessíveis |
|--------|------|------------------------|
| **Admin** | `/dashboard` | Todos + Configurações Admin |
| **Gerente** | `/dashboard` | Métricas, Inventário, Cadastros |
| **Funcionário** | `/pos` | PDV (Busca, Carrinho, Checkout) |

## 📱 Breakpoints Responsivos

```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (localhost:3000)
npm run build    # Build para produção
npm start        # Servir build de produção
npm run lint     # Verificar código
```

## 📦 Dependências

### Produção
- next: ^14.0.4
- react: ^18.2.0
- react-dom: ^18.2.0
- recharts: ^2.15.2
- date-fns: ^3.6.0

### Desenvolvimento
- eslint: ^8.55.0
- eslint-config-next: ^14.0.4

## 🔍 Principais Features

✅ Next.js 14 App Router
✅ JavaScript (ES6+)
✅ CSS Modules
✅ Context API
✅ Componentes reutilizáveis
✅ Responsivo
✅ Notificações toast
✅ Animações CSS
✅ Recharts para gráficos
✅ FEFO (First Expired First Out)
✅ Validação de estoque

---

**📅 Versão**: 1.0.0  
**🔧 Tecnologia**: Next.js 14 + React + CSS Modules  
**📝 Status**: Completo e funcional
