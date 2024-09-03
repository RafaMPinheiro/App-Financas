import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

import { theme } from 'theme';
import {
  FormContainer,
  Input,
  InputMoney,
  TextTypeButton,
  TitleForm,
  TypeButton,
  TypeButtonContainer,
  TextError,
} from './styles';
import { Button, TextButton } from 'styles';
import { createMovi } from 'services/moviService';

const createMoviSchema = z.object({
  title: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(3, { message: 'Descrição muito curta' }),
  value: z
    .number({ required_error: 'Valor é obrigatório', invalid_type_error: 'Valor inválido' })
    .min(0.01, { message: 'Valor deve ser maior que 0' }),
  type: z.enum(['income', 'outcome']),
});

type CreateMoviData = z.infer<typeof createMoviSchema>;

export function RegistrarMovi() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateMoviData>({
    resolver: zodResolver(createMoviSchema),
    defaultValues: {
      value: 0,
      type: 'income',
    },
  });

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  );

  const onSubmit = async (data: CreateMoviData) => {
    setLoading(true);
    const { title, value, type } = data;

    const result = await createMovi({ title, value, type });

    if (result.success) {
      Alert.alert(result.message);
      reset();
    } else {
      Alert.alert('Erro', result.message);
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <FormContainer>
        <TitleForm>Registrar nova movimentação</TitleForm>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                textContentType="name"
                placeholder="Descrição"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.title && <TextError>{errors.title.message}</TextError>}
            </>
          )}
        />

        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <InputMoney
                placeholder="Valor"
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                onBlur={onBlur}
                value={value || 0}
                onChangeValue={onChange}
              />
              {errors.value && <TextError>{errors.value.message}</TextError>}
            </>
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <TypeButtonContainer>
              <TypeButton $active={value === 'income'} onPress={() => onChange('income')}>
                <ArrowUp size={24} color={theme.text} />
                <TextTypeButton>Receita</TextTypeButton>
              </TypeButton>
              <TypeButton $active={value === 'outcome'} onPress={() => onChange('outcome')}>
                <ArrowDown size={24} color={theme.text} />
                <TextTypeButton>Despesa</TextTypeButton>
              </TypeButton>
            </TypeButtonContainer>
          )}
        />

        <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
          <TextButton>Registrar</TextButton>
        </Button>
      </FormContainer>
    </TouchableWithoutFeedback>
  );
}
