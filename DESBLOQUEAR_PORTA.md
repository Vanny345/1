# 🔓 Destravar Porta Encaminhada

**Problema:** "Conectando à porta encaminhada... e não sai dela"

---

## ⚡ Solução Rápida

### Passo 1: Parar Tudo

**Pressione:**
```
Ctrl + C
```

Se não funcionar, **força:**

```
Ctrl + Shift + C
```

### Passo 2: Fechar Terminal e Abrir Novo

```
Feche o terminal completamente
Abra um novo terminal
```

### Passo 3: Matar Processos Travados

```bash
# Ver processos em uso
ps aux | grep node

# Matar todos os node
pkill -9 node

# Verificar portas
lsof -i :3000
lsof -i :5000
lsof -i :5432
```

---

## 🔧 Solução Por Sistema Operacional

### Windows

```powershell
# Ver portas em uso
netstat -ano | findstr LISTEN

# Matar processo (substitua 12345 pelo PID)
taskkill /PID 12345 /F

# Ou matar tudo Node.js
taskkill /IM node.exe /F
```

### Mac

```bash
# Ver processo na porta 3000
lsof -i :3000

# Matar (substitua 12345 pelo PID)
kill -9 12345

# Ou de uma vez
killall node
```

### Linux (Ubuntu)

```bash
# Ver processo
sudo lsof -i :3000

# Matar
sudo kill -9 12345

# Ou de uma vez
pkill -9 node
```

---

## 🎯 Tentar de Novo

Depois de matar os processos:

### Opção 1: Frontend Apenas

```bash
# Novo terminal
cd frontend
npm start
```

### Opção 2: Backend + Frontend

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2 (novo)
cd frontend
npm start
```

---

## 🚨 Se Ainda Ficar Travado

### Verificar se a Porta Está Realmente Bloqueada

```bash
# Tentar conectar
curl http://localhost:3000
# ou
curl http://localhost:5000
```

Se retornar erro como `Connection refused`:
- A porta está livre, mas serviço não respondeu
- Tente rodar novamente

Se retornar HTML ou JSON:
- Serviço está rodando
- Use browser: http://localhost:3000

### Usar Portas Diferentes

Se 3000 ou 5000 estão bloqueadas:

```bash
# Frontend em porta 4000
PORT=4000 npm start

# Backend em porta 5001
PORT=5001 npm run dev
```

Acesse:
- Frontend: http://localhost:4000
- Backend: http://localhost:5001

---

## 📋 Checklist para Desbloquear

- [ ] Pressionou Ctrl+C?
- [ ] Fechou e abriu novo terminal?
- [ ] Matou processos com `pkill -9 node`?
- [ ] Verificou com `lsof -i :3000`?
- [ ] Esperou 2 segundos antes de rodar de novo?
- [ ] Tentou porta diferente?

---

## 💡 Dica: Script para Limpar Tudo

Crie um arquivo `limpar.sh`:

```bash
#!/bin/bash
echo "🧹 Limpando processos travados..."
pkill -9 node || true
pkill -9 npm || true
sleep 2
echo "✅ Pronto! Tudo limpo"
```

Use:
```bash
chmod +x limpar.sh
./limpar.sh
```

---

## 🔍 Debug: Ver O Que Está Acontecendo

```bash
# Ver logs detalhados
npm start --verbose

# Com debugging
DEBUG=* npm start

# Ver tudo que entra/sai na rede
sudo tcpdump -i lo -n port 3000
```

---

## ✨ Próximo Passo

Depois que desbloquear:

1. **Tente frontend:**
   ```bash
   cd frontend
   npm start
   ```

2. **Abra navegador:**
   ```
   http://localhost:3000
   ```

3. **Se funcionar, pronto!**
   - Dashboard carrega ✅
   - Sem erro 403 ✅

---

## 📞 Se Continuar Travado

Me diga:
1. **Qual é a mensagem exata?**
2. **Qual sistema? (Windows/Mac/Linux)**
3. **Qual terminal está usando?**
4. **Qual comando executou quando travou?**

Assim posso ajudar melhor! 🚀

