import { Text, View } from 'react-native';
import styled from 'styled-components';

import { theme } from 'theme';

export const TagContainer = styled(View)<{ $type: string }>`
  background-color: ${({ $type }) => ($type === 'income' ? theme.green : theme.red)};
  width: 100px;
  flex-direction: row;
  padding: 4px 8px;
  border-radius: 8px;
`;

export const TagText = styled(Text)`
  color: ${theme.textTitles};
  font-size: 14px;
  margin-left: 8px;
`;