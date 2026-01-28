# 📦 Preparar Código para Hospedagem

**Situação:** Hospedagem já está funcionando. Só precisa dos códigos prontos!

---

## 🎯 O Que Fazer

### OPÇÃO 1: Build Frontend (RECOMENDADO)

Se você só precisa do **site (frontend)**:

```bash
# 1. Entrar na pasta
cd frontend

# 2. Instalar dependências
npm install

# 3. Fazer build (cria pasta otimizada)
npm run build

# 4. A pasta "build" tem tudo pronto!
```

**Resultado:** Pasta `frontend/build` com site pronto para hospedagem

---

### OPÇÃO 2: Copiar Todo o Backend + Frontend

Se precisa de **backend + frontend juntos**:

```bash
# Tudo já está aqui!
ls -la

# Você tem:
# - backend/        (Node.js/Express)
# - frontend/build  (React compilado)
# - nginx.conf      (Configuração web)
# - docker-compose.production.yml
# - deploy.sh
```

---

## 📁 Estrutura de Arquivos Pronta

```
leidy-cleaner/
├── backend/                    ← Código Node.js
│   ├── src/
│   ├── package.json
│   ├── .env.production
│   └── Dockerfile
├── frontend/build/             ← Site compilado (pronto para web)
│   ├── index.html
│   ├── static/
│   └── ...
├── nginx.conf                  ← Configuração do servidor web
├── docker-compose.production.yml
└── deploy.sh
```

---

## 🚀 Para Colocar na Hospedagem

### Se for cPanel/FTP:

```bash
1. Fazer build:
   cd frontend
   npm run build

2. Via FTP, copiar pasta "build" para:
   public_html/

3. Backend (se usar) em servidor separado
```

### Se for VPS (SSH):

```bash
1. SSH no servidor
2. Git clone do repositório
3. npm run build
4. ./deploy.sh start
```

---

## 📋 O Que Enviar

**Opção A: Só Frontend (Simples)**
```
📁 frontend/build/
   └─ Todos os arquivos aqui
```

**Opção B: Completo (Docker)**
```
📁 Projeto inteiro:
   ├─ backend/
   ├─ frontend/build/
   ├─ nginx.conf
   ├─ docker-compose.production.yml
   └─ deploy.sh
```

---

## ✅ Checklist Pronto

- [ ] Frontend foi compilado (`npm run build`)?
- [ ] Pasta `build/` existe?
- [ ] Arquivos foram copiados para hospedagem?
- [ ] Certificado SSL está configurado?
- [ ] DNS aponta para servidor?
- [ ] Site abre em https://cleanerleidy.com.br?

---

## 📞 Próximo Passo

**Me diga:**
1. ✅ Você tem FTP ou SSH?
2. ✅ Qual é o endereço/IP da hospedagem?
3. ✅ Qual parte quer colocar (só frontend ou tudo)?

Aí posso preparar direto para você! 🚀

