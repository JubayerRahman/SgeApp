import { View, Text, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DocumentPicker from 'expo-document-picker';
import LoagingScreen from '../../../components/LoagingScreen';
import { List } from 'react-native-paper';

const Status = ({applicationId}) => {

  const [token, setToken] = useState('');
  const [AllStatus, setAllStatus]= useState([])
  const [documentModal, setDocumentModal] = useState(false)
  const [FormModal, setFormMdal] = useState(false)
  const [documentURL, setDocumentURL] = useState("")
  const [formallStatus, setFormAllStatus] = useState([])
  const [file, setFile] = useState("")
  const [selectedStatus, setSelectedStatus] = useState('');
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)

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
    console.log(token);
    
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
  },[token, applicationId])

  const statusList = formallStatus?.map(item => ({
  key: item.id.toString(),
  value: item.name
}));
  
const statusUpload = async () => {
  const formData = new FormData();

  formData.append('status', selectedStatus);
  formData.append('comment', newComment);

  // 👇 Only append file if it exists
  if (file && file.assets && file.assets[0]) {
    formData.append('file', {
      uri: file.assets[0].uri,
      name: file.assets[0].name,
      type: file.assets[0].mimeType,
    });
  }

  try {
    setLoading(true)
    const response = await axios.post(
      `https://dev.shabujglobal.org/api/application/${applicationId}/status`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setLoading(false)
    setFormMdal(false)
    FeatchingAllStatus()
  } catch (err) {
    setLoading(false)
    console.error('Upload failed:', err);
  }
};

  const RenderItem = ({item, index})=>{
    
    return(
      <View style={{width:"100%", marginLeft:"auto", marginRight:"auto", flexDirection:"row", justifyContent:"space-between", borderColor:"#ffff", borderBottomWidth:1,}}>
        <View style={{flexDirection:"row", borderColor:"#ffff",borderLeftWidth:1, borderRightWidth:1, gap:5, alignItems:"center", width:"24%", padding:3}}>
            <Text style={{fontFamily:"Montserrat_400Regular", fontSize:12}}>{item?.created_at}</Text>
        </View>
        <View style={{flexDirection:"row", borderColor:"#ffff", borderRightWidth:1, gap:5, alignItems:"center", width:"24%", padding:3}}>
        {item?.comment && (
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center", }}>
              <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 12, width:"72%" }}>
                {item.comment}
              </Text>
            </View>
          )}
          </View>
      <View style={{lexDirection:"row", borderColor:"#ffff", borderRightWidth:1, gap:5, alignItems:"center", width:"24%", padding:3, width:"24%",}}>
        <Text style={{fontFamily:"Montserrat_400Regular", fontSize:12, padding:10}}>{item?.application_status?.name}{`\n`}
          {index === 0 && (<Text style={{color:"red", fontSize: 12}}>(Current Status)</Text>)}
        </Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:10, gap:2, width:"24%", borderColor:"#ffff", borderRightWidth:1,}}>
          
          {item?.document && (<TouchableOpacity onPress={()=>{ setDocumentModal(!documentModal), setDocumentURL(item?.document)}} style={{ gap:5, alignItems:"center",}}>
            <Ionicons style={{color:"#7367f0"}} name="document-attach-outline" size={20}/>
            <Text style={{fontFamily:"Montserrat_400Regular", fontSize:9}}>Document</Text>
          </TouchableOpacity>)}
        </View>
      </View>
    )
  }
  
  
  return (
    <View>
      {AllStatus.length===0 ?
      <LoagingScreen/>
      : 
      (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
    <List.Section
          theme={{
              colors:{background:"#EEEEFF"}
            }}
              style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}
          >
        <List.Accordion
                style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
                title={
                  <View style={{backgroundColor:"#EEEEFF"}}>
                    <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>Status</Text>
                  </View>
                }
                >
        <View style={{padding:10, backgroundColor:"#E8E8F1"}}>
          <View style={{flexDirection:"row", justifyContent:"space-between", borderColor:"#ffff", borderBottomWidth:1, borderTopWidth:1, alignItems:"center"}}>
            <Text style={{height:"100%", width:"24%", fontSize:14, fontWeight:"bold", fontFamily:"Montserrat_700Bold", borderRightWidth:1, borderColor:"#ffff", padding:5, textAlign:"center", alignItems:"center", alignContent:"center", borderLeftWidth:1,}}>Date Added</Text>
            <Text style={{height:"100%", width:"24%", fontSize:14, fontWeight:"bold", fontFamily:"Montserrat_700Bold", borderRightWidth:1, borderColor:"#ffff", padding:5, textAlign:"center", alignItems:"center", alignContent:"center"}}>comment</Text>
            <Text style={{height:"100%", width:"24%", fontSize:14, fontWeight:"bold", fontFamily:"Montserrat_700Bold", borderRightWidth:1, borderColor:"#ffff", padding:5, textAlign:"center", alignItems:"center", alignContent:"center"}}>status & Document</Text>
            <Text style={{height:"100%", width:"24%", fontSize:14, fontWeight:"bold", fontFamily:"Montserrat_700Bold", borderRightWidth:1, borderColor:"#ffff", padding:5, textAlign:"center", alignItems:"center", alignContent:"center"}}>Doc</Text>
          </View>
        <FlatList
          style={{marginBottom:20}}
          data={AllStatus}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id.toString()}
        />

        <TouchableOpacity onPress={()=>setFormMdal(!FormModal)}>
            <Text style={{color:"white", backgroundColor:"#7367f0", width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:16, padding:10, borderColor:"#7367f0", borderWidth:2, borderRadius:10, width:"70%", marginBottom:20, marginLeft:"auto", marginRight:"auto", textAlign:"center" }}>Change Current Status</Text>
      </TouchableOpacity>

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
          <View contentContainerStyle={{ flexGrow: 1 }}  
      style={{backgroundColor:"white", alignItems:"center", justifyContent:"center", width:"80%", marginLeft:"10%", height:"70%", marginTop:"25%", borderColor:"white", borderWidth:1, borderRadius:10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation:5, gap: 10}}>
        <SelectList 
        setSelected={(val)=>setSelectedStatus(val)} 
        boxStyles={{width:"95%"}} 
        data={statusList} 
        save='key' 
        placeholder='Slesct Status'/>
            <View style={{width:"90%"}}>
              <Text>Select a file (Optional)</Text>
            <TouchableOpacity>
              <Text onPress={PickAFile}>
                <AntDesign name="addfile" size={25} color="#7367f0"/>
              </Text>
            </TouchableOpacity>
            </View>
            <View style={{width:"90%"}}>
              <Text>Comment (Optional)</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#d3d3d3",
                  textAlignVertical: 'top',
                  padding: 10,
                  borderRadius: 10,
                }}
                value={newComment}
                onChangeText={(val)=>setNewComment(val)}
                placeholder="Comment here"
              />
            </View>
          <View style={{flexDirection:"row", gap:10}}>
          <TouchableOpacity style={{flexDirection:"row",  borderRadius:10, marginTop:10, marginBottom:10, padding:10, width:"30%"}}>
              <Text 
                onPress={() => {
              setFormMdal(!FormModal);
            }}
            style={{width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:14, textAlign:"center" }}
            >
              Close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10, width:"30%"}} onPress={() => {
              statusUpload()
            }}>
              {loading?
                              
              <ActivityIndicator color="white" style={{ marginLeft: "35%", marginRight:"50%" }} />
              :
              <Text 
            style={{color:"white", width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:14, textAlign:"center" }}
            >
              Submit
            </Text>}
          </TouchableOpacity>
          </View>
          </View>
        </Modal>
    </View>
    </List.Accordion>
    </List.Section>
    </View>
      )
      }
    </View>
  )
}


export default Status