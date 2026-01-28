# 🏃 Rodar Localmente - Teste Rápido

**Data:** 28 de Janeiro de 2026

---

## ⚡ Super Rápido (5 minutos)

Se quer apenas **VER FUNCIONANDO** sem se preocupar com banco de dados:

### Opção 1: Apenas Frontend (React)

```bash
# 1. Entrar na pasta
cd frontend

# 2. Instalar dependências
npm install

# 3. Rodar
npm start

# Vai abrir http://localhost:3000 automaticamente
# Tudo funciona com MOCK DATA (dados fictícios)
```

**Pronto!** Você vê:
- ✅ Dashboard
- ✅ Bookings
- ✅ Admin
- ✅ Cleaners
- ✅ Tudo respondendo

---

## 🔧 Completo (15 minutos) - Frontend + Backend

**Pré-requisitos:**
- Node.js 14+ instalado ([download](https://nodejs.org))
- PostgreSQL ou Docker instalado

### Opção A: Com PostgreSQL Local (Mais Realista)

#### Passo 1: Preparar Banco de Dados

**Se tem PostgreSQL instalado:**

```bash
# Criar banco
createdb leidy_cleaner

# Ou via psql
psql -U postgres -c "CREATE DATABASE leidy_cleaner;"
```

**Se não tem, instalar PostgreSQL:**

```bash
# Windows
# Download: https://www.postgresql.org/download/windows/

# Mac
brew install postgresql

# Linux (Ubuntu)
sudo apt install postgresql postgresql-contrib -y
```

#### Passo 2: Configurar Backend

```bash
# Entrar na pasta
cd backend

# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env
nano .env
# ou
code .env
```

**Editar .env com:**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/leidy_cleaner"
JWT_SECRET="teste-secret-key-123"
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"
API_URL="http://localhost:5000"
```

#### Passo 3: Instalar Backend

```bash
# Ainda na pasta backend
npm install
```

#### Passo 4: Criar Tabelas

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma migrate dev --name init

# Ou (se não funcionar o anterior)
npx prisma db push
```

#### Passo 5: Rodar Backend

**Terminal 1:**

```bash
# Na pasta backend
npm run dev

# Vai mostrar:
# 🚀 Server running on port 5000
```

#### Passo 6: Rodar Frontend

**Terminal 2 (nova aba):**

```bash
# Na pasta frontend
npm install
npm start

# Vai abrir http://localhost:3000
```

#### Passo 7: Testar

**No navegador:**
- http://localhost:3000 → Deve carrega o site
- Login: teste@example.com / password123 (ou criar novo)
- Ver dashboard
- Testar agendamentos

**No console (DevTools):**
- Abrir F12
- Aba Network
- Fazer login
- Deve ver requisições para http://localhost:5000/api/...
- **Sem erro 403!**

---

### Opção B: Com Docker (Mais Rápido)

```bash
# 1. Construir imagens
docker-compose build

# 2. Rodar
docker-compose up

# 3. Acessar
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

---

## 🧪 Teste Rápido (Sem PostgreSQL)

Se não tem PostgreSQL e quer só **VER FUNCIONANDO**:

### Frontend Puro (Com Mock Data)

```bash
cd frontend
npm install
npm start
```

Vai funcionar 100% porque já tem dados fictícios nos componentes!

---

## 🎯 Checklist Teste Local

### ✅ Frontend Carregando
- [ ] http://localhost:3000 abre?
- [ ] Vê o layout do site?
- [ ] Consegue fazer login?
- [ ] Consegue ver dashboard?

### ✅ Backend Respondendo
- [ ] http://localhost:5000/health retorna status?
- [ ] `curl http://localhost:5000/health` mostra JSON?
- [ ] Sem erro 403?

### ✅ CORS Funcionando
- [ ] Abrir DevTools (F12)
- [ ] Aba Network
- [ ] Fazer login
- [ ] Ver requisição para /api/auth/login
- [ ] Status deve ser 200 (ou 401 se credenciais erradas)
- [ ] Sem erro de CORS?

---

## 📋 Todos os Comandos (Copiar e Colar)

```bash
# ============================================
# SETUP INICIAL
# ============================================

# 1. Backend - Setup
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init

# 2. Frontend - Setup
cd ../frontend
npm install

# ============================================
# RODAR TUDO
# ============================================

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start

# ============================================
# TESTAR
# ============================================

# Terminal 3 - Requisições
curl http://localhost:5000/health
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 🚨 Erros Comuns

### ❌ "Port 3000 already in use"

```bash
# Mudar para outra porta
PORT=3001 npm start

# Ou matar processo na porta 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### ❌ "Port 5000 already in use"

```bash
PORT=5001 npm run dev
```

### ❌ "Database connection failed"

```bash
# Verificar se PostgreSQL está rodando
# Windows: Services → PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Ou testar conexão
psql -U postgres -c "SELECT 1"
```

### ❌ "Cannot find module 'prisma'"

```bash
npm install
npx prisma generate
```

### ❌ "ENOSPC: System limit for number of open files"

```bash
# Aumentar limite
ulimit -n 10000
```

---

## 📊 URLs Locais

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| API Login | http://localhost:5000/api/auth/login |
| API Users | http://localhost:5000/api/users |
| Database | localhost:5432 |

---

## 🔍 Verificar se Tudo Funciona

### Teste 1: Frontend Carrega

```bash
curl http://localhost:3000
```

Deve retornar HTML da página.

### Teste 2: Backend Responde

```bash
curl http://localhost:5000/health
```

Deve retornar:
```json
{"status":"Server is running"}
```

### Teste 3: Login Funciona

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

Deve retornar token ou erro de credenciais (não 403!).

### Teste 4: CORS OK

```bash
curl -X OPTIONS http://localhost:5000/api/auth/login \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Deve ter headers de CORS na resposta.

---

## ✨ Cenários de Teste

### Cenário 1: Apenas Ver Interface

```bash
cd frontend
npm start
# Funciona 100% sem backend (com dados fictícios)
```

### Cenário 2: Testar Login + API

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start

# Vai funcionar com dados reais do banco
```

### Cenário 3: Testar Tudo com Docker

```bash
docker-compose up
# Tudo automático!
```

---

## 🎯 Próximo Passo

Depois que testar localmente e confirmar que funciona:

1. **Commit no Git**
   ```bash
   git add .
   git commit -m "Fix 403 error e preparar deploy"
   git push
   ```

2. **Deploy no Orion Host**
   ```bash
   # SSH no Orion
   ssh seu_usuario@seu_ip
   
   # Clonar
   git clone https://github.com/FransMalifra/1.git
   
   # Configurar e fazer deploy
   ./deploy.sh start
   ```

---

## 📱 Dica: Acessar Frontend de Outro Dispositivo

Se quer testar no celular/tablet:

```bash
# Descobrir seu IP local
# Windows: ipconfig
# Mac: ifconfig
# Linux: hostname -I

# Depois acessar
http://seu-ip-local:3000
```

Exemplo: `http://192.168.1.100:3000`

---

## ✅ Status Final

Depois de rodar tudo:

```
✅ http://localhost:3000 - Frontend funcionando
✅ http://localhost:5000 - Backend funcionando
✅ Login funcionando
✅ API respondendo
✅ Sem erro 403
✅ CORS configurado
✅ Pronto para deploy!
```

**Qual cenário você quer testar?** 🚀

