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

const Application = () => {

    const [token, setToken] = useState('');
    const [activeTab, setActiveTabs] = useState('student');
    const [ApplicationData, setApplicationData] = useState([])

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
      }, [token, ApplicationId]);

       useEffect(() => {
          if (token) {
            fetchApplications();
            setActiveTabs("student")
          }
        }, [token, ApplicationId]);
        console.log(ApplicationData);
        

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
                return <UploadDownload data={ApplicationData}/>;
              case 'Status':
                return <Status/>;
              default:
                return <Text>No content</Text>;
            }
          };
    
  return (
    <View>
      <ScrollView horizontal style={{ padding: 10, margin:5 }}>
        {TABS.map(tab=>(
            <TouchableOpacity key={tab.key} style={{paddingRight:10}} onPress={() => setActiveTabs(tab.key)}>
                <Text style={{fontFamily: 'Montserrat_700Bold', fontSize: 15, color: activeTab === tab.key ? '#007AFF' : '#ccc', borderColor: "#007AFF", borderBottomWidth: activeTab === tab.key ? 2 : 0 , padding:5 }}>{tab.label}</Text>
                <View style={{width:20}}></View>
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