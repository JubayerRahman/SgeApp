import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { MultipleSelectList } from 'react-native-dropdown-select-list'

const StatusFilter = ({setselectedStatus}) => {
    const [token, setToken] = useState("")
    const [allStatus, setAllStatus] = useState([])
    const [selectedStatus, setSelectedStatus] = useState([])

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
         const FeatchingFromAllStatus = async () => {
    try {
      const response = await axios.get(`https://dev.shabujglobal.org/api/application-all-statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      setAllStatus(response?.data?.data)
    } 
    catch (error) {
      console.log('Error changing file name:', error.response?.data || error.message);
    }
  };
        
        FeatchingFromAllStatus()
    },[token])

    const multiSelectOptions = allStatus?.map(item => ({
  value: item.name,
  key: item.id
}));
    
  return (
    <View style={{width:"100%"}}>
        <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold'}}>Status:</Text>
      <View>
        <MultipleSelectList
          setSelected={(val)=>setselectedStatus(val)}
          data={multiSelectOptions}
          // save='value'
          placeholder='Select status'
        />
      </View>
    </View>
  )
}

export default StatusFilter