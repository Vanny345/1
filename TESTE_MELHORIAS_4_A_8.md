# 🧪 GUIA DE TESTES - MELHORIAS 4-8

## Teste 1: CleanerDashboard

### Pré-requisito
- Usuário logado como faxineira
- Acesso a `/cleaner/dashboard`

### Testes de UI

#### Teste 1.1: Carregamento de Página
```
1. Navegar para /cleaner/dashboard
2. ✅ Esperar carregamento
3. ✅ Ver mensagem \"Carregando painel...\"
4. ✅ Após 2-3s, conteúdo aparece
```

#### Teste 1.2: KPIs Iniciais
```
1. Verificar 6 cards com dados
   - 📅 Agendamentos
   - ✅ Concluídos
   - 💰 Ganho Total
   - 📊 Ganho Mês
   - ⭐ Média de Stars
   - 🏆 Próximo Bônus

2. ✅ Verificar valores numéricos
3. ✅ Verificar ícones coloridos
```

#### Teste 1.3: Abas Funcionam
```
1. Ver 3 abas: Overview, Bookings, Earnings
2. Clicar na aba \"Bookings\"
   ✅ Conteúdo muda
   ✅ Tab fica destacada em azul
3. Clicar na aba \"Earnings\"
   ✅ Conteúdo muda
   ✅ Tab fica destacada em azul
4. Voltar para \"Overview\"
   ✅ Voltar ao conteúdo original
```

#### Teste 1.4: Aba Overview
```
1. Verificar seção de Bônus
   - ✅ Progresso em barra
   - ✅ \"X / 10 estrelas\"
   - ✅ Próximo bônus: R$ 100

2. Se completou 10 estrelas:
   - ✅ Badge \"TOP CLEANER\" aparece
   - ✅ Troféu 🏆 visível
   - ✅ Data de expiração

3. Verificar Score de Agilidade
   - ✅ Número entre 0-10
   - ✅ Barra visual
```

#### Teste 1.5: Aba Bookings
```
1. Ver lista de agendamentos
2. Cada linha mostra:
   - ✅ Nome do cliente
   - ✅ Data do agendamento
   - ✅ Status (Concluído/Pendente/Cancelado)
   - ✅ Valor da limpeza

3. Filtros funcionam:
   - ✅ Selecionar \"Concluídos\" - mostra só concluídos
   - ✅ Selecionar \"Pendentes\" - mostra só pendentes
```

#### Teste 1.6: Aba Earnings
```
1. Ver 3 cards de resumo:
   - ✅ Ganho Total: R$ XXXX
   - ✅ Ganho Mês: R$ XXXX
   - ✅ Ganho em Bônus: R$ XXXX

2. Ver gráfico de ganhos (se implementado)
3. Ver histórico de transações
```

---

## Teste 2: CleanerSchedule

### Pré-requisito
- Usuário logado como faxineira
- Acesso a `/cleaner/schedule`

#### Teste 2.1: Modo Agenda Fixa
```
1. Verificar toggle \"Agenda Fixa\" selecionado
2. Ver dias da semana:
   - ✅ Segunda a Sexta aparecem
   - ✅ Sábado e Domingo aparecem

3. Cada dia mostra:
   - ✅ Checkbox \"Trabalhando\"
   - ✅ Campo de hora início
   - ✅ Campo de hora fim

4. Horários padrão:
   - ✅ Mon-Fri: 08:00 - 12:00
   - ✅ Sat-Sun: Desativado

5. Toggle dias:
   - Clicar checkbox de segunda
   - ✅ Horários ficam cinza
   - ✅ Clicar novamente = ativa horários

6. Editar horários:
   - Mudar \"08:00\" para \"09:00\"
   - ✅ Campo atualiza
   - Mudar \"12:00\" para \"14:00\"
   - ✅ Campo atualiza
```

#### Teste 2.2: Modo Agenda Flexível
```
1. Clicar toggle \"Agenda Flexível\"
2. Interface muda para calendário
3. Ver:
   - ✅ Botão \"+ Adicionar Data\"
   - ✅ Lista de datas (se houver)
   - ✅ DatePicker

4. Clicar \"+Adicionar Data\"
5. Selecionar data (ex: 20/02/2026)
   - ✅ Aparece na lista
   - ✅ Mostra campos de hora

6. Definir horários:
   - Hora início: 10:00
   - Hora fim: 18:00
   - ✅ Ambos atualizam

7. Bloquear data:
   - ✅ Ver checkbox \"Bloqueado\"
   - ✅ Marcar checkbox
   - ✅ Data fica cinza (bloqueada)

8. Remover data:
   - ✅ Ver botão \"Remover\"
   - Clicar
   - ✅ Data sai da lista
```

#### Teste 2.3: Alternar Entre Modos
```
1. Começar em Agenda Fixa
2. Clicar toggle para Agenda Flexível
   ✅ Interface muda completamente
3. Clicar toggle para Agenda Fixa
   ✅ Volta para 7 dias da semana
```

#### Teste 2.4: Salvar Agenda
```
1. Fazer alterações na agenda
2. Clicar \"Salvar Agenda\"
3. ✅ Ver mensagem \"Agenda salva com sucesso!\"
4. ❌ (Backend não implementado)
   - Dados não vão ao servidor
   - Usar mock data
```

---

## Teste 3: AdminDashboard

### Pré-requisito
- Usuário logado como admin
- Acesso a `/admin/dashboard`

#### Teste 3.1: KPIs Visíveis
```
1. Navegar para /admin/dashboard
2. Ver 6 cards em primeira linha:
   - 👥 Total de Usuários: 156
   - 👩‍🔧 Faxineiras: 42
   - 📅 Agendamentos: 1203
   - 💰 Receita Total: R$ 45.200,50
   - 📊 Taxa Plataforma: R$ 13.700,50
   - 💸 Pagamentos: R$ 31.500,00

3. ✅ Todos os valores visíveis
4. ✅ Ícones coloridos
```

#### Teste 3.2: Aba Usuários
```
1. Clicar aba \"👥 Usuários (156)\"
2. Ver buscador no topo
3. Tabela aparece com colunas:
   - Nome
   - Tipo (Cliente/Faxineira)
   - Email
   - Status
   - Entrou em
   - Ações

4. Teste de busca:
   - Digitar \"Maria\"
   - ✅ Filtra usuários com \"Maria\" no nome
   - Limpar e digitar \"@email.com\"
   - ✅ Filtra por email

5. Visualizar usuário:
   - Ver status badges
   - ✅ Verde = Ativo
   - ✅ Azul = Verificado
   - ✅ Amarelo = Pendente

6. Link \"Ver Perfil\":
   - Clicar em usuário
   - ✅ Link clickável (vai para perfil)
```

#### Teste 3.3: Aba Agendamentos
```
1. Clicar aba \"📅 Agendamentos (1203)\"
2. Ver tabela com:
   - Cliente
   - Faxineira
   - Data
   - Valor
   - Status

3. Linhas mostram dados corretos:
   - ✅ Nome dos envolvidos
   - ✅ Data formatada (DD/MM/YYYY)
   - ✅ Valor em R$
   - ✅ Status com badge (verde/amarelo)

4. Filtrar status:
   - ✅ Verde = Concluído
   - ✅ Amarelo = Pendente
```

#### Teste 3.4: Aba Pagamentos
```
1. Clicar aba \"💰 Pagamentos\"
2. Ver tabela com:
   - Faxineira
   - Valor
   - Data
   - Status
   - Ações

3. Pagamentos pendentes:
   - ✅ Ver botão \"Confirmar\"
   - Clicar
   - ✅ Status muda para \"Pagado\"

4. Pagamentos concluídos:
   - ✅ Sem botão \"Confirmar\"
   - ✅ Status verde \"Pagado\"
```

#### Teste 3.5: Responsividade
```
1. Desktop (1920px)
   - ✅ 6 cards em linha
   - ✅ Tabela com todas as colunas

2. Tablet (768px)
   - ✅ 2 cards por linha
   - ✅ Tabela com scroll horizontal

3. Mobile (480px)
   - ✅ 1 card por linha
   - ✅ Tabela com scroll
```

---

## Teste 4: BonusHistory (Componente)

### Pré-requisito
- Integrado em CleanerDashboard
- Acessar `/cleaner/dashboard`

#### Teste 4.1: Card Elegibilidade
```
1. Se faxineira tem < 10 cinco-estrelas:
   - ✅ Card não aparece

2. Se faxineira tem 10+ cinco-estrelas:
   - ✅ Card amarelo aparece
   - ✅ Texto: \"Novo Bônus Disponível!\"
   - ✅ Mostra \"X / 10 avaliações\"
   - ✅ Mostra \"R$ 100\"
   - ✅ Botão \"Receber Bônus\"

3. Clicar \"Receber Bônus\":
   - ✅ Toast verde: \"Bônus de R$ 100 transferido com sucesso!\"
   - ✅ Notificação push enviada
   - ✅ Dados recarregam
```

#### Teste 4.2: Status TOP CLEANER
```
1. Se faxineira é TOP CLEANER:
   - ✅ Card roxo/rosa aparece
   - ✅ Ícone 👑 e 🏆
   - ✅ Data de expiração
   - ✅ Total ganho em bônus

2. Se não é TOP CLEANER:
   - ✅ Card não aparece
```

#### Teste 4.3: Histórico de Bônus
```
1. Ver seção \"Histórico de Bônus\"
2. Para cada bônus anterior:
   - ✅ Ícone 💰 (verde se concluído)
   - ✅ Motivo: \"10 avaliações 5 estrelas\"
   - ✅ Data
   - ✅ Valor: R$ 100
   - ✅ Status: Concluído/Pendente

3. Se nenhum bônus anterior:
   - ✅ Mensagem: \"Nenhum bônus ainda\"
   - ✅ Ícone ⭐
```

#### Teste 4.4: Resumo de Ganhos
```
1. Ver 3 cards no final:
   - \"Total em Bônus\": R$ XXXX
   - \"Avaliações 5 Estrelas\": X / 10
   - \"Próximo Bônus\": R$ 100

2. Valores atualizam quando:
   - ✅ Recebe novo bônus
   - ✅ Recebe nova avaliação
```

---

## Teste 5: NotificationCenter (Componente)

### Pré-requisito
- Integrado em navbar
- Acessar qualquer página autenticada

#### Teste 5.1: Sino Básico
```
1. Ver sino 🔔 na navbar
2. Se tem notificações não lidas:
   - ✅ Badge vermelho com número
   - ✅ \"99+\" se mais de 99

3. Clicar sino:
   - ✅ Dropdown abre à direita
   - ✅ Header: \"🔔 Notificações\"
   - ✅ Botão X para fechar
```

#### Teste 5.2: Listar Notificações
```
1. No dropdown:
   - ✅ Ver até 10 notificações
   - ✅ Scroll se mais notificações

2. Cada notificação mostra:
   - ✅ Ícone do tipo (📅, 💰, 🏆, etc)
   - ✅ Título
   - ✅ Mensagem
   - ✅ Data em pt-BR

3. Cores:
   - ✅ Não lida: background cinza claro
   - ✅ Lida: background normal
```

#### Teste 5.3: Ações
```
1. Notificação não lida:
   - ✅ Ver botão \"Marcar\"
   - Clicar
   - ✅ Notificação some ou muda cor

2. Todos os notificações:
   - ✅ Ver botão \"Deletar\"
   - Clicar
   - ✅ Notificação sai da lista

3. Sem notificações:
   - ✅ Ícone 🔔
   - ✅ Texto: \"Nenhuma notificação\"
```

#### Teste 5.4: Tipos de Notificações
```
Teste cada tipo:

1. 📅 Novo Agendamento
   - notifyNewBooking('Maria', '20/02', 150)
   - ✅ Aparece com ícone 📅

2. 💰 Pagamento Recebido
   - notifyPaymentReceived(100)
   - ✅ Aparece com ícone 💰

3. 🏆 Bônus Desbloqueado
   - notifyBonusUnlocked()
   - ✅ Aparece com ícone 🏆

4. 👑 TOP CLEANER
   - notifyTopCleanerStatus()
   - ✅ Aparece com ícone 👑

5. ⚠️ Avaliação Baixa
   - notifyLowRating(3)
   - ✅ Aparece com ícone ⚠️

6. ❌ Cancelamento
   - notifyCancellation('João')
   - ✅ Aparece com ícone ❌

7. 📢 Mensagem Admin
   - notifyAdminMessage('Aviso', 'Manutenção hoje')
   - ✅ Aparece com ícone 📢
```

---

## Teste 6: Integração com App.jsx

#### Teste 6.1: Rotas Criadas
```
1. Verificar rotas em App.jsx

✅ /cleaner/dashboard
   - Acessível apenas com token
   - Carrega CleanerDashboard

✅ /cleaner/schedule
   - Acessível apenas com token
   - Carrega CleanerSchedule

✅ /admin/dashboard
   - Acessível apenas com token
   - Carrega AdminDashboard

2. Sem token:
   - ✅ Redireciona para /login
   - ✅ Não acessa as páginas
```

#### Teste 6.2: Navegação
```
1. Estando em CleanerDashboard
   - ✅ Pode navegar entre abas
   - ✅ Pode ir para CleanerSchedule

2. Estando em AdminDashboard
   - ✅ Pode alternar entre abas (Users/Bookings/Payments)
   - ✅ Pode voltar ao Dashboard

3. URLs funcionam direto
   - ✅ Digitar /cleaner/dashboard na URL
   - ✅ Digitar /admin/dashboard na URL
```

---

## Teste 7: Performance & Bugs

#### Teste 7.1: Carregamento
```
1. Primeiro acesso a /cleaner/dashboard
   - ⏱️ Tempo de carregamento < 3s
   - ✅ Sem erros no console

2. Alternar abas
   - ⏱️ Instantâneo
   - ✅ Sem lag

3. Scrollar tabelas grandes
   - ✅ Performance boa
   - ✅ Sem travamentos
```

#### Teste 7.2: Memory Leaks
```
1. Abrir e fechar modais 10 vezes
   - ✅ Sem aumento de memória
   - ✅ Sem warnings no console

2. Navegar entre páginas 5 vezes
   - ✅ Memory stable
   - ✅ Sem listeners duplicados
```

#### Teste 7.3: Validações
```
1. Agenda Flexível:
   - Tentar adicionar data passada
   - ✅ Deve avisar ou desabilitar
   - Tentar data duplicada
   - ✅ Deve avisar

2. Admin Dashboard:
   - Buscar com caracteres especiais
   - ✅ Não quebra tabela
   - Filtrar com campo vazio
   - ✅ Mostra todos os registros
```

---

## 📋 Checklist Final

### Melhorias 4-8
- [ ] CleanerDashboard carrega corretamente
- [ ] Abas funcionam
- [ ] BonusHistory integrado
- [ ] CleanerSchedule modos fixo/flexível
- [ ] AdminDashboard com 6 KPIs
- [ ] 3 abas de admin funcionam
- [ ] NotificationCenter integrado
- [ ] Notificações aparecem
- [ ] Rotas em App.jsx corretas
- [ ] Sem erros no console
- [ ] Performance boa
- [ ] Responsive em todos os tamanhos
- [ ] Mock data funcionando (sem backend)

### Backend Necessário
- [ ] Implementar 17 endpoints
- [ ] Testes E2E frontend-backend
- [ ] Setup Firebase
- [ ] Deploy em produção

---

**Versão**: 1.0
**Data**: 15/02/2026
**Status**: Pronto para Testes
