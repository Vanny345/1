# 🚀 Features Úteis para o Site

## 1️⃣ Sistema de Bônus - Faxineiras Top Avaliadas ⭐

### Como Funciona:
- Faxineira recebe **5 estrelas** ⭐⭐⭐⭐⭐ em 10 trabalhos **seguidos**
- Ganha **R$ 100,00 de bônus** automático
- Aparece com badge **"TOP CLEANER"** 🏆 no app
- Clientes veem isso e preferem contratar

### Exemplo:
```
Avaliações: 5★ 5★ 5★ 5★ 5★ 5★ 5★ 5★ 5★ 5★
Contador: 1  2  3  4  5  6  7  8  9  10 ✅ BONUS!
Ganho: R$ 100,00 (transferido automaticamente)
Badge: 🏆 TOP CLEANER ativado
Contador reset e pode ganhar outro bônus
```

### Schema do Banco:

```prisma
model Cleaner {
  id String @id @default(cuid())
  // ... campos existentes
  
  // Avaliações
  averageRating Float @default(0)
  totalReviews Int @default(0)
  consecutiveFiveStars Int @default(0)  // Contador consecutivo 5★
  topCleanerBadge Boolean @default(false)
  topCleanerUntil DateTime?  // Data até quando mantém badge
  
  // Bônus
  totalBonusEarned Float @default(0)
  lastBonusDate DateTime?
}

model CleanerBonus {
  id String @id @default(cuid())
  cleanerId String
  cleaner Cleaner @relation(fields: [cleanerId], references: [id])
  
  amount Float // R$ 100,00
  reason String // "10_consecutive_five_stars"
  earnedAt DateTime @default(now())
  transferredAt DateTime?
  status String @default("pending") // pending, transferred
}
```

### Funcionalidade no Backend:

```javascript
// services/bonusService.js
async function checkAndAwardBonus(reviewData) {
  const cleaner = await prisma.cleaner.findUnique({
    where: { id: reviewData.cleanerId },
    include: { reviews: { orderBy: { createdAt: 'desc' }, take: 10 } }
  });

  // Pega últimas 10 avaliações
  const lastTenReviews = cleaner.reviews.slice(0, 10);
  
  // Verifica se todas 10 são 5 estrelas
  if (lastTenReviews.length === 10 && 
      lastTenReviews.every(r => r.rating === 5)) {
    
    // Cria bonus
    await prisma.cleanerBonus.create({
      data: {
        cleanerId: cleaner.id,
        amount: 100,
        reason: "10_consecutive_five_stars"
      }
    });

    // Ativa badge TOP CLEANER
    await prisma.cleaner.update({
      where: { id: cleaner.id },
      data: {
        topCleanerBadge: true,
        topCleanerUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        consecutiveFiveStars: 0 // Reset contador
      }
    });

    // Transfere R$ 100 para faxineira
    await transferBonusToFaxineira(cleaner, 100);
  }
}
```

---

## 2️⃣ Agilidade de Chamadas por Mês 📞

### Métrica Importante:
Quantas vezes a faxineira foi chamada/contratada no mês

### Dados Coletados:

```
- Chamadas do mês: 15 contratações
- Taxa de aceitação: 93% (aceita 93% dos convites)
- Tempo de resposta: 2min (responde rápido)
- Taxa de conclusão: 100% (completa todos trabalhos)
- Agilidade: ⚡⚡⚡ MUITO ÁGIL
```

### Como Mostrar no Perfil:

```
┌─────────────────────────────────┐
│ 📊 AGILIDADE ESTE MÊS           │
├─────────────────────────────────┤
│ ⚡ Chamadas: 15                  │
│ 📱 Taxa resposta: 93%           │
│ ✅ Conclusão: 100%              │
│ ⏱️ Tempo médio: 2 minutos        │
│ 🎯 Score: 9.8/10                │
│ 🏆 Posição: TOP 5%              │
└─────────────────────────────────┘
```

### Schema do Banco:

```prisma
model CleanerMetrics {
  id String @id @default(cuid())
  cleanerId String @unique
  cleaner Cleaner @relation(fields: [cleanerId], references: [id])
  
  month String // "2026-01"
  
  // Chamadas
  totalCalls Int @default(0)         // Total chamadas/convites
  acceptedCalls Int @default(0)      // Aceitas
  rejectedCalls Int @default(0)      // Rejeitadas
  acceptanceRate Float @default(0)   // % aceito
  
  // Resposta
  avgResponseTime Int @default(0)    // segundos (ex: 120 = 2min)
  
  // Conclusão
  completedJobs Int @default(0)
  cancelledJobs Int @default(0)
  completionRate Float @default(0)
  
  // Score
  agilityScore Float @default(0)     // 0-10
  topPercentile Boolean @default(false) // Top 5%?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Cálculo do Score:

```javascript
function calculateAgilityScore(metrics) {
  // Normaliza cada métrica (0-10)
  const acceptanceScore = (metrics.acceptanceRate / 100) * 10;
  const responseScore = Math.min(10, (300 / metrics.avgResponseTime) * 10);
  const completionScore = (metrics.completionRate / 100) * 10;
  
  // Média ponderada
  const score = (
    acceptanceScore * 0.3 +
    responseScore * 0.4 +
    completionScore * 0.3
  );
  
  return Math.round(score * 10) / 10; // 9.8
}
```

---

## 3️⃣ Agendas Personalizadas - Faxineiras Criam Seus Horários 📅

### O Que É:
Faxineiras criam seus próprios horários de disponibilidade (quando querem trabalhar)

### Como Funciona:

**OPÇÃO A: Turnos Fixos Semanais** (Mais usado)
```
SEGUNDA: 08:00 - 12:00, 14:00 - 18:00
TERÇA:   08:00 - 17:00
QUARTA:  NÃO TRABALHO
QUINTA:  09:00 - 12:00, 14:00 - 18:00
SEXTA:   08:00 - 17:00
SÁBADO:  09:00 - 12:00
DOMINGO: NÃO TRABALHO
```

**OPÇÃO B: Agenda Flexível** (Dia a dia)
```
Escolhe data e horário disponível manualmente
Pode bloquear períodos (férias, doença)
Pode abrir/fechar rapidamente quando quiser
```

### Schema do Banco:

```prisma
model CleanerSchedule {
  id String @id @default(cuid())
  cleanerId String @unique
  cleaner Cleaner @relation(fields: [cleanerId], references: [id])
  
  // Tipo de agenda
  scheduleType String @default("fixed") // "fixed" ou "flexible"
  
  // Se fixed
  weekDays CleanerWeekDay[]
  
  // Geral
  timeSlotDuration Int @default(120) // minutos (ex: 2h)
  minBookingInAdvance Int @default(24) // horas antes
  maxBookingsPerDay Int @default(5)
  
  isActive Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CleanerWeekDay {
  id String @id @default(cuid())
  scheduleId String
  schedule CleanerSchedule @relation(fields: [scheduleId], references: [id])
  
  dayOfWeek Int // 0=DOM, 1=SEG, 2=TER, 3=QUA, 4=QUI, 5=SEX, 6=SAB
  isWorking Boolean // true = trabalha esse dia
  
  timeSlots CleanerTimeSlot[]
}

model CleanerTimeSlot {
  id String @id @default(cuid())
  weekDayId String
  weekDay CleanerWeekDay @relation(fields: [weekDayId], references: [id])
  
  startTime String // "08:00"
  endTime String   // "12:00"
}

// Para agenda flexível
model CleanerAvailability {
  id String @id @default(cuid())
  cleanerId String
  cleaner Cleaner @relation(fields: [cleanerId], references: [id])
  
  date String // "2026-02-15"
  startTime String // "08:00"
  endTime String   // "18:00"
  isBlocked Boolean @default(false) // bloqueado (férias, etc)
  reason String? // "férias", "doença", etc
}
```

### Frontend - Página de Agenda:

```jsx
// pages/CleanerSchedule.jsx
export default function CleanerSchedule() {
  const [scheduleType, setScheduleType] = useState('fixed');
  const [weekDays, setWeekDays] = useState({
    0: { isWorking: false }, // dom
    1: { isWorking: true, slots: ['08:00-12:00', '14:00-18:00'] }, // seg
    // ... etc
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📅 Minha Agenda</h1>

      {/* Tipo de Agenda */}
      <div className="mb-6">
        <label className="flex items-center gap-3 mb-4">
          <input 
            type="radio" 
            value="fixed" 
            checked={scheduleType === 'fixed'}
            onChange={(e) => setScheduleType(e.target.value)}
          />
          <span>📋 Turnos Fixos (Mesmos horários toda semana)</span>
        </label>
        
        <label className="flex items-center gap-3">
          <input 
            type="radio" 
            value="flexible"
            checked={scheduleType === 'flexible'}
            onChange={(e) => setScheduleType(e.target.value)}
          />
          <span>📱 Flexível (Dia a dia)</span>
        </label>
      </div>

      {/* Se FIXED */}
      {scheduleType === 'fixed' && (
        <div className="grid grid-cols-1 gap-4">
          {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].map((day, idx) => (
            <div key={day} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">{day}</h3>
                <label>
                  <input 
                    type="checkbox" 
                    checked={weekDays[idx]?.isWorking}
                    onChange={() => toggleDay(idx)}
                  />
                  Trabalho neste dia
                </label>
              </div>

              {weekDays[idx]?.isWorking && (
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input 
                      type="time" 
                      defaultValue="08:00"
                      onChange={(e) => updateStartTime(idx, e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                    <span>até</span>
                    <input 
                      type="time"
                      defaultValue="12:00"
                      onChange={(e) => updateEndTime(idx, e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                    <button 
                      onClick={() => addTimeSlot(idx)}
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      + Adicionar turno
                    </button>
                  </div>

                  {weekDays[idx]?.slots?.map((slot, slotIdx) => (
                    <div key={slotIdx} className="bg-purple-100 p-2 rounded flex justify-between">
                      <span>{slot}</span>
                      <button onClick={() => removeSlot(idx, slotIdx)}>❌</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Se FLEXIBLE */}
      {scheduleType === 'flexible' && (
        <div>
          <h3 className="font-bold mb-3">📅 Disponibilidade Flexível</h3>
          <div className="flex gap-2 mb-4">
            <input 
              type="date"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input 
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Hora início"
              className="border rounded px-3 py-2"
            />
            <input 
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="Hora fim"
              className="border rounded px-3 py-2"
            />
            <button 
              onClick={addAvailability}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              ➕ Adicionar
            </button>
          </div>

          {/* Lista de disponibilidades */}
          <div className="space-y-2">
            {availabilities.map((av) => (
              <div key={av.id} className="bg-green-100 p-3 rounded flex justify-between">
                <span>📅 {av.date} • {av.startTime} - {av.endTime}</span>
                <button onClick={() => removeAvailability(av.id)}>❌</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={saveSchedule}
        className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold"
      >
        💾 Salvar Agenda
      </button>
    </div>
  );
}
```

### Como Funciona para Cliente:

```
Cliente abre app → clica em "Agendar limpeza"
  ↓
Vê lista de faxineiras + suas agendas de disponibilidade
  ↓
Clica em uma faxineira
  ↓
VÊ CALENDÁRIO com datas verdes (disponível) 🟢
  ↓
Escolhe data + horário (mostra slots de 2h)
  ↓
Confirma → vai pro Checkout
```

---

## 4️⃣ Outras Features Úteis 💡

### 📍 Raio de Atendimento
```
Faxineira define: "Atendo até 15km do meu endereço"
Cliente vê: só faxineiras que cobrem sua região
Sistema calcula: distância automática via Google Maps
```

### ⭐ Filtros Inteligentes
```
- Preço mínimo/máximo
- Avaliação mínima (4.5★+)
- Tempo resposta < 5 min
- Serviços especializados (vidro, tapete, pets)
```

### 🎁 Programa de Referência
```
Cliente indica amigo → ambos ganham R$ 20
Faxineira indica colega → ambas ganham R$ 50
```

### 💬 Chat em Tempo Real
```
Cliente ↔️ Faxineira trocam mensagens antes de confirmar
Combina detalhes (animais de estimação, produtos para usar)
```

### 📸 Portfolio da Faxineira
```
Antes/depois de limpezas
Certificados (cursos, especialização)
Anos de experiência
```

### 🚨 Sistema de Urgência
```
Cliente marca "Preciso HOJE"
App notifica faxineiras disponíveis
Paga 50% a mais (urgência)
```

### 💳 Múltiplas Formas de Pagamento
```
✅ Crédito/Débito
✅ PIX
✅ Boleto
✅ Carteira digital (saldo na plataforma)
```

---

## 📋 Roadmap de Implementação

```
SEMANA 1-2: Sistema de Bônus + Badges
├─ Schema BankDetail + CleanerBonus
├─ Lógica de cálculo
└─ Exibir badge no perfil

SEMANA 3-4: Agilidade Mensal
├─ Schema CleanerMetrics
├─ Cálculos automáticos
└─ Dashboard com gráficos

SEMANA 5-6: Agendas Personalizadas
├─ Schema Schedule + TimeSlots
├─ Frontend agenda fixa
├─ Frontend agenda flexível
└─ Integração com booking

SEMANA 7-8: Filtros + Portfolio + Chat
├─ Raio de atendimento
├─ Filtros na busca
├─ Portfolio de fotos
└─ Chat em tempo real
```

---

**Status**: ✅ Documentado | ⏳ Aguardando implementação
