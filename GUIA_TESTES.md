# 🧪 GUIA DE TESTES - Como Testar Tudo

## 1️⃣ Preparação Inicial

```bash
# Navegar para backend
cd /workspaces/1/backend

# Rodar migração do Prisma
npx prisma migrate dev --name add_all_features

# Gerar cliente Prisma
npx prisma generate

# Instalar dependências (se não tiver)
npm install

# Iniciar servidor
npm start
```

**Esperado:** Terminal mostra `🚀 Server running on port 5000`

---

## 2️⃣ Testar Frontend

```bash
# Em outro terminal
cd /workspaces/1/frontend

# Instalar dependências (se não tiver)
npm install

# Iniciar frontend
npm start
```

**Esperado:** Abre em http://localhost:3000

---

## 3️⃣ Testar Endpoints com Postman/Insomnia

### Setup Postman

1. Abrir Postman
2. Criar nova coleção: "Leidy Cleaner API"
3. Adicionar variáveis:
   - `base_url`: `http://localhost:5000/api`
   - `cleanerId`: `seu-id-aqui` (use um ID real do banco)
   - `token`: `seu-token-aqui` (obter após login)

---

### ✅ Testar Endpoints de Bônus

#### 1. Verificar Bônus
```
POST http://localhost:5000/api/bonuses/{cleanerId}/check
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "message": "Parabéns! Você ganhou R$ 100 de bônus! 🎉",
  "bonus": {
    "id": "...",
    "amount": 100,
    "reason": "10_consecutive_five_stars"
  }
}
```

#### 2. Histórico de Bônus
```
GET http://localhost:5000/api/bonuses/{cleanerId}/history
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "bonuses": [
    {
      "id": "...",
      "amount": 100,
      "reason": "10_consecutive_five_stars",
      "status": "pending",
      "earnedAt": "2026-01-25T10:30:00Z"
    }
  ]
}
```

#### 3. Total de Bônus
```
GET http://localhost:5000/api/bonuses/{cleanerId}/total
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "totalEarned": 200,
  "formattedTotal": "R$ 200,00"
}
```

#### 4. Badge TOP CLEANER
```
GET http://localhost:5000/api/bonuses/cleaner/{cleanerId}/badge

Esperado:
{
  "success": true,
  "badge": {
    "active": true,
    "expiresAt": "2026-02-24T10:30:00Z",
    "daysRemaining": 30,
    "totalBonusEarned": 200
  }
}
```

---

### ✅ Testar Endpoints de Agendas

#### 1. Criar Agenda Fixa
```
POST http://localhost:5000/api/schedules/{cleanerId}/fixed
Headers: Authorization: Bearer {token}
Body:
{
  "weekDaysData": [
    {
      "dayOfWeek": 1,
      "isWorking": true,
      "timeSlots": [
        { "startTime": "08:00", "endTime": "12:00" },
        { "startTime": "14:00", "endTime": "18:00" }
      ]
    },
    {
      "dayOfWeek": 2,
      "isWorking": true,
      "timeSlots": [
        { "startTime": "08:00", "endTime": "17:00" }
      ]
    },
    {
      "dayOfWeek": 3,
      "isWorking": false,
      "timeSlots": []
    }
  ]
}

Esperado:
{
  "success": true,
  "message": "Agenda de turnos fixa criada/atualizada com sucesso!",
  "schedule": {
    "id": "...",
    "scheduleType": "fixed",
    "isActive": true
  }
}
```

#### 2. Adicionar Disponibilidade Flexível
```
POST http://localhost:5000/api/schedules/{cleanerId}/flexible
Headers: Authorization: Bearer {token}
Body:
{
  "date": "2026-02-15",
  "startTime": "08:00",
  "endTime": "18:00"
}

Esperado:
{
  "success": true,
  "message": "Disponibilidade adicionada com sucesso!",
  "availability": {
    "date": "2026-02-15",
    "startTime": "08:00",
    "endTime": "18:00"
  }
}
```

#### 3. Bloquear Período (Férias)
```
POST http://localhost:5000/api/schedules/{cleanerId}/block
Headers: Authorization: Bearer {token}
Body:
{
  "dateStart": "2026-02-01",
  "dateEnd": "2026-02-10",
  "reason": "férias"
}

Esperado:
{
  "success": true,
  "message": "10 dias bloqueados com sucesso!",
  "daysBlocked": 10,
  "reason": "férias"
}
```

#### 4. Obter Agenda Completa
```
GET http://localhost:5000/api/schedules/{cleanerId}
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "schedule": {
    "id": "...",
    "type": "fixed",
    "isActive": true,
    "weekDays": [
      {
        "dayOfWeek": 1,
        "isWorking": true,
        "timeSlots": [...]
      }
    ]
  }
}
```

#### 5. Horários Disponíveis em uma Data
```
GET http://localhost:5000/api/schedules/{cleanerId}/available?date=2026-02-15&duration=120
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "date": "2026-02-15",
  "slotDuration": "120 minutos",
  "availableSlots": [
    { "startTime": "08:00", "endTime": "10:00" },
    { "startTime": "10:00", "endTime": "12:00" },
    { "startTime": "14:00", "endTime": "16:00" },
    { "startTime": "16:00", "endTime": "18:00" }
  ]
}
```

---

### ✅ Testar Endpoints de Métricas

#### 1. Dashboard Atual
```
GET http://localhost:5000/api/metrics/{cleanerId}/current
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "dashboard": {
    "cleaner": {
      "id": "...",
      "name": "Maria Silva",
      "photo": "...",
      "rating": 4.9,
      "totalBookings": 45,
      "topCleanerBadge": true
    },
    "metrics": {
      "month": "1/2026",
      "totalCalls": 12,
      "acceptanceRate": "93.5%",
      "completionRate": "100%",
      "avgResponseTime": "2 min",
      "agilityScore": 9.8,
      "topPercentile": true
    },
    "bonuses": {
      "totalEarned": "R$ 200,00",
      "recentBonuses": [...]
    }
  }
}
```

#### 2. Histórico de Métricas
```
GET http://localhost:5000/api/metrics/{cleanerId}/history?months=6
Headers: Authorization: Bearer {token}

Esperado:
{
  "success": true,
  "history": [
    {
      "period": "1/2026",
      "agilityScore": 9.8,
      "acceptanceRate": "93.5%",
      "completionRate": "100%",
      "totalCalls": 12
    },
    {
      "period": "12/2025",
      "agilityScore": 9.2,
      "acceptanceRate": "90%",
      "completionRate": "98%",
      "totalCalls": 10
    }
  ]
}
```

#### 3. Top Cleaners
```
GET http://localhost:5000/api/metrics/top/cleaners?limit=10

Esperado:
{
  "success": true,
  "topCleaners": [
    {
      "position": 1,
      "cleaner": {
        "id": "...",
        "name": "Maria Silva",
        "photo": "...",
        "rating": 4.9,
        "topCleanerBadge": true
      },
      "metrics": {
        "agilityScore": 9.8,
        "acceptanceRate": "93.5%",
        "completionRate": "100%",
        "totalCalls": 12
      }
    }
  ]
}
```

---

## 4️⃣ Testar Frontend

### Fluxo de Faxineira

1. **Acessar http://localhost:3000**
   - Clique em "Cadastro"
   - Selecione "Faxineira"
   - Preencha:
     - Nome: "Maria Silva"
     - Email: "maria@email.com"
     - Telefone: "51 99999-9999"
     - CPF: "123.456.789-00"
     - Idade: "28"
     - Região: "Zona Norte"
     - Foto: (escolher uma)
     - PIX: "51 99999-9999"
     - Preço/hora: "75"
   - Clique em "Cadastrar"

2. **Dashboard da Faxineira**
   - Após login, clique em Dashboard
   - Devem aparecer:
     - ✅ Score de agilidade (0-10)
     - ✅ Taxa de aceitação (%)
     - ✅ Taxa de conclusão (%)
     - ✅ Ganhos em bônus
     - ✅ Badge TOP CLEANER (se tiver)
     - ✅ Histórico de bônus
     - ✅ Botões: Gerenciar Agenda, Editar Perfil, Atualizar

### Fluxo de Cliente

1. **Cadastro Cliente**
   - Selecione "Cliente"
   - Preencha dados básicos
   - Clique em "Cadastrar"

2. **Dashboard Cliente**
   - Deve aparecer menu com:
     - 🧹 Encontrar Faxineira
     - 📅 Meus Agendamentos
     - ⭐ Avaliações
     - 💬 Mensagens

---

## 5️⃣ Testar Fluxo Completo

### De Cliente

1. Login → Dashboard → Encontrar Faxineira
2. Buscar por região
3. Selecionar faxineira
4. Preencher agendamento (data, hora, endereço)
5. Ir para Checkout
6. Ver resumo + preço
7. Ir para Payment
8. Escolher método (Cartão, PIX, Boleto)
9. Preencher dados
10. Confirmar pagamento
11. Voltar ao Dashboard

### De Faxineira

1. Login → Dashboard
2. Ver métricas do mês
3. Clicar "Gerenciar Agenda"
4. Criar turnos fixos OU flexível
5. Bloquear períodos se necessário
6. Editar perfil (PIX/Banco)
7. Refrescar dashboard
8. Ver histórico de bônus

---

## 🐛 Troubleshooting

### Erro: "Conexão recusada no porto 5000"
```
Solução: Certifique-se que backend está rodando
cd /workspaces/1/backend && npm start
```

### Erro: "Migração falhou"
```
Solução: Deletar arquivo de migração e refazer
rm -rf backend/prisma/migrations/
npx prisma migrate dev --name add_all_features
```

### Erro: "Token inválido"
```
Solução: Fazer login novamente
Ou limpar localStorage: localStorage.clear()
```

### Erro: "CORS error"
```
Solução: Verificar CORS no server.js
Deve ter: cors({ origin: 'http://localhost:3000', credentials: true })
```

---

## ✅ Checklist de Testes

- [ ] Migração Prisma executada com sucesso
- [ ] Backend rodando na porta 5000
- [ ] Frontend rodando na porta 3000
- [ ] Endpoint /api/bonuses/{id}/check retorna 200
- [ ] Endpoint /api/schedules/{id} retorna 200
- [ ] Endpoint /api/metrics/{id}/current retorna 200
- [ ] Dashboard faxineira carrega com métricas
- [ ] Dashboard cliente carrega com menu
- [ ] Fluxo de cadastro funciona
- [ ] Fluxo de pagamento funciona
- [ ] Badges e scores aparecem corretamente

---

**Tudo testado e funcionando? Parabéns!** 🎉

Seu sistema está pronto para usar!
