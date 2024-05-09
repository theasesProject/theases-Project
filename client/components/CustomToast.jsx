import React from 'react';
import { View, Text, Image } from 'react-native';

const CustomToast = ({ type, text1, text2 }) => {
  const backgroundColor = type === 'success' ? 'green' : 'red';
  const icon = type === 'success' ? require('../assets/aqwaWhite.png') : require('../assets/aqwaWhite.png');

  return (
    <View style={{ backgroundColor, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Image source={icon} style={{ width: 30, height: 30 }} />
      <View>
        <Text style={{ fontSize: 15, fontWeight: '400', color: 'white' }}>{text1}</Text>
        <Text style={{ fontSize: 12, color: 'white' }}>{text2}</Text>
      </View>
    </View>
  );
};

export default CustomToast;
