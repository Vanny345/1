#!/bin/bash

# 🚀 SCRIPT: Preparar site para Orion Host (Ambos os cenários)

echo "=========================================="
echo "Preparar site para Orion Host"
echo "=========================================="
echo ""

# Detectar tipo
echo "Qual tipo de hospedagem você tem?"
echo "1) Compartilhada (cPanel)"
echo "2) VPS"
echo ""
read -p "Digite (1 ou 2): " TIPO

if [ "$TIPO" = "1" ]; then
    echo ""
    echo "✅ Configurando para HOSPEDAGEM COMPARTILHADA..."
    cp frontend/.env.compartilhada frontend/.env.production
    echo "✅ Arquivo .env.production criado (modo compartilhada)"
    
elif [ "$TIPO" = "2" ]; then
    echo ""
    echo "✅ Configurando para VPS..."
    cp frontend/.env.vps frontend/.env.production
    echo "✅ Arquivo .env.production criado (modo VPS)"
    
else
    echo "❌ Opção inválida!"
    exit 1
fi

echo ""
echo "Próximo passo:"
echo "  cd frontend"
echo "  npm install"
echo "  npm run build"
echo ""
echo "Depois copie frontend/build/* para public_html/ no Orion Host!"
