import { View, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateFilter = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // iOS keeps it open
    setDate(currentDate);
  };

  return (
    <View>
      <Button title={date.toDateString()} onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      </View>
  );
};

export default DateFilter;
