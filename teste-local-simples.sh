#!/bin/bash

# Script para testar localmente de forma SUPER SIMPLES
# Uso: ./teste-local-simples.sh

set -e

echo "🚀 TESTE LOCAL - APLICATIVO LEIDY CLEANER"
echo "=========================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "   Baixe em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado!"
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"
echo ""

# Menu
echo "🎯 O que você quer fazer?"
echo ""
echo "1) Testar APENAS Frontend (React) - Mais rápido ⚡"
echo "2) Testar Frontend + Backend completo - Realista"
echo "3) Parar serviços"
echo ""
read -p "Escolha (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "🏃 Iniciando FRONTEND..."
        echo ""
        cd frontend
        
        if [ ! -d "node_modules" ]; then
            echo "📦 Instalando dependências..."
            npm install
        fi
        
        echo ""
        echo "🎉 FRONTEND pronto em: http://localhost:3000"
        echo ""
        echo "Pressione Ctrl+C para parar"
        echo ""
        npm start
        ;;
    
    2)
        echo ""
        echo "🔧 Você tem PostgreSQL instalado e rodando?"
        read -p "Digite 's' ou 'n': " db_choice
        
        if [ "$db_choice" == "s" ] || [ "$db_choice" == "S" ]; then
            echo ""
            echo "🏃 Iniciando BACKEND e FRONTEND..."
            echo ""
            echo "📋 Terminal 1 (Backend):"
            echo "   Acesse: http://localhost:5000/health"
            echo ""
            
            # Preparar backend em background
            cd backend
            
            if [ ! -d "node_modules" ]; then
                echo "📦 Instalando dependências do backend..."
                npm install
            fi
            
            if [ ! -f ".env" ]; then
                echo "⚙️  Criando .env..."
                cp .env.example .env
                # Editar para desenvolvimento
                sed -i 's|NODE_ENV=.*|NODE_ENV=development|g' .env 2>/dev/null || \
                sed -i '' 's|NODE_ENV=.*|NODE_ENV=development|g' .env
            fi
            
            echo "🎯 Rodando PRISMA..."
            npx prisma generate
            
            echo "✅ Backend iniciando..."
            npm run dev &
            BACKEND_PID=$!
            
            sleep 3
            
            # Preparar frontend
            echo ""
            echo "📋 Terminal 2 (Frontend):"
            echo "   Acesse: http://localhost:3000"
            echo ""
            
            cd ../frontend
            
            if [ ! -d "node_modules" ]; then
                echo "📦 Instalando dependências do frontend..."
                npm install
            fi
            
            echo "🎉 Frontend iniciando..."
            npm start &
            FRONTEND_PID=$!
            
            echo ""
            echo "✅ ✅ Ambos iniciados!"
            echo ""
            echo "URLS:"
            echo "  Frontend: http://localhost:3000"
            echo "  Backend: http://localhost:5000"
            echo "  Health: http://localhost:5000/health"
            echo ""
            echo "Pressione Ctrl+C para parar tudo"
            
            wait
        else
            echo ""
            echo "⚠️  Você precisa de PostgreSQL rodando!"
            echo ""
            echo "Opções:"
            echo "  1. Instalar PostgreSQL"
            echo "  2. Usar Docker: docker-compose up"
            echo "  3. Apenas testar Frontend (opção 1)"
            fi
        ;;
    
    3)
        echo ""
        echo "⏹️  Parando serviços..."
        pkill -f "npm run dev" || true
        pkill -f "npm start" || true
        echo "✅ Serviços parados"
        ;;
    
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac
