import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useFocusEffect, useNavigationState } from '@react-navigation/native';

const DashboardHome = () => {
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
  return (
    <TouchableOpacity  style={styles.container}>
            <View style={{alignItems:"center", backgroundColor:"#87CEEB", padding: 15, borderRadius: 20, shadowColor:"#000", shadowOffset:{width: 0, height: 2}, shadowOpacity: 0.25,  elevation: 100, }}>
                <Image style={styles.logo} source={require("../../../assets//AGELogo.png")}/>
                <Text style={styles.logoText}>Welcome to SGE App</Text>
            </View>
        </TouchableOpacity>
  )
}

export default DashboardHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        width: 200,
        height: 200
      },
      logoText:{
        fontFamily: 'Montserrat_400Regular',
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 2
      },
})