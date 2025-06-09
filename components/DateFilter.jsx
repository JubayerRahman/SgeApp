import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, Button, Platform, Text } from 'react-native';
import React, { useState } from 'react';

const DateFilter = ({setselectedFromDate, setselectedToDate}) => {

  const CurrentDate = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState("Filter by from date")
  const [toDate, setToDate] = useState("Filter by to date")
  const [fromDateView, setFormDateView] = useState("none")
  const [toDateView, setToDateView] = useState("none")
  

  return (
    <View>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold'}}>From Date:</Text>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', borderWidth:1, borderRadius:10, padding:10, marginBottom:10,}} onPress={()=>setFormDateView("flex")}>{fromDate}</Text>
       <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          display:fromDateView
        }}
        current={CurrentDate}
        onDayPress={day => {
          setselectedFromDate(day.dateString)
          setFromDate(day.dateString)
          setFormDateView("none")
        }}
        markedDates={{
          [CurrentDate] : {selected: true, marked: true, selectedColor: 'blue'},
          [fromDate]: {marked: true, selected: true,}
        }}
        
      />
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_700Bold'}}>To Date:</Text>
      <Text style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', borderWidth:1, borderRadius:10, padding:10, marginBottom:10,}} onPress={()=>setToDateView("flex")}>{toDate}</Text>
       <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          display:toDateView
        }}
        current={CurrentDate}
        onDayPress={day => {
          setselectedToDate(day.dateString)
          setToDate(day.dateString)
          setToDateView("none")
        }}
        markedDates={{
          [CurrentDate] : {selected: true, marked: true, selectedColor: 'blue'},
          [toDate]: {marked: true, selected: true,}
        }}/>
      </View>
  );
};

export default DateFilter;
