import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Login from '../auth_components/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Signup from '../auth_components/Signup';
import Home from '../auth_components/Home1';
const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
        <Stack.Screen
          name="Home1"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '', headerTransparent: true}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: '', headerTransparent: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
