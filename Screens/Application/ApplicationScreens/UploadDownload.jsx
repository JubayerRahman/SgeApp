import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image, Modal, TouchableOpacity } from 'react-native';
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

const UploadDownload = ({data}) => {
  const documents = data?.student?.document;
  const bottomSheetModalRef = useRef(null);
  const [filePath, setFilePath] = useState("")
  const { height } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);


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
          <AntDesign name="edit" style={{backgroundColor:"#7367f0", padding: 10, borderWidth:1, borderColor:"#7367f0", borderRadius:100 }} color={"white"} size={20} onPress={()=>setModalVisible(true)} />
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, height, padding:10 }}>{/* This makes the whole screen available */}
     <FlatList
     style={{marginBottom:70}}
        data={documents}
        renderItem={RenderItems}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <View style={{backgroundColor:"white", marginTop:"90%", margin:20, padding:20, alignItems:"center", justifyContent:"center", borderWidth:1, borderColor:"white", borderRadius:10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
          <View >
            <Entypo style={{marginLeft:"87%", backgroundColor:"white", borderWidth:1, borderColor:"white", alignItems:"center", justifyContent:"center", borderRadius:100,width:40, height:40, marginTop:"-15%"}} onPress={()=>setModalVisible(false)} name="circle-with-cross" size={40} color="red"/>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"100%" }}>
              <TextInput style={styles.input} placeholder='New Name'/>
              <TouchableOpacity style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10, width:"30%"}}>
                <Text style={{color:"white", width:"100%", fontFamily: 'Montserrat_400Regular', fontSize:14, textAlign:"center" }}>Rename</Text>
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
