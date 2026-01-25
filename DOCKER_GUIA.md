# Deploy com Docker

## Iniciar tudo com Docker Compose

```bash
# Clonar repositório
git clone seu-repo-aqui
cd seu-repo

# Criar arquivo .env na raiz
cat > .env << EOF
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=leidy_cleaner
JWT_SECRET=sua-chave-secreta
STRIPE_SECRET_KEY=sk_test_...
MERCADOPAGO_ACCESS_TOKEN=...
SENDGRID_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
GOOGLE_MAPS_API_KEY=...
FIREBASE_PROJECT_ID=...
EOF

# Iniciar serviços
docker-compose up -d

# Rodas migrações
docker-compose exec backend npx prisma migrate deploy

# Acessar
# Backend: http://localhost:5000
# Frontend: http://localhost
# PostgreSQL: localhost:5432
```

## Build Individual

### Backend
```bash
cd backend
docker build -t leidy-cleaner-api .
docker run -p 5000:5000 --env-file .env leidy-cleaner-api
```

### Frontend
```bash
cd frontend
docker build -t leidy-cleaner-frontend .
docker run -p 3000:3000 leidy-cleaner-frontend
```

## Parar Serviços

```bash
docker-compose down
# Com volume (remove dados)
docker-compose down -v
```

## Logs

```bash
# Ver logs em tempo real
docker-compose logs -f

# Específico de um serviço
docker-compose logs -f backend
```

## Comandos Úteis

```bash
# Executar command no container
docker-compose exec backend npm run dev

# Acessar shell
docker-compose exec postgres psql -U postgres -d leidy_cleaner

# Rebuild imagem
docker-compose build --no-cache backend
```

## Troubleshooting

### Porta já em uso
```bash
# Ver o que está usando a porta 5000
lsof -i :5000
# Matar processo
kill -9 PID
```

### Erro de conexão com banco
```bash
# Verificar se postgres está rodando
docker-compose ps

# Ver logs do postgres
docker-compose logs postgres

# Reconectar
docker-compose down && docker-compose up -d
```

### Permissão negada
```bash
# Executar com sudo ou adicione seu usuário ao grupo docker
sudo usermod -aG docker $USER
```
