# 🛠️ Guia de Desenvolvimento & Manutenção

## 📚 Como Este Código Foi Documentado

Todo o código foi documentado com notas por seção:

### Padrão de Documentação

Cada seção principal inclui:

1. **Cabeçalho de Seção** com separador visual
```javascript
/* ════════════════════════════════════════════════════════════════════════ */
/* SEÇÃO X: DESCRIÇÃO DO QUE FAZ                                           */
/* ════════════════════════════════════════════════════════════════════════ */
```

2. **Explicação em Bloco**
```javascript
/* 
 * Explicação detalhada do que a seção faz
 * - Ponto 1
 * - Ponto 2
 * - Ponto 3
 */
```

3. **Comentários Inline**
```javascript
// Comentários explicativos em cada função chave
function selectHours(hours) {
    // Limita às 8 horas máximo e atualiza a UI
    appState.hours = Math.min(hours, CONFIG.MAX_HOURS);
    // ...
}
```

---

## 🎯 Estrutura de Seções

### CSS (Arquivo: index.html, Linhas 47-1550)

**Seção 1: Variáveis dos Modos** (~Linha 50)
- Define cores, espaçamentos e sombras base
- Estas variáveis são sobrescritas por cada tema

**Seção 2: Modos de Aparência** (~Linha 120)
- 6 blocos de `[data-theme="..."]`
- Cada um sobrescreve as variáveis CSS principais

**Seção 3: Reset & Base** (~Linha 270)
- Reset padrão do CSS
- Estilos globais do body e container

**Seção 4: Animações** (~Linha 310)
- Keyframes reutilizáveis
- Usados em transições e hover states

**Seção 5: Componentes** (~Linha 360)
- Estilos de botões (.btn, .btn-primary, etc)
- Cards e elementos reutilizáveis

**Seção 6: Header** (~Linha 520)
- Logo, navegação, efeito de scroll

**Seção 7: Controles de Tema** (~Linha 570)
- Botões de seleção de tema
- Modal de temas mobile

**Seção 8: Calculadora** (~Linha 620)
- Grid de entrada
- Painel de resultado
- Cálculo visual

**Seção 9: Agenda** (~Linha 850)
- Grade de horários
- Navegação de semanas
- Cards de faxineiras

**Seção 10: Footer** (~Linha 990)
- Informações da empresa
- Links

**Seção 11: Responsividade** (~Linha 1080)
- Media queries por breakpoint
- Layout adaptável

### JavaScript (Arquivo: index.html, Linhas 1550-2289)

**Seção 1: Configurações** (~Linha 1640)
- Objeto `CONFIG` com todos os preços
- Multiplicadores e taxas
- **Edite aqui para mudar preços!**

**Seção 2: Estado Global** (~Linha 1680)
- Objeto `appState` com estado da aplicação
- Dados de calculadora, agenda e tema

**Seção 3: Inicialização** (~Linha 1700)
- Executa ao carregar a página
- Setup de temas, calculadora e agenda

**Seção 4: Sistema de Temas** (~Linha 1750)
- `changeTheme()` - Troca tema
- `updateThemeButtons()` - Atualiza UI
- `updateDynamicColors()` - Para gráficos dinâmicos

**Seção 5: Calculadora** (~Linha 1810)
- `selectHours/Service/Cleaners()` - Seleções
- `toggleProduct()` - Ativa/desativa produtos
- `updateCalculator()` - Recalcula preço
- **Este é o coração da lógica de preço!**

**Seção 6: Agenda** (~Linha 1890)
- `generateScheduleGrid()` - Cria grid semanal
- `selectTimeSlot()` - Seleciona horários
- `previousWeek/nextWeek()` - Navega entre semanas

**Seção 7: Funções do Sistema** (~Linha 1990)
- `bookService()` - Valida e agenda
- `saveQuote()` - Salva no localStorage
- `shareQuote()` - Compartilha via Web Share

**Seção 8: Utilitários** (~Linha 2090)
- `openModal/closeModal()` - Controle de modais
- `showNotification()` - Notificações animadas
- `scrollToCalculator/Schedule()` - Scroll suave
- `initScrollAnimation()` - Intersection Observer

**Seção 9: Responsividade** (~Linha 2230)
- Event listeners para resize
- Tecla ESC para fechar modais
- Clique fora para fechar modais

---

## 🔄 Fluxo de Uma Seleção

### Exemplo: Usuário Clica em "4h"

```
1. Usuário clica em botão com onclick="selectHours(4)"
   └─ index.html, ~Linha 1450

2. Função selectHours(4) executada
   └─ Linha ~1820
   └─ Atualiza: appState.hours = 4
   └─ Atualiza UI dos botões
   └─ Chama: updateCalculator()

3. updateCalculator() executada
   └─ Linha ~1890
   └─ Lê: appState.hours = 4
   └─ Calcula:
       ├─ basePrice = 4 * 40 = R$ 160
       ├─ Aplica multiplicador de serviço
       ├─ Aplica multiplicador de faxineiras
       ├─ Soma produtos
       ├─ Aplica taxa de 20%
       └─ TOTAL = novo preço

4. Salva cálculo em appState.currentQuote
   └─ Com breakdown detalhado

5. Atualiza DOM
   └─ document.getElementById('totalPrice').textContent = ...
   └─ Usuário vê novo total na tela
```

---

## 🎨 Como Adicionar um Novo Tema

### Passo 1: Adicionar CSS
```css
/* Linha ~250, após [data-theme="dark"] */

[data-theme="meu-tema"] {
    --bg: #F0F0F0;
    --bg-secondary: #E8E8E8;
    --bg-card: #FFFFFF;
    --text: #333333;
    --text-secondary: #666666;
    --text-muted: #999999;
    --border: #DDDDDD;
    --border-light: #F5F5F5;
    
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 10px 20px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    --primary: #0066CC;
    --primary-light: #3399FF;
    --primary-dark: #004499;
}
```

### Passo 2: Adicionar Nome
```javascript
// Linha ~1728, na função getThemeName()
function getThemeName(theme) {
    const names = {
        'light': 'Claro',
        'soft': 'Suave',
        'neutral': 'Neutro',
        'high-contrast': 'Alto Contraste',
        'pastel': 'Pastel',
        'dark': 'Escuro',
        'meu-tema': 'Meu Tema'  // Adicionar aqui
    };
    return names[theme] || theme;
}
```

### Passo 3: Adicionar Botão no HTML
```html
<!-- Linha ~1495, nos controles de tema -->
<button class="theme-btn" data-theme="meu-tema" 
    title="Meu Tema" onclick="changeTheme('meu-tema')">
    <i class="fas fa-star"></i>
</button>

<!-- Linha ~1520, no modal -->
<div class="theme-option" data-theme="meu-tema" 
    onclick="changeTheme('meu-tema')">
    <i class="fas fa-star" style="font-size: 2rem; margin-bottom: var(--space-sm);"></i>
    <div>Meu Tema</div>
</div>
```

---

## 💰 Alterar Tabela de Preços

### Mudança Simples: Taxa Horária

```javascript
// Linha ~1655
HOUR_RATE: 50.00  // Era 40.00

// Resultado: Todos os cálculos atualizarão automaticamente!
```

### Mudança Moderada: Novo Multiplicador

```javascript
// Linha ~1663
SERVICE_MULTIPLIERS: {
    normal: 1.0,
    superficial: 0.75,  // Novo tipo!
    profunda: 1.5,
    posobra: 2.0
}

// E adicionar HTML:
<div class="service-option" data-service="superficial" 
     onclick="selectService('superficial')">
    <div class="service-icon">
        <i class="fas fa-feather"></i>
    </div>
    <div>
        <div style="font-weight: 600;">Faxina Superficial</div>
        <small style="color: var(--text-secondary);">Limpeza leve</small>
    </div>
</div>
```

### Mudança Complexa: Novo Produto

```javascript
// Linha ~1674
PRODUCT_PRICES: {
    basico: 0.00,
    especial: 15.00,
    ecologico: 20.00,
    premium: 30.00,
    luxo: 50.00  // Novo!
}

// E adicionar HTML:
<div class="product-option" data-product="luxo" 
     onclick="toggleProduct('luxo')">
    <i class="fas fa-gem" style="font-size: 1.5rem; margin-bottom: 5px;"></i>
    <div>Luxo</div>
</div>
```

---

## 🧪 Testando Mudanças

### No Console do Navegador (F12):

```javascript
// Forçar recalcular depois de mudanças
updateCalculator();

// Ver estado atual
console.log(appState);

// Ver configuração
console.log(CONFIG);

// Mudar tema programaticamente
changeTheme('dark');

// Simular agendamento
appState.selectedSlots = [{day: 0, time: '08:00'}];
bookService();
```

---

## 🚀 Deploy & Performance

### Checklist Antes de Publicar:

- [ ] Preços estão corretos em `CONFIG`?
- [ ] Temas são visualmente agradáveis?
- [ ] Responsividade funciona em mobile?
- [ ] localStorage está salvando dados?
- [ ] Notificações aparecem corretamente?
- [ ] Scroll é suave?
- [ ] Animações não travam?

### Otimizações Possíveis:

1. **Minificar CSS/JS** (antes de production)
2. **Adicionar Service Worker** para offline
3. **Comprimir imagens** (não há no projeto atual)
4. **Lazy load** de componentes
5. **Cache de localStorage** mais eficiente

---

## 📊 Analítica (Sugestão)

Para rastrear uso, adicionar:

```javascript
// No bookService()
fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
        event: 'booking',
        quote: appState.currentQuote,
        timestamp: new Date()
    })
});
```

---

## 🔐 Segurança

**Avisos importantes:**

- ✅ Preços calculados no cliente (JavaScript)
- ⚠️ **Em produção, validar preços no servidor!**
- ✅ localStorage é seguro para dados de sessão
- ⚠️ **Não armazenar dados sensíveis em localStorage**
- ✅ Sem validação de email/telefone no cliente
- ⚠️ **Sempre validar no servidor antes de processar pagamento**

---

## 🐛 Troubleshooting

### Tema não muda?
- Verificar se CSS tem `[data-theme="seu-tema"]`
- Verificar se botão tem `data-theme="seu-tema"`
- Limpar cache e localStorage: `localStorage.clear()`

### Cálculo incorreto?
- Ver valores em `CONFIG`
- Fazer console.log() em cada etapa de `updateCalculator()`
- Verificar se multiplicadores estão corretos

### Agenda não funciona?
- Verificar se `selectedSlots` está sendo preenchido
- Verificar estrutura do array: `[{day, time, element}]`
- Ver console para erros

### Mobile não mostra botão?
- Verificar breakpoint 480px em media queries
- Chamar função de resize: `window.dispatchEvent(new Event('resize'))`

---

## 📞 Suporte

Para dúvidas sobre:
- **Estrutura**: Ver seção de navegação
- **Lógica**: Ver comentários inline no código
- **Preços**: Ver objeto `CONFIG`
- **Temas**: Ver CSS `[data-theme="..."]`

---

## 📈 Roadmap de Melhorias

Sugestões para versão 2.0:

- [ ] Integração com banco de dados (Firebase)
- [ ] Pagamento integrado (Stripe/PagSeguro)
- [ ] App mobile nativa (React Native)
- [ ] Análise de dados (Dashboard)
- [ ] Sistema de reviews de faxineiras
- [ ] Chat em tempo real
- [ ] Push notifications
- [ ] Suporte multidioma
- [ ] Modo offline completo

---

**Desenvolvido com ❤️ e documentado com cuidado**
