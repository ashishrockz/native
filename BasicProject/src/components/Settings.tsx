import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface SettingsProps {
  logout: () => void;
}
const Settings: React.FC<SettingsProps> = ({logout}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity style={styles.back}>
        <Image
          source={require('../assets/back.png')}
          style={{width: 35, height: 35}}
        />
        <Text style={{fontSize: 18, marginLeft: 8}}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.back}  onPress={logout}>
        <Image
          source={require('../assets/logout.png')}
          style={{width: 35, height: 35}}
        />
        <Text style={{fontSize: 18, marginLeft: 8}}>LogOut</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <View style={styles.profilecontainer}>
          <Image
            source={require('../assets/profile/3.jpeg')}
            style={{width: 70, height: 70, borderRadius: 50}}
          />
        </View>
        <View style={styles.profile_text}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Chuchel Ashish</Text>
          <Text>@actor</Text>
        </View>
      </View>
      <View style={styles.follwers}>
        <View style={styles.fololwer_text}>
          <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
            100
          </Text>
          <Text style={{fontSize: 13, textAlign: 'center'}}>Following</Text>
        </View>
        <View style={styles.fololwer_text}>
          <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
            100M
          </Text>
          <Text style={{fontSize: 13, textAlign: 'center'}}>Followers</Text>
        </View>
        <View style={styles.fololwer_text}>
          <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
            29
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
  },
  profilecontainer: {
    padding: 3,
    borderWidth: 4,
    borderRadius: '50%',
    borderColor: '#2B8761',
  },
  profile_text: {
    margin: 5,
    paddingLeft: 10,
  },
  follwers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  fololwer_text: {
    margin: 5,
  },
  bottom_container: {
    justifyContent: 'flex-end',
  },
  highilets:{
    flexDirection:"row"
  },
  highilets_con:{
    margin:5,
  },
  down_button: {
    borderWidth: 4,
    alignItems: 'center',
    borderColor: '#f1f1f1',
    backgroundColor: '#3B9678',
    borderRadius: 40,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    margin: 20,
  },
});
