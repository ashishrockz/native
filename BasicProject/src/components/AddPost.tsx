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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const pickImage = () => {
    console.log('Opening image picker'); // Add this line for debugging
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        console.log('Image picker response:', response); // Add this for debugging
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
    if (!imageUri || !caption) {
      Alert.alert('Please select an image and enter a caption.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('content', caption);
    
  const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
    try {
      const response = await fetch('https://social-chi-wine.vercel.app/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    
      const responseData = await response.json();
      console.log('Upload response:', responseData); // Add this line to debug server response
    
      if (response.ok) {
        console.log('Upload success:', responseData);
        Alert.alert('Post uploaded successfully!');
        setImageUri(null);
        setCaption('');
      } else {
        console.error('Error response from server:', responseData);
        Alert.alert('Failed to upload post. Please check server logs.');
      }
    } catch (error:any) {
      console.error('Upload failed:', error.message);
      Alert.alert('Failed to upload post. Please try again.');
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
            placeholder="Write some caption for your post"
            placeholderTextColor={'black'}
            value={caption}
            onChangeText={setCaption}
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
