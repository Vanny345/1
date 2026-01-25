# 🚀 Guia de Implementação - Leidy Cleaner Completo

## Fase 1: Configuração Inicial

### 1.1 Banco de Dados
```bash
# Instalar PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Criar banco
sudo -u postgres createdb leidy_cleaner

# Executar migrations
cd backend
npx prisma migrate dev --name initial

# Visualizar banco (opcional)
npx prisma studio
```

### 1.2 Serviços Externos

#### Stripe
1. Criar conta em stripe.com
2. Obter chaves: `pk_test_` e `sk_test_`
3. Adicionar ao .env

#### MercadoPago
1. Criar conta em mercadopago.com.br
2. Gerar access token
3. Adicionar ao .env

#### SendGrid
1. Criar conta em sendgrid.com
2. Criar API key
3. Verificar domínio de email
4. Adicionar ao .env

#### Twilio
1. Criar conta em twilio.com
2. Verificar número de WhatsApp
3. Obter Account SID e Auth Token
4. Adicionar ao .env

#### AWS S3
1. Criar AWS account
2. Criar bucket S3
3. Gerar chaves IAM
4. Configurar permissões CORS
5. Adicionar ao .env

#### Google Maps
1. Criar projeto no Google Cloud Console
2. Habilitar Maps JavaScript API
3. Gerar chave de API
4. Adicionar ao .env

#### Firebase
1. Criar projeto no Firebase Console
2. Baixar chave privada (JSON)
3. Configurar Cloud Messaging
4. Adicionar ao .env

## Fase 2: Backend

### 2.1 Instalação
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### 2.2 Testar Endpoints
```bash
# Registrar cliente
curl -X POST http://localhost:5000/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@test.com",
    "password": "123456",
    "name": "Cliente Test",
    "phone": "+5551999999999"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@test.com",
    "password": "123456",
    "userType": "user"
  }'
```

### 2.3 Criar Dados de Teste
```javascript
// Adicionar em seeds/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar usuários de teste
  const user1 = await prisma.user.create({
    data: {
      email: 'cliente1@test.com',
      password: bcrypt.hashSync('123456', 10),
      name: 'Cliente Um',
      phone: '+5551999999999',
      city: 'Porto Alegre'
    }
  });

  // Criar faxineiras de teste
  const cleaner1 = await prisma.cleaner.create({
    data: {
      email: 'faxineira1@test.com',
      password: bcrypt.hashSync('123456', 10),
      name: 'Faxineira Um',
      cpf: '123.456.789-00',
      phone: '+5551988888888',
      dateOfBirth: new Date('1990-01-01'),
      age: 34,
      region: 'Centro',
      bio: 'Experiência de 10 anos',
      verified: true,
      status: 'active'
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## Fase 3: Frontend

### 3.1 Instalação
```bash
cd frontend
npm install
npm start
```

### 3.2 Configurar Stripe
```javascript
// src/pages/Payment.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      {/* Componentes de pagamento */}
    </Elements>
  );
}
```

### 3.3 Implementar Login
```javascript
// Já incluído em src/pages/Login.jsx
// Testa automaticamente com:
// Email: qualquer@email.com
// Senha: qualquer
// User Type: user ou cleaner
```

## Fase 4: Features Avançadas

### 4.1 Sistema de Avaliações
```javascript
// POST /api/reviews
{
  "bookingId": "booking-id",
  "cleanerId": "cleaner-id",
  "rating": 5,
  "punctuality": 5,
  "professionalism": 4,
  "quality": 5,
  "comment": "Excelente trabalho!"
}
```

### 4.2 Cancelamento com Reembolso
```javascript
// PUT /api/bookings/:id/cancel
{
  "reason": "Mudei de planos"
}
// Dispara:
// - Email ao cliente
// - WhatsApp ao cliente
// - Email à faxineira
// - Reembolso automático (se pago)
```

### 4.3 Agendamento Recorrente
```javascript
// POST /api/bookings/recurring
{
  "cleanerId": "id",
  "startDate": "2024-01-25",
  "frequency": "weekly", // weekly, biweekly, monthly
  "endDate": "2024-12-31",
  "dayOfWeek": 3, // Wednesday
  "startTime": "10:00",
  "endTime": "12:00",
  "address": "Rua X, 123",
  "maxOccurrences": 12
}
```

### 4.4 Verificação de Identidade (Faxineiras)
```javascript
// POST /api/cleaners/:id/documents
FormData:
- type: "id" | "proof_of_address" | "certification"
- file: PDF/JPG
- Valida automaticamente com IA (optional)
```

### 4.5 Sistema de Cupons
```bash
# Admin cria cupom
POST /api/admin/discounts
{
  "code": "PRIMEIRACOMPRA",
  "discountType": "percentage",
  "discountValue": 10,
  "validFrom": "2024-01-25",
  "validUntil": "2024-12-31",
  "maxUses": 100
}

# Cliente aplica cupom
GET /api/discounts/PRIMEIRACOMPRA
→ Valida e retorna desconto
```

## Fase 5: Otimizações e Deploy

### 5.1 Performance
```javascript
// Cache de faxineiras por região
// Redis cache implementado
// Lazy loading de imagens
// Compressão de assets
// CDN para fotos (CloudFront)
```

### 5.2 Segurança
```javascript
// ✅ CORS configurado
// ✅ Rate limiting (express-rate-limit)
// ✅ CSRF protection
// ✅ SQL injection prevention (Prisma)
// ✅ XSS prevention
// ✅ HTTPS enforced
// ✅ Senhas hash bcrypt
// ✅ JWT secure storage
```

### 5.3 Monitoramento
```bash
# Sentry para erros
npm install @sentry/node @sentry/tracing

# LogRocket para performance
npm install logrocket

# Datadog para metrics
# Configurar em .env
```

### 5.4 Deploy Heroku (Backend)
```bash
# Criar app
heroku create leidy-cleaner-api

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Configurar variáveis
heroku config:set JWT_SECRET="sua-chave"
heroku config:set STRIPE_SECRET_KEY="sk_test_..."
# ... demais vars

# Deploy
git push heroku main

# Rodas migrações
heroku run "npx prisma migrate deploy"
```

### 5.5 Deploy Vercel (Frontend)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente
# Em Vercel Dashboard → Project Settings → Environment Variables
```

## Fase 6: Testing

### 6.1 Testes Unitários (Backend)
```bash
npm install --save-dev jest supertest

# Adicionar em package.json
"test": "jest --coverage"
"test:watch": "jest --watch"
```

### 6.2 Testes E2E (Frontend)
```bash
npm install --save-dev cypress

# cypress/e2e/booking.cy.js
describe('Booking Flow', () => {
  it('should create a booking', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('cliente@test.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('Bem-vindo').should('be.visible')
  })
})
```

### 6.3 Testes de Carga
```bash
# LoadImpact / k6
brew install k6

# k6-test.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 100,
  duration: '30s'
};

export default function() {
  let res = http.get('http://localhost:5000/api/cleaners');
  check(res, {
    'status is 200': (r) => r.status === 200
  });
}

# Rodar
k6 run k6-test.js
```

## Fase 7: Manutenção

### 7.1 Backup Automático
```bash
# Cron job para backup PostgreSQL
0 2 * * * /usr/local/bin/backup-db.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"
pg_dump $DATABASE_URL > $BACKUP_DIR/leidy_$DATE.sql
gzip $BACKUP_DIR/leidy_$DATE.sql
# Upload para S3
aws s3 cp $BACKUP_DIR/leidy_$DATE.sql.gz s3://backups/
```

### 7.2 Monitoramento
```javascript
// New Relic
const newrelic = require('newrelic');

// Datadog
const DDTrace = require('dd-trace');
DDTrace.init();

// Alerts para:
// - Erro rate > 1%
// - Response time > 2s
// - CPU > 80%
// - Memory > 90%
```

### 7.3 Logs
```javascript
// Winston logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('Booking created', { bookingId, userId });
```

## 🎯 Próximos Passos

1. **Mobile App** (React Native)
   - Shared code com React components
   - Push notifications native
   - Offline mode com AsyncStorage
   - Deep linking

2. **Integrações**
   - Google Calendar Sync
   - Integração com Accounting software
   - Slack notifications
   - Telegram bot

3. **IA/ML**
   - Recomendação de faxineiras baseada em histórico
   - Previsão de demanda
   - Detecção de fraude
   - Chatbot com NLP

4. **Internacionalização**
   - i18n setup
   - Suporte múltiplas moedas
   - Múltiplas cidades/países

---

**Cronograma Estimado:**
- Fase 1-2: 1 semana
- Fase 3-4: 2 semanas
- Fase 5-6: 1 semana
- Fase 7+: Contínuo
- **Total: ~4-5 semanas para produção**
