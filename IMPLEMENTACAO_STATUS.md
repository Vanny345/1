# 🔧 Implementação de Features - Status e Plano

## ✅ O QUE JÁ ESTÁ IMPLEMENTADO

### Frontend (React)
- ✅ Login page com validação
- ✅ Register page com foto e dual-mode (cliente/faxineira)
- ✅ Cleaners page com cards, foto, rating, badge
- ✅ Checkout page com preço breakdown
- ✅ Payment page com 3 métodos (Cartão, PIX, Boleto)
- ✅ Dashboard básico
- ✅ Routing e proteção de rotas

### Backend (Node.js/Express)
- ✅ Prisma schema completo
- ✅ Auth controller (register, login)
- ✅ Auth middleware com JWT
- ✅ Services: email, payment, storage, geolocation
- ✅ Routes: auth, bookings, cleaners, payments, users
- ✅ Database models para BankDetail, Payment, Booking, Review

### Documentação
- ✅ 8 arquivos de documentação criados
- ✅ SISTEMA_PAGAMENTO.md com arquitetura completa
- ✅ CONFIGURACAO_EMPRESA.md com dados reais

---

## ❌ O QUE AINDA FALTA (CRÍTICO)

### 1. **Schema Prisma - FEATURES NOVAS NÃO IMPLEMENTADAS**
```
❌ CleanerBonus (para R$ 100 de bônus)
❌ CleanerMetrics (agilidade mensal)
❌ CleanerSchedule EXPANDIDA (turnos fixos + flexível)
❌ CleanerAvailability (para agenda flexível)
❌ Campos em Cleaner (consecutiveFiveStars, topCleanerBadge, totalBonusEarned)
```

### 2. **Backend - ENDPOINTS FALTANDO**
```
❌ POST /api/cleaners/:id/schedule - criar agenda
❌ GET /api/cleaners/:id/schedule - ver agenda
❌ PUT /api/cleaners/:id/schedule - editar agenda
❌ POST /api/cleaners/:id/bank-details - registrar PIX/Banco
❌ GET /api/cleaners/:id/metrics - métricas do mês
❌ POST /api/payments/transfer - transferir dinheiro para faxineira
❌ POST /api/bonus/check - verificar e dar bônus
❌ GET /api/admin/dashboard - dashboard admin
```

### 3. **Frontend - PÁGINAS NOVAS FALTANDO**
```
❌ CleanerSchedule.jsx - página de agenda (turnos fixos/flexível)
❌ CleanerProfile.jsx - perfil da faxineira (editar dados, PIX, agenda)
❌ Dashboard EXPANDIDO - mostrar agilidade, bônus, agendamentos
❌ AdminDashboard.jsx - painel admin (pagamentos, usuarios, etc)
```

### 4. **Lógica de Negócio NÃO IMPLEMENTADA**
```
❌ Cálculo automático de bônus (10 avaliações 5★)
❌ Transferência automática de R$ 100 quando ganha bônus
❌ Cálculo de agilidade mensal (respostas, conclusões, etc)
❌ Integração real com Stripe (API keys)
❌ Integração real com MercadoPago
❌ Email real com SendGrid
❌ WhatsApp real com Twilio
```

---

## 🔴 PROBLEMAS ENCONTRADOS (SEMI-ERROS)

### 1. **Register.jsx - Não salva banco/PIX**
**Problema:** Quando faxineira se registra, não consegue informar PIX ou dados bancários
```jsx
// Linha 50-70: Falta capturar dados de PIX/Banco
// Falta: pixKey, bankCode, accountNumber, hourlyRate
```
**Solução:** Adicionar campos de PIX/Banco na hora do registro

### 2. **Cleaners.jsx - Não carrega dados do banco**
**Problema:** Usa dados mockados, não busca do backend
```jsx
// Linha 30-40: Mock data ao invés de API real
const cleanersData = [
  { id: 1, name: 'Maria', rating: 4.9 } // ❌ HARDCODED
]
```
**Solução:** Implementar API real em `cleanerService.getCleaners()`

### 3. **Payment.jsx - Integração com Stripe não está pronta**
**Problema:** Usa mock com `setTimeout(2000)`, não chama Stripe de verdade
```jsx
// Linha 80-85: Simula pagamento, não processa
await new Promise(resolve => setTimeout(resolve, 2000)); // ❌ FAKE
```
**Solução:** Integrar com `stripe.payments.confirmCardPayment()`

### 4. **Dashboard.jsx - Muito básico**
**Problema:** Não mostra agendamentos, histórico, agilidade, bônus
```jsx
// Provavelmente tem só "Bem-vindo Maria"
```
**Solução:** Criar dashboard real com widgets

### 5. **API Service - Endpoints não implementados**
**Problema:** `frontend/src/services/api.js` chama endpoints que não existem
```javascript
// Ex: cleanerService.getCleaners() ❌ endpoint não existe
// Ex: bookingService.create() ❌ endpoint não existe
```
**Solução:** Implementar rotas no backend

### 6. **Console.logs e error handling básico**
**Problema:** Muitos `console.error()` em production
```javascript
// Não tem logger real, logging é muito básico
```
**Solução:** Usar logger (winston ou pino)

### 7. **Validação de email/CPF fraca**
**Problema:** Não valida formato de CPF/email na backend
```javascript
// authController.js: aceita qualquer email/CPF
```
**Solução:** Adicionar validação com regex/libs

### 8. **Sem proteção contra duplicatas**
**Problema:** Banco tem `@unique` mas código não trata erro bem
```javascript
// Se CPF já existe, retorna erro genérico
```
**Solução:** Catch específico para violação de unique

---

## 🎯 PLANO DE AÇÃO (PRIORIDADE)

### FASE 1: Expandir Schema + Features Básicas (2h)
- [ ] Adicionar CleanerBonus, CleanerMetrics em schema
- [ ] Expandir CleanerSchedule para fixa+flexível
- [ ] Expandir Cleaner model com campos novos

### FASE 2: Backend Endpoints (3h)
- [ ] POST /api/cleaners/:id/bank-details
- [ ] POST/GET /api/cleaners/:id/schedule
- [ ] GET /api/cleaners/:id/metrics
- [ ] POST /api/payments/transfer
- [ ] POST /api/bonus/check

### FASE 3: Frontend Melhorias (3h)
- [ ] Update Register.jsx com PIX/Banco
- [ ] CleanerProfile.jsx page
- [ ] CleanerSchedule.jsx page
- [ ] Update Dashboard.jsx com métricas

### FASE 4: Lógica de Negócio (2h)
- [ ] Implementar cálculo de bônus
- [ ] Implementar cálculo de agilidade
- [ ] Implementar transferência automática

### FASE 5: Integração Real (2h)
- [ ] Integrar Stripe de verdade
- [ ] Integrar MercadoPago de verdade
- [ ] Email real com SendGrid

---

## 📋 ERROS PARA CORRIGIR AGORA

1. ✅ **Register não salva PIX/Banco** → Adicionar campos
2. ✅ **Cleaners não carrega do banco** → API real
3. ✅ **Payment é mock** → Stripe real depois
4. ✅ **Dashboard muito básico** → Expandir
5. ✅ **console.logs demais** → Remover ou usar logger
6. ✅ **Validação fraca** → Adicionar validators
7. ✅ **Sem tratamento de erros duplicata** → Catch específico
8. ✅ **API service endpoints não existem** → Implementar backend

**Vou começar pela Fase 1 agora!** 🚀
