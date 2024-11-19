import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [content, setcontent] = useState('');

  const pickImage = () => {
    console.log('Opening image picker');
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        console.log('Image picker response:', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const uploadPost = async () => {
    if (!imageUri || !content) {
      Alert.alert('Please select an image and enter a content.');
      return;
    }
  
    // Improved file type extraction
    const fileType = imageUri.split('.').pop();
    const mimeType = `image/${fileType}`; // Ensure it is image/jpeg, image/png, etc.
  
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: mimeType, // Using extracted file type
      name: `photo.${fileType}`,
    });
    formData.append('content', content);
  
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await fetch('http://3.110.47.11:5000/create-post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const responseData = await response.json();
      if (response.ok) {
        Alert.alert('Post uploaded successfully!');
        setImageUri(null);
        setcontent('');
      } else {
        console.error('Error response from server:', responseData);
        Alert.alert('Failed to upload post. Please check server logs.', responseData);
        setImageUri(null);
        setcontent('');
      }
    } catch (error:any) {
      console.error('Upload failed:', error.message);
      Alert.alert('Failed to upload post. Please try again.');
      setImageUri(null);
      setcontent('');
    }
  };
  
  
  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require('../assets/Posts/logo.png')}
          style={styles.logo}
        />
      </View>
      <View>
        <Text style={{ fontSize: 22, fontWeight: '600', textAlign: 'center' }}>
          Add Post
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}
            placeholder="Write some content for your post"
            placeholderTextColor={'black'}
            value={content}
            onChangeText={setcontent}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Pick an image" onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
        <Button title="Upload Post" onPress={uploadPost} />
      </View>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    paddingRight: 10,
  },
  logo: {
    width: 150,
    height: 60,
  },
  inputContainer: {
    padding: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    padding: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
