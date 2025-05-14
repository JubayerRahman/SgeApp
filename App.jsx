import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginScreen from './Screens/LoginScreen/LoginScreen';
import Register from './Screens/RegisterScreen/Register';
import Forgetpass from './Screens/Forgetpass/Forgetpass';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { useCallback, useEffect, useState } from 'react';
import Dashboard from './Screens/Dashboard/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationProvider } from './context/NotificationContext';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { navigationRef } from './navigationRef';
import NetInfo from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const [userName, setUserName] = useState()

  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state =>{
      setIsConnected(state.isConnected)
    })
    return ()=> unsubscribe()
  },[])

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        if (name !== null) {
          setUserName(name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
  
    fetchUserName();
  }, []);

  console.log("I am App Component: ",userName);
  

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();
        // You can load other resources here if needed
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appIsReady) {
      // Hide the splash screen once the app is ready
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null; // Render nothing while resources are loading
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
     {!isConnected && (
      <View style={styles.noInternetContainer}>
        <Text style={styles.noInternetText}>📡 No Internet Connection</Text>
      </View>
    )}
      <NavigationContainer ref={navigationRef}>
      <NotificationProvider>
        <Stack.Navigator initialRouteName={userName === undefined ? "Home" : "Dashboard"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={loginScreen} />
          <Stack.Screen name="Login" component={loginScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgoetPass" component={Forgetpass} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
        <StatusBar style="dark" backgroundColor='white'/>
      </NotificationProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  noInternetContainer: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    marginTop:30
  },
  noInternetText: {
    color: 'white',
    // fontWeight: 'bold',
    fontFamily:"Montserrat_400Regular"
  },
});

