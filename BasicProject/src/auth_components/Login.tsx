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
import React, {useState} from 'react';
const users = [
  {id: 1, email: 'ram@gmail.com', password: '1qaz2wsx'},
  {id: 2, email: 'ram12@gmail.com', password: '1qaz2wsx'},
  {id: 3, email: 'ashish@gmail.com', password: '1qaz2wsx'},
];
interface ValidationError {
  email?:string,
  password?:string
}
const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validation = () =>{
    let error : ValidationError ={};
    if(!email)error.email = 'Email is required';
    if(!password)error.password = 'Email is required';

  }
  const handeSubmit = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      Alert.alert('logined');
    } else {
      Alert.alert("the user doesn't exist");
      navigation.navigate('Signup');
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
            onChangeText={text => setEmail(text)}
          />
          <Text style={{color: 'red'}}>Please enter Email</Text>
        </View>
        <View style={styles.margin}> 
          <Text style={styles.input_label}>Password:-</Text>
          <TextInput
            style={styles.input_style}
            placeholder="Enter Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <Text style={{color: 'red'}}>Please Enter Password</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: 'right',
              marginBottom: 10,
              fontSize: 16,
              color: '#3C9AFB',
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handeSubmit}>
          <Text style={styles.button_text}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{textAlign: 'center', fontSize: 16}}
            onPress={() => navigation.navigate('Signup')}>
            Creat Account
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.bottom_container}>
          <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 20}}>
            or Login With
          </Text>
        </View>
        <TouchableOpacity style={styles.down_button}>
          <Image
            source={require('../assets/google.png')}
            style={{width: 25, height: 25}}
          />
          <Text style={{fontSize: 18, marginLeft: 8}}>Login With Google</Text>
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
    fontWeight: 700,
    textAlign: 'center',
  },
  form_container: {
    margin: 10,
    paddingTop: 40,
    marginBottom: 50,
  },
  margin:{
    marginBottom:15,
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
