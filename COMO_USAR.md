# Leidy Cleaner - Guia de Uso

## 🚀 Como Executar o Projeto

### 1. Instalação de Dependências

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Variáveis de Ambiente

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/leidy_cleaner"
JWT_SECRET="sua_chave_secreta_aqui"
NODE_ENV="development"
PORT=5000

# APIs Externas (opcional para testes)
STRIPE_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
MERCADOPAGO_TOKEN="APP_..."
SENDGRID_API_KEY="SG...."
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
GOOGLE_MAPS_API_KEY="..."
```

#### Frontend (.env)
```env
REACT_APP_API_URL="http://localhost:5000"
```

### 3. Banco de Dados

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Iniciar a Aplicação

#### Terminal 1 - Backend
```bash
cd backend
npm start
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

O aplicativo estará disponível em: `http://localhost:3000`

## 📋 Fluxo de Uso

### Para Clientes

1. **Login/Registro** (`/register`)
   - Criar conta como cliente
   - Preencher: Email, Senha, Nome, Telefone

2. **Buscar Faxineiras** (`/cleaners`)
   - Filtrar por região
   - Ver perfil, avaliações, fotos
   - Clicar em "Agendar Agora"

3. **Agendar Serviço** (`/checkout`)
   - Escolher data e horário
   - Selecionar endereço
   - Escolher tipo de limpeza
   - Adicionar observações

4. **Pagamento** (`/payment/:bookingId`)
   - Escolher método: **Cartão**, **PIX** ou **Boleto**
   - Preencher dados de acordo com o método
   - Confirmar pagamento
   - Receber confirmação

5. **Dashboard** (`/dashboard`)
   - Ver agendamentos confirmados
   - Avaliar faxineiras
   - Acompanhar histórico

### Para Faxineiras

1. **Registro** (`/register`)
   - Criar conta como faxineira
   - Preencher: Email, CPF, Foto, Região, Idade
   - Configurar agenda de disponibilidade

2. **Dashboard da Faxineira**
   - Ver agendamentos próximos
   - Receber notificações de novas solicitações
   - Gerenciar horários

## 💳 Métodos de Pagamento

### Cartão de Crédito
- Aceita: Visa, Mastercard, Elo
- Campos: Número, Nome do Titular, Vencimento, CVV
- Auto-formatação: Número com espaços, Vencimento MM/YY

### PIX
- Chave: `51980303740@leidycleaner.com`
- Transferência instantânea
- QR Code disponível (integração futura)

### Boleto
- Código de barras gerado automaticamente
- Vencimento em 3 dias úteis
- Recebe SMS com código

## 🔐 Dados de Teste

### Cliente
```
Email: cliente@test.com
Senha: 123456
```

### Faxineira
```
Email: faxineira@test.com
Senha: 123456
```

## 📱 Responsividade

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 🎨 Páginas Disponíveis

| Página | URL | Descrição |
|--------|-----|-----------|
| Login | `/login` | Autenticação |
| Registro | `/register` | Criar conta |
| Dashboard | `/dashboard` | Painel do usuário |
| Faxineiras | `/cleaners` | Listar faxineiras |
| Checkout | `/checkout` | Resumo do agendamento |
| Pagamento | `/payment/:bookingId` | Processamento de pagamento |

## 🚨 Recursos Implementados

### ✅ Prontos
- [x] Autenticação JWT
- [x] Registro de usuários e faxineiras
- [x] Upload de fotos com preview
- [x] Listagem de faxineiras
- [x] Filtro por região
- [x] Formulário de agendamento
- [x] Página de pagamento com 3 métodos
- [x] Auto-formatação de cartão
- [x] Notificações com toast
- [x] Design responsivo com Tailwind

### ⏳ Em Desenvolvimento
- [ ] Integração real com Stripe
- [ ] Integração real com MercadoPago
- [ ] Upload de fotos para AWS S3
- [ ] Envio de emails com SendGrid
- [ ] Notificações WhatsApp com Twilio
- [ ] Avaliações e reviews
- [ ] Sistema de disputas
- [ ] Dashboard do administrador

## 🛠️ Tecnologias

- **Frontend**: React 18, Tailwind CSS, React Router, Axios, Zustand
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Auth**: JWT + bcrypt
- **UI**: React Icons, react-toastify
- **Forma. de Dados**: Auto-formatação de inputs

## 📞 Suporte

Para problemas ou dúvidas, verifique:

1. Se todas as dependências foram instaladas
2. Se as variáveis de ambiente estão corretas
3. Se o banco de dados está rodando
4. Se as portas 3000 e 5000 estão disponíveis

## 📝 Próximos Passos

1. **Integrar Stripe**: Substituir mock por processamento real
2. **Upload S3**: Salvar fotos em cloud storage
3. **Email**: Enviar confirmações por email
4. **Notificações**: Integrar Firebase/WhatsApp
5. **Testes**: Adicionar testes unitários e E2E
6. **Deploy**: Preparar para produção (Heroku/Vercel)

---

**Desenvolvido com ❤️ para Leidy Cleaner**
