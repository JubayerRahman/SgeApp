import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserFilter = ({setSelecteduser}) => {
    
    // https://dev.shabujglobal.org/api/fetch-all-user

    const [userlist, setuserList] = useState([])
    const [token, setToken] = useState('');
    const [selectedList, setSelectedList] = useState('')

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
    fatchUsers()
  },[token])

    const fatchUsers = async()=>{
        try {
          const response= await axios.get("https://dev.shabujglobal.org/api/fetch-all-user",  {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setuserList(response?.data?.data || []) 
        } catch (error) {
        }
    }

     const usersListObject = userlist?.map(item => ({
    value: item.full_name,
    label: item.full_name
    }));
    

  return (
    <View style={{marginBottom:10}}>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom:10}}>User:</Text>
      <SelectList
      setSelected={(val)=>setSelecteduser(val)}
      data={usersListObject}
      placeholder='Select User (Type a name or number)'
      save='value'
      />
    </View>
  )
}

export default UserFilter