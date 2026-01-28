#!/bin/bash

# Script para desbloquear e limpar tudo
# Use quando ficar travado em "Conectando à porta encaminhada..."

echo "🧹 LIMPANDO PROCESSOS TRAVADOS"
echo "=============================="
echo ""

echo "1️⃣  Matando processos Node.js..."
pkill -9 node 2>/dev/null || true
pkill -9 npm 2>/dev/null || true
pkill -9 "npm run dev" 2>/dev/null || true
pkill -9 "npm start" 2>/dev/null || true

echo "✅ Processos Node.js finalizados"

echo ""
echo "2️⃣  Aguardando 2 segundos..."
sleep 2

echo ""
echo "3️⃣  Verificando portas..."

# Verificar portas conforme o sistema
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "   Port 3000:"
    lsof -i :3000 || echo "   ✅ Livre"
    echo ""
    echo "   Port 5000:"
    lsof -i :5000 || echo "   ✅ Livre"
    echo ""
    echo "   Port 5432 (BD):"
    lsof -i :5432 || echo "   ✅ Livre"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    echo "   Port 3000:"
    lsof -i :3000 || echo "   ✅ Livre"
    echo ""
    echo "   Port 5000:"
    lsof -i :5000 || echo "   ✅ Livre"
    echo ""
    echo "   Port 5432 (BD):"
    lsof -i :5432 || echo "   ✅ Livre"
else
    # Windows (Git Bash/PowerShell)
    echo "   Verifique manualmente:"
    echo "   netstat -ano | findstr LISTEN"
fi

echo ""
echo "✅ ✅ TUDO LIMPO!"
echo ""
echo "🚀 Agora você pode tentar de novo:"
echo ""
echo "   cd frontend"
echo "   npm install"
echo "   npm start"
echo ""
echo "ou"
echo ""
echo "   ./teste-local-simples.sh"
echo ""
