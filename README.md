# 📋 Leidy Cleaner - Sistema Inteligente de Faxina

## 🎯 Descrição

**Leidy Cleaner** é uma plataforma web completa para agendamento de serviços de limpeza com calculadora inteligente e 6 modos de aparência personalizáveis.

---

## ✨ Funcionalidades Principais

### 🎨 **6 Temas de Aparência**
- **Claro** - Tema padrão com tons azuis e brancos
- **Suave** - Tons quentes com laranja e bege
- **Neutro** - Tons acinzentados (cinza azulado)
- **Alto Contraste** - Preto e branco puro (acessibilidade)
- **Pastel** - Cores suaves com rosa e roxo
- **Escuro** - Fundo escuro com texto claro

### 🧮 **Calculadora de Orçamentos**
- Seletor de horas: 2h, 4h, 6h, 8h
- Tipos de faxina:
  - Normal (1.0x)
  - Profunda (1.5x) 
  - Pós-obra (2.0x)
- Quantidade de faxineiras (1-4) com multiplicadores
- Produtos adicionais: Básico, Especial, Ecológico, Premium
- Cálculo em tempo real com taxa administrativa de 20%

### 📅 **Agenda Interativa**
- Grade semanal: 7 dias × 5 horários (08:00, 10:00, 12:00, 14:00, 16:00)
- Navegação por semanas
- Indicadores de disponibilidade
- Seleção múltipla de horários
- Lista de faxineiras com avaliações

### 💾 **Funcionalidades de Sistema**
- Agendamento de serviços
- Salvamento de orçamentos no `localStorage`
- Compartilhamento de orçamentos (Web Share ou clipboard)
- Notificações animadas
- Scroll suave para seções

---

## 🏗️ Estrutura do Código

### 📝 **Arquivo: index.html**

O arquivo é dividido em 3 seções principais:

#### **1. HEAD (Linhas 1-1560)**
```
├── Metadados e imports
├── Estilos CSS (2000+ linhas)
│   ├── Variáveis de temas
│   ├── 6 Modos de aparência
│   ├── Reset CSS
│   ├── Animações
│   ├── Componentes
│   ├── Header
│   ├── Calculadora
│   ├── Agenda
│   ├── Footer
│   └── Responsividade
└── Comentários explicativos por seção
```

#### **2. BODY (Linhas 1560-1550)**
```
├── Header (Logo + Menu)
├── Controles de Tema (Desktop)
├── Botão Tema Mobile
├── Modal de Temas
├── Seção Calculadora
│   ├── Controles
│   └── Resultado/Orçamento
├── Seção Agenda
│   ├── Header da Agenda
│   ├── Grade de Horários
│   └── Lista de Faxineiras
└── Footer
```

#### **3. SCRIPT (Linhas 1550-2284)**
```
├── Seção 1: Configurações (CONFIG)
├── Seção 2: Estado Global (appState)
├── Seção 3: Inicialização (DOMContentLoaded)
├── Seção 4: Sistema de Temas
├── Seção 5: Calculadora
├── Seção 6: Agenda
├── Seção 7: Funções do Sistema
├── Seção 8: Utilitários
└── Seção 9: Responsividade e Event Listeners
```

---

## 💰 Tabela de Preços

### Taxa Base
- **Valor por hora**: R$ 40,00
- **Taxa administrativa**: 20%
- **Horário de funcionamento**: 8h às 18h

### Multiplicadores de Serviço
| Tipo | Multiplicador | Descrição |
|------|---------------|-----------|
| Normal | 1.0x | Limpeza básica |
| Profunda | 1.5x | Limpeza completa |
| Pós-obra | 2.0x | Limpeza após reforma |

### Multiplicadores de Faxineiras
| Quantidade | Multiplicador | Aumento |
|-----------|---------------|---------|
| 1 | 1.0x | — |
| 2 | 1.8x | +80% |
| 3 | 2.5x | +150% |
| 4 | 3.0x | +200% |

### Preços de Produtos
| Produto | Valor | Descrição |
|---------|-------|-----------|
| Básico | R$ 0,00 | Incluído |
| Especial | R$ 15,00 | Produtos premium |
| Ecológico | R$ 20,00 | Biodegradáveis |
| Premium | R$ 30,00 | Luxury cleaning |

---

## 🔧 Como Usar

### Modificar Preços
Editar o objeto `CONFIG` no script:
```javascript
const CONFIG = {
    HOUR_RATE: 40.00,  // Alterar taxa horária
    ADMIN_FEE_PERCENTAGE: 0.20,  // Alterar taxa (20%)
    SERVICE_MULTIPLIERS: { ... },  // Multiplicadores
    CLEANER_RATES: { ... },  // Taxas de faxineiras
    PRODUCT_PRICES: { ... }  // Preços de produtos
};
```

### Adicionar Novo Tema
1. Adicionar CSS no `<style>` com seletor `[data-theme="novo"]`
2. Adicionar entrada em `getThemeName()`:
```javascript
function getThemeName(theme) {
    const names = {
        'novo': 'Nome do Tema',
        // ...
    };
}
```

---

## 📱 Responsividade

### Breakpoints
- **1024px**: Tablets e pequenos laptops
  - Calculadora muda para coluna única
  - Grid de footer em 2 colunas

- **768px**: Tablets em modo retrato
  - Seletores reduzem para 2 colunas
  - Tema mobile ativado

- **480px**: Smartphones
  - Layout totalmente mobile
  - Tema desktop escondido, mobile ativado

---

## 🗝️ Variáveis CSS Principais

```css
/* Cores */
--primary: Cor primária dos botões
--bg: Fundo principal
--text: Cor do texto
--border: Cor das bordas

/* Espaçamento */
--space-sm: 1rem
--space-md: 1.5rem
--space-lg: 2rem
--space-xl: 3rem

/* Sombras */
--shadow: Sombra padrão
--shadow-lg: Sombra grande
--shadow-xl: Sombra extra grande

/* Transições */
--transition: 0.3s ease
--transition-slow: 0.5s ease
```

---

## 🔌 Persistência de Dados

### localStorage
- **Tema selecionado**: `leidycleaner_theme`
- **Orçamentos salvos**: `leidycleaner_quotes`

---

## 🎯 Fluxo de Uso

1. **Selecionar opções** na calculadora
2. **Ver orçamento** atualizar em tempo real
3. **Escolher data/hora** na agenda
4. **Agendar** o serviço ou **salvar** o orçamento
5. **Compartilhar** com amigos

---

## 🚀 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Variáveis CSS, Grid, Flexbox
- **JavaScript** - ES6+, localStorage, Intersection Observer

---

## 📖 Navegação no Código

Use `Ctrl+F` (ou `Cmd+F`) para buscar:
- `====== SEÇÃO 1:` - Variáveis de tema
- `====== SEÇÃO 2:` - Estado da aplicação  
- `====== SEÇÃO 3:` - Inicialização
- `====== SEÇÃO 4:` - Sistema de temas
- `====== SEÇÃO 5:` - Calculadora
- `====== SEÇÃO 6:` - Agenda
- `====== SEÇÃO 7:` - Funções do sistema
- `====== SEÇÃO 8:` - Utilitários
- `====== SEÇÃO 9:` - Responsividade

---

## 📝 Notas por Código

Cada seção do código inclui notas explicativas:
- **Cabeçalho da seção**: Desccrição geral e funcionalidades
- **Comentários inline**: Explicações linha por linha
- **Comentários de passo**: Para cálculos e lógica complexa

---

## ✅ Checklist de Funcionalidades

- [x] 6 temas de aparência
- [x] Calculadora inteligente
- [x] Agenda interativa
- [x] Salvamento de orçamentos
- [x] Compartilhamento
- [x] Responsividade mobile
- [x] Animações suaves
- [x] Notificações
- [x] localStorage
- [x] Documentação completa

---

## 📧 Contato

**Leidy Cleaner**
- 📱 WhatsApp: (51) 99999-9999
- 📧 Email: contato@leidycleaner.com
- 🌍 Site: leidycleaner.com

---

**Desenvolvido com ❤️ para facilitar agendamentos de limpeza**