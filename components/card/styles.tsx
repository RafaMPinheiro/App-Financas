import { Text, View } from 'react-native';
import styled from 'styled-components';

import { theme } from 'theme';

export const CardContainer = styled(View)<{ $background: string }>`
  background-color: ${({ $background }) => $background || theme.cards};
  width: 300px;
  height: 130px;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const TitleCard = styled(Text)`
  color: ${theme.textTitles};
  font-size: 20px;
  font-weight: bold;
`;

export const ValueCard = styled(Text)`
  color: ${theme.text};
  font-size: 30px;
`;
