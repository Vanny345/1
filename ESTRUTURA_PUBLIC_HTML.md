# 📁 Estrutura Correta para public_html - React

**Importante:** Este projeto usa **React** (framework), não é site estático!

---

## 🎯 Como Funciona a public_html

A pasta `public_html` (ou `www`) é a **raiz pública do seu site**:

```
public_html/
├── index.html           ← OBRIGATÓRIO (arquivo principal)
├── static/
│   ├── css/            ← Estilos compilados
│   ├── js/             ← JavaScript compilado
│   └── media/          ← Imagens, fontes, etc
└── favicon.ico         ← Ícone do site
```

---

## 🔄 O Que o React `npm run build` Cria

Quando você executa `npm run build`, React já cria a estrutura correta:

```bash
npm run build

# Resultado:
frontend/build/
├── index.html          ← Arquivo principal
├── static/
│   ├── css/           ← main.xxxxx.css (minificado)
│   ├── js/            ← main.xxxxx.js (minificado)
│   └── media/         ← imagens, fonts
├── favicon.ico
└── manifest.json
```

---

## ✅ PASSO A PASSO CORRETO

### PASSO 1: Fazer Build do React

```bash
cd frontend
npm install
npm run build
```

**Resultado:** Pasta `frontend/build/` com site pronto

---

### PASSO 2: Estrutura na Hospedagem

Copiar **TUDO** da pasta `build` para `public_html`:

```
public_html/                    ← Raiz do site
├── index.html                  ← ⭐ OBRIGATÓRIO
├── static/
│   ├── css/
│   │   └── main.xxxxx.css
│   ├── js/
│   │   └── main.xxxxx.js
│   └── media/
│       └── (imagens, fonts)
├── favicon.ico
└── manifest.json
```

---

### PASSO 3: Estrutura de Segurança

**Arquivos sensíveis (fora de public_html):**

```
/home/seu_usuario/        ← Nível acima de public_html
├── .env.production        ← NÃO copiar para public_html!
├── .env.local             ← NÃO copiar para public_html!
├── backend/               ← Se usar (em outro lugar)
└── public_html/           ← Só o que é público
    ├── index.html
    ├── static/
    └── ...
```

---

## 🚀 FORMAS DE COLOCAR NA HOSPEDAGEM

### FORMA 1: Via FTP (FileZilla) - MAIS SIMPLES

```
1. Abrir FileZilla

2. Conectar:
   Host: ftp.seu-dominio.com.br
   Usuário: seu_usuario
   Senha: sua_senha
   Porta: 21

3. Esquerda: Seu computador
   Direita: Servidor

4. Navegar até:
   /home/seu_usuario/public_html

5. Arrastar arquivos:
   - Selecionar TUDO de frontend/build/
   - Arrastar para public_html/
   - Pronto!
```

---

### FORMA 2: Via SSH + SCP (Linux/Mac)

```bash
# 1. Colocar arquivo por arquivo
scp frontend/build/index.html seu_usuario@seu-ip:/home/seu_usuario/public_html/

# 2. Ou colocar pasta inteira
scp -r frontend/build/* seu_usuario@seu-ip:/home/seu_usuario/public_html/

# 3. Ou compactar primeiro (mais rápido)
cd frontend/build
tar -czf site.tar.gz *
scp site.tar.gz seu_usuario@seu-ip:/home/seu_usuario/public_html/

# 4. No servidor, descompactar
ssh seu_usuario@seu-ip
cd public_html
tar -xzf site.tar.gz
rm site.tar.gz
```

---

### FORMA 3: Via cPanel File Manager

```
1. Login no cPanel
2. Procurar: File Manager
3. Selecionar: public_html
4. Botão: Upload
5. Selecionar arquivos de frontend/build/
6. Upload
7. Pronto!
```

---

## 🔍 Verificação Pós-Upload

Depois de colocar os arquivos, verificar:

```bash
# No servidor SSH, listar arquivos
ls -la /home/seu_usuario/public_html/

# Deve mostrar:
# index.html      ✅
# static/         ✅
# favicon.ico     ✅
# manifest.json   ✅
```

---

## 🧪 Testar no Navegador

Após upload, acessar:

```
https://cleanerleidy.com.br
```

**Deve aparecer:**
- ✅ Site carrega normalmente
- ✅ Logo/favicon visível
- ✅ Estilos CSS aplicados
- ✅ JavaScript funcionando
- ✅ Dashboard carregando

**Se aparecer erro:**
- ❌ Verifique se `index.html` está em `public_html`
- ❌ Verifique se `static/` está em `public_html`
- ❌ Verifique permissões (755 para pastas, 644 para arquivos)

---

## 🔐 Segurança - Arquivos NÃO Públicos

Se você tiver backend (Node.js), mantenha fora:

```
❌ NÃO coloque na public_html:
   - .env (variáveis de ambiente)
   - .env.production
   - backend/ (código Node.js)
   - package.json
   - node_modules/
   - .git/

✅ Coloque na public_html:
   - frontend/build/* (tudo)
   - index.html
   - static/
   - favicon.ico
```

---

## 📋 Checklist Final

- [ ] Fez `npm run build`?
- [ ] Pasta `frontend/build/` foi criada?
- [ ] Copiou TUDO de `build/` para `public_html/`?
- [ ] `index.html` está em `public_html/`?
- [ ] `static/` está em `public_html/`?
- [ ] Acessou `https://cleanerleidy.com.br`?
- [ ] Site carregou?
- [ ] Sem erros 404?

---

## 🎯 Estrutura Final Esperada

```
Hospedagem Orion Host
├── /home/seu_usuario/
│   ├── public_html/                ← ⭐ RAIZ DO SITE
│   │   ├── index.html              ← Abre quando acessa domínio
│   │   ├── static/
│   │   │   ├── css/                ← Estilos
│   │   │   ├── js/                 ← Scripts
│   │   │   └── media/              ← Imagens, fonts
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   └── (outros arquivos - não públicos)
│       ├── .env.production
│       ├── backend/ (se tiver)
│       └── ...
```

---

## ✨ RESULTADO

Depois de tudo pronto:

```
https://cleanerleidy.com.br → Abre index.html
├── Carrega CSS
├── Carrega JavaScript
├── Exibe Dashboard
└── Funciona normalmente!
```

---

**Pronto! Estrutura correta para React em hospedagem compartilhada!** 🚀

Você quer fazer agora? Me avisa quando estiver pronto! 👍

