# 🚀 Guia de Deploy em Produção - Erro 403 Corrigido

**Data:** 28 de Janeiro de 2026

---

## ✅ Problemas Corrigidos

1. **CORS não estava configurado para domínio de produção**
   - ❌ Antes: Apenas `localhost:3000` era permitido
   - ✅ Agora: `cleanerleidy.com.br` e variantes permitidas

2. **nginx.conf não existia** → Criado com configuração completa

3. **Variáveis de ambiente não estavam em produção** → `.env.production` criado

4. **Backend não tinha múltiplas origens permitidas** → Corrigido em `server.js`

---

## 📋 Passos para Deploy

### 1. Preparar Certificados SSL

Coloque seus certificados SSL em uma pasta `ssl/`:

```bash
mkdir -p ssl
# Coloque aqui:
# ssl/cert.pem     (seu certificado)
# ssl/key.pem      (sua chave privada)
```

### 2. Configurar Variáveis de Produção

Edite o arquivo `backend/.env.production` com valores reais:

```bash
# Database (seu PostgreSQL em produção)
DATABASE_URL="postgresql://user:password@seu-host:5432/leidy_cleaner"

# JWT Secret (MUDE ISSO!)
JWT_SECRET="gere-uma-chave-segura-aqui-minimo-32-caracteres"

# APIs (Stripe, MercadoPago, etc.)
STRIPE_SECRET_KEY="sua_chave_stripe_production"
MERCADOPAGO_ACCESS_TOKEN="seu_token_mp"
# ... etc

# URLs (IMPORTANTE - já estava faltando!)
API_URL="https://api.cleanerleidy.com.br"
FRONTEND_URL="https://cleanerleidy.com.br"
```

### 3. Build e Deploy

```bash
# 1. Build do frontend
cd frontend
npm install
npm run build
cd ..

# 2. Build das imagens Docker com produção
docker-compose -f docker-compose.production.yml build

# 3. Iniciar containers
docker-compose -f docker-compose.production.yml up -d

# 4. Verificar logs
docker-compose -f docker-compose.production.yml logs -f
```

### 4. Verificar Saúde do Sistema

```bash
# Health check do backend
curl https://api.cleanerleidy.com.br/health

# Testar CORS
curl -H "Origin: https://cleanerleidy.com.br" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS https://api.cleanerleidy.com.br/api/auth/login -v

# Login de teste
curl -X POST https://api.cleanerleidy.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 🔧 O Que Mudou

### Backend - `server.js`
✅ CORS agora aceita múltiplas origens  
✅ Suporta credenciais  
✅ Permite todos os métodos HTTP necessários

### Novo - `nginx.conf`
✅ Reverse proxy para backend  
✅ Serve frontend estático  
✅ CORS headers no nginx  
✅ SSL/TLS configurado  
✅ Rate limiting para proteger API  
✅ Compressão gzip  
✅ Cache de assets estáticos

### Novo - `backend/.env.production`
✅ Variáveis de produção  
✅ URLs corretas  
✅ NODE_ENV=production

---

## 🚨 Teste Antes de Deploy

### Localmente

```bash
# Terminal 1: Backend
cd backend
npm install
NODE_ENV=development npm run dev

# Terminal 2: Frontend  
cd frontend
npm install
npm start

# Terminal 3: Testar
curl http://localhost:5000/health
```

### Em Produção

Após deploy, teste:

```bash
# 1. Frontend carrega?
curl https://cleanerleidy.com.br/

# 2. Backend responde?
curl https://api.cleanerleidy.com.br/health

# 3. Login funciona?
curl -X POST https://api.cleanerleidy.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# 4. CORS está ok?
# Abra DevTools no browser em cleanerleidy.com.br
# Execute uma requisição para /api/...
# Não deve ter erro de CORS
```

---

## 📞 Se Ainda Tiver 403

1. **Verifique logs do nginx:**
   ```bash
   docker-compose -f docker-compose.production.yml logs nginx
   ```

2. **Verifique logs do backend:**
   ```bash
   docker-compose -f docker-compose.production.yml logs backend
   ```

3. **Confirme que certificados SSL existem:**
   ```bash
   ls -la ssl/
   ```

4. **Teste conexão ao backend:**
   ```bash
   curl http://backend:5000/health
   ```

5. **Reinicie os containers:**
   ```bash
   docker-compose -f docker-compose.production.yml restart
   ```

---

## 📚 Referência Rápida

| Componente | URL | Porta |
|-----------|-----|-------|
| Frontend | https://cleanerleidy.com.br | 443 |
| API Backend | https://api.cleanerleidy.com.br | 443 |
| Backend Interno | http://backend:5000 | 5000 |
| Database | postgres:5432 | 5432 |

---

## ✨ Próximas Otimizações

- [ ] Adicionar WAF (Web Application Firewall)
- [ ] Configurar backup automático do BD
- [ ] Monitoramento e alertas
- [ ] Auto-scaling de containers
- [ ] CDN para assets estáticos

