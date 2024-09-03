import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { AuthNavigationProp } from 'routes/auth';

import {
  Container,
  Logo,
  FormContainer,
  Input,
  CreateAccountText,
  CreateAccountButton,
  TextError,
} from './styles';
import { Button, TextButton } from 'styles';

import { signInWithEmail } from 'services/authService';

const userFormSchema = z.object({
  email: z.string({ required_error: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

type userFormData = z.infer<typeof userFormSchema>;

export function Login({ navigation }: { navigation: AuthNavigationProp }) {
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
    const { email, password } = data;

    const result = await signInWithEmail(email, password);

    if (result.success) {
      Alert.alert(result.message);
    } else {
      Alert.alert('Erro', result.message);
    }
    setLoading(false);
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registrar');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Logo source={require('assets/logo.png')} />
        <FormContainer>
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
          <CreateAccountButton onPress={handleCreateAccount}>
            <CreateAccountText>Criar uma conta gratuita</CreateAccountText>
          </CreateAccountButton>
        </FormContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
