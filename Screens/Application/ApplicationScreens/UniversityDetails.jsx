import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UniversityDetails = ({data}) => {
  
  return (
    <View style={{margin:15, borderRadius:10, borderWidth:0.01, overflow:"hidden"}}>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40}}>
        <Text style={{padding:10, fontSize:14, height:"100%",    textAlignVertical:"center", backgroundColor:"#E1F0FF", width:"30%", fontFamily:"Montserrat_700Bold"}} >Country </Text>
        <Text style={{padding:10, fontSize:14, minHeight:"100%", textAlignVertical:"center", backgroundColor:"#F0F7FF", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.country?.name}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E1F0FF", width:"30%", fontFamily:"Montserrat_700Bold"}} >Intake </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", heighteight:"100%", backgroundColor:"#F0F7FF", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.intake?.name}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E1F0FF", width:"30%", fontFamily:"Montserrat_700Bold"}} >Course Type </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#F0F7FF", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.course?.type}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", textAlignVertical:"center", backgroundColor:"#E1F0FF", width:"30%", fontFamily:"Montserrat_700Bold"}} >University </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#F0F7FF", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.university?.name}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E1F0FF", width:"30%", fontFamily:"Montserrat_700Bold"}} >Course </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#F0F7FF", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.course?.name}</Text>
      </View>
    </View>
  )
}

export default UniversityDetails

const styles = StyleSheet.create({})