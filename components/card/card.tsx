import React from 'react';
import { CardContainer, TitleCard, ValueCard } from './styles';

export interface ICard {
  title: string;
  value: string;
  color: string;
}

export const Card = ({ title, value, color }: ICard) => (
  <CardContainer $background={color}>
    <TitleCard>{title}</TitleCard>
    <ValueCard>{value}</ValueCard>
  </CardContainer>
);
