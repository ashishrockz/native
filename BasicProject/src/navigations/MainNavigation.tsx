import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Auth from './Auth';
import Main from './Main';
import ContentNavigation from './ContentNavigation';
import { useAuth } from '../Hooks/Authentication'; 

const MainNavigation = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();  // Access authentication state from the context

  useEffect(() => {
    setLoading(false);  // Stop loading once the authentication context is set
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2B8761" />
      </View>
    );
  }

  return isAuthenticated ? <><Main logout={logout} /></> : <Auth />;
};

export default MainNavigation;
