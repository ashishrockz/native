import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
  const [users, setUsers] = useState<any[]>([]); // State to store all user data
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // State for filtered user data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchText, setSearchText] = useState(''); // Search text state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Fetch user data from API with the Authorization header
        const response = await axios.get(
          'https://socialaws.vercel.app/auth/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data); // Set all users in state
        setFilteredUsers(response.data); // Initialize filtered users with all users
        console.log('Fetched users:', response.data); // Debugging log
      } catch (err) {
        console.log('Error fetching users:', err); // Handle errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchUsers();
  }, []);

  // Debounced search function
  const handleSearch = useCallback(
    debounce((text: string) => {
      const lowercasedText = text.toLowerCase();
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(lowercasedText)
      );
      setFilteredUsers(filtered);
    }, 300),
    [users]
  );

  const handleInputChange = (text: string) => {
    setSearchText(text);
    handleSearch(text); // Call the debounced search function
  };

  if (loading) {
    return <ActivityIndicator
    style={{flex: 1, justifyContent: 'center'}}
    size="small"
    color="#0000ff"
  />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/Posts/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.search}>
        <Image
          source={require('../assets/Posts/search.png')}
          style={{ width: 25, height: 25 }}
        />
        <TextInput
          style={styles.search_input}
          placeholderTextColor={'black'}
          placeholder="Search users..."
          value={searchText}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={() => handleInputChange('')}>
          <Image
            source={require('../assets/Posts/remove.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      {filteredUsers.length >  0 ?(
      <FlatList
        data={filteredUsers} // Render filtered user data
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View>
              <Image
                source={require('../assets/profile/3.jpeg')}
                style={{ width: 70, height: 70, borderRadius: 50 }}
              />
            </View>
            <View style={styles.userDetails}>
              <Text style={{ fontSize: 18, padding: 5 }}>{item.username}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.buttonText}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.unfollowButton}>
                  <Text style={styles.buttonText}>UnFollow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />):(
        <Text>No User found</Text>
      )}
    </SafeAreaView>
  );
};

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
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
  search: {
    borderWidth: 2,
    alignItems: 'center',
    padding: 5,
    borderRadius: 40,
    flexDirection: 'row',
    marginBottom: 10,
    color: 'black',
  },
  search_input: {
    width: '85%',
    height: 40,
    fontSize: 17,
    color: 'black',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 2,
    borderRadius: 50,
    padding: 10,
    elevation: 10,
  },
  userDetails: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  followButton: {
    width: 100,
    backgroundColor: '#2B8761',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 5,
  },
  unfollowButton: {
    width: 100,
    backgroundColor: '#CB2027',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    padding: 5,
    color: '#FFFFFF',
  },
});

export default Search;
