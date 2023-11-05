import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RangeSlider from "rn-range-slider";

const FilterSlider = () => {
  const [rangeLow, setRangeLow] = useState(10); //this should take the cheapest car price as initial value
  const [rangeHigh, setRangeHigh] = useState(50); //this should take the higher car price as initial value

  const onValueChanged = (low, high) => {
    setRangeLow(low);
    setRangeHigh(high);
  };

  return (
    <View style={styles.slider}>
      <RangeSlider
        style={{ width: 300, height: 80 }}
        gravity="center"
        min={0}
        max={100}
        step={1}
        selectionColor="#3df"
        blankColor="#f6f6f6"
        onValueChanged={onValueChanged}
      />
      <Text>Lower Value: {rangeLow}</Text>
      <Text>Upper Value: {rangeHigh}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {},
});

export default FilterSlider;
