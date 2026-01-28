# ✅ Checklist de Deploy - Erro 403

**Data de Criação:** 28 de Janeiro de 2026

---

## 🎯 Antes de Fazer Deploy

### ✅ Fase 1: Preparação

- [ ] Ler `CORRECAO_ERRO_403.md` completamente
- [ ] Ler `DEPLOY_PRODUCAO_CORRIGIDO.md` completamente
- [ ] Clonar repositório no servidor de produção
- [ ] Instalar Docker e Docker Compose no servidor

### ✅ Fase 2: Configuração

- [ ] Executar `./test-deploy.sh` localmente (ou no servidor)
- [ ] Criar pasta `ssl/`
- [ ] Adicionar certificados em `ssl/cert.pem` e `ssl/key.pem`
- [ ] Editar `backend/.env.production`:
  - [ ] DATABASE_URL (banco PostgreSQL)
  - [ ] JWT_SECRET (gerar string segura de 32+ caracteres)
  - [ ] STRIPE_SECRET_KEY
  - [ ] MERCADOPAGO_ACCESS_TOKEN
  - [ ] SENDGRID_API_KEY
  - [ ] Outros serviços necessários

### ✅ Fase 3: Compilação

- [ ] Executar `./test-deploy.sh` novamente
- [ ] Confirmar que todas as imagens Docker foram buildadas

### ✅ Fase 4: Configuração DNS

- [ ] Configurar DNS para apontar `cleanerleidy.com.br` → seu servidor
- [ ] Configurar DNS para apontar `www.cleanerleidy.com.br` → seu servidor
- [ ] Configurar DNS para apontar `api.cleanerleidy.com.br` → seu servidor
- [ ] Aguardar propagação DNS (até 24 horas)

### ✅ Fase 5: Deploy

- [ ] Executar `./deploy.sh start`
- [ ] Aguardar 30-60 segundos para containers iniciarem
- [ ] Executar `./deploy.sh health` e confirmar ✅ para todos

### ✅ Fase 6: Testes Pós-Deploy

- [ ] Frontend carrega: `curl https://cleanerleidy.com.br/`
- [ ] Backend responde: `curl https://api.cleanerleidy.com.br/health`
- [ ] Login funciona (testar no navegador)
- [ ] Criar booking (testar no navegador)
- [ ] Abrir DevTools no navegador
  - [ ] Sem erros de CORS
  - [ ] Sem erros de conexão
  - [ ] Sem erros de certificado SSL

### ✅ Fase 7: Monitoramento

- [ ] Verificar logs regularmente: `./deploy.sh logs`
- [ ] Configurar backups: `./deploy.sh backup`
- [ ] Monitorar performance
- [ ] Testar recuperação de falhas

---

## 🚨 Troubleshooting - Se Der Erro 403 Novamente

### Passo 1: Verificar CORS
```bash
# No servidor
curl -H "Origin: https://cleanerleidy.com.br" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS https://api.cleanerleidy.com.br/api/auth/login -v

# Deve retornar 200 com headers de CORS
```

### Passo 2: Verificar Logs
```bash
./deploy.sh logs
# Procure por erros do nginx ou backend
```

### Passo 3: Verificar Containers
```bash
./deploy.sh health
# Se algum estiver DOWN, reiniciar: ./deploy.sh restart
```

### Passo 4: Verificar Certificados
```bash
ls -la ssl/
openssl x509 -in ssl/cert.pem -text -noout
```

### Passo 5: Verificar Variáveis
```bash
docker-compose -f docker-compose.production.yml config | grep FRONTEND_URL
docker-compose -f docker-compose.production.yml config | grep API_URL
```

---

## 📊 Comandos Úteis

```bash
# Iniciar sistema
./deploy.sh start

# Parar sistema
./deploy.sh stop

# Reiniciar
./deploy.sh restart

# Ver logs
./deploy.sh logs

# Verificar saúde
./deploy.sh health

# Fazer backup BD
./deploy.sh backup

# Shell do backend
./deploy.sh shell

# Executar migração BD
./deploy.sh shell
# Dentro do shell: npx prisma migrate deploy

# Ver container específico
docker ps
docker logs -f leidy_backend_prod
docker logs -f leidy_nginx_prod

# Recriar imagens
docker-compose -f docker-compose.production.yml build --no-cache
```

---

## 📞 Erros Comuns

### ❌ "Certificado SSL inválido"
**Solução:** Renove certificado, coloque em `ssl/` e reinicie nginx
```bash
./deploy.sh restart
```

### ❌ "Conexão recusada no backend"
**Solução:** Backend pode estar fora. Verifique:
```bash
./deploy.sh health
./deploy.sh logs
```

### ❌ "Database connection failed"
**Solução:** PostgreSQL não está acessível
```bash
docker-compose -f docker-compose.production.yml exec postgres psql -U postgres -c "SELECT 1"
```

### ❌ "CORS: Access-Control-Allow-Origin missing"
**Solução:** Nginx.conf não está lendo CORS headers corretamente
```bash
./deploy.sh restart
# Ou verifique: cat nginx.conf | grep -i cors
```

---

## 🎯 Proximas Etapas (Pós-Deploy)

1. **Backup & Recuperação**
   ```bash
   ./deploy.sh backup
   ```

2. **Monitoramento**
   - Configurar alertas
   - Monitorar logs
   - Verificar performance

3. **Otimizações**
   - Ajustar rate limits
   - Configurar WAF
   - CDN para assets

4. **Testes Contínuos**
   - Testes de carga
   - Testes de segurança
   - Testes de recuperação

---

## ✨ Checklist Final

- [ ] Todos os testes passaram
- [ ] CORS funcionando (sem erros no console)
- [ ] Login funcionando
- [ ] Bookings funcionando
- [ ] Pagamentos funcionando
- [ ] Notificações funcionando
- [ ] Certificado SSL válido
- [ ] Backup configurado
- [ ] Logs sendo monitorados

**Se tudo acima está ✅, o deploy foi um sucesso!** 🎉

---

**Data do Deploy:** _______________  
**Versão:** _______________  
**Responsável:** _______________  

