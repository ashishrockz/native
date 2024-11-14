import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsProps {
  logout: () => void;
}

const Settings: React.FC<SettingsProps> = ({logout}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // To manage loading state

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
          'https://social-chi-wine.vercel.app/auth/me',
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
        console.log('Fetched user data:', data); // Debug log
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* <TouchableOpacity style={styles.back}>
          <Image
            source={require('../assets/back.png')}
            style={{ width: 35, height: 35 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity> */}
        {user ? (
        <Text style={{fontSize: 18, fontWeight: '700'}}>{user.username}</Text>):( <Text>unable to load data plesa login again</Text>)}
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
                <Text style={{fontSize: 13, textAlign: 'center'}}>
                  Following
                </Text>
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
                <Text style={{fontSize: 13, textAlign: 'center'}}>
                  Followers
                </Text>
              </View>
              <View style={styles.fololwer_text}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {user.post}
                </Text>
                <Text style={{fontSize: 13, textAlign: 'center'}}>Posts</Text>
              </View>
          </View>
          <View style={styles.highilets}>
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
    padding: 10,
  },
  back: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
  },
  profile: {
    margin: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'

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
    flexDirection: 'row',
  },
  highilets_con: {
    margin: 5,
  },
});
