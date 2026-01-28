# 🎯 FUNCIONAR NO ORION HOST - Guia Decisão Rápida

**Data:** 28 de Janeiro de 2026

---

## 🔥 TESTE AGORA (5 segundos)

Abra seu terminal/CMD e execute:

```bash
ssh seu_usuario@seu_ip_ou_dominio
```

**Resultado:**
- ✅ Conectou = **VPS** → Vai para Opção 2
- ❌ Não conectou = **Compartilhada** → Vai para Opção 1

---

## 📋 OPÇÃO 1: HOSPEDAGEM COMPARTILHADA (cPanel)

**Características:**
- Sem SSH
- Sem Docker
- Sem root

**O que vai funcionar:**
- ✅ Site estático (frontend)
- ❌ Backend/API (vai precisar de outro servidor)

**Como fazer:**

```bash
# 1. Preparar
./preparar-orion.sh
# Escolher: 1

# 2. Build
cd frontend
npm install
npm run build

# 3. Upload para Orion Host
# Via File Manager ou FTP
# De: frontend/build/*
# Para: /home/seu_usuario/public_html/

# 4. Testar
# Abrir: https://cleanerleidy.com.br
```

**Resultado:**
```
✅ Site abre
✅ Interface funciona
❌ Login/API não funciona (precisa backend separado)
```

**Backend (escolha uma opção):**
```
1. Vercel (Recomendado)
   - Deploy grátis
   - Suporta Node.js
   - Rápido

2. Render.com
   - Deploy grátis
   - Suporta Node.js + PostgreSQL
   - Mais simples

3. Railway.app
   - Deploy pago (mas barato)
   - Suporta tudo
   - Melhor performance
```

---

## 📋 OPÇÃO 2: VPS (SSH + Docker)

**Características:**
- Com SSH
- Com Docker
- Com root

**O que vai funcionar:**
- ✅ Site completo (frontend + backend)
- ✅ API
- ✅ Login
- ✅ Banco de dados
- ✅ Tudo 100%

**Como fazer:**

```bash
# 1. Preparar
./preparar-orion.sh
# Escolher: 2

# 2. Build
cd frontend
npm install
npm run build

# 3. SSH no servidor
ssh seu_usuario@seu_ip_orion

# 4. Dentro do servidor
git clone https://github.com/Vanny345/1.git leidy-cleaner
cd leidy-cleaner

# 5. Deploy
./deploy.sh start

# 6. Testar
# Abrir: https://cleanerleidy.com.br
```

**Resultado:**
```
✅ Site funciona 100%
✅ API respondendo
✅ Login funcionando
✅ Tudo perfeito!
```

---

## 🎯 DECISÃO

### Diga-me AGORA qual tipo você tem:

1. **Compartilhada** → Vou te dar passo a passo
2. **VPS** → Vou te dar passo a passo

### Ou execute o teste:

```bash
ssh seu_usuario@seu_ip_ou_dominio
```

**Manda aqui o resultado!** 👇

---

## 💡 Se tiver dúvida:

1. Acesse painel Orion Host
2. Procura por: "Tipo de Hosting", "VPS", "Dedicado" ou "cPanel"
3. Ou procura no email do contrato

**Depois me diz e faço funcionar 100%!** 🚀

