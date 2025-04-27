import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const ApplicationList = () => {
  const [token, setToken] = useState('');
  const [applications, setApplications] = useState([]);

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

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://dev.shabujglobal.org/api/application?id&page=1&perPage=10', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setApplications(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    if (token) {
      fetchApplications();
    }
  }, [token]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 0.5 }]} numberOfLines={1} ellipsizeMode="tail">Buttons</Text>
      <Text style={[styles.cell, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">{item.application_id}</Text>
      <Text style={[styles.cell, { flex: 2 }]} numberOfLines={1} ellipsizeMode="tail">{item.ageing}</Text>
      <Text style={[styles.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{item.status}</Text>
      <Text style={[styles.cell, { flex: 4 }]} numberOfLines={2} ellipsizeMode="tail">
        {item.student.first_name} {item.student.last_name} {'\n'} {item.student.email}
      </Text>
      <Text style={[styles.cell, { flex: 5 }]} numberOfLines={2} ellipsizeMode="tail">
        {item.student.university} {/* Adjust according to available data */}
      </Text>
    </View>
  );

  return (
    <ScrollView horizontal={true} style={{ flexGrow: 0 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerCell, { flex: 0.5 }]} numberOfLines={1} ellipsizeMode="tail">Actions</Text>
          <Text style={[styles.headerCell, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">Application ID</Text>
          <Text style={[styles.headerCell, { flex: 2 }]} numberOfLines={1} ellipsizeMode="tail">Ageing(Days)</Text>
          <Text style={[styles.headerCell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">Status</Text>
          <Text style={[styles.headerCell, { flex: 4 }]} numberOfLines={1} ellipsizeMode="tail">Student Details</Text>
          <Text style={[styles.headerCell, { flex: 5 }]} numberOfLines={2} ellipsizeMode="tail">University/Course Details</Text>
        </View>

        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={(item) => item.application_id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, overflow: 'scroll', flexGrow: 0 },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7367f0',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: 'black',
    textAlign: 'center',
    overflow: 'hidden',
  },
});

export default ApplicationList;
