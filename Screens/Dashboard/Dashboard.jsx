import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';
import DashboardHome from './DashboardHome/DashboardHome'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewApplication from '../NewApplication/NewApplication'
import ApplicationList from '../ApplicationList'
import ApplicationRequest from '../ApplicationRequest/ApplicationRequest'
import ComplianceRequest from '../ComplianceRequest';
import UniversityList from '../UniversityList/UniversityList';
import CourseList from '../CourseList/CourseList';
import CourseRequestList from '../CourseRequestList/CourseRequestList';
import CourseRequest from '../CourseRequest/CourseRequest';
import AddRecord from '../AddRecord/AddRecord';
import AllRecord from '../AllRecord/AllRecord';
import Intake from '../Intake/Intake';
import Event from '../Event/Event';
import AllLeads from '../AllLeads/AllLeads';
import LeadAssignedOperation from '../LeadAssignedOperation/LeadAssignedOperation';
import LeadUnassignedOperation from '../LeadUnassignedOperation/LeadUnassignedOperation';
import AddNew from '../AddNew/AddNew';
import TaskSchedule from '../TaskSchedule/TaskSchedule';
import AllNotices from '../AllNotices/AllNotices';
import AddNotices from './AddNotices/AddNotices';
import User from '../User/User';
import Email from '../Email/Email';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Logout from '../Logout/Logout';
import Application from '../Application/Application';


const Dashboard = () => {
  const Drawer = createDrawerNavigator();
  const [userName, setUserName] = useState()


  

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
  
  console.log(userName);

  function CustomDrawerContent({ navigation }) {
  

    const [isStudentRecordExpanded, setIsStudentRecordExpanded] = useState(false)
    const [dateEntryExpanded, setDataEntryExpanded] = useState(false)
    const [LeadsExpanded, setLeadsExpanded] = useState(false)
    const [tasksExpanded, setTasksExpanded] = useState(false)
    const [noticesExpanded, setNoticesExpanded] = useState(false)
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    


    return (
      <DrawerContentScrollView>
        {/* Dashboard */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Dashboard' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <AntDesign name="home" size={20} color={currentRoute === 'Dashboard' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Dashboard" && styles.activeMenuItemText]}>Dashboard</Text>
        </TouchableOpacity>
  
        {/* New Application */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'New Application' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('New Application')}
        >
          <AntDesign name="filetext1" size={20} color={currentRoute === 'New Application' ? '#FFFFFF' : '#000'}/>
          <Text style={[styles.menuText, currentRoute === "New Application" && styles.activeMenuItemText]}>New Application</Text>
        </TouchableOpacity>
  
        {/* Application List */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Application List' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Application List')}
        >
          <AntDesign name="paperclip" size={20} color={currentRoute === 'Application List' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Application List" && styles.activeMenuItemText]}>Application List</Text>
        </TouchableOpacity>
  
        {/* Application Request */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Application Request' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Application Request')}
        >
          <AntDesign name="bells" size={20} color={currentRoute === 'Application Request' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Application Request" && styles.activeMenuItemText]}>Application Request</Text>
        </TouchableOpacity>
  
        {/* Compliance Request */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Compliance Request' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Compliance Request')}
        >
          <AntDesign name="checkcircle" size={20} color={currentRoute === 'Compliance Request' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Compliance Request" && styles.activeMenuItemText]}>Compliance Request</Text>
        </TouchableOpacity>
  
        {/* University List */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'University List' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('University List')}
        >
          <AntDesign name="book" size={20} color={currentRoute === 'University List' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "University List" && styles.activeMenuItemText]}>University List</Text>
        </TouchableOpacity>
  
        {/* Course  List */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Course List' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Course List')}
        >
          <MaterialCommunityIcons name="bag-personal" size={20} color={currentRoute === 'Course List' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Course List" && styles.activeMenuItemText]}>Course List</Text>
        </TouchableOpacity>

        {/* Course  List */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Course Request List' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Course Request List')}
        >
          <MaterialCommunityIcons name="bag-personal" size={20} color={currentRoute === 'Course Request List' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Course Request List" && styles.activeMenuItemText]}>Course Request List</Text>
        </TouchableOpacity>

        {/* Student Recoards */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setIsStudentRecordExpanded(!isStudentRecordExpanded)}
        >
          <MaterialCommunityIcons name="account-box" size={20} color="#000" />
          <Text style={styles.menuText}>Student Record</Text>
          <AntDesign
            name={isStudentRecordExpanded ? 'up' : 'down'}
            size={18}
            color="#000"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {isStudentRecordExpanded && (
  <View>
    <TouchableOpacity
      style={[
        styles.menuItem,
        currentRoute === 'Add Record' && styles.activeMenuItem,
      ]}
      onPress={() => navigation.navigate('Add Record')}
    >
       <MaterialCommunityIcons name="account-group" size={20} color={currentRoute === 'Add Record' ? 'white' : '#000'} />
      <Text style={[styles.menuText, currentRoute === "Add Record" && styles.activeMenuItemText]}>Add Record</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.menuItem,
        currentRoute === 'All Record' && styles.activeMenuItem,
      ]}
      onPress={() => navigation.navigate('All Record')}
    >
       <MaterialCommunityIcons name="account-group" size={20} color={currentRoute === 'All Record' ? 'white' : '#000'} />
      <Text style={[styles.menuText, currentRoute === "All Record" && styles.activeMenuItemText]}>All Record</Text>
    </TouchableOpacity>
  </View>
)}
{/* Data Entry */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setDataEntryExpanded(!dateEntryExpanded)}
        >
          <Entypo name="keyboard" size={20} color="#000" />
          <Text style={styles.menuText}>Data Entry</Text>
          <AntDesign
            name={dateEntryExpanded ? 'up' : 'down'}
            size={18}
            color="#000"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {dateEntryExpanded && (
  <View>
    <TouchableOpacity
      style={[
        styles.menuItem,
        currentRoute === 'All Record' && styles.activeMenuItem,
      ]}
      onPress={() => navigation.navigate('All Record')}
    >
       <MaterialCommunityIcons name="account-group" size={20} color={currentRoute === 'All Record' ? 'white' : '#000'} />
      <Text style={[styles.menuText, currentRoute === "All Record" && styles.activeMenuItemText]}>All Record</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'University List' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('University List')}
        >
          <AntDesign name="book" size={20} color={currentRoute === 'University List' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "University List" && styles.activeMenuItemText]}>University List</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Intake' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Intake')}
        >
          <AntDesign name="book" size={20} color={currentRoute === 'Intake' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Intake" && styles.activeMenuItemText]}>Intake</Text>
    </TouchableOpacity>
  </View>
)}
{/* Leads */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setLeadsExpanded(!LeadsExpanded)}
        >
          <Entypo name="database" size={20} color="#000" />
          <Text style={styles.menuText}>Leads</Text>
          <AntDesign
            name={LeadsExpanded ? 'up' : 'down'}
            size={18}
            color="#000"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {LeadsExpanded && (
  <View>
    <TouchableOpacity
      style={[
        styles.menuItem,
        currentRoute === 'Event' && styles.activeMenuItem,
      ]}
      onPress={() => navigation.navigate('Event')}
    >
       <MaterialCommunityIcons name="camera" size={20} color={currentRoute === 'Event' ? 'white' : '#000'} />
      <Text style={[styles.menuText, currentRoute === "Event" && styles.activeMenuItemText]}>Event</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'All Leads' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('All Leads')}
        >
          <AntDesign name="book" size={20} color={currentRoute === 'All Leads' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "All Leads" && styles.activeMenuItemText]}>All Leads</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Lead Assigned Operation' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Lead Assigned Operation')}
        >
          <Foundation name="clipboard-pencil" size={20} color={currentRoute === 'Lead Assigned Operation' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Lead Assigned Operation" && styles.activeMenuItemText]}>Lead Assigned Operation</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Lead Unassigned Operation' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Lead Unassigned Operation')}
        >
          <Foundation name="clipboard-pencil" size={20} color={currentRoute === 'Lead Unassigned Operation' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Lead Unassigned Operation" && styles.activeMenuItemText]}>Lead Unassigned Operation</Text>
    </TouchableOpacity>
  </View>
)}
{/* Daily Task */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setTasksExpanded(!tasksExpanded)}
        >
          <FontAwesome name="tasks" size={20} color="#000" />
          <Text style={styles.menuText}>Daily Task</Text>
          <AntDesign
            name={tasksExpanded ? 'up' : 'down'}
            size={18}
            color="#000"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {tasksExpanded && (
  <View>
    <TouchableOpacity
      style={[
        styles.menuItem,
        currentRoute === 'Add New' && styles.activeMenuItem,
      ]}
      onPress={() => navigation.navigate('Add New')}
    >
       <MaterialCommunityIcons name="plus" size={20} color={currentRoute === 'Add New' ? 'white' : '#000'} />
      <Text style={[styles.menuText, currentRoute === "Add New" && styles.activeMenuItemText]}>Add New</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Task Schedule' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Task Schedule')}
        >
          <FontAwesome name="tasks" size={20} color={currentRoute === 'Task Schedule' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Task Schedule" && styles.activeMenuItemText]}>Task Schedule</Text>
    </TouchableOpacity>
  </View>
)}
{/* Notices */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setNoticesExpanded(!noticesExpanded)}
        >
          <AntDesign name="notification" size={20} color="#000" />
          <Text style={styles.menuText}>Notices</Text>
          <AntDesign
            name={noticesExpanded ? 'up' : 'down'}
            size={18}
            color="#000"
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        {noticesExpanded && (
  <View>
    <TouchableOpacity
      style={[
        styles.menuItem,
        currentRoute === 'All Notices' && styles.activeMenuItem,
      ]}
      onPress={() => navigation.navigate('All Notices')}
    >
       <AntDesign name="notification" size={20} color={currentRoute === 'All Notices' ? 'white' : '#000'} />
      <Text style={[styles.menuText, currentRoute === "All Notices" && styles.activeMenuItemText]}>All Notices</Text>
    </TouchableOpacity>
    <TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Add Notices' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Add Notices')}
        >
          <FontAwesome name="plus" size={20} color={currentRoute === 'Add Notices' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Add Notices" && styles.activeMenuItemText]}>Add Notices</Text>
    </TouchableOpacity>
  </View>
)}
{/* Users */}
<TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'User' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('User')}
        >
          <Feather name="users" size={20} color={currentRoute === 'User' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "User" && styles.activeMenuItemText]}>User</Text>
</TouchableOpacity>
{/* Email */}
<TouchableOpacity
          style={[
            styles.menuItem,
            currentRoute === 'Email' && styles.activeMenuItem,
          ]}
          onPress={() => navigation.navigate('Email')}
        >
          <Entypo name="email" size={20} color={currentRoute === 'Email' ? '#FFFFFF' : '#000'} />
          <Text style={[styles.menuText, currentRoute === "Email" && styles.activeMenuItemText]}>Email</Text>
</TouchableOpacity>

      </DrawerContentScrollView>
    );
  }

  // const navigation = useNavigation();

  return (
    <Drawer.Navigator 
  drawerContent={(props) => <CustomDrawerContent {...props} />} 
  initialRouteName='Dashboard' 
  screenOptions={({ navigation }) => ({ // use screenOptions as a function
    headerRight: () => (
      <TouchableOpacity 
         
        style={{ marginRight: 20, flexDirection: "row", justifyContent: "center", gap: 5, alignItems:"center" }}
      >
        <AntDesign name="bells" size={24} color="#000" />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{backgroundColor:"#E8E8F1CC", padding:10, borderWidth:1, borderRadius:100, borderColor:"#E8E8F1CC"}}>
          <AntDesign name="user" size={24} color="#000" />
        </TouchableOpacity>
        {/* <Text onPress={() => navigation.navigate('Profile')} style={{ fontFamily: "Montserrat_400Regular" }}>{userName}</Text> */}
      </TouchableOpacity>
    )
  })}
>
      <Drawer.Screen name="Dashboard" component={DashboardHome}/>
      <Drawer.Screen name="New Application" component={NewApplication}/>
      <Drawer.Screen name="Application List" component={ApplicationList}/>
      <Drawer.Screen name="Application" component={Application}/>
      <Drawer.Screen name="Application Request" component={ApplicationRequest}/>
      <Drawer.Screen name="Compliance Request" component={ComplianceRequest}/>
      <Drawer.Screen name="University List" component={UniversityList}/>
      <Drawer.Screen name="Course List" component={CourseList}/>
      <Drawer.Screen name="Course Request List" component={CourseRequestList}/>
      <Drawer.Screen name="Course Request " component={CourseRequest}/>
      <Drawer.Screen name="Add Record" component={AddRecord}/>
      <Drawer.Screen name="All Record" component={AllRecord}/>
      <Drawer.Screen name="Intake" component={Intake}/>
      <Drawer.Screen name="Event" component={Event}/>
      <Drawer.Screen name="All Leads" component={AllLeads}/>
      <Drawer.Screen name="Lead Assigned Operation" component={LeadAssignedOperation}/>
      <Drawer.Screen name="Lead Unassigned Operation" component={LeadUnassignedOperation}/>
      <Drawer.Screen name="Add New" component={AddNew}/>
      <Drawer.Screen name="Task Schedule" component={TaskSchedule}/>
      <Drawer.Screen name="All Notices" component={AllNotices}/>
      <Drawer.Screen name="Add Notices" component={AddNotices}/>
      <Drawer.Screen name="User" component={User}/>
      <Drawer.Screen name="Email" component={Email}/>
      <Drawer.Screen name="Profile" component={Logout}/>
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
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10
      },
      menuText: {
        fontFamily: 'Montserrat_400Regular',
        marginLeft: 10,
        fontSize: 18,
        color: '#000',
      },
      activeMenuItem: {
        backgroundColor: 'rgba(115,103,240, 0.7)',
        borderRadius: 20
      },
      activeMenuItemText: {
        fontFamily: 'Montserrat_400Regular',
        marginLeft: 10,
        fontSize: 18,
        color: 'white',
      },
      activeMenuText: {
        color: '#7367f0',
        fontWeight: 'bold',
      },
})