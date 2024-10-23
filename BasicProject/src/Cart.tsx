import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
interface types {
    counter :number,
    prev :number,
}
const Cart = () => {
    const [counter,setCounter] = useState(1)
    function decrement() {
        if (counter > 1) {
          setCounter(prev => prev - 1);
        }
      }
    
      function increment() {
        setCounter (prev => prev + 1);
      }
  return (
    <View style={styles.container}>
      <Button title ='-' onPress={decrement}/>
      <Text style={styles.lable}>{counter}</Text>
      <Button title='+'  onPress={increment}/>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    lable:{
        fontSize:20,
        padding:5,
        color:'Dark',

    }
})