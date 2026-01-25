# 💰 Exemplos de Cálculos & Referência Rápida

## 📊 Tabelas de Referência

### Exemplo 1: Faxina Normal - 2h - 1 Faxineira
```
Configuração:
  Horas: 2
  Tipo: Normal (1.0x)
  Faxineiras: 1 (1.0x)
  Produtos: Básico
  
Cálculo:
  Base: 2h × R$ 40/h = R$ 80,00
  Serviço: R$ 80,00 × 1.0 = R$ 80,00 (sem aumento)
  Faxineiras: R$ 80,00 × 1.0 = R$ 80,00 (sem aumento)
  Produtos: R$ 0,00 (básico incluído)
  Subtotal: R$ 80,00
  Taxa admin (20%): R$ 16,00
  
  TOTAL: R$ 96,00 ✅
```

### Exemplo 2: Faxina Profunda - 4h - 2 Faxineiras + Produto Especial
```
Configuração:
  Horas: 4
  Tipo: Profunda (1.5x)
  Faxineiras: 2 (1.8x)
  Produtos: Básico + Especial
  
Cálculo:
  Base: 4h × R$ 40/h = R$ 160,00
  Serviço: R$ 160,00 × 1.5 = R$ 240,00 (+R$ 80,00)
  Faxineiras: R$ 240,00 × 1.8 = R$ 432,00 (+R$ 192,00)
  Produtos: R$ 0,00 + R$ 15,00 = R$ 15,00
  Subtotal: R$ 432,00 + R$ 15,00 = R$ 447,00
  Taxa admin (20%): R$ 89,40
  
  TOTAL: R$ 536,40 ✅
```

### Exemplo 3: Pós-Obra - 8h - 4 Faxineiras + Tudo
```
Configuração:
  Horas: 8 (máximo)
  Tipo: Pós-obra (2.0x)
  Faxineiras: 4 (3.0x)
  Produtos: Básico + Especial + Ecológico + Premium
  
Cálculo:
  Base: 8h × R$ 40/h = R$ 320,00
  Serviço: R$ 320,00 × 2.0 = R$ 640,00 (+R$ 320,00)
  Faxineiras: R$ 640,00 × 3.0 = R$ 1.920,00 (+R$ 1.280,00)
  Produtos: R$ 0 + R$ 15 + R$ 20 + R$ 30 = R$ 65,00
  Subtotal: R$ 1.920,00 + R$ 65,00 = R$ 1.985,00
  Taxa admin (20%): R$ 397,00
  
  TOTAL: R$ 2.382,00 ✅
```

---

## 🎨 Cores dos 6 Temas

### 1. TEMA CLARO (Light)
```css
--primary: #10B981     (Verde)
--bg: #F8FAFC          (Branco azulado)
--text: #1E293B        (Cinza escuro)
--border: #E2E8F0      (Cinza muito claro)
```

### 2. TEMA SUAVE (Soft)
```css
--primary: #FF9800     (Laranja)
--bg: #FDFCFB          (Bege muito claro)
--text: #5D4037        (Marrom)
--border: #E0E0E0      (Cinza)
```

### 3. TEMA NEUTRO (Neutral)
```css
--primary: #607D8B     (Azul acinzentado)
--bg: #FAFAFA          (Cinza muito claro)
--text: #424242        (Cinza escuro)
--border: #E0E0E0      (Cinza)
```

### 4. TEMA ALTO CONTRASTE (High-contrast)
```css
--primary: #000000     (Preto puro)
--bg: #FFFFFF          (Branco puro)
--text: #000000        (Preto)
--border: #000000      (Preto)
```

### 5. TEMA PASTEL (Pastel)
```css
--primary: #BA68C8     (Roxo pastel)
--bg: #FFF9F9          (Rosa muito claro)
--text: #5D4037        (Marrom)
--border: #E8DEF8      (Roxo muito claro)
```

### 6. TEMA ESCURO (Dark)
```css
--primary: #10B981     (Verde)
--bg: #121212          (Cinza muito escuro)
--text: #FFFFFF        (Branco)
--border: #404040      (Cinza escuro)
```

---

## 📱 Responsividade - Breakpoints

### Desktop (> 1024px)
```
┌─────────────────────────────────────┐
│         Header com Logo             │
├──────────┬──────────────────────────┤
│ Controles│      Resultado           │
│ Entrada  │      Orçamento           │
│ da       │                          │
│ Calc.    │                          │
├──────────┴──────────────────────────┤
│              Agenda                 │
│      (Grade de 7 dias × 5 horas)   │
├─────────────────────────────────────┤
│  Col 1   │  Col 2   │  Col 3  │ Col4│
│  (Footer)                           │
└─────────────────────────────────────┘

Layout: Grid 2 colunas (controles + resultado)
Footer: 4 colunas
```

### Tablet (768px - 1024px)
```
┌─────────────────────────────────────┐
│         Header com Logo             │
├─────────────────────────────────────┤
│      Calculadora (coluna única)     │
│      - Controles                    │
│      - Resultado                    │
├─────────────────────────────────────┤
│              Agenda                 │
│    (Scroll horizontal se needed)    │
├──────────────┬──────────────────────┤
│  Col 1  │ Col 2 │ Footer 2 colunas │
└─────────────────────────────────────┘

Layout: 1 coluna calculadora
Footer: 2 colunas
Tema mobile: Ativado
```

### Mobile (< 480px)
```
┌─────────────────────────────────────┐
│    Header com Logo Compacto         │
├─────────────────────────────────────┤
│  Calculadora                        │
│  - Horas (1 coluna)                │
│  - Serviço (1 coluna)              │
│  - Faxineiras (wrap)               │
│  - Produtos (1 coluna)             │
│  - Resultado (full width)           │
├─────────────────────────────────────┤
│  Agenda (scroll horizontal)         │
├─────────────────────────────────────┤
│  Faxineiras (vertical)             │
├─────────────────────────────────────┤
│ Footer (1 coluna)                  │
├─────────────────────────────────────┤
│ [Botão Tema Flutuante - FAB]        │
└─────────────────────────────────────┘

Layout: 1 coluna
Controles: Botões stacked
Footer: 1 coluna
Tema: Botão mobile flutuante
```

---

## ⏰ Horários da Agenda

```
08:00 - Início do expediente
10:00 - Meio da manhã
12:00 - Meio-dia
14:00 - Tarde
16:00 - Final da tarde
18:00 - Fechamento (não aparece)

Horários por dia: 5
Dias da semana: 7
Total: 35 horários disponíveis
```

---

## 👥 Multiplicadores Resumidos

### Por Tipo de Faxina
| Tipo | Multiplicador | Preço Base 2h |
|------|---------------|--------------|
| Normal | 1.0x | R$ 80 |
| Profunda | 1.5x | R$ 120 |
| Pós-obra | 2.0x | R$ 160 |

### Por Número de Faxineiras
| Qtd | Multiplicador | Custo em Normal 2h |
|-----|---------------|--------------------|
| 1 | 1.0x | R$ 80 |
| 2 | 1.8x | R$ 144 |
| 3 | 2.5x | R$ 200 |
| 4 | 3.0x | R$ 240 |

### Produtos Adicionais
| Produto | Valor |
|---------|-------|
| Básico | R$ 0,00 |
| Especial | R$ 15,00 |
| Ecológico | R$ 20,00 |
| Premium | R$ 30,00 |

---

## 🔄 Fluxo de Dados

### Estado da Aplicação (appState)
```javascript
{
    // Calculadora
    hours: 2,                          // Horas selecionadas (2-8)
    service: 'normal',                 // Tipo: 'normal', 'profunda', 'posobra'
    cleaners: 1,                       // Quantidade: 1-4
    products: ['basico'],              // Array de produtos selecionados
    
    // Agenda
    currentWeek: Date(),               // Data da semana atual
    selectedSlots: [                   // Horários selecionados
        { day: 0, time: '08:00', element: HTMLElement }
    ],
    
    // Aparência
    theme: 'light',                    // Tema atual
    
    // Orçamento
    currentQuote: {                    // Orçamento em cálculo
        hours: 2,
        service: 'normal',
        cleaners: 1,
        products: ['basico'],
        total: 96.00,
        breakdown: {
            base: 80,
            serviceExtra: 0,
            cleanerExtra: 0,
            products: 0,
            adminFee: 16,
            subtotal: 80
        }
    }
}
```

---

## 🎯 Eventos Importantes

```javascript
// Quando usuário clica em "Selecionar 4h"
selectHours(4)
  ↓
appState.hours = 4
  ↓
updateCalculator()
  ↓
DOM atualizado com novo total

// Quando usuário clica em "Agendar Agora"
bookService()
  ↓
Valida orçamento
Valida horários
  ↓
Se tudo OK → mostra notificação
Se erro → alerta o usuário

// Quando usuário troca de tema
changeTheme('dark')
  ↓
document.body.setAttribute('data-theme', 'dark')
  ↓
CSS sobrescreve variáveis
  ↓
localStorage.setItem('leidycleaner_theme', 'dark')
  ↓
Tema salvo para próxima visita
```

---

## 📈 Performance

### Tamanho do Arquivo
- HTML: 2289 linhas
- CSS: 1512 linhas
- JavaScript: 729 linhas
- **Total: ~85KB** (minificado)

### Carregamento
- Sem banco de dados
- Sem requisições HTTP
- Sem imagens
- **Carrega em < 1 segundo**

### Memória
- appState: ~2KB
- localStorage: ~5KB por orçamento
- Total: ~ 50KB por 10 orçamentos

---

## 🔐 Validações

### Calculadora
- ✅ Horas máximo de 8
- ✅ Tipo de serviço válido
- ✅ Quantidade de faxineiras 1-4
- ✅ Produtos existentes
- ⚠️ Sem validação de backend (adicionar em produção!)

### Agenda
- ✅ Horários existentes
- ✅ Dias válidos
- ⚠️ Sem verificação de conflito no backend

### Tema
- ✅ Tema existe
- ✅ Salva em localStorage
- ✅ Recupera ao recarregar

---

## 💡 Dicas de Uso

### Para Gerentes
- Altere preços em `CONFIG` para ajustar valores
- Visualize `localStorage` para ver histórico
- Teste notificações em diferentes temas

### Para Desenvolvedores
- Use DevTools para debugar
- Veja console.log() em updateCalculator()
- Teste mudanças com localStorage.clear()

### Para Designers
- Customize cores em `[data-theme="..."]`
- Adicione novos ícones (Font Awesome)
- Modifique espaçamentos em `--space-*`

---

## 🚀 Roadmap de Versões

**v1.0** (Atual)
- ✅ 6 temas
- ✅ Calculadora
- ✅ Agenda
- ✅ localStorage

**v1.1** (Próxima)
- [ ] Mais temas personalizáveis
- [ ] Histórico de agendamentos
- [ ] Notificações de lembrete
- [ ] Avaliações de faxineiras

**v2.0**
- [ ] Backend (Node.js/Django)
- [ ] Banco de dados (PostgreSQL)
- [ ] Pagamento online
- [ ] App mobile
- [ ] Sistema de reviews
- [ ] Chat em tempo real

---

## 🎓 Quiz Rápido

**Questão 1**: Qual é a taxa base por hora?
> Resposta: R$ 40,00

**Questão 2**: Qual é a taxa administrativa?
> Resposta: 20% do subtotal

**Questão 3**: Qual é o multiplicador para pós-obra?
> Resposta: 2.0x

**Questão 4**: Quantos temas existem?
> Resposta: 6 temas

**Questão 5**: Qual é o máximo de horas?
> Resposta: 8 horas

**Questão 6**: Como os dados são salvos?
> Resposta: Em localStorage do navegador

---

**Última atualização**: 25 de janeiro de 2026
**Mantido por**: Equipe Leidy Cleaner
