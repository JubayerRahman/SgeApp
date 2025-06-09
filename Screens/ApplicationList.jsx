import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import LoagingScreen from '../components/LoagingScreen';
import { Divider, IconButton, List, Searchbar } from 'react-native-paper';
import StatusFilter from '../components/StatusFilter';
import DateFilter from '../components/DateFilter';
import { Modal } from 'react-native';
import UserFilter from '../components/UserFilter';
import IntakeFilter from '../components/IntakeFilter';
import UniversityFilter from '../components/UniversityFilter';
import ApplicationControllOfficerFilter from '../components/ApplicationControllOfficerFilter';
import ApplicationOfficerFilter from '../components/ApplicationOfficerFilter';
import BranchFilter from '../components/BranchFilter';
import AgeingFilter from '../components/AgeingFilter';


const { height } = Dimensions.get('window');

const ApplicationList = () => {
  const [token, setToken] = useState('');
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setSearchvalue] = useState("")
  const [expend, setExpend] = useState(false)
  const [students, setStudents] = useState()
  const [modalView, setModalview] = useState(false)
  const [selectedUser, setSelecteduser] = useState("")
  const [selectedIntake, setSelectedIntake] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedApplicationControllOfficer, setselectedApplicationControllOfficer] = useState("")
  const [selectedApplicationOfficer, setselectedApplicationOfficer] = useState("")
  const [selectedFromDate, setselectedFromDate] = useState("")
  const [selectedToDate, setselectedToDate] = useState("")
  const [selectedBranch, setselectedBranch] = useState("")
  const [selectedAgeing, setselectedAgeing] = useState("")
  const [selectedStatus, setselectedStatus] = useState([])
  

  


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

  const fetchApplications = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent multiple calls 🔥
    setLoading(true);
    try {
      const response = await axios.get(`https://dev.shabujglobal.org/api/application?id&page=${page}&perPage=999999&searchQuery=${searchValue}&sortBy&orderBy&selectedStatus=${selectedStatus}&university=${selectedUniversity}&channelPartner&applicationOfficer=${selectedApplicationOfficer}&studentEmail&dateFrom=${selectedFromDate}&dateTo=${selectedToDate}&currentTab=all&selectedUser&selectedIntake=${selectedIntake}&selectedBranch=${selectedBranch}&selectedApplicationControlOfficer=${selectedApplicationControllOfficer}&selectedAgeing=${selectedAgeing}&studentId`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      

      
      
      const newApplications = response?.data?.data || [];
      setStudents(response?.data?.total?.student_count)
      
      if (newApplications.length === 0) {
        setHasMore(false);
      } else {
        if (searchValue|| selectedIntake|| selectedUniversity || selectedApplicationControllOfficer || selectedApplicationOfficer || selectedFromDate || selectedToDate || selectedBranch || selectedAgeing || selectedStatus.length>0) {
          setApplications(newApplications)
          console.log(newApplications.length);
          
        }
        else{
          setApplications(prevApps => [...prevApps, ...newApplications]);
        }
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [token, page, loading, hasMore, searchValue, selectedIntake, selectedUniversity,selectedApplicationControllOfficer, selectedApplicationOfficer, selectedFromDate, selectedToDate, selectedBranch, selectedAgeing, selectedStatus]);
  
  useEffect(() => {
  if (token) {
    setApplications([]);
    setPage(1);
    setHasMore(true);
  }
}, [searchValue, token, selectedIntake, selectedUniversity, selectedApplicationControllOfficer, selectedApplicationOfficer, selectedFromDate, selectedToDate, selectedBranch, selectedAgeing, selectedStatus]);

useEffect(() => {
  if (token) {
    fetchApplications();
  }
}, [token, fetchApplications]);

  
  const navigation = useNavigation()
  
  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true)
    await fetchApplications()
    setRefreshing(false);
    setLoading(false)
  };

  

const statusColors = {
  'Application Processing': '#4CAF50',
  'Application Submitted': '#2196F3',
  'Pending Docs': '#FF9800',
  'Offer Issue Conditional': '#9C27B0',
  'Offer Issue Unconditional': '#F44336',
  'Need Payment': '#3F51B5',
  'CAS Issued': '#00BCD4',
  'Additional Doc/info Needed': '#009688',
  'Refund Required': '#FF5722',
  'Application Rejected': '#795548',
  'Case Closed': '#607D8B',
  'Doc Received': '#E91E63',
  'Partial Payment (number input)': '#673AB7',
  'Offer Accepted by Student': '#8BC34A',
  'Visa Application Initiated': '#FFC107',
  'Visa Approved': '#CDDC39',
  'Visa Rejected': '#FFEB3B',
  'Visa Submitted': '#03A9F4',
  'Student Rejected Offer': '#00ACC1',
  'Admission Confirmed': '#43A047',
  'Enrolled': '#E53935',
  'Withdrawn': '#1E88E5',
  'Deposit Paid': '#5E35B1',
  'COE Received': '#D81B60',
  'Passport Submitted': '#00897B',
  'Biometric Done': '#FB8C00',
  'Health Check Done': '#6D4C41',
  'Ticket Booked': '#546E7A',
  'Full Payment': '#7CB342',
  'Awaiting Offer/Decision': '#C0CA33',
  'Application Withdrawn': '#FFB300',
  'Next Intake Recommended': '#039BE5',
  'Enrollment Confirmed': '#D32F2F',
  'Course Deferred': '#7B1FA2',
  'Course': '#0097A7',
};

const handleScroll = ({ nativeEvent }) => {
  const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

  const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

  if (isCloseToBottom && !loading && hasMore) {
    fetchApplications();
  }
};

const ClearAllfinter = ()=>{
  setSearchvalue("")
  setSelecteduser("")
  setSelectedIntake("")
  setSelectedUniversity("")
  setSelectedUniversity("")
  setselectedApplicationControllOfficer("")
  setselectedApplicationOfficer("")
  setselectedFromDate("")
  setselectedToDate("")
  setselectedBranch("")
  setselectedAgeing("")
  setselectedStatus([])
}

console.log(selectedStatus.length>0);





  return (
    <View>
     
       
        <>
         <View style={{
        backgroundColor: '#0052FF',
        padding: 15,
        margin: 10,
        borderRadius: 15,
        borderColor: '#0052FF',
        borderWidth: 1,
        width:"60%",
        marginLeft:"auto",
        marginRight:"auto"
      }}>
        <Text style={{fontFamily: "Montserrat_700Bold",fontSize:25,fontWeight: 'bold',marginBottom: 5,color:"white"}}>Total Students</Text>
        <Text style={{fontFamily: "Montserrat_400Regular", fontSize: 20,color: 'white'}}>
          <AntDesign name="user" size={40} color="white" /> {students}
        </Text>
        </View>
        <View style={{paddingTop:10, paddingBottom:10, flexDirection:"row", paddingLeft:5, paddingRight:5}}>
          <Searchbar onChangeText={(text)=>setSearchvalue(text)} placeholder='Search Application' value={searchValue} style={{backgroundColor:"#ffff", width:"100%",}}/>
          <View style={{position:"absolute", left:"80%", right:"0%", top:"40%", justifyContent:"center", alignItems:"center", flexDirection:"row",  backgroundColor:"white", width:"21%", borderRadius:"100%"}}>
            <TouchableOpacity  onPress={()=>setModalview(!modalView)}>
            <AntDesign name="filter" size={30}/>
          </TouchableOpacity>
          {(searchValue || selectedIntake || selectedUniversity || selectedApplicationControllOfficer || selectedApplicationOfficer || selectedFromDate || selectedToDate || selectedBranch || selectedAgeing || selectedStatus.length>0) && (
            <TouchableOpacity onPress={() => ClearAllfinter()}>
              <AntDesign name="closecircleo" size={30} />
            </TouchableOpacity>
          )}
          </View>
        </View>
        <Modal visible={modalView} transparent={true} animationType='slide'>
          <ScrollView style={{padding:20,marginTop:"17%", backgroundColor:"white", height:"95%", backgroundColor:"#f4f4f4"}}>
            <View style={{paddingTop:10, paddingBottom:10, flexDirection:"row"}}>
          <Searchbar onChangeText={(text)=>setSearchvalue(text)} placeholder='Search Application' style={{backgroundColor:"#ffff", width:"100%", elevation:5}}/>
          <TouchableOpacity style={{position:"absolute", left:"85%", top:"40%"}} onPress={()=>setModalview(!modalView)}>
            <AntDesign name="filter" size={30}/>
          </TouchableOpacity>
        </View>
            <UserFilter setSelecteduser={setSelecteduser}/>
            <StatusFilter setselectedStatus={setselectedStatus}/>
            <IntakeFilter setSelectedIntake={setSelectedIntake}/>
            <UniversityFilter setSelectedUniversity={setSelectedUniversity}/>
            <ApplicationControllOfficerFilter setselectedApplicationControllOfficer={setselectedApplicationControllOfficer}/>
            <ApplicationOfficerFilter setselectedApplicationOfficer={setselectedApplicationOfficer}/>
            <DateFilter setselectedFromDate={setselectedFromDate} setselectedToDate={setselectedToDate}/>
            <BranchFilter setselectedBranch={setselectedBranch}/>
            <AgeingFilter setselectedAgeing={setselectedAgeing}/>
            <TouchableOpacity onPress={()=>setModalview(!modalView)} style={{marginBottom:50}}>
              <Text style={{color:"#FFFFFF", fontFamily:"Montserrat_700Bold", fontSize:18, backgroundColor:"#0052FF", textAlign:"center", padding:20, borderRadius:40}}>Search</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
         {applications.length === 0 ?
      (<LoagingScreen/>)
      :(
          <FlatList
          style={{padding:10, marginBottom:220}}
          data={applications}
          keyExtractor={(item) => item.application_id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <List.Section key={item.application_id} style={{ backgroundColor: 'transparent', borderRadius:20, borderWidth:1, overflow:"hidden", borderColor:"white"}}>
      <List.Accordion
        title={
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"99%", padding:10, margin:10, overflow:"hidden", paddingLeft:"auto", overflow:"hidden"}}>
            <AntDesign name="bells" size={24} color="red" />
            <View style={{width:"40%"}}>
              <Text style={{fontFamily:"Montserrat_400Regular", fontWeight: 'bold' }}>{item.student.first_name} {item.student.last_name} </Text>
            <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 12 }}>{item.application_id}</Text>
            </View>
            <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 12, width:"40%", 
              color:statusColors[item.status_text], backgroundColor:`${statusColors[item.status_text]}33`, padding:10, textAlign:"center", borderRadius:20, borderWidth:1, borderColor:"transparent" }}>{item.status_text}</Text>
          </View>
        }
        style={{ backgroundColor: 'transparent', borderWidth:1, borderRadius:20, borderColor:"white", alignItems:"center", justifyContent:"center", padding:10 }}
        right={() => null}
        contentStyle={{ overflow: "hidden" }}
      >
        <View style={{backgroundColor:"white", padding:10,}}>
          <View class="studentDetails" style={{marginBottom:10}}>
            <Text style={{color:"#8083A3", fontFamily:"'Montserrat_700Bold", fontSize:16, fontWeight:"bold"}}>Student Details:</Text>
            <View>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                  <View style={{width:"45%" }}>
                    <Text style={{fontFamily:"Montserrat_400Regular", fontWeight: 'bold', }}>{item.student.first_name} {item.student.last_name} </Text>
                    <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 12 }}>{item.application_id}</Text>
                    <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 12 }}>{item.student.email}</Text>
                  </View>
                <View style={{width:"45%", gap:10}}>
                    <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 10,  
                    color:statusColors[item.status_text], backgroundColor:`${statusColors[item.status_text]}33`, padding:10, textAlign:"center", borderRadius:20, borderWidth:1, borderColor:"transparent" }}>{item.status_text}</Text>
                    <Text style={{fontFamily:"Montserrat_700Regular", color: 'Black', fontSize:10}}><Text style={{fontFamily:"Montserrat_700Bold"}}>Date added:</Text> {item.created_at}</Text>
                  </View>
              </View>
            </View>
          </View>
          <Divider/>
          <View class="University / Course:" style={{marginBottom:10}}>
            <Text style={{color:"#8083A3", fontFamily:"'Montserrat_700Bold", fontSize:16, fontWeight:"bold"}}>University / Course:</Text>
            <View>
              <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"flex-start"}}>
                  <View>
                    <Text style={{fontFamily:"Montserrat_700Bold", fontWeight: 'bold', }}>{item.university?.name}</Text>
                    <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 12 }}>{item.course?.name}</Text>
                    <Text style={{fontFamily:"Montserrat_400Regular", color: 'gray', fontSize: 12 }}>{item.intake?.name}</Text>
                  </View>
              </View>
            </View>
          </View>
          <Divider/>
          <View class="Application Control Officer:" style={{marginBottom:10}}>
            <Text style={{color:"#8083A3", fontFamily:"'Montserrat_700Bold", fontSize:16, fontWeight:"bold"}}>Application Control Officer:</Text>
            <View>
              <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"flex-start"}}>
                  <View>
                    <Text style={{fontFamily:"Montserrat_700Bold", fontWeight: 'bold', }}>{item.application_control_officer?.email === undefined ?"No application officer assigned yet":(item.application_control_officer?.email)}</Text>
                  </View>
              </View>
            </View>
          </View>
          <Divider/>
          <View class="Channel partner / Created by:" style={{marginBottom:10}}>
            <Text style={{color:"#8083A3", fontFamily:"'Montserrat_700Bold", fontSize:16, fontWeight:"bold"}}>Channel partner / Created by:</Text>
            <View>
              <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"flex-start"}}>
                  <View>
                    <Text style={{fontFamily:"Montserrat_400Regular", }}>{item.user?.company_name}</Text>
                    <Text style={{fontFamily:"Montserrat_400Regular", }}>{item.user?.company_name_with_email}</Text>
                  </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={{alignItems:"center", paddingTop:30, paddingBottom:30}} onPress={()=>{ console.log(item.application_id);
       navigation.navigate("Application",{application_id: item.application_id})}}>
            <Text style={{backgroundColor:"#0052FF", padding:20, borderWidth:1, borderColor:"#0052FF", borderRadius:40,fontFamily:"Montserrat_700Bold", fontSize:16, color:"white"}}>View More Details</Text>
          </TouchableOpacity>
        </View>
      </List.Accordion>
      </List.Section>
        )}
          />
        )
          }
        </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, overflow: 'scroll', flexGrow: 0, height:{height}, marginBottom:5 },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7367f0',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    textAlign: 'justify',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: 'black',
    textAlign: 'left',
    overflow: 'hidden'
  },
});

export default ApplicationList;
