import { View, Text, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DocumentPicker from 'expo-document-picker';

const Status = ({applicationId}) => {

  const [token, setToken] = useState('');
  const [AllStatus, setAllStatus]= useState([])
  const [documentModal, setDocumentModal] = useState(false)
  const [FormModal, setFormMdal] = useState(false)
  const [documentURL, setDocumentURL] = useState("")
  const [formallStatus, setFormAllStatus] = useState([])
  const [file, setFile] = useState("")

  const PickAFile = async()=>{
    const result = await DocumentPicker.getDocumentAsync({type:['image/jpeg', 'image/png', 'application/pdf']})
    if (result) {
      setFile(result)
    }
  }

  useEffect(() => {
    if (file) {
      console.log('Picked file:', file);
    }
  }, [file]);
  

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

  const FeatchingAllStatus = async () => {
    try {
      const response = await axios.get(`https://dev.shabujglobal.org/api/application-statuses/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      setAllStatus(response?.data?.data)
    } 
    catch (error) {
      console.error('Error changing file name:', error.response?.data || error.message);
    }
  };
  const FeatchingFromAllStatus = async () => {
    try {
      const response = await axios.get(`https://dev.shabujglobal.org/api/application-all-statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      setFormAllStatus(response?.data?.data)
    } 
    catch (error) {
      console.log('Error changing file name:', error.response?.data || error.message);
    }
  };

  useEffect(()=>{
    FeatchingAllStatus()
    FeatchingFromAllStatus()
  },[token])

  const statusList = formallStatus?.map(item => ({
  key: item.id.toString(),
  value: item.name
}));
  

  const RenderItem = ({item, index})=>{
    
    return(
      <View style={{borderWidth:1, borderRadius:10, overflow:"hidden", marginBottom:10}}>
        <Text style={{fontFamily:"Montserrat_700Bold", fontSize:18, padding:10}}>{item?.application_status?.name}{`\n`}
          {index === 0 && (<Text style={{color:"red", fontSize: 16}}>(Current Status)</Text>)}
        </Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:10, padding:10, backgroundColor:"#d3d3d3"}}>
          <View style={{flexDirection:"row", gap:5, alignItems:"center", width:"45%",}}>
            <AntDesign style={{color:"#7367f0"}} name="clockcircleo" size={20}/>
            <Text style={{fontFamily:"Montserrat_400Regular", fontSize:12}}>{item?.created_at}</Text>
          </View>
          {item?.comment && (
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center", width: "25%" }}>
              <Ionicons style={{ color: "#7367f0" }} name="chatbubble-ellipses-outline" size={20} />
              <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 12 }}>
                {item.comment}
              </Text>
            </View>
          )}
          {item?.document && (<TouchableOpacity onPress={()=>{ setDocumentModal(!documentModal), setDocumentURL(item?.document)}} style={{flexDirection:"row", gap:5, alignItems:"center", width:"30%"}}>
            <Ionicons style={{color:"#7367f0"}} name="document-attach-outline" size={20}/>
            <Text style={{fontFamily:"Montserrat_400Regular", fontSize:12}}>Document</Text>
          </TouchableOpacity>)}
        </View>
      </View>
    )
  }
  
  
  return (
    <View style={{padding:10}}>
      <TouchableOpacity onPress={()=>setFormMdal(!FormModal)}>
            <Text style={{color:"white", backgroundColor:"#7367f0", width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:16, padding:10, borderColor:"#7367f0", borderWidth:2, borderRadius:10, width:"70%", marginBottom:20, marginLeft:"30%", textAlign:"center" }}>Change Current Status</Text>
           </TouchableOpacity>
        <FlatList
          style={{marginBottom:70}}
          data={AllStatus}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id.toString()}
        />

        <Modal
          animationType='slide'
          transparent={true}
          visible={documentModal}
        >
          <TouchableOpacity  onPress={() => {
        setDocumentModal(!documentModal);
        console.log("Clocking");
      }} style={{backgroundColor:"white", alignItems:"center", justifyContent:"center", width:"80%", marginLeft:"10%", height:"70%", marginTop:"25%", borderColor:"white", borderWidth:1, borderRadius:10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation:5}}>
            <Image source={{uri:documentURL}} style={{ width: 100, height: 100 }}/>
          </TouchableOpacity>
            
        </Modal>

        <Modal
          animationType='slide'
          transparent={true}
          visible={FormModal}
        >
          <View  
      style={{backgroundColor:"white", alignItems:"center", justifyContent:"center", width:"80%", marginLeft:"10%", height:"70%", marginTop:"25%", borderColor:"white", borderWidth:1, borderRadius:10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation:5}}>
        <SelectList boxStyles={{width:"95%"}} data={statusList} save='value' placeholder='Slesct Status'/>
            <Text onPress={PickAFile}>Selesct a flie</Text>
            <Text>{file?.assets[0]?.name}</Text>
          <Text 
        onPress={() => {
      setFormMdal(!FormModal);
      console.log("Clocking");
    }} 
    >Close</Text>
          </View>
        </Modal>
    </View>
  )
}


export default Status