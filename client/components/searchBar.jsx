import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import filter from "../assets/filter.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../assets/Svg/filter.svg";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

function SearchBar({ onSearch }) {
  const [searchedCar, setSearchedCar] = useState();
  const navigation = useNavigation();
  console.log(searchedCar, "searchedCar");
 
  const handleSearch = (text) => {
    setSearchedCar(text);

    searchCarsByModel(text);
  };

  const searchCarsByModel = async (model) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/searchName/${searchedCar}`
      );
      onSearch(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.inputAndButton}>
      <TextInput
        onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
        style={[styles.input]}
        placeholder="Search cars or locations…"
        placeholderTextColor="gray"
      />
      <Pressable onPress={() => navigation.navigate("Search")}>
        <LinearGradient
          style={styles.filterImage}
          colors={["#6C77BF", "#4485C5"]}
          locations={[0, 1]}
        >
          <Filter onPress={() => navigation.navigate("Search")} />
        </LinearGradient>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: height * 0.07,
    borderRadius: 10,
    width: "90%",
    paddingHorizontal: 10,
  },
  searchDetails: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  FirstText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  filterImage: {
    width: width * 0.11,
    height: height * 0.055,
    // backgroundColor: "rgb(106,119,197)",
    borderRadius: 10,
    position: "absolute",
    right: 5,
    top: -24,
    justifyContent: "center",
    alignItems: "center",
  },
  inputAndButton: {
    flexDirection: "row",
    // width: "100%",
    width: "100%",
    justifyContent: "center",
    height: height * 0.1,
    // flex: 1,
    width: width,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    // gap: 20,
  },
  filter: {
    width: 20,
    height: 20,
  },
});

export default SearchBar;
