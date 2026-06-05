# Instruções para Configurar Persistência de Dados no Supabase

## Passo 1: Criar a Tabela de Perfil no Supabase

Acesse o painel Supabase (https://supabase.com) e execute este SQL no editor de query:

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

## Passo 2: Testar a Implementação

1. **Localmente**: Execute `npm run dev` e teste o login
2. **No painel de configurações**: Altere o nome e clique em "Salvar Alterações"
3. **Verificar persistência**: Recarregue a página - os dados devem estar salvos

## Passo 3: Verificar no Supabase

Para confirmar que os dados foram salvos:

1. Acesse o painel Supabase
2. Vá para "SQL Editor" e execute:
   ```sql
   select * from public.user_profiles;
   ```
3. Você deve ver o registro do seu usuário com os dados salvos

## Estrutura da Tabela

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único do registro |
| `user_id` | UUID | Referência ao usuário autenticado |
| `name` | Text | Nome completo do usuário |
| `title` | Text | Cargo/Função do usuário |
| `email` | Text | Email do usuário |
| `bio` | Text | Biografia/Foco profissional |
| `company_name` | Text | Nome da organização |
| `website` | Text | Website da organização |
| `company_desc` | Text | Descrição da organização |
| `created_at` | Timestamp | Data de criação |
| `updated_at` | Timestamp | Data da última atualização |

## Segurança

- **Row Level Security (RLS)**: Habilitado para proteger dados
- **Políticas**: Cada usuário pode ver e editar apenas seus próprios dados
- **Cascade Delete**: Se o usuário for deletado, o perfil também é

## Troubleshooting

### Erro "relation does not exist"
- Verifique se a tabela foi criada corretamente no SQL Editor
- Certifique-se de estar logado na conta Supabase correta

### Erro "User not found"
- Faça logout e login novamente
- Verifique se seu email está correto no Supabase

### Dados não salvam
- Abra o DevTools (F12) e verifique a aba "Console" para erros
- Verifique se o VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão corretos

## Próximos Passos (Opcional)

Você pode expandir este sistema com:

1. **Foto de perfil**: Adicionar coluna `avatar_url` e integrar com Supabase Storage
2. **Histórico de alterações**: Adicionar `created_at` e `updated_at` com triggers
3. **Validação de email**: Implementar confirmação de email ao alterar
4. **Auditoria**: Criar tabela de logs para rastrear mudanças
