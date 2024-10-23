// Home.js
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen</Text>
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart')}  // Navigate to Cart
      />
      <Button
        title="Go to Card"
        onPress={() => navigation.navigate('Card')}  // Navigate to Cart
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
