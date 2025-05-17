import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import SkeletonComponent from './SkeletonComponent';
const { height } = Dimensions.get('window');

const LoagingScreen = () => {
  return (
    <View style={{justifyContent:"center", alignContent:"center", alignItems:"center", gap:"20", height:{height},}}>
      <View style={{justifyContent:"center", alignContent:"center", alignItems:"center", gap:"20", height:{height},marginTop:"45%", position:"absolute", zIndex:1000}}>
      <Image source={require("../assets/icon.png")} width={50} height={50} style={{width:200, height:200}} />
      <ActivityIndicator size={60}/>
    </View>
      <SkeletonComponent/>
    </View>
  )
}

export default LoagingScreen