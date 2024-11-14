import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  username: string;
}

interface Post {
  _id: string;
  user: User;
  content: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
}
const Home: React.FC = () => {
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(
          'https://social-chi-wine.vercel.app/posts',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: Post[] = await response.json();
        console.log('Fetched user data:', data); // Debug log
        setPost(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch data. Please try again later.');
      }
    };

    fetchPosts();
  }, []); 

  return (
    <View style={{padding: 10, backgroundColor: '#ffffff'}}>
      <View style={styles.header}>
        <Image
          source={require('../assets/Posts/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Image
            source={require('../assets/Posts/add.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={post}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                source={require('../assets/profile/3.jpeg')} // Replace with user's profile image if available
                style={styles.profileImage}
              />
              <Text style={styles.username}>
                {item.user?.username || 'Unknown User'}
              </Text>
            </View>
            {item.imageUrl ? (
              <View style={styles.postImageContainer}>
                <Image source={{uri: item.imageUrl}} style={styles.postImage} />
              </View>
            ) : null}
            <View style={styles.postContent}>
              <Text>{item.content}</Text>
            </View>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('../assets/Posts/love.png')}
                  style={styles.actionIcon}
                />
                <Text style={{paddingLeft:5,fontSize:18}}>{item.likes?.length || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('../assets/Posts/chat.png')}
                  style={styles.actionIcon}
                />
                <Text style={{paddingLeft:5,fontSize:18}}>{item.comments?.length || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('../assets/Posts/save.png')}
                  style={styles.actionIcon}
                />
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

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
  addIcon: {
    width: 25,
    height: 25,
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    elevation: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    paddingLeft: 20,
  },
  postImageContainer: {
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius: 20,
  },
  postContent: {
    padding: 10,
  },
  postActions: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionIcon: {
    width: 25,
    height: 25,
  },
});

export default Home;
