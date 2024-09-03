import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthRoutes } from './auth';
import { DrawerRoutes } from './drawer';

const Stack = createStackNavigator();

export function IndexRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthRoutes" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthRoutes" component={AuthRoutes} options={{ headerShown: false }} />
        <Stack.Screen
          name="DrawerRoutes"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
