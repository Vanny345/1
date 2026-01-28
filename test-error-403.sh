#!/bin/bash

# Script de Teste - Verifica se o erro 403 foi resolvido
# Uso: ./test-error-403.sh

echo "🧪 Teste de Erro 403"
echo "===================="
echo ""

DOMAIN="https://cleanerleidy.com.br"
API_DOMAIN="https://api.cleanerleidy.com.br"

echo "1️⃣  Testando CORS..."
echo "   URL: $API_DOMAIN/api/auth/login"
echo ""

# Simular requisição com Origin do domínio
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X OPTIONS \
  -H "Origin: $DOMAIN" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  "$API_DOMAIN/api/auth/login")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
HEADERS=$(echo "$RESPONSE" | head -1)

echo "HTTP Status: $HTTP_CODE"
if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "204" ]; then
    echo "✅ CORS Preflight OK"
else
    echo "❌ CORS Preflight FALHOU (esperado 200 ou 204, recebido $HTTP_CODE)"
fi

echo ""
echo "2️⃣  Testando Health Check..."
echo "   URL: $API_DOMAIN/health"
echo ""

HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$API_DOMAIN/health")
if [ "$HEALTH" == "200" ]; then
    echo "✅ Backend respondendo (HTTP $HEALTH)"
else
    echo "❌ Backend não respondendo (HTTP $HEALTH)"
fi

echo ""
echo "3️⃣  Testando Frontend..."
echo "   URL: $DOMAIN"
echo ""

FRONTEND=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN")
if [ "$FRONTEND" == "200" ] || [ "$FRONTEND" == "301" ] || [ "$FRONTEND" == "302" ]; then
    echo "✅ Frontend respondendo (HTTP $FRONTEND)"
else
    echo "❌ Frontend não respondendo (HTTP $FRONTEND)"
fi

echo ""
echo "4️⃣  Testando POST /api/auth/login (sem credenciais)..."
echo ""

LOGIN=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: $DOMAIN" \
  -d '{"email":"test@example.com","password":"test"}' \
  "$API_DOMAIN/api/auth/login")

LOGIN_CODE=$(echo "$LOGIN" | tail -1)
LOGIN_BODY=$(echo "$LOGIN" | head -1)

echo "HTTP Status: $LOGIN_CODE"
echo "Response: $LOGIN_BODY"

if [ "$LOGIN_CODE" == "200" ]; then
    echo "✅ Login funcionando (credenciais corretas)"
elif [ "$LOGIN_CODE" == "401" ] || [ "$LOGIN_CODE" == "400" ] || [ "$LOGIN_CODE" == "404" ]; then
    echo "✅ Backend processou a requisição (erro 401/400/404 é esperado sem credenciais válidas)"
elif [ "$LOGIN_CODE" == "403" ]; then
    echo "❌ Erro 403 - CORS ainda não está configurado ou há outro problema"
else
    echo "⚠️  Status inesperado: $LOGIN_CODE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 RESUMO:"
echo ""
echo "Se você ver ✅ em todos os testes, o erro 403 foi resolvido!"
echo ""
echo "Se vir ❌ em algum teste, verifique:"
echo "  - ./deploy.sh health"
echo "  - ./deploy.sh logs"
echo "  - backend/.env.production está configurado?"
echo "  - Certificados SSL existem em ssl/?"
echo ""
