import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

const UniversityFilter = ({setSelectedUniversity}) => {

    const [token, setToken] = useState('');
    const [UniversityList, setUniversityList] = useState([])
    // const [SelectedUniversity, setSelectedUniversity] = useState('')

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
          const response= await axios.get("https://dev.shabujglobal.org/api/university",  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setUniversityList(response?.data?.data || []) 
        } catch (error) {
        }
    }

     const UniversityObject = UniversityList?.map(item => ({
    value: item.name,
    key: item.id
    }));

    

  return (
    <View style={{marginBottom:10}}>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom:10}}>University:</Text>
      <SelectList
      setSelected={(val)=>setSelectedUniversity(val)}
      data={UniversityObject}
      placeholder='Filter by University'
      // save='value'
      />
    </View>
  )
}

export default UniversityFilter