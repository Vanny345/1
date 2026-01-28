# 📦 Como Enviar Arquivos para Orion Host

**Data:** 28 de Janeiro de 2026

---

## 🎯 Formas de Enviar Arquivos

### 1️⃣ FORMA FÁCIL: Via Git (RECOMENDADO)
### 2️⃣ FORMA: Via SCP (Seguro)
### 3️⃣ FORMA: Via FTP (Se tiver acesso)
### 4️⃣ FORMA: Via cPanel (Se hospedagem compartilhada)

---

## ✅ FORMA 1: Via Git (SUPER FÁCIL - RECOMENDADO)

**Tempo:** 5 minutos

### Passo 1: No seu computador, confirme que tem Git

```bash
git --version
```

### Passo 2: Conectar ao Orion Host via SSH

**No Windows (use Git Bash ou PowerShell):**
```bash
ssh seu_usuario@seu_ip_orion_host
# Ou se tiver host:
ssh seu_usuario@seu_dominio.com.br
```

**No Mac/Linux:**
```bash
ssh seu_usuario@seu_ip_orion_host
```

**Exemplo real:**
```bash
ssh root@192.168.1.100
# Vai pedir senha
```

### Passo 3: No servidor Orion, clonar o repositório

Após conectar no SSH:

```bash
# Ir para pasta home
cd /home

# Se for root
cd /root

# Clonar repositório
git clone https://github.com/FransMalifra/1.git leidy-cleaner

# Entrar na pasta
cd leidy-cleaner

# Ver se tudo foi clonado
ls -la
```

### Passo 4: Pronto! Arquivos já estão no Orion

Os arquivos estão em `/home/leidy-cleaner/` ou `/root/leidy-cleaner/`

---

## 📋 Checklist Git

- [ ] Conseguiu conectar via SSH no Orion?
- [ ] Tem Git instalado no Orion? (vem automático)
- [ ] Repositório foi clonado?
- [ ] Consegue ver arquivos com `ls -la`?

**Se tudo OK, vá para: PRÓXIMO PASSO (configurar deploy)**

---

## ⚡ FORMA 2: Via SCP (Se Git não funcionar)

**SCP = Secure Copy (copia arquivos de forma segura)**

### Do seu computador, enviar pasta inteira:

**Windows (PowerShell):**
```powershell
scp -r C:\caminho\para\1 seu_usuario@seu_ip_orion_host:/home/leidy-cleaner
```

**Mac/Linux:**
```bash
scp -r ~/caminho/para/1 seu_usuario@seu_ip_orion_host:/home/leidy-cleaner
```

### Ou enviar arquivo único:

```bash
scp seu_arquivo.txt seu_usuario@seu_ip_orion_host:/home/
```

---

## 🔧 FORMA 3: Via FTP/SFTP

**Se Orion Host tiver painel cPanel:**

### Obter credenciais FTP

1. Acesse painel cPanel do Orion Host
2. Procure por "FTP Accounts" ou "File Manager"
3. Pegue: Host, Usuário, Senha, Porta

### Usando FileZilla (Gratuito)

```
1. Baixe: https://filezilla-project.org/
2. Abra e vá em: File → Site Manager
3. Adicione novo site:
   - Host: seu_ftp_host
   - Porta: 21 (ou 22 para SFTP)
   - Usuário: seu_usuario
   - Senha: sua_senha
4. Conectar
5. Arrastar arquivos da esquerda (seu PC) 
         para direita (servidor Orion)
```

---

## 📁 FORMA 4: Via cPanel File Manager

Se tem hospedagem compartilhada:

```
1. Acesse painel cPanel
2. Procure "File Manager"
3. Selecione diretório público_html
4. Clique "Upload"
5. Selecione arquivos/pastas
6. Upload começará automaticamente
```

---

## 🎯 MÉTODO RECOMENDADO - PASSO A PASSO COMPLETO

### Seu Computador (Windows/Mac/Linux)

**Passo 1:** Abra terminal/PowerShell

```bash
# Ir para pasta do projeto
cd C:\Users\seu_usuario\Desktop\1
# ou
cd ~/Desktop/1
```

**Passo 2:** Conectar ao Orion Host via SSH

```bash
ssh seu_usuario@seu_ip_orion_host
```

Vai aparecer:
```
The authenticity of host '192.168.1.100' can't be established.
ECDSA key fingerprint is...
Are you sure you want to continue connecting (yes/no)?
```

**Digite:** `yes`

Depois vai pedir senha - **Digite sua senha do Orion**

### Dentro do Servidor Orion Host (depois de conectado)

**Passo 3:** Verificar onde estamos

```bash
pwd
# Deve mostrar: /root ou /home/seu_usuario
```

**Passo 4:** Clonar repositório

```bash
# Opção A: Se repositório é público
git clone https://github.com/FransMalifra/1.git leidy-cleaner

# Opção B: Se precisa autenticação
git clone https://seu_usuario:seu_token@github.com/FransMalifra/1.git leidy-cleaner
```

**Passo 5:** Entrar na pasta

```bash
cd leidy-cleaner
ls -la
```

Deve mostrar:
```
CHECKLIST_IMPLEMENTACAO.md
COMO_COMECAR.md
backend/
frontend/
docker-compose.yml
nginx.conf
... etc
```

**Passo 6:** Verificar estrutura

```bash
# Ver se backend está lá
ls backend/

# Ver se frontend está lá
ls frontend/

# Ver se docker-compose.yml existe
ls docker-compose.production.yml
```

---

## ✅ Confirmar que Tudo Está Lá

Após clonar/enviar, execute no servidor:

```bash
# Contar quantos arquivos
find . -type f | wc -l

# Ver tamanho total
du -sh .

# Listar estrutura
tree -L 2
```

---

## 🐛 Troubleshooting

### Erro: "Permission denied (publickey)"

**Solução:**
```bash
# Verificar se tem SSH key configurada
cat ~/.ssh/authorized_keys

# Se não existir, criar:
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
```

### Erro: "Command not found: git"

**Solução:**
```bash
# Instalar Git
apt update && apt install git -y

# Verificar
git --version
```

### Erro: "Operation not permitted"

**Solução:**
```bash
# Entrar como root se não estiver
su -
# ou
sudo su
```

### Erro ao clonar: "fatal: could not read Username"

**Solução:**

Se repositório é privado, use token:

```bash
# Criar token no GitHub:
# GitHub → Settings → Developer settings → Personal access tokens

# Depois:
git clone https://seu_usuario:seu_token@github.com/FransMalifra/1.git
```

---

## 📊 Estrutura Final no Orion Host

```
/home/leidy-cleaner/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── ...
│   ├── package.json
│   ├── Dockerfile
│   └── .env.production
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── docs/
├── nginx.conf
├── docker-compose.yml
├── docker-compose.production.yml
├── deploy.sh
├── test-deploy.sh
└── ... outros arquivos
```

---

## ✨ Próximo Passo Após Enviar Arquivos

Depois que tudo estiver no Orion Host, você vai:

```bash
# 1. Configurar variáveis
nano backend/.env.production

# 2. Adicionar certificados SSL
mkdir -p ssl
# Copiar cert.pem e key.pem

# 3. Validar
./test-deploy.sh

# 4. Deploy
./deploy.sh start

# 5. Verificar
./deploy.sh health
```

---

## 🎯 RESUMO - Qual Método Usar?

| Método | Quando Usar | Facilidade |
|--------|------------|-----------|
| **Git** | Repositório público | ⭐⭐⭐⭐⭐ Super fácil |
| **SCP** | Arquivo/pasta | ⭐⭐⭐⭐ Fácil |
| **FTP** | cPanel disponível | ⭐⭐⭐ Médio |
| **cPanel** | Hospedagem compartilhada | ⭐⭐ Chato |

**RECOMENDAÇÃO:** Use **Git** → é 1 comando e pronto!

---

## 📱 Comandos SSH Mais Usados

```bash
# Conectar
ssh seu_usuario@seu_ip

# Sair do SSH
exit

# Listar arquivos
ls -la

# Ver caminho atual
pwd

# Ir para pasta
cd /home/leidy-cleaner

# Criar pasta
mkdir nova_pasta

# Remover arquivo
rm arquivo.txt

# Remover pasta
rm -rf pasta

# Mover arquivo
mv arquivo.txt novo_local/

# Copiar arquivo
cp arquivo.txt copia.txt

# Editar arquivo
nano arquivo.txt
# Sair: Ctrl+X → Y → Enter
```

---

## 🔐 Segurança

### Adicionar chave SSH (mais seguro que senha)

**No seu computador:**
```bash
ssh-keygen -t rsa -b 4096
# Vai criar ~/.ssh/id_rsa e id_rsa.pub
```

**Copiar para Orion Host:**
```bash
ssh-copy-id seu_usuario@seu_ip_orion_host
```

**Agora consegue conectar sem digitar senha:**
```bash
ssh seu_usuario@seu_ip_orion_host
# Conecta direto!
```

---

## ✅ Checklist Final

- [ ] Conectou via SSH no Orion Host?
- [ ] Clonou/enviou repositório?
- [ ] Consegue ver pasta `leidy-cleaner`?
- [ ] Consegue listar arquivos com `ls -la`?
- [ ] Backend está lá?
- [ ] Frontend está lá?
- [ ] Próximo passo: configurar `.env.production`

**Tudo OK? Avança para próxima etapa!** 🚀

