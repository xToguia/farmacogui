# PharmaSys - Sistema de Gestão Farmacêutica

Sistema completo de gestão farmacêutica desenvolvido com **Next.js 14**, **JavaScript** e **CSS Modules** (sem Tailwind CSS).

## 🚀 Funcionalidades

### 🔐 Três Níveis de Acesso

1. **Administrador** - Acesso total ao sistema
2. **Gerente** - Gestão de estoque, métricas e cadastros
3. **Funcionário** - PDV (Ponto de Venda)

### 📊 Dashboard do Gerente

- **Métricas Visuais** (Recharts)
  - Medicamentos mais vendidos
  - Médicos que mais receitaram
  - Receitas por UBS
  
- **Gerenciamento de Medicamentos**
  - Cadastro com verificação de duplicidade
  - Controle inteligente de lotes por validade
  - Indicadores de estoque baixo
  - Busca por nome/categoria

- **Cadastros**
  - UBS (Unidades Básicas de Saúde)
  - Médicos parceiros

### 💰 PDV (Ponto de Venda)

- Busca rápida de medicamentos
- Carrinho de compras interativo
- Opção de entrega
- Saída automática FEFO (First Expired, First Out)
- Validação de estoque em tempo real

## 🧠 Lógica de Negócio

### Cadastro de Medicamentos
1. Verifica se medicamento já existe (por nome)
2. Se existe: adiciona ao estoque existente
3. Se não existe: cria novo medicamento

### Controle de Lotes
1. Compara data de validade ao adicionar estoque
2. Se validade igual: adiciona ao lote existente
3. Se validade diferente: cria novo lote

### Saída de Estoque (FEFO)
1. Prioriza lotes com vencimento mais próximo
2. Pode usar múltiplos lotes em uma única venda
3. Atualiza automaticamente o inventário

## 📁 Estrutura do Projeto

```
nextjs-project/
├── app/
│   ├── layout.jsx           # Layout principal
│   ├── page.jsx             # Página inicial (seleção de perfil)
│   ├── dashboard/
│   │   └── page.jsx         # Dashboard Gerente/Admin
│   └── pos/
│       └── page.jsx         # PDV Funcionário
├── components/
│   ├── auth/
│   │   ├── AuthSelection.jsx
│   │   └── AuthSelection.module.css
│   ├── shared/
│   │   ├── DashboardLayout.jsx
│   │   └── DashboardLayout.module.css
│   ├── manager/
│   │   ├── ManagerDashboard.jsx
│   │   ├── ManagerMetrics.jsx
│   │   ├── ManagerInventory.jsx
│   │   ├── ManagerRegistry.jsx
│   │   └── *.module.css
│   ├── employee/
│   │   ├── EmployeePOS.jsx
│   │   └── EmployeePOS.module.css
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       └── *.module.css
├── context/
│   └── PharmacyContext.jsx  # Context API com toda lógica
├── styles/
│   └── globals.css          # Estilos globais
├── package.json
└── next.config.js
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm, yarn ou pnpm

### Passos

1. **Navegue até a pasta do projeto**
   ```bash
   cd nextjs-project
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

## 📦 Dependências Principais

```json
{
  "next": "^14.0.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "recharts": "^2.15.2",
  "date-fns": "^3.6.0"
}
```

## 🎨 Características Técnicas

- ✅ **Next.js 14** com App Router
- ✅ **JavaScript** puro (sem TypeScript)
- ✅ **CSS Modules** para estilos isolados
- ✅ **Context API** para gerenciamento de estado
- ✅ **Recharts** para gráficos e visualizações
- ✅ **Componentes reutilizáveis** (Button, Input)
- ✅ **Layout responsivo** (mobile-first)
- ✅ **Notificações toast** personalizadas
- ✅ **Animações CSS** suaves

## 🔄 Fluxo de Uso

### Como Gerente/Admin

1. Selecione "Gerente" ou "Administrador" na tela inicial
2. Acesse as abas:
   - **Métricas**: visualize gráficos de vendas
   - **Medicamentos**: cadastre e gerencie estoque
   - **Cadastros**: adicione UBS e médicos

### Como Funcionário

1. Selecione "Funcionário" na tela inicial
2. Busque medicamentos
3. Adicione ao carrinho
4. Finalize o pedido
5. Opção: marcar como entrega

## 🚀 Build para Produção

```bash
npm run build
npm start
```

## 📝 Notas Importantes

- Dados são armazenados em memória (Context API)
- Para persistência real, integre com backend/database
- Sistema usa dados mock para demonstração
- FEFO (First Expired First Out) implementado
- Validações de estoque em tempo real

## 🔐 Perfis de Acesso

| Perfil | Acesso |
|--------|--------|
| **Administrador** | Dashboard completo + configurações |
| **Gerente** | Dashboard completo (métricas, estoque, cadastros) |
| **Funcionário** | PDV (Ponto de Venda) |

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🎯 Próximos Passos (Sugestões)

- [ ] Integração com backend (API REST ou GraphQL)
- [ ] Banco de dados (PostgreSQL, MongoDB, etc.)
- [ ] Autenticação real (JWT, NextAuth)
- [ ] Relatórios em PDF
- [ ] Sistema de impressão de receitas
- [ ] Controle de permissões granular
- [ ] Dashboard de analytics avançado
- [ ] Notificações por email/SMS

## 📄 Licença

Este projeto é fornecido como exemplo educacional.

---

**Desenvolvido com ❤️ usando Next.js, React e CSS**
