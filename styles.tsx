import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { theme } from 'theme';

export const Button = styled(TouchableOpacity)<{ $w?: string; $h?: string }>`
  background-color: ${theme.purple};
  width: ${({ $w }) => $w || '100%'};
  height: ${({ $h }) => $h || '50px'};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled(Text)`
  color: ${theme.text};
  font-size: 20px;
  font-weight: bold;
`;
