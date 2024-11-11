// Main.tsx
import React from 'react';
import { View, Button, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home';

interface MainProps {
  logout: () => Promise<void>;
}

const Stack = createNativeStackNavigator();

const Main: React.FC<MainProps> = ({ logout }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {() => <Home logout={logout} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
