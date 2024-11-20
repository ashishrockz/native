import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../components/Home';
import AddPost from '../components/AddPost';
const Stack = createNativeStackNavigator();
const ContentNavigation = () => {
  return (
   
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
          <Stack.Screen
            name="AddPost"
            component={AddPost}
            options={{title: '', headerTransparent: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default ContentNavigation;
