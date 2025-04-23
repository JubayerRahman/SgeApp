import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import DashboardHome from './DashboardHome/DashboardHome'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewApplication from '../NewApplication/NewApplication'
import ApplicationList from '../ApplicationList'
import ApplicationRequest from '../ApplicationRequest/ApplicationRequest'
import ComplianceRequest from '../ComplianceRequest';
import UniversityList from '../UniversityList/UniversityList';
import CourseList from '../CourseList/CourseList';
import CourseRequestList from '../CourseRequestList/CourseRequestList';
import CourseRequest from '../CourseRequest/CourseRequest';


const Dashboard = () => {
  const Drawer = createDrawerNavigator();

  function CustomDrawerContent({ navigation }) {
    const [isCourseExpanded, setIsCourseExpanded] = useState(false);
  
    return (
      <DrawerContentScrollView>
        {/* Dashboard */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <AntDesign name="home" size={20} color="#000" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
  
        {/* New Application */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('New Application')}
        >
          <AntDesign name="filetext1" size={20} color="#000" />
          <Text style={styles.menuText}>New Application</Text>
        </TouchableOpacity>
  
        {/* Application List */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Application List')}
        >
          <AntDesign name="paperclip" size={20} color="#000" />
          <Text style={styles.menuText}>Application List</Text>
        </TouchableOpacity>
  
        {/* Application Request */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Application Request')}
        >
          <AntDesign name="bells" size={20} color="#000" />
          <Text style={styles.menuText}>Application Request</Text>
        </TouchableOpacity>
  
        {/* Compliance Request */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Compliance Request')}
        >
          <AntDesign name="checkcircle" size={20} color="#000" />
          <Text style={styles.menuText}>Compliance Request</Text>
        </TouchableOpacity>
  
        {/* University List */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('University List')}
        >
          <AntDesign name="book" size={20} color="#000" />
          <Text style={styles.menuText}>University List</Text>
        </TouchableOpacity>
  
        {/* Course Menu with Submenu */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setIsCourseExpanded(!isCourseExpanded)}
        >
          <MaterialCommunityIcons name="bag-personal" size={20} color="#000" />
          <Text style={styles.menuText}>Course</Text>
          <AntDesign
            name={isCourseExpanded ? 'up' : 'down'}
            size={16}
            color="#000"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
  
        {isCourseExpanded && (
          <View style={styles.subMenu}>
            <TouchableOpacity
              style={styles.subMenuItem}
              onPress={() => navigation.navigate('Course List')}
            >
              <Text style={styles.subMenuText}>Course List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subMenuItem}
              onPress={() => navigation.navigate('Course Request')}
            >
              <Text style={styles.subMenuText}>Course Request</Text>
            </TouchableOpacity>
          </View>
        )}
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator 
    // drawerContent={(props) => <CustomDrawerContent {...props} />} 
    initialRouteName='Dashboard' screenOptions={{
      headerRight:()=>(
        <TouchableOpacity style={{marginRight:20}}>
            <AntDesign name="bells" size={24} color="#000" />
          </TouchableOpacity>
      ),
      headerShadowVisible: false,
      drawerActiveTintColor: "#7367f0",
      drawerInactiveTintColor: '#000',
      drawerLabelStyle: { fontSize: 16, fontFamily:"Montserrat_400Regular" },
    }}>
      <Drawer.Screen name="Dashboard" component={DashboardHome} options={{drawerLabel:"Dashboard", title:"Home", 
        drawerIcon:(({color, size})=>(<Icon name='home' size={size} color={color} />))}}/>
      <Drawer.Screen name="New Application" component={NewApplication} options={{drawerLabel:"New Application", title:"New Application", 
        drawerIcon:(({color, size})=>(<AntDesign name='filetext1' size={size} color={color} />))}}/>
      <Drawer.Screen name="Application List" component={ApplicationList} options={{drawerLabel:"Application List", title:"Application List", 
        drawerIcon:(({color, size})=>(<AntDesign name='paperclip' size={size} color={color} />))}}/>
      <Drawer.Screen name="Application Request" component={ApplicationRequest} options={{drawerLabel:"Application Request", title:"Application Request", 
        drawerIcon:(({color, size})=>(<AntDesign name='bells' size={size} color={color} />))}}/>
      <Drawer.Screen name="Compliance Request" component={ComplianceRequest} options={{drawerLabel:"Compliance Request", title:"Compliance Request", 
        drawerIcon:(({color, size})=>(<AntDesign name='checkcircle' size={size} color={color} />))}}/>
      <Drawer.Screen name="University List" component={UniversityList} options={{drawerLabel:"University List", title:"University List", 
        drawerIcon:(({color, size})=>(<FontAwesome name='university' size={size} color={color} />))}}/>
      <Drawer.Screen name="Course List" component={CourseList} options={{drawerLabel:"Course List", title:"Course List", 
        drawerIcon:(({color, size})=>(<MaterialCommunityIcons name='bag-personal' size={size} color={color} />))}}/>
      <Drawer.Screen name="Course Request List" component={CourseRequestList} options={{drawerLabel:"Course Request List", title:"Course Request List", 
        drawerIcon:(({color, size})=>(<MaterialCommunityIcons name='bag-personal' size={size} color={color} />))}}/>
      <Drawer.Screen name="Course Request " component={CourseRequest} options={{drawerLabel:"Course Request", title:"Course Request", 
        drawerIcon:(({color, size})=>(<MaterialCommunityIcons name='bag-personal' size={size} color={color} />))}}/>
    </Drawer.Navigator>
  )
}

export default Dashboard

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