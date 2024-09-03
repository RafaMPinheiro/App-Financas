import moment from 'moment';
import 'moment/locale/pt-br';

import {
  LastMovimentsListItem,
  LastMovimentsListItemDate,
  LastMovimentsListItemTexts,
  LastMovimentsListItemTitle,
  LastMovimentsListItemValue,
} from './styles';

import { Tag } from 'components/tag/tag';
import { Alert } from 'react-native';
import { deleteMovi } from 'services/moviService';

export interface ListItemProps {
  id: number;
  created_at: string;
  user_id: string | null;
  title: string | null;
  type: 'income' | 'outcome' | null;
  value: number | null;
  onDelete: () => void;
}

export function ListItem({ id, created_at, user_id, title, type, value, onDelete }: ListItemProps) {
  const handleItemAlert = () => {
    Alert.alert(`Movimentação: ${title}`, 'Você deseja excluir essa movimentação?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: handleDeleteItem },
    ]);
  };

  const handleDeleteItem = async () => {
    const response = await deleteMovi(id);

    if (response.success) {
      Alert.alert('Movimentação deletada com sucesso');
      onDelete();
    } else {
      Alert.alert('Erro ao deletar movimentação');
    }
  };

  return (
    <LastMovimentsListItem onPress={handleItemAlert}>
      <LastMovimentsListItemDate>
        {moment(created_at).format('D MMM YY, h:mm:ss a')}
      </LastMovimentsListItemDate>
      <Tag type={type ?? 'income'} />
      <LastMovimentsListItemTexts>
        <LastMovimentsListItemValue>
          {value ? `R$ ${value.toFixed(2).replace('.', ',')}` : 'Sem valor'}
        </LastMovimentsListItemValue>
        <LastMovimentsListItemTitle>{title ?? 'Sem título'}</LastMovimentsListItemTitle>
      </LastMovimentsListItemTexts>
    </LastMovimentsListItem>
  );
}
