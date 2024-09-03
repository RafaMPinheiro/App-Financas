import { FlatList, type FlatListProps, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { theme } from 'theme';

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.background};
`;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const CardsContainer = styled(FlatList as new (props: FlatListProps<any>) => FlatList<any>)`
  padding: 16px;
`;

export const LastMovimentsContainer = styled(View)`
  z-index: 2;
  height: 630px;
  background-color: ${theme.divider};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding: 20px;
  padding-bottom: 0;
`;

export const LastMovimentsHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const LastMovimentsHeaderTitle = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  color: ${theme.textTitles};
`;

export const LastMovimentsList = styled(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  FlatList as new (props: FlatListProps<any>) => FlatList<any>
)`
  margin-top: 20px;
`;

export const LastMovimentsListItem = styled(TouchableOpacity)`
  background-color: ${theme.cards};
  width: 100%;
  padding: 16px;
  gap: 8px;
  border-radius: 8px;
`;

export const LastMovimentsListItemTexts = styled(View)`
  flex-direction: row;
  gap: 4px;
`;

export const LastMovimentsListItemValue = styled(Text)`
  width: 50%;
  overflow: hidden;
  color: ${theme.textTitles};
  font-size: 24px;
`;

export const LastMovimentsListItemTitle = styled(Text)`
  width: 50%;
  overflow: hidden;
  color: ${theme.text};
  font-size: 16px;
  text-align: right;
`;

export const LastMovimentsListItemDate = styled(Text)`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${theme.text};
`;

export const MovimentacoesEmpty = styled(View)`
  padding: 16px;
`;

export const MovimentacoesEmptyText = styled(Text)`
  color: ${theme.textTitles};
  font-size: 24px;
`;
