import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import StudentCourseDetails from './ApplicationScreens/StudentCourseDetails';
import UniversityDetails from './ApplicationScreens/UniversityDetails';
import UploadDownload from './ApplicationScreens/UploadDownload';
import Status from './ApplicationScreens/Status';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const Application = () => {

    const [token, setToken] = useState('');
    const [activeTab, setActiveTabs] = useState('student');
    const [ApplicationData, setApplicationData] = useState([])
    const [Reload, setReload] = useState(false)

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
    const Route = useRoute()

    const {ApplicationId} = Route.params || {}

    console.log(ApplicationId);
    

    const fetchApplications = useCallback(async () => {
        try {
          const response = await axios.get(`https://dev.shabujglobal.org/api/application/${ApplicationId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
    
          const newApplications = response?.data?.data || [];
          setApplicationData(newApplications);
          
        } catch (error) {
          console.error('Error fetching applications:', error);
        } 
      }, [token, ApplicationId, Reload]);

       useEffect(() => {
          if (token) {
            fetchApplications();
            setActiveTabs("student")
          }
        }, [token, ApplicationId]);
        

        const TABS = [
            { key: 'student', label: 'Student/Course Details' },
            { key: 'university', label: 'University Details' },
            { key: 'Upload/Download', label: 'Upload/Download' },
            { key: 'Status', label: 'Status' },
          ];

          const renderContent = () => {
            switch (activeTab) {
              case 'student':
                return <StudentCourseDetails data={ApplicationData} />;
              case 'university':
                return <UniversityDetails data={ApplicationData} />;
              case 'Upload/Download':
                return <UploadDownload data={ApplicationData} reload={Reload} setReload={setReload}/>;
              case 'Status':
                return <Status applicationId={ApplicationId}/>;
              default:
                return <Text>No content</Text>;
            }
          };
    
          // <ShimmerPlaceholder 
          // width={220}
          // height={100}
          // shimmerColors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
          // style={{borderRadius: 10}}/>
  return (
    <View>
    <Text style={{paddingTop:20, paddingLeft:10, fontFamily:"Montserrat_700Bold", fontSize:20}}>Application Details</Text>
  <ScrollView horizontal style={{ padding: 10, margin: 5 }}>
    {TABS.map(tab => (
      <TouchableOpacity
        key={tab.key}
        style={{ paddingRight: 10 }}
        onPress={() => setActiveTabs(tab.key)}
      >
        <Text
          style={{
            fontFamily: 'Montserrat_700Bold',
            fontSize: 15,
            color: activeTab === tab.key ? '#007AFF' : '#ccc',
            borderColor: '#007AFF',
            borderBottomWidth: activeTab === tab.key ? 2 : 0,
            padding: 5,
          }}
        >
          {tab.label}
        </Text>
        <View style={{ width: 20 }} />
      </TouchableOpacity>
    ))}
  </ScrollView>


      <ScrollView>
        {renderContent()}
      </ScrollView>
    </View>
  )
}

export default Application