import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Logout = () => {
    const name = AsyncStorage.getItem("name")
    const email = AsyncStorage.getItem("email")
    const navigation = useNavigation()
    const routes = useNavigationState(state => state);

    const currentRoute = routes.routes[routes.index].name;
    console.log(currentRoute);


    const logOutFunction = ()=>{
        AsyncStorage.removeItem("name")
        AsyncStorage.removeItem("email")
        AsyncStorage.removeItem("accesstoken")
        navigation.navigate("Login")
    }
  return (
    <View style={styles.container} >
        <AntDesign style={{backgroundColor:"#7367f0", padding: 20, borderRadius: 100}} color="white" name="user" size={100}/>
      <Text style={{ fontFamily: "Montserrat_400Regular", paddingTop:10, fontSize:20 }}>{name}</Text>
      <Text style={{ fontFamily: "Montserrat_400Regular", paddingTop:10, fontSize:16, alignItems:"center" }}><AntDesign color="#7367f0" name="mail" size={20}/> {email}</Text>
      <TouchableOpacity onPress={logOutFunction} style={{backgroundColor:"#ff746c", marginTop:20, width:"80%", borderRadius:10}}>
        <Text style={{fontSize:20, padding: 10, textAlign:"center", color:"white"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      },
    })