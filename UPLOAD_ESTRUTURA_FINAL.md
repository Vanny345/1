# 📁 Estrutura de Pastas no Servidor - GUIA DEFINITIVO

**Data:** 28 de Janeiro de 2026

---

## ✅ Tudo Certo: Pastas Funcionam Normalmente!

Servidores Linux refletem a estrutura de pastas **exatamente como você organizar**:

```
Seu Computador:              Navegador Web:
frontend/build/              https://cleanerleidy.com.br/
├── index.html               └── (abre index.html)
├── static/                  
│   ├── css/                 https://cleanerleidy.com.br/static/css/
│   │   └── main.xxxxx.css   └── carrega estilos
│   ├── js/                  
│   │   └── main.xxxxx.js    https://cleanerleidy.com.br/static/js/
│   └── media/               └── carrega scripts
│       └── (imagens)        https://cleanerleidy.com.br/static/media/
```

---

## 🎯 Estrutura CORRETA para o Servidor

### Seu Computador (frontend/build):

```
frontend/build/
├── index.html                    ← Raiz
├── favicon.ico
├── manifest.json
└── static/                       ← Pasta
    ├── css/                      ← Pasta dentro de pasta
    │   └── main.xxxxx.css        ← Arquivo
    ├── js/
    │   └── main.xxxxx.js
    └── media/
        └── (imagens, fonts)
```

### No Servidor (public_html):

```
/home/seu_usuario/public_html/
├── index.html                    ← Raiz
├── favicon.ico
├── manifest.json
└── static/                       ← Pasta (mesma estrutura!)
    ├── css/
    │   └── main.xxxxx.css
    ├── js/
    │   └── main.xxxxx.js
    └── media/
        └── (imagens, fonts)
```

---

## ⚠️ REGRAS IMPORTANTES - NÃO ERRAR!

### 1️⃣ Maiúsculas/Minúsculas (DIFERENCIA!)

**❌ ERRADO:**
```
Pasta: /public_html/Static/css/    (com S maiúsculo)
Link: <link href="static/estilo.css">  (com s minúsculo)
Resultado: ERRO 404! ❌
```

**✅ CORRETO:**
```
Pasta: /public_html/static/css/    (tudo minúsculo)
Link: <link href="static/estilo.css">  (tudo minúsculo)
Resultado: FUNCIONA! ✅
```

**DICA:** React já cria com minúsculas (`static/`), então está bom!

---

### 2️⃣ Sem Espaços nos Nomes

**❌ ERRADO:**
```
Pasta: /public_html/Meus Documentos/
URL: https://cleanerleidy.com.br/Meus Documentos/
Resultado: ERRO! Espaço não é válido em URLs
```

**✅ CORRETO:**
```
Pasta: /public_html/meus-documentos/
Ou:    /public_html/meus_documentos/
URL: https://cleanerleidy.com.br/meus-documentos/
Resultado: FUNCIONA! ✅
```

---

### 3️⃣ Permissões (Automático Geralmente)

Pastas devem ter: **755**
Arquivos devem ter: **644**

```bash
# Se precisar ajustar manualmente:
chmod 755 /home/seu_usuario/public_html/static/
chmod 644 /home/seu_usuario/public_html/static/css/main.xxxxx.css
```

**Na maioria dos casos, Orion Host já configura isso automaticamente!**

---

## 🚀 PASSO A PASSO - UPLOAD CORRETO

### OPÇÃO 1: File Manager (Painel cPanel) - MAIS SEGURO

```
1. Login no painel Orion Host

2. Procurar: File Manager
   (Geralmente em: Arquivos → Gerenciador de Arquivos)

3. Navegação:
   ├─ Home
   └─ public_html/ ← Selecionar

4. Garantir que está em public_html/
   (Barra de caminho deve mostrar: /home/seu_usuario/public_html)

5. Copiar estrutura exatamente:
   ├─ Copiar index.html
   ├─ Copiar favicon.ico
   ├─ Copiar manifest.json
   └─ Copiar PASTA static/
       └─ Com TUDO dentro (css, js, media)

6. Upload:
   - Botão: Upload
   - Selecionar arquivos
   - Upload

7. Verificar permissões:
   - Clique direito em pasta
   - Propriedades
   - Permissões: 755 (automático)
   - Arquivos: 644 (automático)
```

---

### OPÇÃO 2: FTP/SFTP (FileZilla) - MAIS RÁPIDO

```
1. Abrir FileZilla

2. Conectar:
   Host: ftp.cleanerleidy.com.br
         ou
         seu-ip-orion
   
   Usuário: seu_usuario_orion
   Senha: sua_senha
   Porta: 21 (FTP) ou 22 (SFTP)

3. Navegação:
   LADO ESQUERDO (Seu PC):
   ├─ Procurar: frontend/build/

   LADO DIREITO (Servidor):
   ├─ Navegar até: /home/seu_usuario/public_html/

4. Arrastar e soltar:
   - Selecionar TUDO de build/
   - Arrastar para public_html/
   - FileZilla cria pastas automaticamente
   - Pronto!

5. Verificar:
   - Lado direito deve mostrar:
     ├─ index.html
     ├─ favicon.ico
     ├─ manifest.json
     └─ static/
```

---

### OPÇÃO 3: SSH + Comandos Linux (Mais Técnico)

```bash
# 1. Conectar SSH
ssh seu_usuario@seu-ip-orion

# 2. Ir para public_html
cd public_html

# 3. Limpar (se tiver coisa velha)
rm -rf *

# 4. Copiar arquivos (do seu PC)
# No seu PC em outro terminal:
scp -r frontend/build/* seu_usuario@seu-ip:/home/seu_usuario/public_html/

# 5. Verificar no servidor
ls -la
# Deve mostrar:
# index.html
# favicon.ico
# manifest.json
# static/

# 6. Verificar permissões
chmod -R 755 .
find . -type f -exec chmod 644 {} \;

# 7. Pronto!
```

---

## ✅ CHECKLIST PRÉ-UPLOAD

Antes de enviar, verificar no seu computador:

- [ ] Fez `npm run build`?
- [ ] Pasta `frontend/build/` existe?
- [ ] Dentro tem: `index.html`?
- [ ] Dentro tem: `static/` (pasta)?
- [ ] `static/` tem: `css/`?
- [ ] `static/` tem: `js/`?
- [ ] `static/` tem: `media/` ou imagens?
- [ ] Nenhuma pasta com MAIÚSCULAS?
- [ ] Nenhuma pasta com ESPAÇOS?

---

## ✅ CHECKLIST PÓS-UPLOAD

Depois de enviar, verificar no servidor:

```bash
# SSH no servidor e execute:
cd public_html
ls -la

# Deve mostrar:
-rw-r--r-- index.html
-rw-r--r-- favicon.ico
-rw-r--r-- manifest.json
drwxr-xr-x static/

# Verificar pasta static/
cd static
ls -la

# Deve mostrar:
drwxr-xr-x css/
drwxr-xr-x js/
drwxr-xr-x media/

# Verificar se arquivos existem
cd css && ls -la   # main.xxxxx.css
cd ../js && ls -la # main.xxxxx.js
cd ../media && ls -la # imagens
```

---

## 🧪 TESTAR NO NAVEGADOR

### 1️⃣ Acessar Site

```
https://cleanerleidy.com.br
```

Deve aparecer:
- ✅ Dashboard carregando
- ✅ Logo/favicon visível
- ✅ Estilos CSS aplicados
- ✅ Sem erros no console

---

### 2️⃣ Abrir DevTools (F12)

**Aba Network:**
- ✅ Deve mostrar requisições para `static/css/`
- ✅ Deve mostrar requisições para `static/js/`
- ✅ Todos com status **200**

**Se status 404:**
- ❌ Verifique maiúsculas/minúsculas
- ❌ Verifique caminho das pastas
- ❌ Verifique se copiou `static/` inteiro

---

### 3️⃣ Aba Console

- ✅ Sem erros vermelhos
- ✅ Sem `404 Not Found`
- ✅ Tudo carregando normalmente

---

## 🚨 ERROS COMUNS E SOLUÇÕES

### ❌ Erro: "Cannot GET /"

**Causa:** `index.html` não está em `public_html/`

**Solução:**
```bash
# Verificar
ls -la public_html/ | grep index.html

# Se não tiver, copiar:
cp frontend/build/index.html public_html/
```

---

### ❌ Erro: "CSS não está carregando" ou "Página sem estilos"

**Causa:** Pasta `static/` não foi copiada

**Solução:**
```bash
# Verificar
ls -la public_html/static/

# Se não tiver, copiar:
cp -r frontend/build/static/* public_html/static/
```

---

### ❌ Erro: 404 em "/Static/css/main.css"

**Causa:** `Static` com S maiúsculo

**Solução:**
```bash
# Renomear
mv public_html/Static public_html/static

# Ou remover e recopiar:
rm -rf public_html/Static
cp -r frontend/build/static public_html/
```

---

### ❌ Erro: "Permission denied"

**Causa:** Permissões erradas

**Solução:**
```bash
chmod -R 755 public_html/
find public_html -type f -exec chmod 644 {} \;
```

---

## 📋 RESUMO FINAL

| Passo | O Que Fazer | Comando/Ação |
|-------|------------|-------------|
| 1 | Build do React | `npm run build` |
| 2 | Verificar estrutura | `ls -la frontend/build/` |
| 3 | Upload para servidor | FTP/SCP/File Manager |
| 4 | Verificar no servidor | `ls -la public_html/` |
| 5 | Testar no navegador | `https://cleanerleidy.com.br` |
| 6 | Abrir DevTools | F12 → Network → Verificar status 200 |

---

## ✨ RESULTADO FINAL

Após tudo pronto:

```
✅ https://cleanerleidy.com.br → Site abre
✅ Dashboard carrega
✅ Estilos CSS aplicados
✅ JavaScript funcionando
✅ Sem erros 404
✅ Sem erros de permissão
✅ Site funciona de verdade!
```

---

**Qual método você prefere para upload?**
- File Manager (Painel)
- FTP (FileZilla)
- SSH (Comandos)

Me avisa e te dou o passo a passo EXATO para sua situação! 👍

