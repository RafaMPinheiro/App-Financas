import { Text } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

import { theme } from 'theme';
import { TagContainer, TagText } from './styles';

export function Tag({ type }: { type: 'income' | 'outcome' }) {
  return (
    <TagContainer $type={type}>
      {type === 'income' ? (
        <ArrowUp size={16} color={theme.textTitles} />
      ) : (
        <ArrowDown size={16} color={theme.textTitles} />
      )}
      <TagText>{type === 'income' ? 'Entrada' : 'Saída'}</TagText>
    </TagContainer>
  );
}
