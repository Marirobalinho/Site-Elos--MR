import { supabase } from './supabaseClient';

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  title: string;
  email: string;
  bio: string;
  company_name: string;
  website: string;
  company_desc: string;
  created_at: string;
  updated_at: string;
}

/**
 * Carrega o perfil do usuário do Supabase
 */
export async function loadUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    console.log('Carregando perfil para userId:', userId);
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Nenhum perfil encontrado - retorna null para criar um novo
        console.log('Nenhum perfil encontrado. Será criado um novo.');
        return null;
      }
      
      console.error('Erro Supabase ao carregar perfil:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      
      // Erro específico: tabela não existe
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.error('ERRO: A tabela user_profiles não foi criada no Supabase');
      }
      
      return null;
    }

    console.log('Perfil carregado com sucesso:', data);
    return data as UserProfile;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    return null;
  }
}

/**
 * Cria um novo perfil de usuário
 */
export async function createUserProfile(
  userId: string,
  email: string,
  initialData?: Partial<UserProfile>
): Promise<UserProfile | null> {
  try {
    console.log('Criando novo perfil para userId:', userId);
    
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          name: initialData?.name || 'Seu Nome',
          title: initialData?.title || 'Sua Função',
          email: initialData?.email || email,
          bio: initialData?.bio || '',
          company_name: initialData?.company_name || 'Sua Organização',
          website: initialData?.website || 'https://seu-site.com.br',
          company_desc: initialData?.company_desc || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro Supabase ao criar perfil:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      
      // Erro específico: tabela não existe
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        throw new Error('ERRO: A tabela user_profiles não foi criada no Supabase. Execute o SQL em SETUP_DATABASE.md');
      }
      
      // Erro de RLS/Permissão
      if (error.message.includes('permission') || error.message.includes('denied')) {
        throw new Error('ERRO: Permissão negada. Verifique as políticas de RLS no Supabase');
      }
      
      throw new Error(`Erro ao criar perfil: ${error.message}`);
    }

    console.log('Perfil criado com sucesso:', data);
    return data as UserProfile;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao criar perfil:', errorMessage);
    throw error;
  }
}

/**
 * Atualiza o perfil do usuário
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile | null> {
  try {
    console.log('Iniciando atualização de perfil para userId:', userId);
    
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Erro Supabase ao atualizar perfil:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      
      // Erro específico: tabela não existe
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        throw new Error('A tabela user_profiles não foi criada no Supabase. Execute o SQL em SETUP_DATABASE.md');
      }
      
      // Erro de RLS/Permissão
      if (error.message.includes('permission') || error.message.includes('denied')) {
        throw new Error('Permissão negada. Verifique as políticas de RLS no Supabase');
      }
      
      throw new Error(`Erro ao salvar: ${error.message}`);
    }

    console.log('Perfil atualizado com sucesso:', data);
    return data as UserProfile;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao atualizar perfil:', errorMessage);
    throw error;
  }
}

/**
 * Carrega ou cria o perfil do usuário
 */
export async function getOrCreateUserProfile(
  userId: string,
  email: string
): Promise<UserProfile | null> {
  let profile = await loadUserProfile(userId);

  if (!profile) {
    profile = await createUserProfile(userId, email);
  }

  return profile;
}
