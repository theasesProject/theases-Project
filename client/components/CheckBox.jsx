import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
const { height, width } = Dimensions.get("screen");

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: width*0.08,
    height: height*0.04,
    borderWidth: 3,
    borderColor: '#434343',
    borderRadius: 6,
    transitionDuration: '0.375s',
  },
  checked: {
    transform: [{ rotate: '45deg' }],
    width: width*0.03,
    marginLeft: 12,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRadius: 0,
    borderColor: '#8c52ff',
  },
});

export default Checkbox;
