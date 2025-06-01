import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
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
    const navigation = useNavigation();

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

    const {application_id} = Route.params || {}

    console.log(application_id);
    

    const fetchApplications = useCallback(async () => {
        try {
          const response = await axios.get(`https://dev.shabujglobal.org/api/application/${application_id}`, {
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
      }, [token, application_id, Reload]);

       useEffect(() => {
          if (token) {
            fetchApplications();
            setActiveTabs("student")
          }
        }, [token, application_id]);

        useLayoutEffect(()=>{
          navigation.setOptions({
            title: ApplicationData?.student?.full_name ,
          });
        },[ApplicationData])
        


    
  return (
    <ScrollView>
      <StudentCourseDetails data={ApplicationData} />
      <UniversityDetails data={ApplicationData} />
      <UploadDownload data={ApplicationData} reload={Reload} setReload={setReload}/>
      <Status applicationId={application_id}/>
    </ScrollView>
  )
}

export default Application