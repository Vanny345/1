# 🔴 PROBLEMAS ENCONTRADOS E SOLUÇÕES

## ⚠️ Problemas Críticos

### 1. **Middleware de Autenticação - Ambos nomes inconsistentes**
**Arquivo:** `backend/src/middleware/auth.js`
**Problema:** 
- Função exportada é `authenticateToken` mas routes usam `authMiddleware`
- Causa erro: `authMiddleware is not a function`

**Solução:**
```javascript
// Mudar exports para:
module.exports = { 
  authMiddleware: authenticateToken,  // Alias correto
  authorizeRole
};
```

---

### 2. **Routes usando middleware incorreto**
**Arquivos:** `bonuses.js`, `schedules.js`, `metrics.js`
**Problema:**
```javascript
// ❌ ERRADO
const { authMiddleware } = require('../middleware/auth');
router.post('/:id/check', authMiddleware, async (req, res) => {
  // authMiddleware não é exportado!
})
```

**Solução:**
```javascript
// ✅ CORRETO
const { authMiddleware: authenticateToken } = require('../middleware/auth');
// OU mudar exportação no middleware.auth.js
```

---

### 3. **Dashboard.jsx - Carregamento de userType incorreto**
**Arquivo:** `frontend/src/pages/Dashboard.jsx` (linha 15)
**Problema:**
```javascript
const [userType] = useState(localStorage.getItem('userType') || 'user');
// ❌ localStorage.getItem('userType') NUNCA é salvo no auth
// Sempre retorna 'user'
```

**Solução:**
```javascript
// ✅ Usar do authStore
const { user } = useAuthStore();
const [userType] = useState(user?.role === 'cleaner' ? 'cleaner' : 'user');
```

---

### 4. **Payment.jsx - Sem validação de dados**
**Arquivo:** `frontend/src/pages/Payment.jsx`
**Problema:**
```javascript
// ❌ Não valida se booking/cleaner existem
const { booking, cleaner } = location.state || {};
if (!booking) {
  // Nada! Vai quebrar ao acessar booking.price
}
```

**Solução:**
```javascript
// ✅ Validar e redirecionar
useEffect(() => {
  if (!booking) {
    toast.error('Agendamento não encontrado');
    navigate('/checkout');
  }
}, [booking, navigate]);
```

---

### 5. **Register.jsx - Autenticação não salva corretamente**
**Arquivo:** `frontend/src/pages/Register.jsx`
**Problema:**
```javascript
// ❌ Após registrar, não salva userType/cleanerId em localStorage
await registerCleaner({...formData});
// Login de sucesso mas falta:
// localStorage.setItem('userType', 'cleaner');
// localStorage.setItem('cleanerId', user.id);
```

**Solução:**
```javascript
// ✅ No authStore.js registerCleaner:
const registerCleaner = async (formData) => {
  const { data } = await authService.registerCleaner(formData);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userType', 'cleaner');        // ← ADD
  localStorage.setItem('cleanerId', data.cleaner.id); // ← ADD
  set({ user: data.cleaner, token: data.token, isLoading: false });
}
```

---

### 6. **API Service - Falta de endpoints**
**Arquivo:** `frontend/src/services/api.js` (linha ~100)
**Problema:**
```javascript
export const metricsService = {
  // ❌ Endpoints não existem!
  // getMetrics, getTopCleaners, etc
}
```

**Solução:**
Adicionar métodos de metrics no api.js

---

### 7. **Validação de Email/CPF fraca**
**Arquivo:** `backend/src/controllers/authController.js`
**Problema:**
```javascript
// ❌ Aceita email e CPF em qualquer formato
const { email, password, cpf } = req.body;
// Sem regex, sem validação!
```

**Solução:**
```javascript
// ✅ Validar com regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ error: 'Email inválido' });
}
if (!cpfRegex.test(cpf)) {
  return res.status(400).json({ error: 'CPF inválido (formato: 123.456.789-10)' });
}
```

---

### 8. **Dashboard - Falta de tratamento de erro quando não há métricas**
**Arquivo:** `frontend/src/pages/Dashboard.jsx`
**Problema:**
```javascript
// ❌ Se API retorna null/undefined
setDashboard(data.dashboard);
// Depois tenta acessar dashboard.metrics.agilityScore → erro!
```

**Solução:**
```javascript
// ✅ Verificar antes de renderizar
{dashboard?.metrics ? (
  <div>{dashboard.metrics.agilityScore}</div>
) : (
  <div>Nenhuma métrica disponível</div>
)}
```

---

### 9. **Services - console.log em production**
**Arquivo:** `backend/src/services/bonusService.js` (linha 46)
**Problema:**
```javascript
console.log(`✅ Bônus concedido para ${cleaner.name}: R$ 100,00`);
// ❌ Logs desnecessários em prod
```

**Solução:**
Remover ou usar logger proper (winston)

---

### 10. **Middleware auth.js - Não exporta authMiddleware**
**Arquivo:** `backend/src/middleware/auth.js`
**Problema:**
```javascript
module.exports = { authenticateToken, authorizeRole };
// ❌ Mas routes importam { authMiddleware }
```

**Solução:**
```javascript
module.exports = { 
  authMiddleware: authenticateToken,
  authenticateToken, 
  authorizeRole 
};
```

---

## 🎨 Problemas de Style/UI

### 1. **Dashboard - Cores inconsistentes**
**Problema:** Cards usam colors diferentes (blue, green, yellow, gradient)
**Solução:** Padronizar para theme Tailwind

### 2. **Payment.jsx - Falta estilo de erro**
**Problema:** Inputs com erro não têm visual feedback
**Solução:** Adicionar border-red-500 quando validação falha

### 3. **Register.jsx - Foto preview muito pequeno**
**Problema:** Preview de foto é minúsculo (100x100)
**Solução:** Aumentar para 200x200 com border

### 4. **Dashboard - Responsive inadequado**
**Problema:** Em mobile, as cards ficam muito comprimidas
**Solução:** Ajustar grid: `grid-cols-1 gap-4` (mobile) → `md:gap-6`

---

## ✅ Checklist de Correções

- [ ] Corrigir exportação authMiddleware
- [ ] Corrigir imports nas routes
- [ ] Adicionar userType em localStorage no register
- [ ] Validar email/CPF com regex
- [ ] Validar booking existente no Payment
- [ ] Remover console.logs
- [ ] Melhorar styling das cards
- [ ] Melhorar responsividade mobile
- [ ] Adicionar endpoints no metricsService
- [ ] Adicionar fallback quando não tem dados

---

## 📊 Impacto

| Problema | Severidade | Impacto |
|----------|-----------|--------|
| authMiddleware missing | 🔴 CRÍTICO | Endpoints não funcionam |
| userType não salva | 🔴 CRÍTICO | Dashboard mostra UI errada |
| Validação fraca | 🟠 ALTO | Dados inválidos no banco |
| console.logs | 🟡 MÉDIO | Vazamento de info em prod |
| Style ruim | 🟡 MÉDIO | UX prejudicada |

