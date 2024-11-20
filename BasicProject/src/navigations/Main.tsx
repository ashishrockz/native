import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import Settings from '../components/Settings';
import { Image } from 'react-native';
import Search from '../components/Search';
import AddPost from '../components/AddPost';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
interface MainProps {
  logout: () => void;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define Stack Navigation for `AddPost`
const AddPostStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AddPost"
      component={AddPost}
      options={{ headerShown: false }}
    />
    {/* Add more screens if needed */}
  </Stack.Navigator>
);
const Main: React.FC<MainProps> = ({logout}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarPosition:'bottom',
          tabBarStyle: {
            backgroundColor: '#3B9678',
          },
          tabBarActiveTintColor: 'white',    
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (route.name === 'Home') {
              iconSource = require('../assets/Home.png');
            } else if (route.name === 'Profile') {
              iconSource = require('../assets/user.png');
            } else if (route.name === 'Search') {
              iconSource = require('../assets/Posts/search.png');
            } else if (route.name === 'Add') {
              iconSource = require('../assets/Posts/add.png');
            }
            return<Image
            source={iconSource}
            style={{ width: 25, height: 25, tintColor: focused ? 'grey' : '#ffffff' }}
          />
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Search"
          component={Search}
        />
      <Tab.Screen
          name="Add"
          component={AddPostStack}
        />
        <Tab.Screen name="Profile">
          {() => <Settings logout={logout} />}
        </Tab.Screen>
      </Tab.Navigator>
      
    </NavigationContainer>
  );
};

export default Main;
