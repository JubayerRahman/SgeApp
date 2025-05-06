import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const ApplicationList = () => {
  const [token, setToken] = useState('');
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1); // ⭐ New
  const [loading, setLoading] = useState(false); // ⭐ New
  const [hasMore, setHasMore] = useState(true); // ⭐ New

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

  const fetchApplications = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent multiple calls 🔥
    setLoading(true);
    try {
      const response = await axios.get(`https://dev.shabujglobal.org/api/application?id&page=${page}&perPage=10&searchQuery&sortBy&orderBy&status&university&channelPartner&applicationOfficer&studentEmail&dateFrom&dateTo&currentTab=all&selectedUser&selectedIntake&selectedBranch&selectedApplicationControlOfficer&selectedAgeing&studentId`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const newApplications = response?.data?.data || [];

      if (newApplications.length === 0) {
        setHasMore(false); // No more data to fetch 🛑
      } else {
        setApplications(prevApps => [...prevApps, ...newApplications]); // Add to existing list 💖
        setPage(prevPage => prevPage + 1); // Next page ready 🚀
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [token, page, loading, hasMore]);

  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token, fetchApplications]);

  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { width: 80, flexDirection:"row", textAlign:"center" }]}>
        <TouchableOpacity onPress={()=>{ console.log(item.application_id);
         navigation.navigate("Application",{ApplicationId: item.application_id})}}><AntDesign name="eyeo" size={24} color="#000" />  </TouchableOpacity>
        {'\n'}
        {'\n'}
        <TouchableOpacity><AntDesign name="delete" size={24} color="#000" /></TouchableOpacity></Text>
      <Text style={[styles.cell, { width: 150 }]}>{item.application_id} <AntDesign name="bells" size={24} color="#000" /></Text>
      <Text style={[styles.cell, { width: 150 }]}>{item.ageing}</Text>
      <Text style={[styles.cell, { width: 150 }]}>{item.status_text}</Text>
      <Text style={[styles.cell, { width: 150 }]}>
        {item.student.first_name} {item.student.last_name} {'\n'} {item.student.email}
      </Text>
      <Text style={[styles.cell, { width: 150 }]}>
        {item.university.name}
        {'\n'}
        {item.course.name}
        {'\n'}
        {item.intake.name}
      </Text>
      <Text style={[styles.cell, { width: 150 }]}>
        {item.application_officer?.name_with_email}
      </Text>
      <Text style={[styles.cell, { width: 150 }]}>
        {item.user?.parent?.email}
      </Text>
      <Text style={[styles.cell, { width: 150 }]}>
        {item.user?.company_name}
        {'\n'}
        {item.user?.email}
      </Text>
      <Text style={[styles.cell, { width: 150 }]}>
        {item.created_at}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#7367f0" />;
  };

  return (
    <ScrollView horizontal={true} style={{ flexGrow: 0 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Header cells (unchanged) */}
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Actions</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Application ID</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Ageing(Days)</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Status</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Student Details</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>University/Course Details</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Application Officer</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Application Control Officer</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Channel Partner/Created By</Text>
          <Text style={[styles.headerCell, { width: 150 }]}>Date Added</Text>
        </View>

        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.application_id?.toString() + index}
          ListFooterComponent={renderFooter}
          onEndReached={fetchApplications}
          onEndReachedThreshold={0.5}
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
    justifyContent: "center",
    alignItems: "center"
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    textAlign: 'justify',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: 'black',
    textAlign: 'left',
    overflow: 'hidden'
  },
});

export default ApplicationList;
