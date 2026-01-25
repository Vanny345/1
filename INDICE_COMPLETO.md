# 📑 Índice Completo do Código

## 📂 Arquivos do Projeto

```
/workspaces/1/
├── index.html                    # Arquivo principal (2289 linhas)
├── README.md                     # Documentação geral
├── GUIA_DE_NAVEGACAO.md          # Como navegar no código
├── DESENVOLVIMENTO.md             # Guia de desenvolvimento
└── INDICE_COMPLETO.md            # Este arquivo
```

---

## 📄 index.html - Mapa de Conteúdo

### 🏷️ HTML Head (Linhas 1-1560)

| Linha | Conteúdo | Descrição |
|-------|----------|-----------|
| 1-30 | DOCTYPE + Comments | Cabeçalho com descrição do projeto |
| 31-40 | `<head>` | Abertura do head |
| 41-45 | Metadados | UTF-8, viewport, title |
| 46-47 | Imports | Font Awesome, Google Fonts |
| 48-1560 | `<style>` | 1512 linhas de CSS |

### 🎨 CSS - Seções (Linhas 48-1560)

| Seção | Linhas | Itens | Descrição |
|-------|--------|-------|-----------|
| SEÇÃO 1: VARIÁVEIS | 48-70 | 20+ vars | Cores, espaçamentos, sombras base |
| SEÇÃO 2: TEMAS | 120-260 | 6 temas | light, soft, neutral, high-contrast, pastel, dark |
| SEÇÃO 3: RESET | 270-300 | Reset | Reset CSS e body global |
| SEÇÃO 4: ANIMAÇÕES | 310-370 | 5 keyframes | fadeIn, slideIn, float, pulse, shimmer |
| SEÇÃO 5: COMPONENTES | 360-510 | Botões, badges | .btn, .badge, estilos reutilizáveis |
| SEÇÃO 6: HEADER | 520-570 | Logo, nav | Cabeçalho fixo com efeito scroll |
| SEÇÃO 7: TEMAS | 570-610 | Seletores | Botões de tema, modal de temas |
| SEÇÃO 8: CALCULADORA | 620-850 | Grid, cards | Entrada e resultado de orçamento |
| SEÇÃO 9: AGENDA | 850-1080 | Grid, cards | Grade de horários, lista de faxineiras |
| SEÇÃO 10: FOOTER | 990-1090 | Seções, links | Informações da empresa |
| SEÇÃO 11: RESPONSIVIDADE | 1080-1560 | 3 media queries | 1024px, 768px, 480px breakpoints |

### 📋 HTML Body (Linhas 1560-1550)

| Elemento | Linhas | ID/Class | Descrição |
|----------|--------|---------|-----------|
| Header | 1560-1620 | #header | Logo + Botões de navegação |
| Theme Controls (Desktop) | 1620-1700 | #themeControls | 6 botões de tema |
| Theme Button Mobile | 1700-1710 | .theme-btn-mobile | Botão flutuante FAB |
| Modal de Temas | 1710-1800 | #themesModal | Modal para seleção de tema mobile |
| Seção Calculadora | 1800-2030 | #calculator | Calculadora com resultado |
| ├─ Controles | 1810-1980 | .calculator-controls | Horas, serviço, faxineiras, produtos |
| └─ Resultado | 1980-2030 | .calculator-result | Orçamento e botões de ação |
| Seção Agenda | 2030-2280 | #schedule | Grade de horários + faxineiras |
| ├─ Header | 2035-2075 | .schedule-header | Título e navegação |
| ├─ Grade | 2075-2150 | #scheduleGrid | Grid 7×5 de horários |
| └─ Lista | 2150-2280 | .cleaner-list | Cards de faxineiras |
| Footer | 2280-2350 | .footer | Rodapé com informações |

### 🔧 JavaScript - Seções (Linhas 1560-2289)

| Seção | Linhas | Funções | Variáveis |
|-------|--------|---------|-----------|
| 1. CONFIG | 1640-1680 | - | CONFIG (objeto) |
| 2. Estado | 1680-1710 | - | appState (objeto) |
| 3. Init | 1710-1750 | `initTheme()`, `initCalculator()`, `initSchedule()` | - |
| 4. Temas | 1750-1810 | `changeTheme()`, `getThemeName()`, `updateThemeButtons()`, `updateDynamicColors()` | - |
| 5. Calc | 1810-1890 | `selectHours()`, `selectService()`, `selectCleaners()`, `toggleProduct()`, `updateCalculator()` | CONFIG, appState |
| 6. Agenda | 1890-1990 | `generateScheduleGrid()`, `selectTimeSlot()`, `updateWeekDisplay()`, `previousWeek()`, `nextWeek()` | appState |
| 7. Sistema | 1990-2090 | `bookService()`, `saveQuote()`, `shareQuote()` | appState |
| 8. Utils | 2090-2230 | `scrollToCalculator()`, `openModal()`, `closeModal()`, `showNotification()`, `initScrollAnimation()` | - |
| 9. Eventos | 2230-2289 | Event listeners | - |

---

## 🔍 Índice de Funções JavaScript

### Inicialização
```javascript
initTheme()           // Linha 1690 - Carrega tema salvo
initCalculator()      // Linha 1810 - Inicia calculadora
initSchedule()        // Linha 1900 - Gera agenda
initScrollAnimation() // Linha 2155 - Setup de Intersection Observer
```

### Sistema de Temas
```javascript
changeTheme(theme)         // Linha 1715 - Muda tema e salva
getThemeName(theme)        // Linha 1735 - Retorna nome do tema
updateThemeButtons()       // Linha 1750 - Atualiza UI
updateDynamicColors()      // Linha 1770 - Atualiza cores dinâmicas
```

### Calculadora
```javascript
selectHours(hours)         // Linha 1820 - Seleciona horas
selectService(service)     // Linha 1835 - Seleciona tipo
selectCleaners(cleaners)   // Linha 1850 - Seleciona quantidade
toggleProduct(product)     // Linha 1860 - Ativa/desativa produto
updateCalculator()         // Linha 1890 - Recalcula tudo
updateProductUI()          // Linha 1805 - Atualiza UI de produtos
```

### Agenda
```javascript
generateScheduleGrid()     // Linha 1910 - Cria grid
selectTimeSlot(cell, d, t) // Linha 1975 - Seleciona horário
updateSelectedCount()      // Linha 2010 - Atualiza contagem
updateWeekDisplay()        // Linha 2015 - Mostra semana
previousWeek()             // Linha 2035 - Semana anterior
nextWeek()                 // Linha 2045 - Próxima semana
createTimeSlot(time)       // Linha 1970 - Cria elemento de hora
```

### Funções do Sistema
```javascript
bookService()              // Linha 2010 - Agenda serviço
saveQuote()                // Linha 2060 - Salva orçamento
shareQuote()               // Linha 2090 - Compartilha
```

### Utilitários
```javascript
scrollToCalculator()       // Linha 2140 - Scroll para calculadora
scrollToSchedule()         // Linha 2145 - Scroll para agenda
openModal(id)              // Linha 2150 - Abre modal
closeModal(id)             // Linha 2155 - Fecha modal
showNotification(msg, type)// Linha 2160 - Notificação animada
```

---

## 🗂️ Índice de IDs HTML

| ID | Linha | Tipo | Descrição |
|----|-------|------|-----------|
| #header | 1565 | header | Cabeçalho fixo |
| #themeControls | 1625 | div | Botões de tema desktop |
| #themesModal | 1720 | div | Modal de temas mobile |
| #calculator | 1810 | section | Seção calculadora |
| #schedule | 2050 | section | Seção agenda |
| #scheduleGrid | 2100 | div | Grid de horários |
| #currentWeek | 2070 | h3 | Texto da semana |
| #basePrice | 1970 | span | Preço base |
| #serviceTypePrice | 1975 | span | Preço do serviço |
| #cleanersCount | 1980 | span | Quantidade de faxineiras |
| #cleanersPrice | 1985 | span | Preço das faxineiras |
| #productsPrice | 1990 | span | Preço dos produtos |
| #adminFee | 1995 | span | Taxa administrativa |
| #totalPrice | 2000 | span | Total final |

---

## 🎨 Índice de Classes CSS

### Componentes
```css
.btn                    // Botão padrão
.btn-primary           // Botão primário
.btn-secondary         // Botão secundário
.btn-outline           // Botão outline
.btn-lg                // Botão grande
.badge                 // Badge/etiqueta
.badge-primary         // Badge primária
.badge-success         // Badge sucesso
```

### Layout
```css
.container             // Wrapper com max-width
.header                // Cabeçalho fixo
.header.scrolled       // Header após scroll
.footer                // Rodapé
.calculator-section    // Seção calculadora
.schedule-section      // Seção agenda
```

### Calculadora
```css
.calculator-grid       // Grid principal
.calculator-controls   // Lado esquerdo (inputs)
.calculator-result     // Lado direito (resultado)
.control-group         // Agrupamento de controles
.hour-btn              // Botão de hora
.service-option        // Opção de serviço
.cleaner-btn           // Botão de faxineira
.product-option        // Opção de produto
.price-breakdown       // Breakdown de preços
.price-item            // Item de preço
.price-total           // Total final
.total-amount          // Valor total grande
```

### Agenda
```css
.schedule-header       // Header da agenda
.schedule-grid         // Grid de horários
.time-slot             // Slot de horário (hora)
.day-header            // Header do dia
.schedule-cell         // Célula de horário
.schedule-cell.available   // Disponível
.schedule-cell.booked      // Reservado
.schedule-cell.selected    // Selecionado
.cleaner-list          // Lista de faxineiras
.cleaner-card          // Card de faxineira
.cleaner-avatar        // Avatar circular
```

### Temas
```css
.theme-controls        // Container de botões de tema
.theme-btn             // Botão de tema
.theme-btn.active      // Tema ativo
.theme-btn-mobile      // Botão flutuante mobile
.modal                 // Modal (overlay)
.modal-content         // Conteúdo do modal
.themes-grid           // Grid de temas
.theme-option          // Opção de tema
.theme-option.active   // Tema selecionado
```

### Footer
```css
.footer                // Container footer
.footer-grid           // Grid de seções
.footer-section        // Seção do footer
.footer-links          // Lista de links
```

### Responsividade
```css
.scroll-animate        // Elemento para animar ao scroll
.scroll-animate.visible // Elemento visível
```

---

## 💾 Índice de localStorage

| Chave | Valor | Tipo | Descrição |
|-------|-------|------|-----------|
| leidycleaner_theme | string | Tema atual | 'light', 'soft', etc |
| leidycleaner_quotes | JSON | Array | Orçamentos salvos |

### Estrutura de Quote
```javascript
{
    id: number,              // Timestamp
    hours: number,           // Horas selecionadas
    service: string,         // Tipo: 'normal', 'profunda', 'posobra'
    cleaners: number,        // Quantidade: 1, 2, 3, 4
    products: string[],      // ['basico', 'especial', ...]
    total: number,           // Valor total
    breakdown: {             // Detalhamento
        base: number,
        serviceExtra: number,
        cleanerExtra: number,
        products: number,
        adminFee: number,
        subtotal: number
    },
    savedAt: string          // ISO timestamp
}
```

---

## 🔗 Índice de onclick handlers

| Handler | Linha | Elemento | Função |
|---------|-------|----------|--------|
| onclick="changeTheme('light')" | 1630 | btn | Muda para tema claro |
| onclick="selectHours(2)" | 1850 | btn | Seleciona 2 horas |
| onclick="selectService('normal')" | 1880 | div | Seleciona serviço |
| onclick="selectCleaners(1)" | 1915 | btn | Seleciona 1 faxineira |
| onclick="toggleProduct('especial')" | 1935 | div | Alterna produto |
| onclick="bookService()" | 2000 | btn | Agenda serviço |
| onclick="saveQuote()" | 2005 | btn | Salva orçamento |
| onclick="shareQuote()" | 2010 | btn | Compartilha |
| onclick="scrollToCalculator()" | 1595 | btn | Scroll para calculadora |
| onclick="scrollToSchedule()" | 1600 | btn | Scroll para agenda |
| onclick="previousWeek()" | 2065 | btn | Semana anterior |
| onclick="nextWeek()" | 2075 | btn | Próxima semana |
| onclick="openModal('themesModal')" | 1715 | btn | Abre modal de temas |
| onclick="closeModal('themesModal')" | 1815 | btn | Fecha modal |

---

## 📊 Estatísticas do Código

```
TOTAL DE LINHAS: 2289

HTML:
  - DOCTYPE + Comments: 30 linhas
  - Head/Style: 1530 linhas
  - Body: 720 linhas
  - Total HTML: 2280 linhas

CSS:
  - Seções: 11
  - Temas: 6
  - Keyframes: 5
  - Media Queries: 3
  - Total CSS: 1512 linhas

JavaScript:
  - Seções: 9
  - Funções: 25+
  - Objetos globais: 2 (CONFIG, appState)
  - Event listeners: 5+
  - Total JS: 729 linhas

Documentação:
  - Comentários em seções: 11
  - Comentários inline: 50+
  - Notas explicativas: 100+
```

---

## 🎓 Fluxo de Aprendizado Recomendado

1. **Ler README.md** - Visão geral do projeto
2. **Abrir index.html** - Ver a estrutura visual
3. **Ler GUIA_DE_NAVEGACAO.md** - Entender onde está cada coisa
4. **Estudar CSS** - Começar pelos temas (linha ~120)
5. **Estudar JavaScript** - Começar pelo CONFIG (linha ~1640)
6. **Testar mudanças** - Alterar preços, cores, etc
7. **Ler DESENVOLVIMENTO.md** - Aprender boas práticas
8. **Estender funcionalidades** - Adicionar novos temas, produtos, etc

---

## 🚀 Próximos Passos Sugeridos

1. [ ] Ler toda a documentação
2. [ ] Abrir o arquivo no navegador
3. [ ] Testar cada tema (claro, escuro, etc)
4. [ ] Alterar preços e testar cálculos
5. [ ] Inspecionar elementos (F12) no navegador
6. [ ] Adicionar novo tema personalizado
7. [ ] Adicionar novo tipo de serviço
8. [ ] Salvar e compartilhar um orçamento
9. [ ] Alterar cores do tema claro
10. [ ] Estender com novas funcionalidades

---

**Última atualização**: 25 de janeiro de 2026
**Total de documentação**: 4 arquivos (README, GUIA, DESENVOLVIMENTO, este arquivo)
