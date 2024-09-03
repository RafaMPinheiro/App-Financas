import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import styled from 'styled-components';

import { theme } from 'theme';

export const FormContainer = styled(View)`
  flex: 1;
  background-color: ${theme.background};
  flex-direction: column;
  padding: 20px;
  padding-top: 50px;
  gap: 16px;
`;

export const TitleForm = styled(Text)`
  color: ${theme.text};
  font-size: 24px;
  font-weight: bold;
`;

export const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.placeholder,
}))`
  width: 100%;
  background-color: ${theme.background};
  border-radius: 8px;
  padding: 16px;
  border-width: 1px;
  border-color: ${theme.divider};
  color: ${theme.text};
`;

export const InputMoney = styled(CurrencyInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.placeholder,
}))`
  width: 100%;
  background-color: ${theme.background};
  border-radius: 8px;
  padding: 16px;
  border-width: 1px;
  border-color: ${theme.divider};
  color: ${theme.placeholder};
`;

export const InputText = styled(Text)`
  color: ${theme.text};
  font-size: 20px;
  font-weight: bold;
`;

export const TypeButtonContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

export const TypeButton = styled(TouchableOpacity)<{ $active?: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? theme.purple : theme.divider)};
  border-radius: 8px;
`;

export const TextTypeButton = styled(Text)`
  color: ${theme.text};
  font-size: 16px;
`;

export const TextError = styled(Text)`
  color: ${theme.red};
  font-size: 14px;
  align-self: self-start;
`;