import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

const AgeingFilter = () => {
  const [selectedOfficer, setSelectedOfficer] = useState('');


  const officerOptions = [
    { key: '0-10 days',   value: '0-10 days' },
    { key: '10-20 days',  value: '10-20 days' },
    { key: '30-40 days',  value: '30-40 days' },
    { key: '40-50 days',  value: '40-50 days' },
    { key: '50-60 days',  value: '50-60 days' },
    { key: '70-80 days',  value: '70-80 days' },
    { key: '80-90 days',  value: '80-90 days' },
    { key: '90-100 days', value: '90-100 days' },
    { key: '100+ days',   value: '100+ days' },
  ];

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom: 10 }}>
        Ageing:
      </Text>
      <SelectList
        setSelected={(val) => setSelectedOfficer(val)}
        data={officerOptions}
        placeholder="Filter by Ageing"
        save="value"
      />
    </View>
  );
};

export default AgeingFilter;
