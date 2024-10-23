import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = () => {
  return (
    <View style={styles.container} >
      <Image source={require('./car.png')} style={{width: 200, height: 200}}/>
      <Text>CarInterior</Text>
      <Text>Price: $120</Text>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container:{
        flex:0,
        flexDirection:'row'
    },
   
})