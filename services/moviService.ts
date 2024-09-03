import { supabase } from 'lib/supabase';
import { theme } from 'theme';

export interface ResultError {
  success: boolean;
  message: string;
}

export interface ResultMovi {
  id?: number;
  created_at?: string;
  user_id?: string | null;
  title: string | null;
  type: 'income' | 'outcome' | null;
  value: number | null;
}

export interface ResultCards {
  title: string;
  value: string;
  color: string;
}

function formatCurrency(value: number | null): string {
  return value ? `R$ ${value.toFixed(2).replace('.', ',')}` : 'R$ 0,00';
}

export async function getMovimentacoes(): Promise<ResultMovi[]> {
  try {
    const {
      data: { user: authenticatedUser },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !authenticatedUser?.id) throw userError;

    const { data: movimentacao, error } = await supabase
      .from('movimentacao')
      .select('*')
      .eq('user_id', authenticatedUser.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(error.message);
    }

    if (Array.isArray(movimentacao)) {
      return movimentacao as ResultMovi[];
    }

    return [];
  } catch (error) {
    return [];
  }
}

export async function getCards(): Promise<ResultCards[]> {
  try {
    const {
      data: { user: authenticatedUser },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !authenticatedUser?.id) throw userError;

    const { data: movimentacao, error } = await supabase
      .from('movimentacao')
      .select('*')
      .eq('user_id', authenticatedUser.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(error.message);
    }

    let saldoAtual = 0;
    let entradasHoje = 0;
    let saidasHoje = 0;

    movimentacao.map((mov) => {
      if (mov.type === 'income') {
        saldoAtual += mov.value ?? 0;
        entradasHoje += mov.value ?? 0;
      } else if (mov.type === 'outcome') {
        saldoAtual -= mov.value ?? 0;
        saidasHoje += mov.value ?? 0;
      }
    });

    const cards: ResultCards[] = [
      { title: 'Saldo atual', value: formatCurrency(saldoAtual), color: theme.purple },
      { title: 'Entradas de hoje', value: formatCurrency(entradasHoje), color: theme.green },
      { title: 'Saídas de hoje', value: formatCurrency(saidasHoje), color: theme.red },
    ];

    return cards;
  } catch (error) {
    return [
      { title: 'Saldo atual', value: 'R$ 0,00', color: theme.purple },
      { title: 'Entradas de hoje', value: 'R$ 0,00', color: theme.green },
      { title: 'Saídas de hoje', value: 'R$ 0,00', color: theme.red },
    ];
  }
}

export async function createMovi({ title, value, type }: ResultMovi): Promise<ResultError> {
  try {
    const {
      data: { user: authenticatedUser },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !authenticatedUser?.id) throw userError;

    const { data: insert, error: insertError } = await supabase
      .from('movimentacao')
      .insert([{ title, value, type, user_id: authenticatedUser.id }]);

    if (insertError || insert) throw insertError;

    return {
      success: true,
      message: 'Movimentação registrada com sucesso!',
    };
  } catch (error) {
    return { success: false, message: 'Erro ao registrar movimentação.' };
  }
}

export async function deleteMovi(moviId: number): Promise<ResultError> {
  try {
    const { error } = await supabase.from('movimentacao').delete().eq('id', moviId);

    if (error) throw error;

    return {
      success: true,
      message: 'Movimentação registrada com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido',
    };
  }
}
