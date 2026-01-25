# 👩‍🔧 Guia Completo - Sistema de Faxineiras

## ✨ O que foi adicionado

### 1. **NÚMERO WHATSAPP ATUALIZADO**
- **+55 51 8030-3740** (da Leidy)
- Botão WhatsApp agora envia mensagens para este número

### 2. **CADASTRO DE FAXINEIRAS (Profissional)**
Faxineiras agora têm perfil completo com:
- ✅ **CPF** (validação: 123.456.789-00)
- ✅ **Foto** (URL de hospedagem)
- ✅ **Idade** (18-80 anos)
- ✅ **Região** (para recomendação)
- ✅ **Email** (único)
- ✅ **Telefone**
- ✅ **Bio/Descrição**
- ✅ **Agenda própria** (segunda a domingo, 8h-18h)
- ✅ **Rating** (avaliações dinâmicas)

### 3. **LOGIN SEPARADO (Clientes vs Faxineiras)**
Modal com 2 abas:
- **Aba Cliente**: Login/Cadastro normal
- **Aba Faxineira**: Cadastro profissional completo

### 4. **RECOMENDAÇÃO POR REGIÃO**
- Faxineiras aparecem na lista filtrando por região
- Sistema automático de busca regional

---

## 🚀 COMO USAR

### PASSO 1: Cadastrar uma Faxineira

1. Clique em **"Entrar"** no header
2. Clique na aba **"🧹 Faxineira"** (lado direito)
3. Clique em **"Cadastrar como Faxineira"**
4. Preencha **TODOS os campos**:

#### Dados Pessoais:
- **Nome Completo**: Ex: `Maria Silva`
- **CPF**: Ex: `123.456.789-00` (use este formato EXATAMENTE)
- **Idade**: Ex: `28` (entre 18 e 80)
- **Email**: Ex: `maria@example.com` (único, não pode repetir)

#### Contato:
- **Telefone**: Ex: `(51) 99999-9999`

#### Região:
- **Região**: Escolha na lista:
  - Centro
  - Zona Norte
  - Zona Sul
  - Zona Leste
  - Zona Oeste
  - Região Metropolitana

#### Foto:
- **Foto (URL)**: Cole um link de imagem

  **Como colocar foto:**
  1. Vá para **Imgur.com** ou **Unsplash.com**
  2. Faça upload de uma foto
  3. Clique com botão direito e **"Copiar link da imagem"**
  4. Cole no campo **"Foto (URL)"**

  **Exemplo de URL válido:**
  ```
  https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500
  ```

#### Bio (Opcional):
- **Sobre**: Exemplo:
  ```
  Tenho 8 anos de experiência em limpeza residencial.
  Especialista em limpeza profunda.
  Muito cuidadosa e pontual!
  ```

5. Clique em **"Cadastrar"**
6. ✅ Faxineira cadastrada!

---

### PASSO 2: Ver Faxineiras Cadastradas

1. Role até seção **"Nossas Faxineiras"**
2. Veja a lista com:
   - 📷 Foto da faxineira
   - 👤 Nome e idade
   - ⭐ Rating (avaliações)
   - 📍 Região
   - 📝 Bio/Descrição
   - 📞 Telefone
   - Botões: **⭐ Avaliar** e **📅 Agendar**

---

### PASSO 3: Cliente Contrata Faxineira

1. **Como cliente**, faça login
2. Procure a faxineira que quer (por região)
3. Clique em **"📅 Agendar"**
4. Selecione horário na agenda
5. Clique em **"Finalizar Pagamento"**
6. Confirme dados
7. ✅ Agendamento feito!

---

### PASSO 4: Avaliar Faxineira

1. Procure a faxineira na lista
2. Clique no botão **"⭐ Avaliar"**
3. Modal abre com:
   - Nota (1-5 estrelas)
   - Qualidade do serviço
   - Pontualidade
   - Comentário
4. Preencha e clique **"Enviar"**
5. ✅ Rating atualiza em tempo real!

---

## 📋 EXEMPLO DE CADASTRO

```
Nome: Maria Silva
CPF: 123.456.789-00
Idade: 28
Email: maria.silva@example.com
Telefone: (51) 98765-4321
Região: Zona Norte
Foto: https://images.unsplash.com/photo-cleaning-service
Bio: Profissional com 8 anos de experiência. Especialista em limpeza residencial e pós-obra.
```

---

## 💡 DICAS IMPORTANTES

### Onde colocar Foto
1. **Imgur.com** (grátis, rápido)
   - Upload → Copiar link
2. **Unsplash.com** (grátis, profissional)
   - Procure "woman" ou "professional"
   - Clique na foto
   - Copie o link
3. **Pexels.com** (grátis)
   - Similar ao Unsplash

### Validação de CPF
- Formato correto: `123.456.789-00`
- ❌ ERRADO: `12345678900` (sem pontos/hífen)
- ✅ CERTO: `123.456.789-00` (com pontos e hífen)

### Região (afeta buscas)
- Clientes buscam por região
- Faxineiras com mesma região aparecem primeiro
- Importante preencher corretamente!

---

## 🔐 Campos Obrigatórios

Marcados com **\*** (asterisco):
- Nome Completo
- CPF
- Idade
- Email
- Telefone
- Região
- Foto

**Bio é OPCIONAL** (mas recomendado)

---

## 🧪 Testando

1. **Cadastre 2-3 faxineiras** com regiões diferentes
2. **Veja a lista** atualizar
3. **Avalie uma faxineira** e veja rating mudar
4. **Agende um serviço** com uma delas
5. **Verifique no localStorage** (F12 → Application)

---

## 💾 Dados Salvos

Quando você cadastra uma faxineira, estes dados são salvos:
- `leidyCleaners` - Lista de faxineiras
- `leidyUsers` - Usuários (clientes e admin)
- `leidyBookings` - Agendamentos
- `leidyReviews` - Avaliações

Tudo é salvo em **localStorage** (persistente no navegador)

---

## ❌ Problemas Comuns

### "Email já cadastrado"
- Este email já foi usado
- Use um email diferente

### "CPF deve estar no formato: 123.456.789-00"
- Você não colocou os pontos e hífen
- Formato correto: `123.456.789-00`

### "Idade deve estar entre 18 e 80 anos"
- Valor fora do intervalo
- Digite uma idade válida

### "Foto não aparece"
- URL quebrada ou incorreta
- Tente com Imgur.com (mais confiável)
- Copie novamente o link

### "Faxineira não aparece na lista"
- Faça logout e login novamente
- Atualize a página (F5)
- Verifique localStorage em DevTools

---

## 🎯 Próximas Funcionalidades

Que tal adicionar:
- [ ] Upload de foto (não só URL)
- [ ] Certificados/Comprovação
- [ ] Agendamento recorrente
- [ ] Histórico de serviços
- [ ] Reputação por cliente
- [ ] Sistema de avaliação mais detalhado

---

**Pronto! Agora você tem um sistema profissional de faxineiras! 🚀**
