import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image, Modal, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native';
import { FlatList, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'expo-document-picker';

const UploadDownload = ({data, setReload}) => {
  const documents = data?.student?.document;
  
  const [documentList, setDocumentList] = useState(documents);
  const bottomSheetModalRef = useRef(null);
  const [filePath, setFilePath] = useState("")
  const [fileName, setFileName] = useState("")
  const [new_name, setnew_name] = useState("")
  const [docID, setDocID] = useState("")
  const { height } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState("")

  useEffect(() => {
    setDocumentList(documents);
  }, [documents]);

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


  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const RenderItems = ({ item }) => (
    <View style={{shadowColor: "#000", padding:15, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25,backgroundColor: "#e9e9e9", shadowRadius: 3.84,
      elevation: 5, marginBottom: 10, padding:10, flexDirection:"row", alignItems:"center", justifyContent:"space-between" }}>
      <Text onPress={handlePresentModalPress} style={{width:"70%", color:"#7367f0", fontFamily:"Montserrat_400Regular"}}>{item?.path?.file_name}</Text>
      <View style={{width:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"  }}>
          <Icon name="eye" style={{backgroundColor:"#7367f0", padding: 10, borderWidth:1, borderColor:"#7367f0", borderRadius:100 }} color={"white"} size={20} onPress={()=>{handlePresentModalPress(), setFilePath(item?.path?.path)}} />
          <AntDesign name="edit" style={{backgroundColor:"#7367f0", padding: 10, borderWidth:1, borderColor:"#7367f0", borderRadius:100 }} color={"white"} size={20} onPress={()=>{setModalVisible(true), 
            setFileName(item?.path?.file_name), setnew_name(item?.path?.file_name), setDocID(item?.id)}} />
      </View>
    </View>
  );

  const ChangeFileName = async () => {
    try {
      setLoading(true)
      const response = await axios.put(
        `https://dev.shabujglobal.org/api/student-document-rename/${docID}`,
        { new_name }, // assuming new_name is a string, like "xyz1.png"
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      setModalVisible(false)
      setReload(true)
      setnew_name("")

      setDocumentList((prevDocs) =>
        prevDocs.map((doc) =>
          doc.id === docID
            ? { ...doc, path: { ...doc.path, file_name: new_name } }
            : doc
        )
      );

      Toast.show({
        type:"success",
        position:"top",
        text1:"File name updated!!",
        visibilityTime:1500
      })
      setLoading(false)
    } catch (error) {
      console.error('Error changing file name:', error.response?.data || error.message);
      setLoading(false)
    }
  };

  const DownloadWholeZip = async()=>{
    Linking.openURL(data?.student?.document_zip_link)
    .then(res=> console.log(res))
  }

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png', 'application/pdf'],
      });
  
      if (result.canceled || !result.assets || !result.assets[0]) {
        console.log('No file selected');
        return;
      }
  
      const fileAsset = result.assets[0];
  
      const formData = new FormData();
  
      formData.append('student_document', {
        uri: fileAsset.uri,
        name: fileAsset.name,
        type: fileAsset.mimeType || 'application/octet-stream',
      });
  
      formData.append('document_name', 'student_document');
      formData.append('filename', fileAsset.name);
  
      const response = await axios.post(
        'https://service.shabujglobal.org/process-document',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Upload successful:', response.data);
      Alert.alert("Document Uploaded successful")
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  
  
  
  
  
  
  

  return (
    <GestureHandlerRootView style={{ flex: 1, height, padding:10 }}>
     <Toast style={{zIndex: 100, position: 'absolute', top: 0, elevation:10}} />
     <TouchableOpacity onPress={uploadFile} style={{alignItems:"center", justifyContent:"center", borderWidth:1, padding:40, borderColor:"#7367f0", borderRadius:20}}>
        <AntDesign name="addfile" size={40} color="#7367f0"/>
     </TouchableOpacity>
     <TouchableOpacity onPress={DownloadWholeZip}>
      <Text style={{color:"white", backgroundColor:"#7367f0", width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:16, padding:10, borderColor:"#7367f0", borderWidth:2, borderRadius:10, width:"40%", marginBottom:20, marginLeft:"60%", textAlign:"center", marginTop:20 }}>Download All</Text>
     </TouchableOpacity>
     <FlatList
     style={{marginBottom:70, zIndex:0}}
        data={documentList}
        renderItem={RenderItems}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <View style={{backgroundColor:"white", marginTop:"70%", margin:20, padding:20, alignItems:"center", justifyContent:"center", borderWidth:1, borderColor:"white", borderRadius:10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
          <View >
            <Entypo style={{marginLeft:"87%", backgroundColor:"white", borderWidth:1, borderColor:"white", alignItems:"center", justifyContent:"center", borderRadius:100,width:40, height:40, marginTop:"-15%"}} onPress={()=>setModalVisible(false)} name="circle-with-cross" size={40} color="red"/>
              <Text style={{fontFamily: 'Montserrat_700Bold', fontSize:14, }}>Edit {fileName.slice(0,25)}{fileName.length>24?"...":""}</Text>
              <Text style={{fontFamily: 'Montserrat_400Regular', fontSize:14, marginTop:15, marginBottom:-10 }}>Document Name</Text>
              {/* <Text>{docID}</Text> */}
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"100%" }}>
              <TextInput style={styles.input} placeholder='New Name' value={new_name} onChangeText={setnew_name}/>
              <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10, width:"30%"}} onPress={ChangeFileName}>
                {loading?
                
                <ActivityIndicator color="white" style={{ marginLeft: "35%", marginRight:"50%" }} />
                :
                <Text style={{color:"white", width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:14, textAlign:"center" }}>Rename</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomSheetModalProvider>
        
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={['70%', '100%']}
        >
          <BottomSheetScrollView  contentContainerStyle={styles.contentContainer}>
          {
  filePath.endsWith('.pdf') ? (
    <WebView
  style={styles.webview}
  // style={{width:300, height:300}}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
  originWhitelist={['*']}
  useWebKit={true} 
  source={{
    html: `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: auto;
            }
            iframe {
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <iframe src="https://docs.google.com/gview?embedded=true&url=${filePath}" width="100%" height="100%"></iframe>
        </body>
      </html>
    `,
  }}
/>


  ) : (
          <WebView
          style={styles.webview}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          originWhitelist={['*']}
          startInLoadingState={true}
          useWebKit={true}
          source={{
            html: `
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
                  <style>
                    body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;}
                    img { width: 100%; height: auto; }
                  </style>
                </head>
                <body>
                  <img src="${filePath}" />
                </body>
              </html>
            `
          }}
/>)}
          </BottomSheetScrollView >
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  input: {
    height: 40,
    width: '68%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  logoText:{
    fontFamily: 'Montserrat_700Bold',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2
  },
});

export default UploadDownload;
