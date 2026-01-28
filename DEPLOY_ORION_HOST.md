# 🚀 Guia Deploy Orion Host - Erro 403 Resolvido

**Data:** 28 de Janeiro de 2026

---

## 📋 Tipo de Plano Orion Host?

### 1️⃣ Hospedagem Compartilhada (cPanel)
- ❌ NÃO pode usar Docker
- ❌ NÃO pode usar Node.js puro
- ✅ Pode usar aplicações PHP
- ⚠️ Limitado para esse projeto

### 2️⃣ VPS (SSH + Root)
- ✅ SIM pode usar Docker
- ✅ SIM pode fazer deploy completo
- ✅ RECOMENDADO para este projeto

### 3️⃣ Servidor Dedicado
- ✅ SIM pode usar Docker
- ✅ SIM pode fazer deploy completo
- ✅ MÁXIMA liberdade

---

## 🎯 SOLUÇÃO 1: VPS ou Servidor Dedicado (RECOMENDADO)

Se você tem **VPS ou Servidor Dedicado** na Orion Host:

### Passo 1: Conectar ao Servidor via SSH

```bash
# Terminal do seu computador
ssh root@seu-ip-orion-host
# ou
ssh usuario@seu-ip-orion-host
```

### Passo 2: Instalar Docker e Docker Compose

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker --version
docker-compose --version
```

### Passo 3: Clonar o Repositório

```bash
# Ir para pasta home
cd /home

# Clonar repositório
git clone https://github.com/FransMalifra/1.git leidy-cleaner
cd leidy-cleaner
```

### Passo 4: Configurar Ambiente de Produção

```bash
# Editar variáveis de produção
nano backend/.env.production

# Editar com suas informações:
DATABASE_URL="postgresql://user:password@localhost:5432/leidy_cleaner"
JWT_SECRET="gere-uma-chave-segura-32-caracteres"
STRIPE_SECRET_KEY="sua_chave_stripe"
# ... etc
```

### Passo 5: Adicionar Certificados SSL

```bash
# Copiar certificados para pasta ssl
mkdir -p ssl
# Copie seus certificados .pem para ssl/
# Ou use Let's Encrypt (grátis)
```

**Para Let's Encrypt (GRÁTIS):**

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Gerar certificado
sudo certbot certonly --standalone -d cleanerleidy.com.br -d www.cleanerleidy.com.br

# Certificados ficarão em:
# /etc/letsencrypt/live/cleanerleidy.com.br/

# Copiar para projeto
sudo cp /etc/letsencrypt/live/cleanerleidy.com.br/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/cleanerleidy.com.br/privkey.pem ssl/key.pem
sudo chown $USER:$USER ssl/*
```

### Passo 6: Validar Antes de Deploy

```bash
./test-deploy.sh
```

### Passo 7: Fazer Deploy

```bash
./deploy.sh start

# Verificar se iniciou
./deploy.sh health

# Ver logs
./deploy.sh logs
```

### Passo 8: Configurar DNS na Orion Host

No painel da Orion Host:

```
Zona DNS:
├─ A Record
│  └─ cleanerleidy.com.br → seu-ip-vps
├─ A Record  
│  └─ www.cleanerleidy.com.br → seu-ip-vps
└─ A Record
   └─ api.cleanerleidy.com.br → seu-ip-vps
```

### Passo 9: Testar

```bash
# No seu computador
curl https://cleanerleidy.com.br

# Deve carregar sem erro 403
```

---

## 🎯 SOLUÇÃO 2: Hospedagem Compartilhada (cPanel)

Se você tem **Hospedagem Compartilhada**:

### Limitações
- ❌ Não pode usar Node.js/Express diretamente
- ❌ Não pode usar Docker
- ✅ Pode servir apenas React estático

### Alternativa: Separar Frontend e Backend

**Frontend (React) → Hospedagem Compartilhada**
```bash
# Fazer build do frontend
cd frontend
npm install
npm run build

# Upload pasta 'build' via FTP para /public_html
# ou
# Upload via cPanel File Manager
```

**Backend (Node.js) → Serviço Externo**
- Vercel
- Render.com
- Railway
- Heroku
- Ou outro VPS

---

## 📋 Checklist para Orion Host + Docker

### Pré-Deploy
- [ ] SSH funcionando
- [ ] Docker instalado
- [ ] Docker Compose instalado
- [ ] Repositório clonado
- [ ] Certificados SSL preparados
- [ ] DNS configurado

### Deploy
- [ ] `./test-deploy.sh` passou
- [ ] `backend/.env.production` configurado
- [ ] `ssl/cert.pem` e `ssl/key.pem` existem
- [ ] `./deploy.sh start` executado

### Pós-Deploy
- [ ] `./deploy.sh health` mostra ✅ para todos
- [ ] Frontend carrega: `https://cleanerleidy.com.br`
- [ ] API responde: `https://api.cleanerleidy.com.br/health`
- [ ] Login funciona
- [ ] Sem erro 403
- [ ] Sem erro de CORS

---

## 🔧 Configuração Firewall Orion Host

Se bloqueou requisições, configure no painel:

### Portas Necessárias
- **80** (HTTP) → Redirect para HTTPS
- **443** (HTTPS) → Frontend + API
- **5432** (PostgreSQL) → Apenas interno
- **5000** (Node) → Apenas interno (nginxProxy)

---

## 📞 Comandos Úteis no Servidor

```bash
# Verificar status
./deploy.sh health

# Ver logs em tempo real
./deploy.sh logs

# Parar sistema
./deploy.sh stop

# Reiniciar após update
./deploy.sh restart

# Fazer backup
./deploy.sh backup

# Entrar no shell
./deploy.sh shell
```

---

## 🚨 Troubleshooting Orion Host

### Erro: "Permission denied" em SSH
```bash
# Verificar permissões
ls -la ~/.ssh/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Erro: Docker não encontrado
```bash
# Instalar novamente
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### Erro: Porta já em uso
```bash
# Se 80 ou 443 estão em uso
# Editar nginx.conf para usar portas diferentes
# Ou parar serviços conflitantes
sudo lsof -i :80
sudo lsof -i :443
```

### Erro: Certificado SSL inválido
```bash
# Gerar novo com Let's Encrypt
certbot certonly --standalone -d seu-dominio.com.br
```

---

## 💡 Dicas Orion Host

1. **Use SSH sempre** - Mais rápido que cPanel
2. **Faça backups regularmente** - `./deploy.sh backup`
3. **Monitore logs** - `./deploy.sh logs`
4. **Atualize sistema** - `sudo apt update && apt upgrade`
5. **Use HTTPS sempre** - Renove certificados

---

## 📊 Comparação: Hospedagem vs Orion VPS

| Aspecto | Hospedagem Compartilhada | Orion VPS |
|---------|--------------------------|-----------|
| Docker | ❌ Não | ✅ Sim |
| Node.js | ❌ Limitado | ✅ Total |
| Certificado SSL | ✅ Automático | ✅ Let's Encrypt |
| SSH | ❌ Não | ✅ Sim |
| Root access | ❌ Não | ✅ Sim |
| Custo | Barato | Médio |
| Flexibilidade | Baixa | Alta |

---

## ✨ Resultado Final

Após fazer o deploy na Orion Host, você terá:

```
┌─────────────────────────────────────────┐
│                                         │
│   https://cleanerleidy.com.br ✅       │
│         (Frontend React)                │
│                                         │
│   https://api.cleanerleidy.com.br ✅  │
│      (Backend Node.js/Express)         │
│                                         │
│   Sem erro 403 ✅                      │
│   Com SSL/TLS ✅                       │
│   Com CORS ✅                          │
│                                         │
└─────────────────────────────────────────┘
```

---

**Qual é seu plano na Orion Host?** Me diga para eu criar um guia mais específico! 😊

