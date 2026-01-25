# Configuração - Dados da Empresa Leidy Cleaner

## 🏢 Dados Cadastrais

```
Empresa: Leidy Cleaner Serviços
CNPJ: 64.313.041/0001-10
```

## 🏦 Dados Bancários

```
Banco: Banco do Brasil (001)
Agência: 0435
Conta: 000827519788
Dígito: 9
Completo: 0435 / 000827519788-9
```

## 💳 PIX

```
Chave PIX: 51 980330422
Tipo: Telefone
```

## 💰 Como Funciona

### Fluxo de Dinheiro

```
CLIENTE PAGA
    ↓
STRIPE RECEBE (R$ 180,00)
    ├─ Taxa Stripe: -R$ 5,40 (2,99%)
    └─ Transfere para conta: R$ 174,60
    ↓
CONTA DA EMPRESA
Agência: 0435
Conta: 000827519788-9
Recebe: R$ 174,60
    ↓
EMPRESA SEPARA:
├─ Paga faxineira: R$ 150,00 (via PIX 51 980330422)
└─ Lucro empresa: R$ 24,60
```

## ⚙️ Configuração no Backend

Adicionar ao arquivo `.env`:

```bash
# ==================== EMPRESA ====================
COMPANY_NAME="Leidy Cleaner Serviços"
COMPANY_CNPJ="64.313.041/0001-10"
COMPANY_EMAIL="contato@leidycleaner.com"
COMPANY_PHONE="(51) 98033-0422"

# ==================== CONTA BANCÁRIA EMPRESA ====================
COMPANY_BANK_CODE="001"              # Banco do Brasil
COMPANY_BANK_AGENCY="0435"           # Agência
COMPANY_BANK_ACCOUNT="000827519788"  # Número da conta
COMPANY_BANK_DIGIT="9"               # Dígito
COMPANY_BANK_HOLDER="LEIDY CLEANER SERVIÇOS"

# ==================== PIX EMPRESA ====================
COMPANY_PIX_KEY="51980330422"        # Telefone
COMPANY_PIX_KEY_TYPE="phone"         # Tipo: telefone

# ==================== STRIPE ====================
STRIPE_SECRET_KEY="sk_live_..."      # Será fornecido pelo Stripe
STRIPE_PUBLIC_KEY="pk_live_..."      # Será fornecido pelo Stripe
```

## ✅ Próximos Passos

1. **Criar conta no Stripe**: https://dashboard.stripe.com
2. **Adicionar dados bancários** (Agência 0435, Conta 000827519788-9)
3. **Obter as chaves Stripe** (SK e PK)
4. **Copiar para .env**
5. **Configurar webhook** do Stripe para receber confirmações
6. **Testar pagamentos** em modo sandbox
7. **Ativar em produção** quando tudo funcionar

---

**Status**: Dados da empresa configurados ✅
