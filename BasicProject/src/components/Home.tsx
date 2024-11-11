import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }:any) => {
  const handleLogout = async () => {
    try {
      await axios.post("https://server-omega-umber.vercel.app/auth/logout");
      await AsyncStorage.removeItem('token'); // Clear the token
      navigation.replace('Auth'); // Navigate to Auth after logout
    } catch (err) {
      console.error("Logout error:", err);
      Alert.alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
