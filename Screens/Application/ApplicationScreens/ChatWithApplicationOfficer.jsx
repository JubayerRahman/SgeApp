import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, List } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

const ChatWithApplicationOfficer = ({applicationId}) => {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(false)
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
        const fetchingComments = async()=>{
            try {
            const responce = await axios.get(`https://dev.shabujglobal.org/api/application/${applicationId}/aco-ao-communications
`,  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setComments(responce.data.data);
      
        } catch (error) {
            
        }
        }
        fetchingComments()
    },[token, applicationId, loading])

    const AddingComment = async()=>{
        console.log("I am working");
        console.log(newComment);
        
        
        try {
            if (newComment) {
                const responce = await axios.post(`https://dev.shabujglobal.org/api/application/${applicationId}/aco-ao-communication`,
                    {
        message: newComment,
      }
    ,{ 
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
            })
            setLoading(!loading)
            setNewComment("")
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    

  return (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
        <List.Section
        theme={{ colors:{background:"#EEEEFF"}}}
        style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}>

      <List.Accordion
          style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
          title={
            <View style={{backgroundColor:"#EEEEFF"}}>
              <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>Chat with Application Officer</Text>
            </View>
          }
          >
        <View style={{padding:10, backgroundColor:"#E8E8F1"}}>
            <FlatList
            style={{padding:10}}
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item})=>(
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", gap:5}}>
                    <TouchableOpacity style={{width:"15%", borderRadius:"100%", borderWidth:1, borderColor:"black", alignItems:"center", padding:5, height:40, width:40}}>
                              <Feather name="users" size={20} color='#000' />
                    </TouchableOpacity>
                    <View style={{width:"85%"}}>
                    <View style={{flexDirection:"row", gap:5, alignItems:"center"}}>
                        <Text style={{fontSize:16, fontFamily:"Montserrat_700Bold"}}>{item.user?.full_name}</Text>
                        <Text style={{color:"#8083A3", fontSize:12, fontFamily:"Montserrat_400Regular"}}>{item.created_at}</Text>
                    </View>
                    <Text style={{fontSize:16, fontFamily:"Montserrat_400Regular"}}>{item.message.replace(/<[^>]*>/g, '')}</Text>
                </View>
                </View>
            )}
            />
            <Divider style={{backgroundColor:"white", width:"100%", marginBottom:20}}/>
            <View style={{flexDirection:"row", alignItems:"center",borderColor:"#8083A3", borderWidth:1, borderRadius:20}}>
                <TextInput onChangeText={(text)=>setNewComment(text)} style={{backgroundColor:"white", padding:5, borderTopLeftRadius:20, borderBottomLeftRadius:20, fontSize:16, padding:10, width:"80%"}} placeholder='Enter your Comment'/>
                <Ionicons onPress={AddingComment} style={{backgroundColor:"white", padding:5, borderTopRightRadius:20, borderBottomRightRadius:20, fontSize:16, padding:13, width:"20%", fontSize:16}} name="send" color="#8083A3"/>
            </View>
        </View>
        </List.Accordion>
        </List.Section>
    </View>
  )
}

export default ChatWithApplicationOfficer