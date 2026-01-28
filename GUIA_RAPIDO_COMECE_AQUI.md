# 🚀 GUIA RÁPIDO - Como Começar a Usar

**Versão:** 2.0  
**Data:** 28 de Janeiro de 2026  
**Status:** ✅ Pronto para Usar

---

## ⚡ Quick Start (5 minutos)

### 1️⃣ Instalar Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2️⃣ Configurar Banco de Dados

```bash
# No backend, migrar schema
cd backend
npx prisma migrate dev

# Gerar Prisma client
npx prisma generate
```

### 3️⃣ Rodar Localmente

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Acessar: http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm start
# Acessar: http://localhost:3000
```

### 4️⃣ Testar com Docker

```bash
# Subir todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

---

## 📋 WHAT'S INCLUDED (O QUE ESTÁ INCLUÍDO)

### ✅ Backend (100% Pronto)
- **5 Services** completos com 1.800+ linhas
- **34 Endpoints API** funcionais
- **PostgreSQL** integrado com Prisma ORM
- **Autenticação** com JWT
- **Pagamentos** Stripe + MercadoPago
- **Email** SendGrid integrado
- **WhatsApp** Twilio integrado
- **Armazenamento** AWS S3
- **Mapa** Google Maps integrado

### ✅ Frontend (80% Pronto)
- **React 18** com TypeScript
- **Tailwind CSS** para styling
- **React Router** para navegação
- **Form Validation** com React Hook Form
- **Estado Global** com Zustand
- **API Client** com Axios

### ✅ Infraestrutura
- **Docker** pronto para dev e production
- **PostgreSQL 15** com backup
- **Nginx** como proxy reverso
- **SSL/TLS** support
- **Health checks** integrados

---

## 🔧 VARIÁVEIS DE AMBIENTE

### Backend (.env)
```
DATABASE_URL          - Conexão PostgreSQL
JWT_SECRET           - Chave para tokens (min 32 chars)
STRIPE_SECRET_KEY    - Chave Stripe
MERCADOPAGO_*        - Credenciais MercadoPago
SENDGRID_API_KEY     - Chave SendGrid
AWS_*                - Credenciais AWS
GOOGLE_MAPS_API_KEY  - Chave Google Maps
```

### Frontend (.env)
```
REACT_APP_API_URL           - URL do backend
REACT_APP_STRIPE_PUBLIC_KEY - Chave pública Stripe
REACT_APP_GOOGLE_MAPS_*     - Credenciais Maps
```

**Nota:** Arquivos .env já estão criados com valores de DEV. Para produção, atualize com valores reais!

---

## 📚 ESTRUTURA DO PROJETO

```
.
├── backend/                    # API Express.js
│   ├── src/
│   │   ├── server.js          # Servidor principal
│   │   ├── controllers/       # Controladores
│   │   ├── routes/            # 15 arquivos de rotas
│   │   ├── services/          # 16 serviços (5 novos)
│   │   └── middleware/        # Autenticação, etc
│   ├── prisma/
│   │   └── schema.prisma      # Schema do banco (729 linhas)
│   ├── .env                   # ✅ Configurações DEV
│   ├── .env.production        # Configurações PROD (editar!)
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # React.js
│   ├── public/
│   │   └── index.html         # HTML entry point
│   ├── src/
│   │   ├── App.jsx            # Componente raiz
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── services/          # Serviços API
│   │   ├── stores/            # Estado Zustand
│   │   └── utils/             # Funções utilitárias
│   ├── .env                   # ✅ Configurações DEV
│   └── package.json
│
├── mobile/                     # React Native (Em Dev)
│   ├── App.tsx
│   └── screens/
│
├── docs/                       # Documentação completa
│   └── [40+ arquivos de guia]
│
├── docker-compose.yml         # ✅ Docker DEV
├── docker-compose.production.yml  # ✅ Docker PROD
└── nginx.conf                 # ✅ Proxy reverso

```

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### 1. 🔄 Reagendamento
- ✅ Reagendar faxinas existentes
- ✅ Validação de conflitos
- ✅ Histórico completo
- ✅ 4 endpoints API

### 2. ⭐ Avaliações Mútuas
- ✅ User avalia Cleaner (e vice-versa)
- ✅ 5 estrelas + comentário
- ✅ Flagging para abuso
- ✅ 7 endpoints API

### 3. 🚫 Punição Automática
- ✅ 25 pontos deduzidos automaticamente
- ✅ 2 dias de bloqueio
- ✅ Suspensão em 0 pontos
- ✅ 5 endpoints API

### 4. 🗺️ Regiões + Modo Rápido
- ✅ Múltiplas regiões favoritas
- ✅ Modo rápido (1 clique)
- ✅ Busca por região
- ✅ 8 endpoints API

### 5. 🏆 Ranking e Grade
- ✅ Score de agilidade (0-10)
- ✅ Grade de desempenho (A-F)
- ✅ Ranking global/regional
- ✅ 5 endpoints API

---

## 🧪 TESTES

### Verificar Backend
```bash
# Health check
curl http://localhost:5000/health

# Login (exemplo)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Verificar Frontend
```bash
# Frontend deve estar acessível em
http://localhost:3000
```

### Verificar Database
```bash
# Entrar no Prisma Studio
cd backend
npx prisma studio
# Abre em http://localhost:5555
```

---

## 📱 ENDPOINTS PRINCIPAIS

### Autenticação
```
POST   /api/auth/register     - Registrar usuário
POST   /api/auth/login        - Login
POST   /api/auth/logout       - Logout
POST   /api/auth/refresh      - Renovar token
```

### Agendamentos
```
GET    /api/bookings          - Listar agendamentos
POST   /api/bookings          - Criar novo
PUT    /api/bookings/:id      - Atualizar
DELETE /api/bookings/:id      - Cancelar
```

### Reagendamento (NOVO)
```
POST   /api/features/reschedule      - Reagendar
GET    /api/features/reschedule/:id  - Histórico
```

### Avaliações (NOVO)
```
POST   /api/features/ratings         - Criar avaliação
GET    /api/features/ratings/:id     - Listar
PUT    /api/features/ratings/:id     - Atualizar
```

### Ranking (NOVO)
```
GET    /api/features/ranking         - Ranking global
GET    /api/features/ranking/:region - Por região
GET    /api/features/ranking/user/:id - Perfil
```

**Todos os 34 endpoints estão documentados em [DOCUMENTACAO_COMPLETA.md](docs/DOCUMENTACAO_COMPLETA.md)**

---

## 🚀 DEPLOY

### Local (Docker Compose)
```bash
docker-compose up -d
```

### Produção
```bash
# Ler guia completo
cat CHECKLIST_DEPLOY.md

# Ou para Orion Host
cat DEPLOY_ORION_HOST.md
```

---

## 🆘 TROUBLESHOOTING

### Erro de Conexão no Banco
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps | grep postgres

# Se não estiver, iniciar
docker-compose up -d postgres
```

### Erro de Porta em Uso
```bash
# Backend usa 5000, Frontend 3000
# Se em uso, mudar em .env ou liberar portas
```

### CORS Error no Frontend
```bash
# Verificar API_URL no .env do frontend
# Deve ser http://localhost:5000 (DEV)
# Ou https://api.cleanerleidy.com.br (PROD)
```

---

## 📖 DOCUMENTAÇÃO COMPLETA

| Arquivo | Descrição |
|---------|-----------|
| [DOCUMENTACAO_COMPLETA.md](docs/DOCUMENTACAO_COMPLETA.md) | Todos os 34 endpoints |
| [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md) | Resumo das funcionalidades |
| [CHECKLIST_DEPLOY.md](CHECKLIST_DEPLOY.md) | Guia de deploy passo a passo |
| [DEPLOY_PRODUCAO_CORRIGIDO.md](DEPLOY_PRODUCAO_CORRIGIDO.md) | Deploy corrigido erro 403 |
| [DEPLOY_ORION_HOST.md](DEPLOY_ORION_HOST.md) | Deploy em Orion Host |
| [ROADMAP_COMPLETO_2026.md](docs/ROADMAP_COMPLETO_2026.md) | Roadmap futuro |

---

## ✨ PRÓXIMOS PASSOS

1. **Agora:** Rodar `npm install` e `docker-compose up`
2. **Hoje:** Testar endpoints do backend
3. **Amanhã:** Implementar componentes frontend faltantes
4. **Próxima semana:** Deploy em staging
5. **Próximas semanas:** Deploy em produção com testes

---

## 💡 DICAS IMPORTANTES

- ✅ **Arquivos .env já estão criados** com valores de DEV
- ✅ **Docker Compose pronto** - não precisa instalar PostgreSQL manualmente
- ✅ **Prisma pronto** - rodar `npx prisma migrate dev`
- ⚠️ **Para PRODUÇÃO** - criar `.env.production` com valores reais
- ⚠️ **JWT_SECRET** - gerar string aleatória de 32+ caracteres

---

## 🎉 VOCÊ ESTÁ PRONTO!

Seu projeto está **90% pronto para usar**. 

### Próximo passo:
```bash
# 1. Instalar dependencies
cd backend && npm install && cd ../frontend && npm install

# 2. Rodar
docker-compose up -d

# 3. Testar
curl http://localhost:5000/health
```

**Tempo estimado:** 10 minutos até ter tudo rodando! 🚀

---

**Criado:** 28 de Janeiro de 2026  
**Versão:** 2.0  
**Status:** ✅ Pronto para Usar
