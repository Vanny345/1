# 🗺️ Guia de Navegação do Código

## 📋 Estrutura do Arquivo index.html

### Localização Rápida das Seções

Use `Ctrl+F` ou `Cmd+F` para buscar:

#### **SEÇÕES DE CSS/ESTILO**

| Seção | Localização | Descrição |
|-------|-----------|-----------|
| VARIÁVEIS DOS MODOS | Linha ~50 | Definição de cores e espaçamentos base |
| MODOS DE APARÊNCIA | Linha ~120 | 6 temas diferentes (light, soft, etc) |
| RESET & BASE | Linha ~270 | Reset CSS e estilos globais |
| ANIMAÇÕES | Linha ~310 | Keyframes (fadeIn, slideIn, float, pulse) |
| COMPONENTES | Linha ~360 | Botões, badges, cards reutilizáveis |
| HEADER | Linha ~520 | Cabeçalho fixo com logo e menu |
| CONTROLES DE TEMA | Linha ~570 | Seletor de 6 temas |
| CALCULADORA | Linha ~620 | Grid de entrada e resultado |
| AGENDA | Linha ~850 | Grade de horários semanal |
| FOOTER | Linha ~990 | Rodapé com informações |
| RESPONSIVIDADE | Linha ~1080 | Media queries (1024px, 768px, 480px) |

#### **SEÇÕES DE JAVASCRIPT**

| Seção | Localização | Descrição |
|-------|-----------|-----------|
| CONFIGURAÇÕES | Linha ~1640 | CONFIG com preços e multiplicadores |
| ESTADO GLOBAL | Linha ~1680 | appState com dados da aplicação |
| INICIALIZAÇÃO | Linha ~1700 | DOMContentLoaded e setup |
| SISTEMA DE TEMAS | Linha ~1750 | changeTheme(), updateThemeButtons() |
| CALCULADORA | Linha ~1810 | selectHours(), updateCalculator() |
| AGENDA | Linha ~1890 | generateScheduleGrid(), selectTimeSlot() |
| FUNÇÕES DO SISTEMA | Linha ~1990 | bookService(), saveQuote() |
| UTILITÁRIOS | Linha ~2090 | openModal(), showNotification() |
| RESPONSIVIDADE | Linha ~2230 | Event listeners e redimensionamento |

---

## 🔍 Buscar por Funcionalidade

### **Alterar Preços?**
👉 Linha ~1640 - Objeto `CONFIG`

### **Adicionar Novo Tema?**
👉 Linha ~120 - Adicionar `[data-theme="novo"]` no CSS
👉 Linha ~1730 - Adicionar em `getThemeName()`

### **Mudar Cores do Tema Claro?**
👉 Linha ~147 - `[data-theme="light"]`

### **Adicionar Novo Horário na Agenda?**
👉 Linha ~1935 - Array de `timeSlots`

### **Modificar Cálculo de Preço?**
👉 Linha ~1890 - Função `updateCalculator()`

### **Adicionar Novo Produto?**
👉 Linha ~1680 - Array `products` em `CONFIG`

---

## 📦 Fluxo de Dados

```
┌─────────────────────────────────────┐
│  Interação do Usuário (Click)       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  selectHours/Service/Cleaners/...   │
│  (Atualiza appState)                │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  updateCalculator() ou              │
│  generateScheduleGrid()             │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Atualiza DOM com document.getElementById
└─────────────────────────────────────┘
```

---

## 🎨 Árvore de Variáveis CSS

```
:root (Variáveis Base)
├── --primary (Cor primária)
├── --bg (Fundo)
├── --text (Texto)
├── --shadow-* (Sombras)
├── --space-* (Espaçamentos)
└── --transition-* (Durações)

[data-theme="light"]
[data-theme="soft"]
[data-theme="neutral"]
[data-theme="high-contrast"]
[data-theme="pastel"]
[data-theme="dark"]
```

---

## 💾 Dados no localStorage

### Salvo Automaticamente:
- `leidycleaner_theme` - Tema selecionado
- `leidycleaner_quotes` - Array de orçamentos salvos

### Estrutura de um Orçamento:
```javascript
{
    id: 1234567890,
    hours: 4,
    service: "profunda",
    cleaners: 2,
    products: ["basico", "especial"],
    total: 199.80,
    savedAt: "2024-01-25T10:30:00.000Z",
    breakdown: {
        base: 160,
        serviceExtra: 80,
        cleanerExtra: 144,
        products: 15,
        adminFee: 83.80,
        subtotal: 482.80
    }
}
```

---

## 🔧 Modificações Comuns

### 1️⃣ Mudar Taxa Administrativa de 20% para 15%
```javascript
// Linha ~1660
ADMIN_FEE_PERCENTAGE: 0.15  // Era 0.20
```

### 2️⃣ Aumentar Horas Máximas para 12
```javascript
// Linha ~1655
MAX_HOURS: 12  // Era 8
```

### 3️⃣ Adicionar Novo Tipo de Faxina "Superficial"
```javascript
// Linha ~1663
SERVICE_MULTIPLIERS: {
    normal: 1.0,
    superficial: 0.75,  // Novo!
    profunda: 1.5,
    posobra: 2.0
}
```

### 4️⃣ Mudar Horário Inicial de 8h para 7h
```javascript
// Linha ~1935 (em generateScheduleGrid)
const timeSlots = ['07:00', '09:00', '11:00', '13:00', '15:00'];
```

---

## 🧪 Teste Rápido

Para testar mudanças, abra o console (F12) e execute:

```javascript
// Ver tema atual
console.log(appState.theme);

// Alterar tema programaticamente
changeTheme('dark');

// Ver orçamento atual
console.log(appState.currentQuote);

// Forçar recalcular
updateCalculator();

// Ver todos os temas salvos
console.log(localStorage.getItem('leidycleaner_quotes'));
```

---

## 📱 Testes de Responsividade

Abra DevTools (F12) e teste:

- **Desktop**: 1920×1080 (Layout completo)
- **Tablet**: 1024×768 (2 colunas em footer)
- **Celular**: 480×800 (1 coluna, botão flutuante)

---

## 🚀 Performance

- **CSS**: 2000+ linhas com variáveis para rápida troca de tema
- **JS**: Modular e organizado por funcionalidade
- **DOM**: Minimal manipulation, IDs para acesso rápido
- **localStorage**: Caching automático de temas

---

## 🐛 Debug

### Verificar Cálculo:
```javascript
// Na função updateCalculator()
console.log('Base:', basePrice);
console.log('Serviço:', servicePrice);
console.log('Faxineiras:', cleanerPrice);
console.log('Total:', totalPrice);
```

### Verificar Tema:
```javascript
// No console
getComputedStyle(document.documentElement)
    .getPropertyValue('--primary');
```

---

## 📚 Referências Rápidas

| Função | Linha | Para |
|--------|-------|------|
| `changeTheme()` | 1720 | Trocar tema |
| `updateCalculator()` | 1890 | Recalcular orçamento |
| `bookService()` | 2010 | Agendar |
| `saveQuote()` | 2060 | Salvar orçamento |
| `showNotification()` | 2165 | Mostrar notificação |
| `openModal()` | 2125 | Abrir modal |
| `closeModal()` | 2130 | Fechar modal |

---

**Última atualização**: 25 de janeiro de 2026
