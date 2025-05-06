import {Text, StyleSheet, Button, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, Alert, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import logo from "../../assets//AGELogo.svg"
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotification } from '../../context/NotificationContext';
// import * as Updates from 'expo-updates';
// import { SvgUri } from 'react-native-svg';

const loginScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passView, setPassView] = useState(true)
    const [eyeColor, setEyeColor] = useState("#4F8EF7")
    const { notification, expoPushToken, error } = useNotification();
const routes = useNavigationState(state => state);
  const currentRoute = routes.routes[routes.index].name
  useFocusEffect(
    useCallback(() => {
      const routeNamesToExit = ['Dashboard', 'Login'];
  
      if (routeNamesToExit.includes(currentRoute)) {
        const onBackPress = () => {
          BackHandler.exitApp(); // 🔥 Bye bye app
          return true;
        };
  
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );
  
        return () => backHandler.remove(); // Cleanup when screen loses focus
      }
    }, [])
  );


    const LoginFunc = ()=>{

      if (email === "" || password === "") {
        Alert.alert("Fill all the fields")
      }
      else{
        const loginInfo = {email, password, expoPushToken}

        axios.post("https://dev.shabujglobal.org/api/login", loginInfo)
        .then(res=>{
          if(res.data){
            // Alert.alert("Your Token: ", res?.data?.data?.accessToken)
            const email = res?.data?.data?.userData?.email
            const name = res?.data?.data?.userData?.full_name
            const accesstoken = res?.data?.data?.accessToken
            
            // Saving Data into device
            AsyncStorage.setItem('name', name)
            AsyncStorage.setItem('email', email)
            AsyncStorage.setItem('accesstoken', accesstoken)
            navigation.navigate("Dashboard")
            // Updates.reload()
          }
        })
        .catch(error=>Alert.alert(error?.response?.data?.message || error?.message || "Something went wrong"))
        console.log(loginInfo);
      }
      

      

    }
    

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS==="android" ? "height" : "padding"}></KeyboardAvoidingView>
        <View>
            <View style={styles.logoDiv}>
                <Image style={styles.logo} source={require("../../assets//AGELogo.png")}/>
                <Text style={styles.logoText}>Shabuj Global</Text>
            </View>
            <Text style={styles.welcomeText}>Welcome to Shabuj Global! 👋🏻</Text>
            <TextInput
                keyboardType='email-address'
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}/>
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
        </View>
        <TouchableOpacity style={{width:"85%", alignItems:"flex-end"}}><Text style={styles.links} onPress={()=> navigation.navigate("ForgoetPass")}>Forget password?</Text></TouchableOpacity>

        <TouchableOpacity onPress={LoginFunc} style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10}}><Text style={{color:"white", fontFamily: 'Montserrat_400Regular', fontSize:25, width:"80%", textAlign:"center" }}>Log In</Text></TouchableOpacity>

        <TouchableOpacity style={{flexDirection:"row",}}><Text>New on our platform? </Text><Text style={styles.links} onPress={()=> navigation.navigate("Register")}>Create an account</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

export default loginScreen

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