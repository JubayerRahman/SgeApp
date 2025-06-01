import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper'

const UniversityDetails = ({data}) => {
  
  return (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
    <List.Section
      theme={{
        colors:{background:"#EEEEFF"}
      }}
        style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}
    >
      <List.Accordion
      style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
      title={
        <View style={{backgroundColor:"#EEEEFF"}}>
          <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>University Details</Text>
        </View>
      }
      >

    <View style={{borderRadius:10, borderWidth:0.01, overflow:"hidden", backgroundColor:"#E8E8F1"}}>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40, borderBottomWidth:1, borderColor:"#FFFFFF",}}>
        <Text style={{padding:10, fontSize:14, height:"100%",    textAlignVertical:"center", backgroundColor:"#E8E8F1", width:"30%", fontFamily:"Montserrat_700Bold"}} >Country </Text>
        <Text style={{padding:10, fontSize:14, minHeight:"100%", textAlignVertical:"center", backgroundColor:"#E8E8F1", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.country?.name}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40, borderBottomWidth:1, borderColor:"#FFFFFF",}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E8E8F1", width:"30%", fontFamily:"Montserrat_700Bold"}} >Intake </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", heighteight:"100%", backgroundColor:"#E8E8F1", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.intake?.name}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40, borderBottomWidth:1, borderColor:"#FFFFFF",}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E8E8F1", width:"30%", fontFamily:"Montserrat_700Bold"}} >Course Type </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E8E8F1", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.course?.type}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40, borderBottomWidth:1, borderColor:"#FFFFFF",}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", textAlignVertical:"center", backgroundColor:"#E8E8F1", width:"30%", fontFamily:"Montserrat_700Bold"}} >University </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E8E8F1", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.university?.name}</Text>
      </View>
      <View style={{flexDirection:"row", alignItems:"center", minHeight:40, borderBottomWidth:1, borderColor:"#FFFFFF",}}>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E8E8F1", width:"30%", fontFamily:"Montserrat_700Bold"}} >Course </Text>
        <Text style={{padding:10, fontSize:14, textAlignVertical:"center", height:"100%", backgroundColor:"#E8E8F1", width:"70%", fontFamily:"Montserrat_400Regular"}} >{data?.course?.name}</Text>
      </View>
    </View>
      </List.Accordion>
    </List.Section>
    </View>
  )
}

export default UniversityDetails

const styles = StyleSheet.create({})