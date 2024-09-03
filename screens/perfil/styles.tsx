import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { theme } from 'theme';

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.background};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 50px;
`;

export const Title = styled(Text)`
  color: ${theme.text};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Subtitle = styled(Text)`
  color: ${theme.text};
  font-size: 18px;
  margin-top: 6px;
  margin-bottom: 6px;
`;

export const UserInfoContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

export const UserText = styled(Text)`
  color: ${theme.text};
  font-size: 16px;
  margin-bottom: 20px;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${theme.purple};
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const TextButton = styled(Text)`
  color: ${theme.textTitles};
  font-size: 16px;
  font-weight: bold;
`;

export const SairButton = styled(TouchableOpacity)`
  width: 100%;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.red};
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
`;

export const TextSairButton = styled(Text)`
  color: ${theme.red};
  font-size: 20px;
  font-weight: bold;
`;

export const LoadingIndicator = styled(ActivityIndicator).attrs({
  size: 'small',
  color: theme.textTitles,
})`
  margin-right: 10px;
`;
