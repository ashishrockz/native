import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Auth from './Auth';
import Main from './Main';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token); // Set true if token exists
      } catch (error) {
        console.log('Error retrieving token:', error);
      } finally {
        setLoading(false); // Stop loading indicator once check is complete
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isAuthenticated ? <Main /> : <Auth />;
};

export default MainNavigation;
