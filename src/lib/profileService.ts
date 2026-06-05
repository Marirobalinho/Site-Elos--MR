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
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Nenhum perfil encontrado - retorna null para criar um novo
        return null;
      }
      console.error('Erro ao carregar perfil:', error);
      return null;
    }

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
      console.error('Erro ao criar perfil:', error);
      return null;
    }

    return data as UserProfile;
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    return null;
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
      console.error('Erro ao atualizar perfil:', error);
      return null;
    }

    return data as UserProfile;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return null;
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
