import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';

import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'theme';

import { supabase } from 'lib/supabase';

import { DrawerRoutes } from 'routes/drawer';
import { AuthRoutes } from 'routes/auth';

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.background};
  padding-top: 60px;
`;

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Container>
          <StatusBar style="light" />
          {session?.user ? <DrawerRoutes /> : <AuthRoutes />}
        </Container>
      </NavigationContainer>
    </ThemeProvider>
  );
}
