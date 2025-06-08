import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

const IntakeFilter = ({setSelectedIntake}) => {

    const [token, setToken] = useState('');
    const [IntakeList, setIntakeList] = useState([])
    // const [SelectedIntake, setSelectedIntake] = useState('')

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
    fatchIntake()
  },[token])

    const fatchIntake = async()=>{
        try {
          const response= await axios.get("https://dev.shabujglobal.org/api/intake?isActive=1",  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setIntakeList(response?.data?.data || []) 
        } catch (error) {
        }
    }

     const IntakeObject = IntakeList?.map(item => ({
    key: item.id,
    value: item.name
    }));
    

    

  return (
    <View style={{marginBottom:10}}>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom:10}}>Intake:</Text>
      <SelectList
      setSelected={(key)=>setSelectedIntake(key)}
      data={IntakeObject}
      placeholder='Filter by Intake'
      />
    </View>
  )
}

export default IntakeFilter