import {Text, StyleSheet, Button, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import logo from "../../assets//AGELogo.svg"
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Forgetpass = () => {

  const navigation = useNavigation();
      const [email, setEmail] = useState('');

      const SendingNewPassFunction = ()=>{
        if (email === "") {
          Alert.alert("Give me your email first")
        }
        else{
          axios.post("https://dev.shabujglobal.org/api/reset-password", {email})
          .then(res=> Alert.alert(res?.data?.message))
          .catch(error=>Alert.alert(error?.response?.data?.message || error?.message || "Something went wrong, babe 💔"))
        }
      }

      

  return (
    <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS==="android" ? "height" : "padding"}></KeyboardAvoidingView>
            <View style={{width:"90%", alignItems:"center", justifyContent:"center"}}>
                <View style={styles.logoDiv}>
                    <Image style={styles.logo} source={require("../../assets//AGELogo.png")}/>
                    <Text style={styles.logoText}>Shabuj Global</Text>
                </View>
                <Text style={styles.welcomeText}>Forgot Password? 🔒</Text>
                <TextInput
                    keyboardType='email-address'
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}/>
            </View>
    
            <TouchableOpacity onPress={SendingNewPassFunction} style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10}}><Text style={{fontFamily: 'Montserrat_400Regular', color:"white", fontSize:17, width:"80%", textAlign:"center" }}>Send Temporary Passwors</Text></TouchableOpacity>
            <TouchableOpacity style={{width:"85%", alignItems:"center"}}><Text style={styles.links} onPress={()=> navigation.navigate("Home")}> {"<"} Back to Login</Text></TouchableOpacity>
        </SafeAreaView>
  )
}

export default Forgetpass

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 50,
    height: 50
  },
  logoDiv:{
    // backgroundColor:"black",
    marginLeft: "auto",
    marginRight:"auto",
    width: "90%",
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    gap: "5%",
    height: "auto",
    marginBottom: 5
  },
  logoText:{
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2
  },
  welcomeText:{
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  links:{
    fontFamily: 'Montserrat_400Regular',
    color: "#7367f0",
    alignItems:"flex-end",
    justifyContent:'flex-end',
    fontSize:17
  }
});