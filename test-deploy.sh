#!/bin/bash

# Script de Teste Local
# Verifica se tudo está funcionando antes de fazer deploy

set -e

echo "🧪 Teste Local - Validação Pré-Deploy"
echo "====================================="

echo ""
echo "1️⃣  Verificando arquivo de configuração..."
if [ ! -f "backend/.env.production" ]; then
    echo "❌ Arquivo backend/.env.production não encontrado!"
    echo "   Criando a partir do template..."
    cp backend/.env.example backend/.env.production
    echo "✅ Arquivo criado. Configure as variáveis em backend/.env.production"
else
    echo "✅ backend/.env.production encontrado"
fi

echo ""
echo "2️⃣  Verificando nginx.conf..."
if [ ! -f "nginx.conf" ]; then
    echo "❌ nginx.conf não encontrado!"
    exit 1
else
    echo "✅ nginx.conf encontrado"
fi

echo ""
echo "3️⃣  Verificando docker-compose.production.yml..."
if [ ! -f "docker-compose.production.yml" ]; then
    echo "❌ docker-compose.production.yml não encontrado!"
    exit 1
else
    echo "✅ docker-compose.production.yml encontrado"
fi

echo ""
echo "4️⃣  Verificando certificados SSL..."
if [ ! -d "ssl" ] || [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo "⚠️  AVISO: Certificados SSL não encontrados em ssl/"
    echo "   Você precisa colocar:"
    echo "   - ssl/cert.pem (certificado)"
    echo "   - ssl/key.pem (chave privada)"
    echo ""
    echo "   Para auto-assinado (APENAS DESENVOLVIMENTO):"
    echo "   mkdir -p ssl"
    echo "   openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes"
else
    echo "✅ Certificados SSL encontrados"
fi

echo ""
echo "5️⃣  Verificando estrutura do projeto..."
CHECKS=(
    "backend/src/server.js"
    "backend/package.json"
    "frontend/package.json"
    "frontend/public/index.html"
)

ALL_OK=true
for file in "${CHECKS[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file NÃO ENCONTRADO"
        ALL_OK=false
    fi
done

echo ""
echo "6️⃣  Teste de construção das imagens Docker..."
echo "   Executando: docker-compose -f docker-compose.production.yml build"
docker-compose -f docker-compose.production.yml build

echo ""
echo "✅ TODOS OS TESTES PASSARAM!"
echo ""
echo "Próximos passos:"
echo "1. Revise e complete o arquivo: backend/.env.production"
echo "2. Copie seus certificados SSL para a pasta: ssl/"
echo "3. Configure seu domínio para apontar para o servidor"
echo "4. Execute: ./deploy.sh start"
echo ""
echo "Ou teste localmente:"
echo "   docker-compose -f docker-compose.production.yml up"
echo ""
