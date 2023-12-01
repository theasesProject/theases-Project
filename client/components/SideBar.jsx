import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";


const Sidebar = ({ navigation, isOpen, onClose }) => {
  const dispatch = useDispatch();
 
  const animatedValue = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    const closeSidebar = () => {
      Animated.timing(animatedValue, {
        toValue: isOpen ? 0 : -250,
        duration: 400,
        useNativeDriver: false,
      }).start();
    };

    closeSidebar(); // Initially close/open the sidebar based on the isOpen value

    return () => {
      closeSidebar(); // Ensure the sidebar is closed when the component unmounts
    };
  }, [isOpen, animatedValue]);
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: !isOpen ? -250 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animatedValue]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 50) {
          onClose();
          console.log("done");
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("Home");
  };

  return (
    <Animated.View
      style={[styles.sidebar, { right: animatedValue }]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.text}>Home</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyCars")}>
        <Text style={styles.text}>My Cars</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AddAgencyCar")}>
        <Text style={styles.text}>Add Car</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AgencyService")}>
        <Text style={styles.text}>Requests</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("editProfile")}>
        <Text style={styles.text}>Edit personal info</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditAgencyProfile")}
      >
        <Text style={styles.text}>Edit  profile</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
        <View style={styles.line} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: height * 0.05,
    right: 0,
    height: height * 0.95,
    width: width * 0.725,
    backgroundColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    paddingTop: 30,
    paddingHorizontal: width * 0.05,
    gap: 20,
    alignContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 20,

  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
});

export default Sidebar;
