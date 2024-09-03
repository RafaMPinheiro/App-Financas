import { supabase } from 'lib/supabase';

interface Result {
  success: boolean;
  message: string;
}

export async function signInWithEmail(email: string, password: string): Promise<Result> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: false,
      message: 'Verifique sua caixa de entrada para a confirmação do e-mail!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido',
    };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<Result> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (user) {
      await createProfile(user.id, name);
      return { success: true, message: 'Usuário registrado com sucesso!' };
    }

    return {
      success: false,
      message: 'Verifique sua caixa de entrada para a confirmação do e-mail!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido',
    };
  }
}

export async function createProfile(userId: string, name: string): Promise<void> {
  try {
    const { error } = await supabase.from('profiles').insert([
      {
        id: userId,
        name: name,
      },
    ]);

    if (error) {
      throw new Error(`Falha ao criar o perfil: ${error.message}`);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Ocorreu um erro desconhecido');
  }
}
