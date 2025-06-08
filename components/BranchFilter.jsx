import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

const BranchFilter = () => {

    const [token, setToken] = useState('');
    const [BranchList, setBranchList] = useState([])
    const [SelectedBranch, setSelectedBranch] = useState('')

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
          const response= await axios.get("https://dev.shabujglobal.org/api/branches",  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setBranchList(response?.data?.data || []) 
        } catch (error) {
        }
    }

     const BranchObject = BranchList?.map(item => ({
    value: item.name,
    label: item.name
    }));

    

  return (
    <View style={{marginBottom:10}}>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom:10}}>Branch:</Text>
      <SelectList
      setSelected={(val)=>setSelectedBranch(val)}
      data={BranchObject}
      placeholder='Filter by Branch'
      save='value'
      />
    </View>
  )
}

export default BranchFilter