import { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Button, TextButton } from 'styles';
import {
  Container,
  SairButton,
  Subtitle,
  TextSairButton,
  Title,
  UserInfoContainer,
  UserText,
} from './styles';
import { supabase } from 'lib/supabase';

export function Perfil() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const {
          data: { user: authenticatedUser },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authenticatedUser?.id ?? '')
          .single();
        if (profileError) throw profileError;

        setUser({
          name: profiles?.name ?? 'Nome não disponível',
          email: authenticatedUser?.email ?? 'Email não disponível',
        });
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as informações do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      Alert.alert('Sair', 'Você saiu com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Bem-vindo de volta!</Title>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : user ? (
        <UserInfoContainer>
          <Subtitle>Usuário:</Subtitle>
          <UserText>{user.name}</UserText>
          <Subtitle>Email:</Subtitle>
          <UserText>{user.email}</UserText>
        </UserInfoContainer>
      ) : (
        <Subtitle>Não foi possível carregar as informações do usuário.</Subtitle>
      )}
      <Button>
        <TextButton>Registrar Gastos</TextButton>
      </Button>
      <SairButton onPress={handleSignOut} disabled={loading}>
        <TextSairButton>{loading ? 'Saindo...' : 'Sair'}</TextSairButton>
      </SairButton>
    </Container>
  );
}
