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
import { IconButton, List, Searchbar } from 'react-native-paper';
import StatusFilter from '../components/StatusFilter';
import DateFilter from '../components/DateFilter';

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
      const response = await axios.get(`https://dev.shabujglobal.org/api/application?id&page=${page}&perPage=10&searchQuery=${searchValue}&sortBy&orderBy&status&university&channelPartner&applicationOfficer&studentEmail&dateFrom&dateTo&currentTab=all&selectedUser&selectedIntake&selectedBranch&selectedApplicationControlOfficer&selectedAgeing&studentId`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      
      
      const newApplications = response?.data?.data || [];
      
      if (newApplications.length === 0) {
        setHasMore(false); // No more data to fetch 🛑
      } else {
        if (searchValue) {
          setApplications(newApplications)
          console.log("search");
          
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
  }, [token, page, loading, hasMore, searchValue]);
  
  useEffect(() => {
  if (token) {
    setApplications([]);
    setPage(1);
    setHasMore(true);
  }
}, [searchValue, token]);

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

  console.log(refreshing);
  
  
  const renderItem = ({ item }) => (
    (item?
      
    (<View style={styles.row}>
    {/* <Text style={[styles.cell, { width: 80, flexDirection:"row", textAlign:"center" }]}> */}
      <View style={{flexDirection:"column", width:80, gap:40}}>
      <TouchableOpacity onPress={()=>{ console.log(item.application_id);
       navigation.navigate("Application",{application_id: item.application_id})}}>
        <Text><AntDesign name="eyeo" size={24} color="#7367f0" /></Text>  </TouchableOpacity>
      <TouchableOpacity>
        <Text>
        <AntDesign name="delete" size={24} color="#000" />
        </Text>
      </TouchableOpacity>
      </View>
    <Text style={[styles.cell, { width: 150 }]}>{item.application_id} <AntDesign name="bells" size={24} color="#000" /></Text>
    <Text style={[styles.cell, { width: 150 }]}>{item.ageing}</Text>
    <Text style={[styles.cell, { width: 150 }]}>{item.status_text}</Text>
    <Text style={[styles.cell, { width: 150 }]}>
      {item.student.first_name} {item.student.last_name} {'\n'} {item.student.email}
    </Text>
    <Text style={[styles.cell, { width: 150 }]}>
      {item.university.name}
      {'\n'}
      {item.course.name}
      {'\n'}
      {item.intake.name}
    </Text>
    <Text style={[styles.cell, { width: 150 }]}>
      {item.application_officer?.name_with_email}
    </Text>
    <Text style={[styles.cell, { width: 150 }]}>
      {item.user?.parent?.email}
    </Text>
    <Text style={[styles.cell, { width: 150 }]}>
      {item.user?.company_name}
      {'\n'}
      {item.user?.email}
    </Text>
    <Text style={[styles.cell, { width: 150 }]}>
      {item.created_at}
    </Text>
  </View>)
      :
      (
      <View>
        <Text>No Data Available</Text>
      </View>
    )
    )
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#7367f0" />;
  };

  return (
    <ScrollView >
      <View style={styles.container}>

      <View style={{marginBottom:0, width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-start"}}>
        <Searchbar placeholder='Search' style={{marginBottom:20, width:"80%", height:50, backgroundColor:"#a5a5ff", color:"white"}} inputStyle={{ color: 'white' }} placeholderTextColor="white" value={searchValue} onChangeText={setSearchvalue} />
        <IconButton icon="filter" size={35} onPress={()=> setExpend(!expend)} iconColor="#a5a5ff" />
      </View>
        <List.Section style={{backgroundColor: 'transparent', width:"100%", padding:2, marginTop:0, width:"100%"}}>
          <List.Accordion
          expanded={expend}
            style={{ backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent', padding: 0, margin: 0, height: 'auto', width:"100%"}}
            right={props=> null}
            theme={{ colors: { background: 'transparent' } }}
          >
            <View style={{width:"100%",justifyContent:"space-evenly", alignItems:"center"}}>
            <StatusFilter/>
            {/* <DateFilter/> */}
          </View>
          </List.Accordion>
        </List.Section>
        <ScrollView horizontal={true} style={{ width: '100%' }} contentContainerStyle={{ minWidth: 1000 }}>
        <View style={{ flexDirection: 'column' }}>
        <View style={styles.header}>
          {/* Header cells (unchanged) */}
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Actions</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Application ID</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Ageing(Days)</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Status</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Student Details</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>University/Course Details</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Application Officer</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Application Control Officer</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Channel Partner/Created By</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Date Added</Text>
        </View>

        {applications?.length === 0?
        (
          <LoagingScreen/>
        )
        :
        (
        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.application_id?.toString() + index}
          ListFooterComponent={renderFooter}
          onEndReached={fetchApplications}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
        />)}
      </View>
      </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, overflow: 'scroll', flexGrow: 0, height:{height} },
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
