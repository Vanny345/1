# 🎨 Guia - Personalizar Logo e Usar Agenda

## 🏆 O que foi corrigido

### ✅ 1. AGENDA FUNCIONANDO
- Grid de horários agora responde corretamente
- Clique em qualquer horário para selecionar
- Aparece "✓ Selecionado" em verde quando escolher
- Clique novamente para desselecionar
- **Apenas dados REAIS** são salvos (sem fictícios)

### ✅ 2. APENAS DADOS DE VERDADE
- Removidas as 3 faxineiras fictícias (Maria, Ana, Joana)
- Agora aparece: "Nenhuma faxineira cadastrada ainda"
- Só aparecem faxineiras que você cadastrar de verdade
- Reviews só de usuários reais autenticados

### ✅ 3. LOGO E PERSONALIZAÇÃO DO SITE
- Novo sistema completo de customização
- Mudar nome, tagline e logo
- **Apenas admin** pode fazer isso

---

## 🎨 COMO PERSONALIZAR O LOGO E NOME

### PASSO 1: Criar conta ADMIN

1. Clique em **"Entrar / Cadastro"** no header
2. Cadastre um novo usuário (qualquer nome/email)
3. Abra DevTools: **F12 → Console**
4. Cole este código:

```javascript
// Tornar este usuário ADMIN
const email = prompt("Digite seu e-mail cadastrado:");
authSystem.users[email].type = 'admin';
localStorage.setItem('leidyUsers', JSON.stringify(authSystem.users));
location.reload();
```

5. Pressione **Enter**
6. Digite seu e-mail e **Enter**
7. Página recarrega
8. Faça login novamente

**Resultado:** Novos botões aparecem no header:
- **⚙️ Admin** (para ver relatórios)
- **🎨 Customizar** (para mudar logo e nome)

---

### PASSO 2: Customizar Logo e Nome

1. Clique no botão **"🎨 Customizar"** (lilás, no header)
2. Modal abre com opções:

#### Opção A: Usar um ÍCONE
- Na lista de **Select a ícone**, escolha um:
  - ✨ Sparkles (padrão)
  - 🧹 Vassoura
  - ✨ Varinha Mágica
  - 🧼 Sabonete
  - 💧 Água
  - ⭐ Estrela
  - ❤️ Coração

#### Opção B: Usar uma IMAGEM
- Vá para sites de imagem grátis:
  - **https://unsplash.com** (imagens gratuitas)
  - **https://pexels.com** (grátis)
  - **https://pixabay.com** (grátis)
- Procure por "cleaning logo" ou seu logo
- Clique com botão direito e **"Copiar link da imagem"**
- Cole no campo **"URL da Imagem"**

**Exemplo de URL válida:**
```
https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500
```

#### Exemplo 3: Alterar NOME e TAGLINE
- **Nome do Site:** `Meu Serviço de Limpeza` (ou qualquer nome)
- **Tagline:** `Somos os Melhores!` (ou seu lema)

3. Clique em **"Salvar Alterações"**
4. ✅ Pronto! Logo, nome e tagline foram atualizados

---

## 📅 COMO USAR A AGENDA

### PASSO 1: Selecionar Horários

1. Role até seção **"Agenda das Faxineiras"**
2. Veja a grid com dias da semana (Seg, Ter, Qua...)
3. Veja os horários (08:00, 10:00, 12:00, 14:00, 16:00, 18:00)
4. Clique em qualquer célula com **"Disponível"** em verde
5. **Resultado:** Células viram azuis com ✓ e texto "Selecionado"
6. Aparece notificação: "Horário 10:00 selecionado com sucesso!"

### PASSO 2: Navegar entre Semanas

- Botão **◀** (Esquerda): Semana anterior
- Botão **▶** (Direita): Próxima semana
- Título mostra: "Semana Atual" ou data específica

### PASSO 3: Confirmar Agendamento

1. Defina também na calculadora:
   - Horas
   - Tipo de limpeza
   - Número de faxineiras
   - Produtos

2. Clique em **"Finalizar Pagamento"** ou **💳** (botão flutuante)

3. Preencha dados de pagamento e finalize

---

## 🎯 GUIA RÁPIDO DE MUDANÇAS

| O que mudou | Como era | Como é agora |
|---|---|---|
| **Agenda** | Sem resposta ao clique | Clique e seleciona com ✓ |
| **Dados** | Faxineiras fictícias | Apenas dados reais |
| **Logo** | Ícone fixo sparkles | Pode mudar para ícone ou URL |
| **Nome** | "LeidyCleaner" fixo | Pode personalizar qualquer nome |
| **Customização** | Não existia | Novo botão 🎨 para admin |

---

## 💡 DICAS

### Dica 1: Encontrar boa imagem para logo
1. Vá para **Unsplash.com**
2. Procure por "minimalist cleaning logo"
3. Clique em uma imagem
4. Clique em "Copy image URL"
5. Cole no campo da modal

### Dica 2: Usar emoji como logo
Se quiser algo simples, pode colocar emojis como:
- 🧹 (vassoura)
- 🧼 (sabonete)
- 💧 (água)
- 🧽 (esponja)
- 🪣 (balde)

Você pode colocá-los no campo de URL também!

### Dica 3: Teste a agenda
1. Cadastre-se como cliente normal
2. Vá para agenda
3. Clique em vários horários
4. Todas as seleções são guardadas
5. Quando pagar, agendamento é confirmado

---

## 🚀 PRÓXIMAS FUNCIONALIDADES

Que tal adicionar:
- [ ] Upload de foto real (não só URL)
- [ ] Cadastro de faxineiras reais
- [ ] Email confirmando agendamento
- [ ] SMS lembrando 24h antes
- [ ] Integração com calendário

---

## ⚠️ PROBLEMAS COMUNS

### "Imagem não aparece"
- URL está quebrada ou site bloqueou
- Solução: Use Unsplash ou Pexels (garantem funcionamento)

### "Logo desapareceu ao recarregar"
- localStorage foi limpa
- Solução: Vá em DevTools → Application → Clear Storage → Recarregue

### "Agenda não responde ao clique"
- JavaScript desabilitado no navegador
- Solução: Ative JavaScript ou use outro navegador

---

**Pronto para testar! 🚀**
