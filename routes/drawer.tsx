import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  type DrawerNavigationProp,
} from '@react-navigation/drawer';
import { theme } from 'theme';

import { Dashboard } from 'screens/dashboard/dashboard';
import { RegistrarMovi } from 'screens/registrar-movi/registrar-movi';
import { Perfil } from 'screens/perfil/perfil';

import { supabase } from 'lib/supabase';

const Drawer = createDrawerNavigator();

export type DrawerParamList = {
  Dashboard: undefined;
};

export type DrawerProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { state, ...restProps } = props;
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authenticatedUser },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authenticatedUser?.id ?? '')
        .single();
      if (profileError) throw profileError;

      setUser({
        name: profiles?.name ?? 'Nome não disponível',
      });
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.drawerContainer}>
      <Image source={require('assets/logo.png')} style={styles.drawerImage} />
      <Text style={styles.welcomeText}>Bem-vindo</Text>
      <Text style={styles.userName}>{user?.name}</Text>
      <DrawerContentScrollView {...restProps} style={styles.drawerContent}>
        {state.routes.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => props.navigation.navigate(route.name)}
            style={[
              styles.drawerItem,
              state.index === index ? styles.activeDrawerItem : styles.inactiveDrawerItem,
            ]}>
            <Text style={[styles.drawerItemText]}>{route.name}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>
    </View>
  );
};

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          shadowColor: 'transparent',
        },
        headerTitleAlign: 'left',
        headerTintColor: theme.textTitles,
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Registrar Movimentações" component={RegistrarMovi} />
      <Drawer.Screen name="Perfil" component={Perfil} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  drawerImage: {
    height: 100,
    resizeMode: 'contain',
    margin: 20,
  },
  welcomeText: {
    color: theme.textTitles,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    color: theme.text,
    fontSize: 18,
  },
  drawerContent: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  drawerItem: {
    width: '100%',
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
  },
  activeDrawerItem: {
    backgroundColor: theme.purple,
  },
  inactiveDrawerItem: {
    backgroundColor: theme.cards,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textTitles,
  },
  activeDrawerItemText: {
    color: theme.textTitles,
  },
});
