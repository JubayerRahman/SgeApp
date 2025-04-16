import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginScreen from './Screens/LoginScreen/LoginScreen';
import Register from './Screens/RegisterScreen/Register';
import Forgetpass from './Screens/Forgetpass/Forgetpass';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={loginScreen} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgoetPass" component={Forgetpass} />
      </Stack.Navigator>
      <StatusBar style='auto'/>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainText:{
    fontSize:50
  }
});
