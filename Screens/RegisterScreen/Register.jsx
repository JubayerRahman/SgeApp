import {Text, StyleSheet, Button, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import logo from "../../assets//AGELogo.svg"
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Register = () => {

  const navigation = useNavigation();
      const [Firstname, setFirstname] = useState('');
      const [Lastname, setLastname] = useState('');
      const [MobileNumber, setMobileNumber] = useState('');
      const [WhatsAppNumber, setWhatsAppNumber] = useState('');
      const [email, setEmail] = useState('');
      const [companyName, setCompanyName] = useState('');
      const [Website, setWebsite] = useState('');
      const [Address, setAddress] = useState('');
      const [PostCode, setPostCode] = useState('');
      const [City, setCity] = useState('');
      const [password, setPassword] = useState('');
      const [passView, setPassView] = useState(true)
      const [passView2, setPassView2] = useState(true)
      const [eyeColor, setEyeColor] = useState("#4F8EF7")
      const [eyeColor2, setEyeColor2] = useState("#4F8EF7")

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
              <KeyboardAvoidingView behavior={Platform.OS==="android" ? "height" : "padding"}></KeyboardAvoidingView>
              <View>
                  <View style={styles.logoDiv}>
                      <Image style={styles.logo} source={require("../../assets//AGELogo.png")}/>
                      <Text style={styles.logoText}>Shabuj Global</Text>
                  </View>
                  <Text style={styles.welcomeText}>Welcome to Shabuj Global! 👋🏻</Text>
                  <Text style={{fontFamily: 'Montserrat_700Bold', marginTop:20, fontSize:20, fontWeight:"600", letterSpacing:1}}>Personal Information</Text>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="First name"
                      value={Firstname}
                      onChangeText={setFirstname}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Lasr name"
                      value={Lastname}
                      onChangeText={setLastname}/>
                  <TextInput
                      keyboardType='email-address'
                      style={styles.input}
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}/>
                  <TextInput
                      keyboardType='number-pad'
                      style={styles.input}
                      placeholder="Number"
                      value={MobileNumber}
                      onChangeText={setMobileNumber}/>
                  <TextInput
                      keyboardType='number-pad'
                      style={styles.input}
                      placeholder="WhatsApp Number"
                      value={WhatsAppNumber}
                      onChangeText={setWhatsAppNumber}/>
                  <View>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Password"
                      value={password}
                      secureTextEntry= {passView}
                      onChangeText={setPassword}/>
                      <TouchableOpacity style={{position:"absolute", top:"25%", left:"85%"}}>
                        <Icon onPress={()=>{setPassView(!passView); passView? setEyeColor("black"): setEyeColor("#4F8EF7")}} name="eye" size={30} color={eyeColor}/>
                      </TouchableOpacity>
                  </View>
                  <View>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Confirm Password"
                      value={password}
                      secureTextEntry= {passView2}
                      onChangeText={setPassword}/>
                      <TouchableOpacity style={{position:"absolute", top:"25%", left:"85%"}}>
                        <Icon onPress={()=>{setPassView2(!passView2); passView2? setEyeColor2("black"): setEyeColor2("#4F8EF7")}} name="eye" size={30} color={eyeColor2}/>
                      </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Montserrat_700Bold', marginTop:20, fontSize:20, fontWeight:"600", letterSpacing:1}}>Company Details</Text>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChangeText={setCompanyName}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Website Name"
                      value={Website}
                      onChangeText={setWebsite}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Address"
                      value={Address}
                      onChangeText={setAddress}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Post Code"
                      value={Address}
                      onChangeText={setPostCode}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter City"
                      value={Address}
                      onChangeText={setCity}/>
              </View>
      
              <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10}}><Text style={{fontFamily: 'Montserrat_400Regular', color:"white", fontSize:25, width:"80%", textAlign:"center" }}>Sign In</Text></TouchableOpacity>
      
              <TouchableOpacity style={{flexDirection:"row", marginBottom:20}}><Text style={{fontFamily: 'Montserrat_400Regular',}}>Already have an account? </Text><Text style={styles.links} onPress={()=> navigation.navigate("Home")}>Sign in instead</Text></TouchableOpacity>
          </SafeAreaView>
    </ScrollView>
  )
}

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
    marginLeft: "auto",
    marginRight:"auto",
    width: "90%",
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    // width: '90%',
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
  }
});

export default Register