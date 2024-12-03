import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

interface ValidationError {
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
  conf_password?: string;
}

const Signup = ({ navigation }: any) => {
  const [username, setUserName] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConformPass] = useState('');
  const [errors, setErrors] = useState<ValidationError>({});

  const validateForm = (): ValidationError => {
    let error: ValidationError = {};
    if (!fullname) error.fullname = 'FullName is required';
    if (!username) error.username = 'UserName is required';
    if (!email) {
      error.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = 'Email is invalid';
    }
    if (!password) {
      error.password = 'Password is required';
    } else if (password.length < 6) {
      error.password = 'Password should be at least 6 characters';
    }
    if (!conf_password) {
      error.conf_password = 'Confirm Password is required';
    } else if (conf_password !== password) {
      error.conf_password = "Passwords don't match";
    }
    return error;
  };

  const handleSignup = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://socialaws.vercel.app/auth/signup', {
        fullname,
        username,
        email,
        password,
      });
      console.log('Signup successful:', response.data);
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      Alert.alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.heading_container}>
            <Text style={styles.heading}>Signup</Text>
          </View>
          <View style={styles.form_container}>
            <View>
              <Text style={styles.input_label}>FullName:</Text>
              <TextInput
                style={[styles.input_style, errors.fullname && styles.input_error]}
                placeholder="Enter FullName"
                placeholderTextColor={'black'}
                value={fullname}
                onChangeText={setFullName}
              />
              {errors.fullname && <Text style={styles.error_text}>{errors.fullname}</Text>}
            </View>

            <View>
              <Text style={styles.input_label}>UserName:</Text>
              <TextInput
                style={[styles.input_style, errors.username && styles.input_error]}
                placeholder="Enter username"
                placeholderTextColor={'black'}
                value={username}
                onChangeText={setUserName}
              />
              {errors.username && <Text style={styles.error_text}>{errors.username}</Text>}
            </View>

            <View>
              <Text style={styles.input_label}>E-Mail:</Text>
              <TextInput
                style={[styles.input_style, errors.email && styles.input_error]}
                placeholder="Enter E-Mail"
                placeholderTextColor={'black'}
                value={email}
                onChangeText={setEmail}
              />
              {errors.email && <Text style={styles.error_text}>{errors.email}</Text>}
            </View>

            <View>
              <Text style={styles.input_label}>Password:</Text>
              <TextInput
                style={[styles.input_style, errors.password && styles.input_error]}
                placeholder="Enter Password"
                placeholderTextColor={'black'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {errors.password && <Text style={styles.error_text}>{errors.password}</Text>}
            </View>

            <View>
              <Text style={styles.input_label}>Confirm Password:</Text>
              <TextInput
                style={[styles.input_style, errors.conf_password && styles.input_error]}
                placeholder="Re-enter Password"
                placeholderTextColor={'black'}
                value={conf_password}
                onChangeText={setConformPass}
                secureTextEntry
              />
              {errors.conf_password && <Text style={styles.error_text}>{errors.conf_password}</Text>}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.button_text}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 40 }}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  heading_container: {},
  heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  form_container: {
    margin: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  input_label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input_style: {
    marginBottom: 0,
    height: 55,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#F2F2F2',
    fontSize: 18,
    padding: 10,
    color: 'black',
  },
  input_error: {
    borderColor: 'red',
  },
  error_text: {
    fontSize: 14,
    color: 'red',
  },
  button: {
    backgroundColor: '#2B8761',
    borderRadius: 40,
    padding: 15,
    marginBottom: 18,
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
