import { useState, useEffect } from "react";
import { Pressable, Text, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

const AgencyReported = ({ e, form, selected, setSelected, setForm }) => {

  
  return (
    <Pressable
      onPress={() => {
        setSelected(e.name);
        setForm({ ...form, agencyName: e.name });
      }}
      style={selected ? styles.selectedResult : styles.unselectedResult}
    >
      <Text style={selected ? styles.selectedText : styles.unselectedText}>
        {e.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectedResult: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0.5,
    padding: 5,
    backgroundColor: "black",
  },
  unselectedResult: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0.5,
    padding: 5,
    backgroundColor: "white",
  },
  selectedText: {
    color: "white",

  },
  unselectedText: {
    color: "black",
 
  },
});

export default AgencyReported;
