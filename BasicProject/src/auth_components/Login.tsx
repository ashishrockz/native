import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

interface ValidationError {
  email?: string;
  password?: string;
}

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationError>({});

  const validation = (): ValidationError => {
    let error: ValidationError = {};
    if (!email) error.email = 'Email is required';
    if (!password) error.password = 'Password is required';
    return error;
  };

  const handleSubmit = async () => {
    const validationErrors = validation();
    setErrors(validationErrors);

    try {
      if (Object.keys(validationErrors).length === 0) {
        const response = await axios.post('https://server-omega-umber.vercel.app/auth/login', {
          email,
          password,
        });
        console.log('Signin successful:', response.data);

        await AsyncStorage.setItem("token", response.data.token);  // Save token
        await AsyncStorage.setItem("tokenExpiry", response.data.tokenExpiry);  // Save token expiry
      }
    } catch (error: any) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        Alert.alert(error.response.data.message || "Login failed");
        setEmail('')
        setPassword('')
        navigation.navigate('Signup');
      } 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading_container}>
        <Text style={styles.heading}>Login</Text>
      </View>
      <View style={styles.form_container}>
        <View style={styles.margin}>
          <Text style={styles.input_label}>E-Mail:</Text>
          <TextInput
            style={styles.input_style}
            placeholder="Enter E-Mail"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
        </View>
        <View style={styles.margin}>
          <Text style={styles.input_label}>Password:</Text>
          <TextInput
            style={styles.input_style}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
        </View>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'right',
              marginBottom: 10,
              fontSize: 16,
              color: '#3C9AFB',
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.button_text}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ textAlign: 'center', fontSize: 16 }}
            onPress={() => navigation.navigate('Signup')}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.bottom_container}>
          <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 20 }}>
            or Login With
          </Text>
        </View>
        <TouchableOpacity style={styles.down_button}>
          <Image
            source={require('../assets/google.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 8 }}>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  heading_container: {
    paddingTop: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  form_container: {
    margin: 10,
    paddingTop: 40,
    marginBottom: 50,
  },
  margin: {
    marginBottom: 15,
  },
  input_label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input_style: {
    marginBottom: 8,
    height: 55,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#F2F2F2',
    fontSize: 18,
    padding: 10,
  },
  button: {
    backgroundColor: '#2B8761',
    borderRadius: 40,
    padding: 15,
    marginBottom: 8,
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  bottom_container: {
    marginTop: 50,
  },
  down_button: {
    borderWidth: 4,
    alignItems: 'center',
    borderColor: '#f1f1f1',
    borderRadius: 40,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    marginBottom: 100,
  },
});
