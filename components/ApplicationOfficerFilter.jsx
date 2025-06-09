import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

const ApplicationOfficerFilter = ({setselectedApplicationOfficer}) => {

    const [token, setToken] = useState('');
    const [ApplicationOfficerList, setApplicationOfficerList] = useState([])
    const [SelectedBranch, setSelectedOfficer] = useState('')

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
    fatchApplicationOfficer()
  },[token])

    const fatchApplicationOfficer = async()=>{
        try {
          const response= await axios.get("https://dev.shabujglobal.org/api/fetch-all-user?type=application+officer&branch_id&searchQuery",  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setApplicationOfficerList(response?.data?.data || []) 
        } catch (error) {
        }
    }

     const OfficerObject = ApplicationOfficerList?.map(item => ({
    value: item.full_name,
    key: item.id
    }));

    

  return (
    <View style={{marginBottom:10}}>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom:10}}>Application Officer:</Text>
      <SelectList
      setSelected={(val)=>setselectedApplicationOfficer(val)}
      data={OfficerObject}
      placeholder='Select Application Control Officer'
      // save='value'
      />
    </View>
  )
}

export default ApplicationOfficerFilter