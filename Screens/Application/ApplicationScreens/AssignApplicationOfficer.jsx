import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, List } from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SelectList } from 'react-native-dropdown-select-list'
import { FlatList } from 'react-native-gesture-handler'

const AssignApplicationOfficer = ({applicationId}) => {

    const [officer, setOfficer] = useState([])
    const [selectedOfficer, setSelectedOfficer] = useState("")
    const [AssignedOfficer, setAssignedOfficer] = useState([])
    const [token, setToken] = useState('');

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

    useEffect(()=>{
        featchingOfficer()
        featchAssignedOfficer()
    },[token])

    const featchingOfficer = async()=>{
        try {
            const responce = await axios.get(`https://dev.shabujglobal.org/api/fetch-application-officers`,  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setOfficer(responce.data.data)
        } catch (error) {
            
        }
    }

    const featchAssignedOfficer = async ()=>{
        try {
            const responce = await axios.get(`https://dev.shabujglobal.org/api/applications/${applicationId}/officers`,  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAssignedOfficer(responce.data.data)
        } catch (error) {
            
        }
    }

    const officerList = officer?.map(item =>({
        key: item.id.toString(),
        value: item.full_name
    }))

    const AssiginigOfficer = async()=>{
        if (selectedOfficer !== "") {
            const responce = await axios.post(`https://dev.shabujglobal.org/api/applications/${applicationId}/assign-officer`,
            {user_id: selectedOfficer},  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (responce.data.data) {
          featchAssignedOfficer()
      }
        } else {
           Alert.alert("select an officer first") 
        }
    }
    
    console.log(AssignedOfficer);
    

  return (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
            <List.Section
            theme={{ colors:{background:"#EEEEFF"}}}
            style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}>
    
          <List.Accordion
              style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
              title={
                <View style={{backgroundColor:"#EEEEFF"}}>
                  <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>Assign Application Officer</Text>
                </View>
              }
              >
                <View style={{padding:10, backgroundColor:"#E8E8F1"}}>
                    <Text style={{fontFamily:"Montserrat_700Bold", fontSize:16}}>Select Application Officer</Text>
                    <Text style={{fontFamily:"Montserrat_400Regular"}}>Search and select an officer</Text>
                    <SelectList
                    setSelected={(val)=> setSelectedOfficer(val)}
                    boxStyles={{width:"100%", marginTop:10,}}
                    data={officerList}
                    save='key' 
                    placeholder='Application Officer List'
                    />
                    <TouchableOpacity onPress={()=>AssiginigOfficer()} style={{marginBottom:20, marginTop:20}}>
                        <Text style={{fontFamily:"Montserrat_700Bold", fontSize:14, backgroundColor:"#0052FF", color:"white", padding:10, borderRadius:20, textAlign:"center" }}>Assign Officer</Text>
                        <Divider/>
                    </TouchableOpacity>
                    <FlatList
                    style={{marginBottom:0}}
                    data={AssignedOfficer}
                    ListHeaderComponent={
                          <View style={{ overflow: "hidden" , borderTopLeftRadius: 10,
                            borderTopRightRadius: 10, }}>
                            <View style={{
                            padding: 5,
                            backgroundColor: '#0052FF',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", width: "30%", textAlign: "left" }}>Name</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", width: "30%", textAlign: "left" }}>Email</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", width: "30%", textAlign: "left" }}>Status</Text>
                            </View>

                            <Divider style={{ backgroundColor: '#fff', height: 1 }} />
                        </View>
                    }
                    
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({item})=>(
                        <View style={{ padding: 5, backgroundColor: '#0052FF', flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
                            <Text style={{ fontSize: 10,  fontFamily: 'Montserrat_400Regular', color:"white", width:"30%", textAlign:"left" }}>{item?.user?.full_name}</Text>
                            <Text style={{ fontSize: 10,  fontFamily: 'Montserrat_400Regular', color:"white", width:"30%", textAlign:"left" }}>{item?.user?.email}</Text>
                            <Text style={{ fontSize: 10,  fontFamily: 'Montserrat_400Regular', color:"white", width:"30%", textAlign:"center", backgroundColor:"#17C3B2", borderRadius:20 }}>{item?.status}</Text>
                        </View>
                    )}
                    />
                </View>
            </List.Accordion>
            </List.Section>
    </View>
  )
}

export default AssignApplicationOfficer