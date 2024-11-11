import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React , {useState} from 'react';
   
  const Signup = () => {
    const[firstname,setFirstname] = useState('')
    const[lastname,setLastname] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[conf_password,setConformPass] = useState('')

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.heading_container}>
          <Text style={styles.heading}>Signup</Text>
        </View>
        <View style={styles.form_container}>
          <View style={styles.name_container}>
            <View>
              <Text style={styles.input_label}>First Name:-</Text>
              <TextInput
                style={styles.name_input_style}
                placeholder="Jhon"
            
              />
            </View>
            <View>
              <Text style={styles.input_label}>Last Name:-</Text>
              <TextInput
                style={styles.name_input_style}
                placeholder="Doe"
              />
            </View>
          </View>
          <View>
            <Text style={styles.input_label}>E-Mail:</Text>
            <TextInput style={styles.input_style} placeholder="Enter E-Mail" />
          </View>
          <View>
            <Text style={styles.input_label}>Password:-</Text>
            <TextInput
              style={styles.input_style}
              placeholder="Enter Password"
              secureTextEntry
            />
          </View>
          <View>
            <Text style={styles.input_label}>Conform Password:-</Text>
            <TextInput
              style={styles.input_style}
              placeholder="Re Enter Password"
              secureTextEntry
            />
          </View>
   
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Creat Account</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 18,marginBottom:40,}}>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
   
  export default Signup;
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
    name_container:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    name_input_style: {
      width:170,
      marginBottom: 20,
      height: 55,
      borderWidth: 3,
      borderRadius: 15,
      borderColor: '#F2F2F2',
      fontSize: 18,
      padding: 10,
    },
    input_label: {
      fontSize: 18,
      marginBottom: 8,
    },
    input_style: {
      marginBottom: 20,
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
      marginBottom: 18,
    },
    button_text: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
    },
  });
   
   