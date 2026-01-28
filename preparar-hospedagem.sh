#!/bin/bash

# Script para preparar código pronto para hospedagem
# Uso: ./preparar-hospedagem.sh

set -e

echo "📦 PREPARANDO CÓDIGO PARA HOSPEDAGEM"
echo "===================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "   Baixe em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Build Frontend
echo "1️⃣  Fazendo BUILD do Frontend..."
echo ""

cd frontend

# Limpar build anterior
echo "   Limpando build anterior..."
rm -rf build

# Instalar dependências
echo "   Instalando dependências..."
npm install

# Fazer build
echo "   Compilando site..."
npm run build

echo ""
echo "✅ Frontend compilado com sucesso!"
echo ""

# Estatísticas
echo "📊 Resultado:"
BUILD_SIZE=$(du -sh build/ | cut -f1)
BUILD_FILES=$(find build -type f | wc -l)

echo "   Pasta build criada: ✅"
echo "   Tamanho: $BUILD_SIZE"
echo "   Arquivos: $BUILD_FILES"
echo ""

# Voltar para raiz
cd ..

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 PRONTO PARA HOSPEDAGEM!"
echo ""
echo "📁 Pasta pronta: frontend/build/"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "   1. Via FTP:"
echo "      - Copiar conteúdo de 'frontend/build/'"
echo "      - Para 'public_html/' no servidor"
echo ""
echo "   2. Via SCP:"
echo "      - scp -r frontend/build/* usuario@servidor:/caminho/"
echo ""
echo "   3. Via Git (no servidor):"
echo "      - git clone <repo>"
echo "      - npm run build"
echo "      - ./deploy.sh start"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
