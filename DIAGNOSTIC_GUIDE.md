# 🔍 Guia de Diagnóstico - Erro ao Salvar Perfil

Se você está vendo "erro ao salvar as alterações, tente novamente", siga este guia:

## ✅ Passo 1: Verificar o Console do Navegador

1. **Abra o DevTools**: Pressione `F12` ou `Ctrl+Shift+I` (Windows/Linux) ou `Cmd+Option+I` (Mac)
2. **Vá para a aba Console**
3. **Tente salvar as alterações** no perfil novamente
4. **Copie a mensagem de erro** que aparece no console

Procure por mensagens como:
- `"A tabela user_profiles não foi criada no Supabase"`
- `"Permissão negada"`
- `"does not exist"`

---

## ❌ ERRO: "A tabela user_profiles não foi criada"

**Solução:**

1. Acesse https://supabase.com e faça login
2. Vá para seu projeto (Site-Elos--MR)
3. Clique em **SQL Editor** (no menu esquerdo)
4. Clique em **New Query**
5. **Cole todo o código abaixo:**

```sql
-- Criar tabela de perfil de usuário
create table if not exists public.user_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null default 'Seu Nome',
  title text not null default 'Sua Função',
  email text not null,
  bio text default '',
  company_name text not null default 'Sua Organização',
  website text default '',
  company_desc text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- Política: Usuários podem ver apenas seu próprio perfil
create policy "Users can view their own profile"
  on public.user_profiles
  for select
  using (auth.uid() = user_id);

-- Política: Usuários podem atualizar apenas seu próprio perfil
create policy "Users can update their own profile"
  on public.user_profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Política: Usuários podem inserir apenas seu próprio perfil
create policy "Users can insert their own profile"
  on public.user_profiles
  for insert
  with check (auth.uid() = user_id);

-- Criar índice para melhorar performance
create index idx_user_profiles_user_id on public.user_profiles(user_id);
```

6. Clique em **RUN** (ou pressione `Ctrl+Enter`)
7. Você deve ver uma mensagem de sucesso verde

---

## ❌ ERRO: "Permissão negada" ou "Permission denied"

**Causas possíveis:**

### 1. Políticas RLS estão erradas

Verifique as políticas:
1. Vá para **Authentication** → **Policies**
2. Verifique se existem 3 políticas para `user_profiles`:
   - `Users can view their own profile`
   - `Users can update their own profile`
   - `Users can insert their own profile`

Se faltar alguma, recrie executando o SQL acima.

### 2. RLS está desabilitado

1. Vá para **Table Editor** 
2. Selecione a tabela `user_profiles`
3. Clique em **Policies**
4. Verifique se "Row Level Security" está **ATIVADO** (verde)

Se estiver desativado, ative-o.

---

## ❌ ERRO: "Usuário não encontrado"

**Solução:**
1. Faça logout (clique no perfil no canto superior direito → Sair)
2. Faça login novamente
3. Tente salvar as alterações

---

## ❌ ERRO: Variáveis de ambiente faltando

Se o erro menciona `VITE_SUPABASE_URL` ou `VITE_SUPABASE_ANON_KEY`:

1. Verifique o arquivo `.env.local`:
   ```
   VITE_SUPABASE_URL=https://eaicfetaoqlxdvdrmbzr.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_mcbFEA4wRW8HqLXD1SXTcQ_EEVo3AF6
   ```

2. Se o arquivo não existir, crie-o na raiz do projeto

3. Reinicie o servidor:
   ```bash
   npm run dev
   ```

---

## ✅ Se nada funcionar

1. **Copie a mensagem de erro completa** do Console (F12)
2. **Tire uma captura de tela** da aba Policies no Supabase
3. **Compartilhe essas informações** para diagnóstico completo

---

## 🧪 Teste Rápido

Para confirmar que tudo está funcionando:

1. Vá para o Supabase → **SQL Editor**
2. Execute:
```sql
SELECT * FROM public.user_profiles;
```

Você deve ver ao menos uma linha com seu usuário.

---

## 📋 Checklist Final

- [ ] Tabela `user_profiles` foi criada no Supabase?
- [ ] RLS está habilitado na tabela?
- [ ] As 3 políticas existem?
- [ ] `.env.local` tem as variáveis de ambiente?
- [ ] Fiz login novamente após criar a tabela?
- [ ] O Console (F12) mostra alguma mensagem de erro específica?

Se marcar ✅ em todos, o problema deve estar resolvido!
