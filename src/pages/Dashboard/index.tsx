import React from 'react';
import { View, Text, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Dash</Text>
      <Button onPress={signOut} title="SAIR" />
    </View>
  );
};

export default Dashboard;
