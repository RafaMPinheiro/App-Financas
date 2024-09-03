import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { theme } from 'theme';

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.background};
  align-items: center;
  justify-content: center;
`;

export const Logo = styled(Image)`
  height: 150px;
  margin-bottom: 55px;
`;

export const FormContainer = styled(View)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 16px;
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.placeholder,
}))`
  width: 100%;
  background-color: ${theme.background};
  border-radius: 5px;
  padding: 16px;
  border-width: 1px;
  border-color: ${theme.divider};
  color: ${theme.placeholder};
`;

export const TextError = styled(Text)`
  color: ${theme.red};
  font-size: 14px;
  align-self: self-start;
`;

export const CreateAccountButton = styled(TouchableOpacity)``;

export const CreateAccountText = styled(Text)`
  color: ${theme.text};
  font-size: 14px;
`;
