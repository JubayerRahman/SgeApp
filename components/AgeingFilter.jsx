import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

const AgeingFilter = ({setselectedAgeing}) => {
  const [selectedOfficer, setSelectedOfficer] = useState('');


  const officerOptions = [
    { key: '0-10',   value: '0-10 days' },
    { key: '10-20',  value: '10-20 days' },
    { key: '30-40',  value: '30-40 days' },
    { key: '40-50',  value: '40-50 days' },
    { key: '50-60',  value: '50-60 days' },
    { key: '70-80',  value: '70-80 days' },
    { key: '80-90',  value: '80-90 days' },
    { key: '90-100', value: '90-100 days' },
    { key: '100+',   value: '100+ days' },
  ];

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 16, fontFamily: 'Montserrat_700Bold', paddingBottom: 10 }}>
        Ageing:
      </Text>
      <SelectList
        setSelected={(val) => setselectedAgeing(val)}
        data={officerOptions}
        placeholder="Filter by Ageing"
        // save="value"
      />
    </View>
  );
};

export default AgeingFilter;
