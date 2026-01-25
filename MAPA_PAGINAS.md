# 📄 Mapa de Páginas - Leidy Cleaner v2.0

## Estrutura de Navegação

```
┌─ Login (/login)
│  ├─ Seleção: Cliente ou Faxineira
│  ├─ Email + Senha
│  └─ Link: "Não tem conta? Cadastre-se"
│
├─ Registro (/register)
│  ├─ Campo: Tipo de Usuário (Cliente/Faxineira)
│  ├─ Campos Comuns:
│  │  ├─ Email
│  │  ├─ Senha
│  │  ├─ Confirmação de Senha
│  │  ├─ Nome
│  │  └─ Telefone
│  ├─ Campos Faxineira:
│  │  ├─ CPF
│  │  ├─ Idade
│  │  ├─ Região
│  │  └─ Foto (upload com preview)
│  └─ Botão: "Criar Conta"
│
├─ Dashboard (/dashboard) [Protegido]
│  ├─ Resumo de Agendamentos
│  ├─ Histórico
│  ├─ Perfil do Usuário
│  └─ Navegação para Buscar Faxineiras
│
├─ Faxineiras (/cleaners) [Protegido]
│  ├─ Filtro por Região
│  ├─ Grid de Cards (3 colunas)
│  │  ├─ Foto em destaque (h-56)
│  │  ├─ Nome
│  │  ├─ Rating (5 estrelas)
│  │  ├─ Avaliações
│  │  ├─ Região
│  │  ├─ Agendamentos
│  │  ├─ Bio
│  │  ├─ Preço estimado (R$ 150,00)
│  │  └─ Botão: "Agendar Agora"
│  │
│  └─ Modal de Agendamento
│     ├─ Data
│     ├─ Horário (Início - Fim)
│     ├─ Endereço
│     ├─ Tipo de Limpeza
│     ├─ Observações
│     └─ Botão: "Confirmar Agendamento" → /checkout
│
├─ Checkout (/checkout) [Protegido]
│  ├─ Coluna 1-2: Informações
│  │  ├─ Card da Faxineira:
│  │  │  ├─ Foto circular
│  │  │  ├─ Nome
│  │  │  ├─ Rating
│  │  │  └─ Verificado ✓
│  │  │
│  │  └─ Detalhes do Agendamento:
│  │     ├─ Data (formatada)
│  │     ├─ Horário
│  │     ├─ Local
│  │     ├─ Tipo de Serviço
│  │     └─ Observações
│  │
│  └─ Coluna 3: Resumo (Sticky)
│     ├─ Serviço: R$ 120,00
│     ├─ Taxa: R$ 12,00
│     ├─ Impostos: R$ 18,00
│     ├─ TOTAL: R$ 150,00
│     └─ Botão: "Ir para Pagamento" → /payment/:bookingId
│
└─ Pagamento (/payment/:bookingId) [Protegido]
   ├─ Etapa 1: Seleção de Método
   │  ├─ Card: Cartão de Crédito
   │  │  ├─ Ícone 💳
   │  │  ├─ Descrição: "Visa, Mastercard, Elo"
   │  │  └─ Seleção: Radio button
   │  │
   │  ├─ PIX: Transferência Instantânea
   │  │  ├─ Ícone 💚
   │  │  ├─ Descrição: "Transferência instantânea"
   │  │  └─ Seleção: Radio button
   │  │
   │  ├─ Boleto: Boleto Bancário
   │  │  ├─ Ícone 📋
   │  │  ├─ Descrição: "Pagar no banco ou online"
   │  │  └─ Seleção: Radio button
   │  │
   │  └─ Botão: "Continuar"
   │
   ├─ Etapa 2: Preenchimento de Dados
   │  │
   │  ├─ Se Cartão:
   │  │  ├─ Campo: Número (auto-formata)
   │  │  ├─ Campo: Nome do Titular
   │  │  ├─ Campo: Vencimento MM/YY (auto-formata)
   │  │  ├─ Campo: CVV (3 dígitos)
   │  │  ├─ Botão: "Voltar"
   │  │  └─ Botão: "Confirmar Pagamento"
   │  │
   │  ├─ Se PIX:
   │  │  ├─ Texto: Chave PIX copiável
   │  │  ├─ Botão: "Copiar Chave"
   │  │  ├─ Placeholder: QR Code
   │  │  ├─ Botão: "Voltar"
   │  │  └─ Botão: "Confirmar Pagamento"
   │  │
   │  └─ Se Boleto:
   │     ├─ Texto: Código de Barras
   │     ├─ Botão: "Copiar Código"
   │     ├─ Info: Vencimento, Valor, Onde pagar
   │     ├─ Info: Aviso de SMS
   │     ├─ Botão: "Voltar"
   │     └─ Botão: "Confirmar Pagamento"
   │
   ├─ Etapa 3: Confirmação
   │  ├─ Ícone: Check ✓ (verde)
   │  ├─ Título: "Pagamento Confirmado!"
   │  ├─ Mensagem: Confirmação com nome da faxineira
   │  ├─ ID de Referência
   │  ├─ Valor Pago
   │  └─ Auto-redireciona para /dashboard em 3s
   │
   └─ Sidebar (Sticky) - Em Todas as Etapas
      ├─ Card da Faxineira:
      │  ├─ Foto
      │  ├─ Nome
      │  └─ Rating 5 ⭐
      │
      ├─ Detalhes do Agendamento:
      │  ├─ 📅 Data
      │  ├─ ⏰ Horário
      │  └─ 📍 Endereço
      │
      ├─ Resumo de Preços:
      │  ├─ Serviço: R$ 120,00
      │  ├─ Taxa: R$ 12,00
      │  ├─ Imposto: R$ 18,00
      │  └─ TOTAL: R$ 150,00
      │
      └─ Badge: 🔒 Seguro
```

---

## 📊 Páginas por Status

| Página | Rota | Status | Protegida | Descrição |
|--------|------|--------|-----------|-----------|
| Login | `/login` | ✅ Completa | ❌ | Autenticação com email/senha |
| Registro | `/register` | ✅ Completa | ❌ | Cadastro duplo (cliente/faxineira) com foto |
| Dashboard | `/dashboard` | ⏳ Parcial | ✅ | Painel do usuário |
| Faxineiras | `/cleaners` | ✅ Completa | ✅ | Listagem com fotos e filtros |
| Checkout | `/checkout` | ✅ Completa | ✅ | Resumo antes de pagar |
| Pagamento | `/payment/:bookingId` | ✅ Completa | ✅ | 3 métodos de pagamento |
| Admin | `/admin` | ❌ Não | ✅ | Em desenvolvimento |

---

## 🎨 Componentes por Página

### Login.jsx (106 linhas)
```
✅ Completo
- Seleção de tipo de usuário
- Inputs email/senha
- Validação básica
- Link para registro
- Notificações toast
```

### Register.jsx (200+ linhas)
```
✅ Completo
- Dual mode (Cliente/Faxineira)
- Upload de foto com preview
- Validação de senha
- Campos condicionais (CPF, Idade, Região)
- Integração com authStore
- Notificações toast
```

### Dashboard.jsx (ℹ️ Parcial)
```
⏳ Estrutura básica pronta
- Informações do usuário
- Agendamentos próximos
- Histórico
- Navegação para faxineiras
```

### Cleaners.jsx (242 linhas)
```
✅ Completo (v2)
- Cards melhorados com fotos
- Rating visual
- Filtro por região
- Modal de agendamento
- Auto-formatação de campos
- Redirecionamento para checkout
```

### Checkout.jsx (200+ linhas)
```
✅ Completo
- Resumo da faxineira
- Detalhes do agendamento
- Breakdown de preços
- Sidebar sticky
- Responsividade
- Botão para pagamento
```

### Payment.jsx (450+ linhas)
```
✅ Completo (v2 melhorado)
- 3 etapas de fluxo
- 3 métodos de pagamento
- Validação de dados
- Auto-formatação de campos
- Sidebar com resumo
- Tela de sucesso
- Redirecionamento automático
```

---

## 🔗 Fluxo de Navegação

```
Visitante
    ↓
    ├─→ Login (Voltar? Cadastrar em /register)
    │    ↓
    │    Dashboard (Protegido)
    │
    └─→ Registro (/register)
         ├─ Cliente
         └─ Faxineira (com foto)
            ↓
            Automático → Login → Dashboard

Usuário Autenticado
    ↓
    Dashboard
    ├─→ Ir para Faxineiras
    │    ↓
    │    Cleaners
    │    ├─ Filtrar por região
    │    ├─ Ver foto + avaliações
    │    ├─ Clicar "Agendar Agora"
    │    │    ↓
    │    │    Modal de Agendamento
    │    │    ├─ Data
    │    │    ├─ Horário
    │    │    ├─ Endereço
    │    │    ├─ Tipo de limpeza
    │    │    └─ Confirmar → Checkout
    │    │
    │    └─ Checkout
    │         ├─ Ver resumo completo
    │         ├─ Ver foto da faxineira
    │         └─ Ir para Pagamento
    │              ↓
    │              Payment (/payment/:id)
    │              ├─ Etapa 1: Escolher método
    │              ├─ Etapa 2: Preencher dados
    │              ├─ Etapa 3: Sucesso
    │              └─ Auto-redireciona → Dashboard
    │
    └─→ Meu Perfil (Futura)
    └─→ Histórico (Futura)
```

---

## 📱 Responsividade por Página

### Login
- ✅ Mobile: 1 coluna, centralizado
- ✅ Tablet: Mesmo
- ✅ Desktop: Mesmo, max-width 448px

### Register
- ✅ Mobile: 1 coluna full
- ✅ Tablet: 2 colunas para campos
- ✅ Desktop: Centralizado max-width

### Cleaners
- ✅ Mobile: 1 coluna (grid-cols-1)
- ✅ Tablet: 2 colunas (md:grid-cols-2)
- ✅ Desktop: 3 colunas (lg:grid-cols-3)

### Checkout
- ✅ Mobile: Stack vertical (1 col)
- ✅ Tablet: Stack vertical com sidebar
- ✅ Desktop: 2 cols + sidebar sticky (lg:grid-cols-3)

### Payment
- ✅ Mobile: Stack vertical (1 col)
- ✅ Tablet: Stack vertical com sidebar
- ✅ Desktop: 2 cols + sidebar sticky (lg:grid-cols-3)

---

## 🎯 Próximas Páginas a Implementar

### 1. Dashboard Melhorado
- [ ] Agendamentos próximos
- [ ] Histórico completo
- [ ] Avaliações recebidas
- [ ] Dados de pagamento
- [ ] Botão editar perfil

### 2. Perfil do Usuário
- [ ] Editar dados pessoais
- [ ] Atualizar foto
- [ ] Alterar senha
- [ ] Endereços salvos
- [ ] Métodos de pagamento

### 3. Avaliações
- [ ] Formulário de review
- [ ] Star rating
- [ ] Comentário
- [ ] Foto do serviço
- [ ] Confirmar conclusão

### 4. Suporte
- [ ] Formulário de contato
- [ ] Chat em tempo real
- [ ] FAQ
- [ ] Tickets de suporte
- [ ] Histórico de conversas

### 5. Admin
- [ ] Dashboard de stats
- [ ] Gerenciar usuários
- [ ] Gerenciar faxineiras
- [ ] Verificação de documentos
- [ ] Relatórios

---

## 🔐 Autenticação e Proteção

### Rotas Públicas
- `GET /` → Redireciona para login
- `GET /login` → Login
- `GET /register` → Registro

### Rotas Protegidas (Requerem Token)
- `GET /dashboard` → Dashboard
- `GET /cleaners` → Listagem de faxineiras
- `GET /checkout` → Resumo de agendamento
- `GET /payment/:id` → Pagamento

### Validação no Componente
```jsx
const ProtectedRoute = ({ token }) => {
  if (!token) return <Navigate to="/login" />
  return <YourComponent />
}
```

---

## 🚨 Considerar Implementar

1. **Error Boundary** - Para capturar erros
2. **Loading Skeleton** - Enquanto carrega dados
3. **Toast Notifications** - Para feedback do usuário ✅
4. **Modals** - Para confirmações ✅
5. **Search/Filtro Avançado** - Melhorar busca de faxineiras
6. **Favoritos** - Salvar faxineiras preferidas
7. **Histórico de Busca** - Recentes
8. **Notificações em Tempo Real** - WebSocket

---

## ✨ Melhorias Visuais Aplicadas

- [x] Cards com fotos em destaque
- [x] Gradientes roxo-rosa
- [x] Sombras e transições suaves
- [x] Ícones informativos
- [x] Badge de verificação
- [x] Stars de rating
- [x] Sidebars sticky
- [x] Botões com hover effects
- [x] Inputs com validação visual

---

**Versão Atual:** 2.0  
**Data:** Janeiro 2026  
**Status:** ✅ Produção-Ready  
**Próxima:** v2.1 (Dashboard completo)
