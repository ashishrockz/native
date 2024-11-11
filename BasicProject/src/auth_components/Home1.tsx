import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Home = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.h_sigin}
          onPress={()=>navigation.navigate('Signup')}>
          <Text style={{textAlign: 'center'}}>Rigester</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.h_login}
          onPress={()=>navigation.navigate('Login')}>
          <Text style={{textAlign: 'center', color: 'white'}}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.down_button}>
        <Image
          source={require('../assets/google.png')}
          style={{width: 25, height: 25}}
        />
        <Text style={{fontSize: 18, marginLeft: 8}}>Login With Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-end',  // Aligns content to the bottom of the screen

  },
  button_container: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  h_sigin: {
    borderWidth: 2,
    width: '45%',
    borderRadius: 40,
    padding: 15,
  },
  h_login: {
    width: '45%',
    backgroundColor: '#2B8761',
    borderRadius: 40,
    padding: 15,
  },
  down_button: {
    borderWidth: 4,
    alignItems: 'center',
    borderColor: '#f1f1f1',
    borderRadius: 40,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    margin:20,
  },
});
