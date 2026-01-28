#!/bin/bash

# Script de Deploy em Produção
# Uso: ./deploy.sh [start|stop|restart|logs|health]

set -e

COMMAND=${1:-start}
COMPOSE_FILE="docker-compose.production.yml"

echo "🚀 Leidy Cleaner - Production Deployment"
echo "========================================"

case $COMMAND in
    start)
        echo "▶️  Iniciando containers..."
        docker-compose -f $COMPOSE_FILE up -d
        echo "✅ Containers iniciados!"
        sleep 5
        echo "📊 Status:"
        docker-compose -f $COMPOSE_FILE ps
        ;;
    stop)
        echo "⏹️  Parando containers..."
        docker-compose -f $COMPOSE_FILE down
        echo "✅ Containers parados!"
        ;;
    restart)
        echo "🔄 Reiniciando containers..."
        docker-compose -f $COMPOSE_FILE restart
        echo "✅ Containers reiniciados!"
        sleep 5
        echo "📊 Status:"
        docker-compose -f $COMPOSE_FILE ps
        ;;
    logs)
        echo "📋 Logs (Ctrl+C para sair):"
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    health)
        echo "🏥 Verificando saúde dos serviços..."
        
        # Check Backend
        echo -n "Backend: "
        if curl -s http://localhost:5000/health > /dev/null 2>&1; then
            echo "✅ OK"
        else
            echo "❌ ERRO"
        fi
        
        # Check Frontend
        echo -n "Frontend: "
        if curl -s http://localhost/index.html > /dev/null 2>&1; then
            echo "✅ OK"
        else
            echo "❌ ERRO"
        fi
        
        # Check Database
        echo -n "Database: "
        if docker-compose -f $COMPOSE_FILE exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
            echo "✅ OK"
        else
            echo "❌ ERRO"
        fi
        
        echo ""
        echo "📊 Containers:"
        docker-compose -f $COMPOSE_FILE ps
        ;;
    backup)
        echo "💾 Fazendo backup do banco de dados..."
        BACKUP_FILE="backups/backup-$(date +%Y%m%d-%H%M%S).sql"
        mkdir -p backups
        docker-compose -f $COMPOSE_FILE exec -T postgres pg_dump -U postgres leidy_cleaner > "$BACKUP_FILE"
        echo "✅ Backup salvo em: $BACKUP_FILE"
        ;;
    shell)
        echo "🔌 Entrando no shell do backend..."
        docker-compose -f $COMPOSE_FILE exec backend sh
        ;;
    *)
        echo "❌ Comando desconhecido: $COMMAND"
        echo ""
        echo "Comandos disponíveis:"
        echo "  ./deploy.sh start     - Inicia os containers"
        echo "  ./deploy.sh stop      - Para os containers"
        echo "  ./deploy.sh restart   - Reinicia os containers"
        echo "  ./deploy.sh logs      - Mostra logs"
        echo "  ./deploy.sh health    - Verifica saúde dos serviços"
        echo "  ./deploy.sh backup    - Faz backup do banco de dados"
        echo "  ./deploy.sh shell     - Acessa shell do backend"
        exit 1
        ;;
esac
