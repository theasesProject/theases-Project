import { useState, useEffect } from "react";
import { Pressable, Text, StyleSheet, Dimensions } from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const { height, width } = Dimensions.get("screen");

const AgencyReported = ({ e, form, selected, setSelected, setForm }) => {
  //   const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
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
    fontFamily: "FiraMono-Medium",
  },
  unselectedText: {
    color: "black",
    fontFamily: "FiraMono-Medium",
  },
});

export default AgencyReported;
