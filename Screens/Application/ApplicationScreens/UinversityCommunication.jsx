import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { List } from 'react-native-paper'
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Feather from 'react-native-vector-icons/Feather'; 

const UinversityCommunication = ({applicationId}) => {

  const [UinversityCommunication, setUniversityCommunications] = useState([])
  const [Loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
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

  const featchingCommnications = async ()=>{
    try {
      const responce = await axios.get(`https://dev.shabujglobal.org/api/application/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    setUniversityCommunications(responce.data.data.university_communications)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    featchingCommnications()
  },[])

  const SeatingNewCommunication = async()=>{
   if (subject !== "", message !== "") {
     const responce = await axios.post(`https://dev.shabujglobal.org/api/application/${applicationId}/university-communication`, {subject: subject, message: message}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (responce) {
        console.log(responce);
        featchingCommnications()
      }
   }
   else{
    Alert.alert("Please fill both subject and message boxs")
   }
  }

  console.log(UinversityCommunication); 
  
  return (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
            <List.Section
            theme={{ colors:{background:"#EEEEFF"}}}
            style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}>
    
          <List.Accordion
              style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
              title={
                <View style={{backgroundColor:"#EEEEFF"}}>
                  <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>University Communication</Text>
                </View>
              }
              >
              <View style={{padding:10, backgroundColor:"#E8E8F1"}}>
                <FlatList
                style={{padding:10}}
                data={UinversityCommunication}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item})=>(
                    <View style={{flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between", gap:5}}>
                        <TouchableOpacity style={{width:"15%", borderRadius:"100%", borderWidth:1, borderColor:"black", alignItems:"center", padding:5, height:40, width:40}}>
                                  <Feather name="users" size={20} color='#000' />
                        </TouchableOpacity>
                        <View style={{width:"85%"}}>
                        <View style={{flexDirection:"row", gap:5, alignItems:"center"}}>
                            <Text style={{fontSize:16, fontFamily:"Montserrat_700Bold"}}>{item.user?.full_name}</Text>
                            <Text style={{color:"#8083A3", fontSize:12, fontFamily:"Montserrat_400Regular"}}>{item.created_at}</Text>
                        </View>
                        <Text style={{fontSize:16, fontFamily:"Montserrat_400Regular"}}>{item.subject.replace(/<[^>]*>/g, '')}</Text>
                        <Text style={{fontSize:16, fontFamily:"Montserrat_400Regular"}}>{item.message.replace(/<[^>]*>/g, '')}</Text>
                    </View>
                    </View>
                )}
                />
                <TextInput onChangeText={(text)=> setSubject(text)} placeholder='Subject' style={{borderWidth:2, borderColor:"#D8D8D8", padding:10, borderRadius:10, marginBottom:10}}/>
                <TextInput onChangeText={(text)=> setMessage(text)} placeholder='Add a new message' style={{borderWidth:2, borderColor:"#D8D8D8", padding:10, borderRadius:10, height: 120, textAlignVertical: 'top', marginBottom:10}} multiline={true} numberOfLines={6}/>
                <TouchableOpacity onPress={SeatingNewCommunication} style={{borderWidth:2, borderColor:"#D8D8D8", padding:15, borderRadius:40, width:"40%", alignItems:"center", marginLeft:"auto"}}>
                  <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold", fontSize:16}}>Submit</Text>
                </TouchableOpacity>
              </View>
        </List.Accordion>
        </List.Section>
        </View>
  )
}

export default UinversityCommunication