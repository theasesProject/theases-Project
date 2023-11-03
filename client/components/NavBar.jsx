import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from 'react-native-svg';
import Hm from ".././assets/Svg/house-solid.svg";
import Ms from ".././assets/Svg/envelope-solid.svg";
import Fa from ".././assets/Svg/heart-solid.svg";
import Pr from ".././assets/Svg/user-nav.svg";
const { height, width } = Dimensions.get("screen");

function NavBar({ style }) {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState(null);

  const handlePress = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <View  style={[styles.navBar, style]}>
      <TouchableOpacity
        style={styles.quarter}
        onPress={() => {
          navigation.navigate("Home");
          handlePress('home');
        }}
      >
        <View style={styles.hm}>
          <Hm fill={activeIcon === 'home' ? '#6C77BF' : 'grey'} />
          <Text style={{color: activeIcon === 'home' ? '#6C77BF' : 'grey'}}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quarter}
        onPress={() => {
          navigation.navigate("Mape");
          handlePress('mape');
        }}
      >
        <View style={styles.hm}>
          <Ms fill={activeIcon === 'mape' ? '#6C77BF' : 'grey'} />
          <Text style={{color: activeIcon === 'mape' ? '#6C77BF' : 'grey'}}>Messeges</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quarter}
        onPress={() => {
          navigation.navigate("favorites");
          handlePress('favorites');
        }}
      >
        <View style={styles.hm}>
          <Fa fill={activeIcon === 'favorites' ? '#6C77BF' : 'grey'} />
          <Text style={{color: activeIcon === 'favorites' ? '#6C77BF' : 'grey'}}>Favorites</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.quarter}
        onPress={() => {
          navigation.navigate("Userprofile");
          handlePress('userprofile');
        }}
      >
        <View style={styles.hm}>
          <Pr fill={activeIcon === 'userprofile' ? '#6C77BF' : 'grey'} />
          <Text style={{color: activeIcon === 'userprofile' ? '#6C77BF' : 'grey'}}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ... rest of your code

const styles = StyleSheet.create({
  navBar: {
    borderTopColor:"lightgrey",
    borderTopWidth:1,
    backgroundColor: "white",
    height: height * 0.07,
    flexDirection: "row",
    justifyContent: "space-around", // Distribute items evenly along the row
    alignItems: "center", // Center items vertically
  },
  quarter: {
    flex: 1,
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
  },
  hm: {
    alignItems: "center", // Center items horizontally
  },
});

export default NavBar;
