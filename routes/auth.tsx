import { createStackNavigator, type StackNavigationProp } from '@react-navigation/stack';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native';

import { Login } from 'screens/auth/login';
import { Registrar } from 'screens/auth/registrar';
import { theme } from 'theme';

const Stack = createStackNavigator();

type RootStackParamList = {
  Login: undefined;
  Registrar: undefined;
};

export type AuthNavigationProp = StackNavigationProp<RootStackParamList>;

export function AuthRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="Registrar"
        component={Registrar}
        options={{
          title: '',
          headerBackImage: () => (
            <ChevronLeft color={theme.textTitles} style={{ marginHorizontal: 10 }} />
          ),
          headerBackTitle: 'Voltar',
          headerBackTitleStyle: {
            fontSize: 20,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: theme.purple,
            shadowColor: 'transparent',
          },
          headerTintColor: theme.textTitles,
        }}
      />
    </Stack.Navigator>
  );
}
