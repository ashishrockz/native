import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';

interface SettingsProps {
  logout: () => void;
}
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
const Settings: React.FC<SettingsProps> = ({logout}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [post, setPost] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>(''); // State for edited content
  const sheetRef = useRef<BottomSheetMethods>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token'); // Replace 'token' with your key
        if (!token) {
          console.error('No token found');
          return;
        }

        // Fetch user data from API with token in Authorization header
        const response = await fetch(
          'https://socialaws.vercel.app/auth/me',
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

        const data = await response.json();
        // console.log('Fetched user data:', data); // Debug log
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Adjust the API endpoint to fetch posts by user ID
        const response = await fetch(
          `https://socialaws.vercel.app/user`,
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
        // console.log('Fetched user posts:', data); // Debug log
        setPost(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 10000); // 10000ms = 10 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [user]); // Make sure the effect runs when `user` changes
  const handleEdit = async (postId: string, newContent: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(
        `https://socialaws.vercel.app/edit/${postId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({content: newContent}),
        },
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Post updated successfully!');
        setPost(prevPosts =>
          prevPosts.map(p =>
            p._id === postId ? {...p, content: newContent} : p,
          ),
        );
      } else {
        Alert.alert('Error', 'Failed to update post');
      }
    } catch (error) {
      console.error('Error editing post:', error);
      Alert.alert('Error', 'Failed to update post');
    }
  };

  const handleDelete = async (postId: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(
        `https://socialaws.vercel.app/delete/${postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        Alert.alert('Success', 'Post deleted successfully!');
        setPost(prevPosts => prevPosts.filter(p => p._id !== postId));
      } else {
        Alert.alert('Error', 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Failed to delete post');
    }
  };
  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size="small"
        color="#0000ff"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',padding: 10,}}>
        {/* <TouchableOpacity style={styles.back}>
          <Image
            source={require('../assets/back.png')}
            style={{ width: 35, height: 35 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity> */}
        {user ? (
          <Text style={{fontSize: 18, fontWeight: '700'}}>{user.username}</Text>
        ) : (
          <Text>unable to load data plesa login again</Text>
        )}
        <TouchableOpacity style={styles.back} onPress={logout}>
          <Image
            source={require('../assets/logout.png')}
            style={{width: 35, height: 35}}
          />
          <Text style={{fontSize: 18, marginLeft: 8}}>LogOut</Text>
        </TouchableOpacity>
      </View>

      {user ? (
        <View>
          <View style={styles.profile}>
            <View style={styles.profilecontainer}>
              <Image
                source={require('../assets/profile/3.jpeg')}
                style={{width: 70, height: 70, borderRadius: 50}}
              />
            </View>
            <View style={styles.fololwer_text}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                100
              </Text>
              <Text style={{fontSize: 13, textAlign: 'center'}}>Following</Text>
            </View>
            <View style={styles.fololwer_text}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                100M
              </Text>
              <Text style={{fontSize: 13, textAlign: 'center'}}>Followers</Text>
            </View>
            <View style={styles.fololwer_text}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                {post.length}
              </Text>
              <Text style={{fontSize: 13, textAlign: 'center'}}>Posts</Text>
            </View>
          </View>
          <View style={styles.highilets}>
            <Text>Highligts</Text>
            <ScrollView horizontal={true} style={styles.highilets1}>
              <View style={styles.highilets_con}>
                <Image
                  source={require('../assets/profile/1.jpeg')}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              </View>
              <View style={styles.highilets_con}>
                <Image
                  source={require('../assets/profile/2.jpeg')}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              </View>
              <View style={styles.highilets_con}>
                <Image
                  source={require('../assets/profile/4.jpeg')}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              </View>
              <View style={styles.highilets_con}>
                <Image
                  source={require('../assets/profile/5.jpeg')}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              </View>
              <View style={styles.highilets_con}>
                <Image
                  source={require('../assets/profile/7.jpeg')}
                  style={{width: 70, height: 70, borderRadius: 50}}
                />
              </View>
            </ScrollView>
          </View>
          <View style={{height: '63.5%'}}>
            {/* <View>
              <Text>Posts</Text>
            </View> */}
            <FlatList
              data={post}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <View style={styles.postContainer}>
                  <View style={styles.postHeader}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/profile/3.jpeg')} // Replace with user's profile image if available
                        style={styles.profileImage}
                      />
                      <Text style={styles.username}>
                        {user?.username || 'Unknown User'}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedPostId(item._id);
                          setEditContent(item.content);
                          sheetRef.current?.open();
                        }}>
                        <Image
                          style={{width: 30, height: 30}}
                          source={require('../assets/more.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {item.imageUrl ? (
                    <View style={styles.postImageContainer}>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={styles.postImage}
                      />
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
                      <Text style={{paddingLeft: 5, fontSize: 18}}>
                        {item.likes?.length || 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
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
            <BottomSheet ref={sheetRef} height={250}>
              <ScrollView contentContainerStyle={{paddingBottom: 50,padding:10}}>
                <KeyboardAvoidingView behavior="padding">
                  <Text style={{fontSize: 18,color:'black',textAlign:'center'}}>Edit Post</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textInput}
                    value={editContent}
                    onChangeText={setEditContent}
                    placeholder="Edit your post"
                  />
                  {/* Call handleEdit with postId and the new content */}
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'green',
                        padding: 10,
                        borderRadius: 20,
                      }}
                      onPress={() => handleEdit(selectedPostId!, editContent)}>
                      <Text style={{color: 'white', fontSize: 17}}>
                        Update Post
                      </Text>
                    </TouchableOpacity>
                    {/* Call handleDelete with postId */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'red',
                        padding: 10,
                        borderRadius: 20,
                      }}
                      onPress={() => handleDelete(selectedPostId!)}>
                      <Text style={{color: 'white', fontSize: 17}}>
                        Delete Post
                      </Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </BottomSheet>
          </View>
        </View>
      ) : (
        <Text>Unable to load user data</Text>
      )}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // padding: 10,
  },
  back: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
  },
  profile: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilecontainer: {
    padding: 3,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#2B8761',
  },

  follwers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fololwer_text: {
    margin: 5,
  },
  highilets: {
    borderTopWidth: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  highilets1: {
    flexDirection: 'row',
  },
  highilets_con: {
    margin: 5,
  },
  postContainer: {
    paddingTop: 10,
        padding: 10,

    paddingBottom: 10,
    // backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
  },
  postHeader: {
    paddingLeft: 5,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 25,
    height: 25,
  },
  panel: {
    padding: 20,
  },
  panelContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText: {
    fontSize: 18,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  inputContainer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    color: 'black',
    width: '95%',
  },
});
