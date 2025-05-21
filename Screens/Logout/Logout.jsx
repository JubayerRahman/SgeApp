import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import axios from 'axios';

const Logout = () => {
    const name = AsyncStorage.getItem("name")
    const email = AsyncStorage.getItem("email")
    const [token, setToken] = useState('');
    const navigation = useNavigation()
    const routes = useNavigationState(state => state);

    const currentRoute = routes.routes[routes.index].name;
    console.log(currentRoute);

    useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accesstoken');
        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);


const logOutFunction = async () => {
  try {
    if (!token) {
      console.warn("No access token found 🫤");
      return;
    }

    const response = await axios.delete(`https://dev.shabujglobal.org/api/expo-push-tokens`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log("🔥 Delete Response:", response.data);

    // ✅ Only continue if the response status is 200 or 204
    if (response.status === 200 || response.status === 204) {
      await AsyncStorage.multiRemove(["name", "email", "accesstoken"]);
      navigation.navigate("Login");
    } else {
      console.warn("Push token deletion failed 😓");
    }

  } catch (error) {
    const errorMsg = error.response?.data || error.message;
    console.error('Logout failed 😞:', errorMsg);
    // Optionally show user
    // Alert.alert("Logout Failed", "Something went wrong.");
  }
};



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