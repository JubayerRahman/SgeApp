import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
const { height } = Dimensions.get('window');

const LoagingScreen = () => {
  return (
    <View style={{justifyContent:"center", alignContent:"center", alignItems:"center", gap:"20", height:{height},marginTop:"45%", }}>
        <Image source={require("../assets/icon.png")} width={50} height={50} style={{width:200, height:200}} />
        <ActivityIndicator size={60}/>
    </View>
  )
}

export default LoagingScreen