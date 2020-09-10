import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // a diferença para o web, é que quando verificar que exite login, não precisa existir
  // a rota não autenticada dentro do nosso dashboard
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
