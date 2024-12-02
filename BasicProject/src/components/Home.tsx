import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamLists} from '../models/navtypes'; // Import your routes type
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // State to hold the logged-in user's ID
  const navigation = useNavigation<NavigationProp<RootStackParamLists>>();
  const sheetRef = useRef<BottomSheetMethods>(null);

  // Fetch user ID from token
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded: {id: string} = jwtDecode(token); // Decode the token
          setUserId(decoded.id); // Set user ID
        }
      } catch (error) {
        console.error('Error decoding token', error);
        Alert.alert('Error', 'Failed to fetch user information.');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://socialaws.vercel.app/all', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error: any) {
        Alert.alert('Error', 'Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  const toggleLike = async (postId: string) => {
    if (!userId) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch('https://socialaws.vercel.app/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({postId}),
      });

      // Log the raw response text
      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${responseText}`);
      }

      // Parse JSON after confirming it's valid
      const updatedPost = JSON.parse(responseText);
      console.log('Updated Post:', updatedPost);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === updatedPost._id ? updatedPost : post,
        ),
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      Alert.alert('Error', 'Failed to toggle like. Please try again.');
    }
  };

  return (
    <View style={{backgroundColor: '#f1f1f1', height: '99.8%'}}>
      <View style={styles.header}>
        <Image
          source={require('../assets/Posts/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Add', {screen: 'AddPost'})}>
          <Image
            source={require('../assets/Posts/add.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                source={require('../assets/profile/3.jpeg')}
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
              <Text style={{fontSize: 17}}>{item.content}</Text>
            </View>
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleLike(item._id)}>
                <Image
                  source={
                    item.likes.includes(userId || '')
                      ? require('../assets/Posts/liked.png')
                      : require('../assets/Posts/love.png')
                  }
                  style={styles.actionIcon}
                />
                <Text style={{paddingLeft: 5, fontSize: 18}}>
                  {item.likes?.length || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  sheetRef.current?.open();
                }}>
                <Image
                  source={require('../assets/Posts/chat.png')}
                  style={styles.actionIcon}
                />
                <Text style={{paddingLeft: 5, fontSize: 18}}>
                  {item.comments?.length || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('../assets/Posts/save.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <BottomSheet ref={sheetRef} height={450}>
        <ScrollView contentContainerStyle={{paddingBottom: 50, padding: 10}}>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Comments
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.postHeader}>
                <Image
                  source={require('../assets/profile/3.jpeg')}
                  style={styles.profileImage}
                />
              </View>
              <View style={{justifyContent: 'flex-end'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    multiline={true}
                    numberOfLines={2}
                    placeholderTextColor={'black'}
                    placeholder="Add Coments..."
                    style={{width: '85%', borderBottomWidth: 1,fontSize:17}}
                  />
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/send.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccccc1',
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
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  postHeader: {
    paddingLeft: 10,
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
    paddingTop: 10,
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
    width: 30,
    height: 30,
  },
});

export default Home;
