import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import Settings from '../components/Settings';
import { Image } from 'react-native';
interface MainProps {
  logout: () => void;
}

const Tab = createBottomTabNavigator();

const Main: React.FC<MainProps> = ({logout}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarStyle: {
            backgroundColor: '#3B9678',
          },
          tabBarActiveTintColor: 'white',    
          tabBarInactiveTintColor: 'white',
          tabBarIcon: () => {
            let iconSource;
            if (route.name === 'Home') {
              iconSource =  require('../assets/Home.png');
            } else if (route.name === 'Profile') {
              iconSource =  require('../assets/user.png');
            }
            return <Image source={iconSource} style={{ width: 25, height: 25 }} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen name="Profile">
          {() => <Settings logout={logout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
