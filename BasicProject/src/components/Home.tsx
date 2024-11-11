// Home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

interface HomeProps {
  logout: () => Promise<void>;
}

const Home: React.FC<HomeProps> = ({ logout }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Home;
