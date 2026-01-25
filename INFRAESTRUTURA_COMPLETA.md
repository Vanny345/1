# Leidy Cleaner - Plataforma Completa de Agendamento de Limpeza

## 📋 Visão Geral

Uma plataforma profissional de agendamento de serviços de limpeza totalmente funcional com:

- ✅ **Backend**: Node.js, Express, PostgreSQL, Prisma
- ✅ **Frontend**: React.js, Tailwind CSS, Zustand
- ✅ **Pagamentos**: Stripe, MercadoPago (PIX, Boleto, Cartão)
- ✅ **Email**: SendGrid (confirmações, lembretes, recibos)
- ✅ **WhatsApp**: Twilio (notificações em tempo real)
- ✅ **Upload**: AWS S3 (fotos de perfil, documentos)
- ✅ **Maps**: Google Maps (geocoding, distância, área de serviço)
- ✅ **Notificações**: Firebase Cloud Messaging
- ✅ **Sistema Completo**: Autenticação JWT, Admin Dashboard, Avaliações, Disputes

## 🚀 Instalação Rápida

### 1. Clonar e Preparar

```bash
# Estrutura do projeto
/backend      - API Node.js/Express
/frontend     - Interface React
/mobile       - App React Native (futuro)
/docs         - Documentação

# Configurar variáveis de ambiente
cd backend
cp .env.example .env
# Editar .env com suas chaves
```

### 2. Backend (Node.js)

```bash
cd backend

# Instalar dependências
npm install

# Configurar banco de dados PostgreSQL
# Editar DATABASE_URL no .env

# Rodar migrações
npx prisma migrate dev
npx prisma generate

# Gerar dados de teste (opcional)
npx prisma seed

# Iniciar servidor
npm run dev
# http://localhost:5000
```

### 3. Frontend (React)

```bash
cd frontend

# Instalar dependências
npm install

# Criar .env.local
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local

# Iniciar desenvolvimento
npm start
# http://localhost:3000
```

## 🔑 Variáveis de Ambiente

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/leidy_cleaner"

# JWT
JWT_SECRET="sua-chave-super-secreta"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLIC_KEY="pk_test_..."

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN="access_token_aqui"

# SendGrid
SENDGRID_API_KEY="SG.sua_chave_aqui"

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID="seu_sid"
TWILIO_AUTH_TOKEN="seu_token"
TWILIO_WHATSAPP_NUMBER="+55 51 8030-3740"

# AWS S3
AWS_ACCESS_KEY_ID="sua_access_key"
AWS_SECRET_ACCESS_KEY="sua_secret_key"
AWS_S3_BUCKET="leidy-cleaner-photos"

# Google Maps
GOOGLE_MAPS_API_KEY="sua_api_key"

# Firebase
FIREBASE_PROJECT_ID="seu_project_id"
FIREBASE_PRIVATE_KEY="sua_private_key"
FIREBASE_CLIENT_EMAIL="seu_email"

# Servidor
PORT=5000
NODE_ENV="development"
API_URL="http://localhost:5000"
FRONTEND_URL="http://localhost:3000"
```

## 📚 Estrutura do Backend

```
backend/
├── src/
│   ├── server.js              # Servidor principal
│   ├── controllers/           # Lógica de negócio
│   ├── routes/               # Rotas da API
│   ├── services/             # Serviços externos
│   │   ├── emailService.js       # SendGrid
│   │   ├── paymentService.js     # Stripe/MercadoPago
│   │   ├── whatsappService.js    # Twilio
│   │   ├── storageService.js     # AWS S3
│   │   ├── notificationService.js # Firebase
│   │   └── geoService.js         # Google Maps
│   └── middleware/           # Autenticação, etc
├── prisma/
│   └── schema.prisma         # Schema do banco
└── package.json
```

## 🛣️ Rotas da API

### Autenticação
- `POST /api/auth/register/user` - Registrar cliente
- `POST /api/auth/register/cleaner` - Registrar faxineira
- `POST /api/auth/login` - Login
- `GET /api/auth/validate` - Validar token

### Faxineiras
- `GET /api/cleaners` - Listar faxineiras (com filtros)
- `GET /api/cleaners/:id` - Obter detalhes
- `PUT /api/cleaners/:id` - Atualizar perfil
- `PUT /api/cleaners/:id/schedule` - Atualizar agenda

### Agendamentos
- `POST /api/bookings` - Criar agendamento
- `GET /api/bookings/user/:userId` - Meus agendamentos (cliente)
- `GET /api/bookings/cleaner/:cleanerId` - Agendamentos (faxineira)
- `PUT /api/bookings/:id/cancel` - Cancelar agendamento

### Pagamentos
- `GET /api/payments/methods` - Métodos disponíveis
- `POST /api/payments/stripe/intent` - Criar intenção Stripe
- `POST /api/payments/stripe/confirm` - Confirmar Stripe
- `POST /api/payments/mercadopago/preference` - Preferência MercadoPago

### Avaliações
- `POST /api/reviews` - Criar avaliação
- `GET /api/reviews/cleaner/:cleanerId` - Avaliações de uma faxineira

### Usuários
- `GET /api/users/profile` - Meu perfil
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/notifications` - Minhas notificações

### Admin
- `GET /api/admin/stats` - Estatísticas
- `GET /api/admin/bookings` - Todos os agendamentos
- `PUT /api/admin/cleaners/:id/verify` - Verificar faxineira
- `GET /api/admin/export/bookings` - Exportar CSV

### Uploads
- `POST /api/uploads/photo/profile` - Upload de foto
- `POST /api/uploads/document` - Upload de documento

### Cupons
- `GET /api/discounts/:code` - Obter cupom

### Disputes
- `POST /api/disputes` - Criar disputa
- `GET /api/disputes/user/disputes` - Minhas disputas
- `PUT /api/disputes/:id/resolve` - Resolver disputa (admin)

## 💾 Modelo de Dados

### Usuários (Clientes)
```javascript
{
  id, email, password, name, phone, cpf, dateOfBirth,
  address, city, state, postalCode, profilePhoto,
  createdAt, updatedAt
}
```

### Faxineiras
```javascript
{
  id, email, password, name, phone, cpf, dateOfBirth,
  age, region, bio, photo, nationalId, bankAccount,
  averageRating, reviewCount, totalBookings,
  status, verified, createdAt, updatedAt
}
```

### Agendamentos
```javascript
{
  id, userId, cleanerId, date, startTime, endTime,
  address, city, latitude, longitude, serviceType,
  notes, duration, estimatedPrice, finalPrice,
  status, paymentStatus, cancellationReason,
  createdAt, updatedAt
}
```

### Pagamentos
```javascript
{
  id, bookingId, amount, method, paymentGateway,
  transactionId, status, receiptUrl, createdAt
}
```

## 🔐 Autenticação

Usa JWT (JSON Web Tokens):

1. **Registrar** → Criptografa senha com bcrypt
2. **Login** → Gera token JWT válido por 7 dias
3. **Requisições** → Token no header: `Authorization: Bearer token`
4. **Validação** → Middleware verifica e decodifica token

```javascript
// Exemplo de requisição com token
fetch('/api/cleaners', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

## 💳 Pagamentos

### Stripe
- Cartão de crédito/débito
- Creates `PaymentIntent`
- Webhook para confirmação

### MercadoPago
- PIX (instantâneo)
- Boleto (24-48 horas)
- Cartão de crédito
- Preference-based checkout

```javascript
// Fluxo de pagamento
1. Criar booking → estimatedPrice
2. Gerar intenção de pagamento
3. Cliente confirma no Stripe/MercadoPago
4. Webhook confirma pagamento
5. Enviar email com recibo
6. Notificar faxineira via WhatsApp
```

## 📧 Email (SendGrid)

Templates automáticos:
- ✉️ Confirmação de agendamento
- ⏰ Lembrete 24h antes
- 💰 Recibo de pagamento
- ⭐ Solicitação de avaliação

## 📱 WhatsApp (Twilio)

Notificações em tempo real:
- ✅ Agendamento confirmado
- 📅 Lembrete de agendamento
- ❌ Cancelamento
- 💬 Mensagens do suporte

## 🗺️ Google Maps

- Geocoding de endereços
- Cálculo de distância
- Verificação de área de serviço (15km Porto Alegre)

## 💾 AWS S3

Upload seguro de:
- Fotos de perfil (faxineiras e clientes)
- Documentos de verificação (RG, CPF)
- Comprovantes de endereço

## 🔔 Notificações (Firebase)

Push notifications para:
- Android
- iOS
- Web

## 📊 Funcionalidades Principais

### Para Clientes
- ✅ Registrar conta
- ✅ Filtrar faxineiras por região
- ✅ Ver avaliações e experiência
- ✅ Agendar limpeza
- ✅ Pagar online (cartão/PIX/boleto)
- ✅ Acompanhar agendamento
- ✅ Avaliar faxineira
- ✅ Cancelar/remarcar
- ✅ Ver histórico

### Para Faxineiras
- ✅ Registrar com verificação de CPF/identidade
- ✅ Upload de foto profissional
- ✅ Definir região e agenda semanal
- ✅ Aceitar/recusar agendamentos
- ✅ Ver perfil e avaliações
- ✅ Receber pagamentos
- ✅ Gerenciar documentos
- ✅ Suporte via WhatsApp

### Para Admin
- ✅ Dashboard com estatísticas
- ✅ Gerenciar usuários e faxineiras
- ✅ Verificar documentos
- ✅ Resolver disputes
- ✅ Exportar relatórios (CSV)
- ✅ Gerenciar cupons
- ✅ Monitorar pagamentos

## 🧪 Testando a API

### Com Postman
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123",
  "userType": "user"
}
```

### Com cURL
```bash
curl -X GET http://localhost:5000/api/cleaners \
  -H "Authorization: Bearer seu_token_aqui"
```

## 🚢 Deploy

### Backend (Heroku/Railway)
```bash
# Railway
railway link
railway up

# Heroku
heroku create leidy-cleaner-api
git push heroku main
```

### Frontend (Vercel)
```bash
# Vercel
npm install -g vercel
vercel

# GitHub Pages
npm run build
gh-pages -d build
```

## 📝 Listas de Verificação

### Antes de Deploy em Produção

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados PostgreSQL em produção
- [ ] SSL/HTTPS ativado
- [ ] CORS configurado corretamente
- [ ] Rate limiting implementado
- [ ] Logs centralizados (ELK/CloudWatch)
- [ ] Backups automáticos do banco
- [ ] Monitoramento de erros (Sentry)
- [ ] Testes de carga feitos
- [ ] Documentação atualizada

## 🐛 Troubleshooting

### Erro: "Database connection failed"
```bash
# Verificar URL PostgreSQL
echo $DATABASE_URL
# Criar banco: createdb leidy_cleaner
```

### Erro: "JWT expired"
Gere novo token fazendo login novamente

### Erro: "Stripe key invalid"
Verifique chaves em Stripe Dashboard → Developers → API Keys

### Erro: "S3 upload failed"
Verifique credenciais AWS IAM e permissões do bucket

## 📞 Suporte

- Email: suporte@leidycleaner.com
- WhatsApp: +55 51 8030-3740
- GitHub Issues: [link do repositório]

## 📄 Licença

MIT License - Veja LICENSE.md

## 🙏 Contribuições

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue primeiro.

---

**Desenvolvido com ❤️ para Leidy Cleaner**
