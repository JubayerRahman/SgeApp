import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, Platform, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';
import { useNotification } from '../../../context/NotificationContext';
import * as Clipboard from 'expo-clipboard';

const DashboardHome = () => {
  const routes = useNavigationState(state => state);
  const currentRoute = routes.routes[routes.index].name;
  const { notification, expoPushToken, error } = useNotification();

  // Back handler logic
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [currentRoute])
  );


  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <View style={styles.welcomeBox}>
        <Image 
          style={styles.logo} 
          source={require("../../../assets/AGELogo.png")}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Welcome to SGE App</Text>
        <Text style={styles.logoText}>{expoPushToken}</Text>
        <Text onPress={()=> {Clipboard.setString(expoPushToken), Alert.alert("teken copied")}}>Copy</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeBox: {
    alignItems: "center",
    backgroundColor: "#87CEEB",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  logoText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#fff',
    marginBottom: 10,
  },
  tokenText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default DashboardHome;