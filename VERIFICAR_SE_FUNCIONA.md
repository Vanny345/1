# ✅ Verificar se Site Está Funcionando Localmente

---

## 🧪 Teste 1: Frontend (Mais Fácil)

### Passo 1: Abra Terminal

```bash
cd frontend
npm install
npm start
```

### Passo 2: Verificar se Funciona

**Resultado esperado:**

```
compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.xxx:3000
```

### ✅ Se Aparecer Isso = FUNCIONA!

- Navegador abre automaticamente
- Você vê a página do site
- Dashboard, Login, etc estão lá

### ❌ Se NÃO Aparecer:

- Porta 3000 bloqueada
- Executar: `./limpar.sh`
- Tentar de novo

---

## 🧪 Teste 2: Backend (Requer PostgreSQL)

### Passo 1: Abra Novo Terminal

```bash
cd backend
npm install
npm run dev
```

### Passo 2: Verificar se Funciona

**Resultado esperado:**

```
🚀 Server running on port 5000
Environment: development
```

### ✅ Se Aparecer Isso = FUNCIONA!

### ❌ Se Aparecer Erro:

- Banco de dados não configurado
- Ver: TESTE_LOCAL.md

---

## 🎯 Teste 3: Rápido (Sem Instalar Nada)

```bash
# Testar se Node.js está instalado
node --version

# Testar se npm está instalado
npm --version

# Testar se Git está instalado
git --version
```

**Se tudo retornar versão = OK!**

---

## 📱 Teste 4: URL no Navegador

Copie e cole uma dessas:

### Frontend (Requer ter rodado `npm start`)
```
http://localhost:3000
```

**Se abrir = FUNCIONA! ✅**

**Se não abrir = NÃO está rodando ❌**

---

### Backend Health Check (Requer ter rodado `npm run dev`)
```
http://localhost:5000/health
```

**Se aparecer JSON = FUNCIONA! ✅**

```json
{"status":"Server is running"}
```

**Se erro de conexão = NÃO está rodando ❌**

---

## 🎯 Resumo Rápido

| O que? | Como Testar? | Esperado |
|--------|-------------|----------|
| **Node.js** | `node --version` | Versão (ex: v18.0.0) |
| **npm** | `npm --version` | Versão (ex: 9.0.0) |
| **Frontend** | `cd frontend && npm start` | Abre http://localhost:3000 |
| **Backend** | `cd backend && npm run dev` | Mostra "🚀 Server running" |
| **Health Check** | Abrir http://localhost:5000/health | Retorna JSON |
| **Login** | Ir em http://localhost:3000 → Login | Consegue fazer login |

---

## ✨ Como Saber que FUNCIONA:

✅ Abriu http://localhost:3000 no navegador  
✅ Vê o site/dashboard carregado  
✅ Sem erro 403  
✅ Consegue clicar em buttons  
✅ Consegue fazer login (com credenciais corretas)  

---

## 🚀 Próximo Passo

Depois que confirmar que funciona localmente:

```bash
git add .
git commit -m "Site funcionando localmente"
git push
```

Depois faz deploy no Orion Host! 🎉

---

**Você já tentou rodar?** Qual foi o resultado? 👍

