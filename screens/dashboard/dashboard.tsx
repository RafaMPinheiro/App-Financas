import { useState, useCallback } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { theme } from 'theme';

import {
  CardsContainer,
  Container,
  LastMovimentsContainer,
  LastMovimentsHeader,
  LastMovimentsHeaderTitle,
  LastMovimentsList,
  MovimentacoesEmpty,
  MovimentacoesEmptyText,
} from './styles';

import { Card } from 'components/card/card';

import {
  getMovimentacoes,
  getCards,
  type ResultMovi,
  type ResultCards,
} from 'services/moviService';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem } from 'components/list-item/list-item';

export function Dashboard() {
  const [movimentacoes, setMovimentacoes] = useState<ResultMovi[]>([]);
  const [cards, setCards] = useState<ResultCards[]>([
    { title: 'Saldo atual', value: 'R$ 0,00', color: theme.purple },
    { title: 'Entradas de hoje', value: 'R$ 0,00', color: theme.green },
    { title: 'Saídas de hoje', value: 'R$ 0,00', color: theme.red },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const movimentacoesResult = await getMovimentacoes();
      setMovimentacoes(movimentacoesResult);

      const cardsResult = await getCards();
      setCards(cardsResult);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as movimentações e os cartões.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateMovimentacoes = async () => {
    await fetchData();
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.purple} />
      </Container>
    );
  }

  return (
    <Container>
      <CardsContainer
        data={cards}
        keyExtractor={(item) => item.title}
        horizontal
        renderItem={({ item }) => <Card color={item.color} title={item.title} value={item.value} />}
        ListFooterComponent={<View style={{ width: 16 }} />}
      />
      <LastMovimentsContainer>
        <LastMovimentsHeader>
          <Calendar color={theme.textTitles} size={22} />
          <LastMovimentsHeaderTitle>Últimas movimentações</LastMovimentsHeaderTitle>
        </LastMovimentsHeader>
        {Array.isArray(movimentacoes) && movimentacoes.length > 0 ? (
          <LastMovimentsList
            data={movimentacoes}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) => (
              <ListItem {...item} onDelete={() => handleUpdateMovimentacoes()} />
            )}
          />
        ) : (
          <MovimentacoesEmpty>
            <MovimentacoesEmptyText>Nenhuma movimentação encontrada.</MovimentacoesEmptyText>
          </MovimentacoesEmpty>
        )}
      </LastMovimentsContainer>
    </Container>
  );
}
