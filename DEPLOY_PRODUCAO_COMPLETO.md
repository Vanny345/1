# 🌐 Deploy em Produção - Site Real na Internet

**Objetivo:** Ter https://cleanerleidy.com.br funcionando de verdade! ✅

---

## 📋 Pré-requisitos

- ✅ Você já tem Orion Host
- ✅ Você já tem domínio cleanerleidy.com.br
- ✅ Você tem acesso SSH ao Orion Host
- ✅ Tem Git instalado no seu computador

---

## 🎯 Plano Geral

```
1. Conectar no Orion Host via SSH
2. Clonar projeto (com Git)
3. Configurar banco de dados
4. Configurar SSL (certificado HTTPS)
5. Fazer deploy (Docker)
6. Testar no navegador
7. Pronto! Site funcionando de verdade
```

---

## 🚀 PASSO A PASSO COMPLETO

### PASSO 1: Conectar no Orion Host

**No seu computador, abra terminal:**

```bash
ssh seu_usuario@seu_ip_orion_host
```

**Exemplo real:**
```bash
ssh root@192.168.1.100
```

Vai pedir senha - **Digite sua senha do Orion**

---

### PASSO 2: Clonar Projeto (Enviar Arquivos)

**Dentro do servidor Orion, execute:**

```bash
# Ir para pasta home
cd /home

# Clonar repositório
git clone https://github.com/FransMalifra/1.git leidy-cleaner

# Entrar na pasta
cd leidy-cleaner

# Confirmar que tudo está lá
ls -la
```

Deve aparecer:
```
backend/
frontend/
docs/
docker-compose.production.yml
nginx.conf
deploy.sh
... etc
```

---

### PASSO 3: Preparar Banco de Dados

**Ainda no servidor Orion:**

```bash
# Criar usuário PostgreSQL
sudo -u postgres createuser -P leidy_user
# Vai pedir senha (crie uma forte)

# Criar banco de dados
sudo -u postgres createdb -O leidy_user leidy_cleaner

# Testá conexão
psql -U leidy_user -h localhost -d leidy_cleaner -c "SELECT 1"
```

---

### PASSO 4: Configurar Variáveis de Produção

**Editar arquivo de configuração:**

```bash
# Voltar para pasta do projeto
cd /home/leidy-cleaner

# Editar .env.production
nano backend/.env.production
```

**Configurar com seus dados:**

```env
# Database
DATABASE_URL="postgresql://leidy_user:sua_senha_aqui@localhost:5432/leidy_cleaner"

# JWT (gere uma senha forte)
JWT_SECRET="gere-um-texto-aleatorio-de-32-caracteres-ou-mais"

# Outras APIs (Stripe, SendGrid, etc)
STRIPE_SECRET_KEY="sua_chave_stripe"
MERCADOPAGO_ACCESS_TOKEN="seu_token"
# ... complete conforme necessário

# URLs (IMPORTANTE!)
FRONTEND_URL="https://cleanerleidy.com.br"
API_URL="https://api.cleanerleidy.com.br"
NODE_ENV="production"
```

**Salvar:** Ctrl+X → Y → Enter

---

### PASSO 5: Certificados SSL (Grátis com Let's Encrypt)

**Instalar Certbot:**

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

**Gerar certificados:**

```bash
sudo certbot certonly --standalone \
  -d cleanerleidy.com.br \
  -d www.cleanerleidy.com.br \
  -d api.cleanerleidy.com.br
```

**Copiar certificados:**

```bash
cd /home/leidy-cleaner

# Criar pasta
mkdir -p ssl

# Copiar certificados
sudo cp /etc/letsencrypt/live/cleanerleidy.com.br/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/cleanerleidy.com.br/privkey.pem ssl/key.pem

# Dar permissão
sudo chown $USER:$USER ssl/*
```

---

### PASSO 6: Instalar Docker e Docker Compose

**Docker:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verificar
docker --version
```

**Docker Compose:**

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar
docker-compose --version
```

---

### PASSO 7: Compilar Frontend

**Fazer build (criar versão otimizada):**

```bash
cd /home/leidy-cleaner/frontend

npm install
npm run build

# Vai criar pasta 'build' com site pronto
ls -la build/
```

---

### PASSO 8: Validar Tudo

```bash
cd /home/leidy-cleaner

# Rodar script de validação
./test-deploy.sh

# Deve mostrar ✅ em tudo
```

---

### PASSO 9: Fazer Deploy!

```bash
# Voltar para raiz do projeto
cd /home/leidy-cleaner

# Iniciar tudo (Docker, Nginx, Backend, BD)
./deploy.sh start

# Aguardar 30-60 segundos para tudo iniciar
sleep 60

# Verificar se está tudo ok
./deploy.sh health
```

**Deve aparecer:**
```
✅ Backend: OK
✅ Frontend: OK
✅ Database: OK
```

---

### PASSO 10: Configurar DNS (Orion Host)

**No painel do Orion Host:**

1. Acesse: Painel de Controle → Domínios
2. Procure por: Zona DNS ou Registros DNS
3. Crie registros A:
   ```
   cleanerleidy.com.br    A    seu-ip-vps
   www.cleanerleidy.com.br    A    seu-ip-vps
   api.cleanerleidy.com.br    A    seu-ip-vps
   ```
4. Aguarde 5-30 minutos para propagar

---

### PASSO 11: Testar no Navegador

**Abra navegador e acesse:**

```
https://cleanerleidy.com.br
```

**Deve aparecer:**
- ✅ Site carrega
- ✅ Vê o dashboard
- ✅ Sem erro 403
- ✅ Sem erro de certificado SSL

**Teste login:**
- Clique em Login
- Tente credenciais
- Deve funcionar

**Teste API:**
- Abrir DevTools (F12)
- Aba Network
- Fazer login
- Ver requisições indo para `https://api.cleanerleidy.com.br`
- Status: 200 ou 401 (não 403!)

---

## ✅ CHECKLIST FINAL

- [ ] SSH conectando no Orion
- [ ] Projeto clonado (`ls leidy-cleaner`)
- [ ] PostgreSQL rodando
- [ ] `.env.production` configurado
- [ ] Certificados SSL em `ssl/`
- [ ] Docker instalado
- [ ] Frontend foi compilado (`npm run build`)
- [ ] `./test-deploy.sh` passou
- [ ] `./deploy.sh start` executou
- [ ] `./deploy.sh health` mostra ✅
- [ ] DNS configurado (propagou)
- [ ] https://cleanerleidy.com.br abre
- [ ] Sem erro 403
- [ ] Login funciona

---

## 🚨 Erros Comuns

### ❌ "Permission denied" (SSH)

```bash
# No seu computador, verificar chave SSH
cat ~/.ssh/id_rsa.pub

# Copiar para Orion Host
ssh-copy-id seu_usuario@seu_ip_orion_host
```

### ❌ "Docker not found"

```bash
# Reinstalar
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### ❌ "Port 443 already in use"

```bash
# Parar serviços conflitantes
sudo systemctl stop nginx
sudo systemctl stop apache2

# Depois fazer deploy
./deploy.sh start
```

### ❌ "Database connection failed"

```bash
# Verificar PostgreSQL
sudo systemctl status postgresql

# Iniciar se não estiver rodando
sudo systemctl start postgresql

# Testar conexão
psql -U leidy_user -h localhost -d leidy_cleaner -c "SELECT 1"
```

### ❌ "Certificate error"

```bash
# Verificar certificados
ls -la ssl/

# Renovar com Let's Encrypt
sudo certbot renew --force-renewal
```

---

## 📋 Comandos Úteis Depois

```bash
# Ver logs
./deploy.sh logs

# Verificar saúde
./deploy.sh health

# Fazer backup BD
./deploy.sh backup

# Parar tudo
./deploy.sh stop

# Reiniciar
./deploy.sh restart
```

---

## ✨ Pronto!

Depois de tudo isso, você terá:

```
✅ https://cleanerleidy.com.br → Site funcionando de verdade!
✅ https://api.cleanerleidy.com.br → API respondendo
✅ Banco de dados rodando
✅ SSL/HTTPS ativado
✅ Sem erro 403
✅ Site visível na internet
```

---

## 🎯 Se Tiver Dúvida

Me mande:
1. **Qual é o erro?**
2. **Qual é a mensagem exata?**
3. **Em qual passo está travado?**

Assim te ajudo direto! 🚀

