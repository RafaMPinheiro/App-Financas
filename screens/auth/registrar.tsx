import React, { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, TextButton } from 'styles';
import { Container, FormContainer, Input, TextError } from './styles';

import { signUpWithEmail } from 'services/authService';

const userFormSchema = z.object({
  nome: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: z.string({ required_error: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

type userFormData = z.infer<typeof userFormSchema>;

export function Registrar() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = async (data: userFormData) => {
    setLoading(true);
    const { nome, email, password } = data;

    const result = await signUpWithEmail(email, password, nome);

    if (result.success) {
      Alert.alert(result.message);
    } else {
      Alert.alert('Erro', result.message);
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <FormContainer>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  textContentType="name"
                  placeholder="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.nome && <TextError>{errors.nome.message}</TextError>}
              </>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  textContentType="emailAddress"
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && <TextError>{errors.email.message}</TextError>}
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  secureTextEntry
                  textContentType="password"
                  placeholder="Senha"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.password && <TextError>{errors.password.message}</TextError>}
              </>
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
            <TextButton>{loading ? 'Carregando...' : 'Cadastrar'}</TextButton>
          </Button>
        </FormContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
