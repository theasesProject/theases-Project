import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";

const Sidebar = ({ isOpen, onClose, navigation }) => {
  const dispatch = useDispatch();

  const animatedValue = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animatedValue]);
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: !isOpen ? -250 : 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animatedValue]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Set a threshold to start recognizing horizontal gestures

        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        console.log("heeeerreeeee", gestureState.dx)
        if (gestureState.dx > 50) {
          onClose();
          console.log("done");
        }
      },
      onPanResponderRelease: () => {
        // Additional logic on release if needed
      },
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
        <Text style={styles.text}>Edit profile</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyCars")}>
        <Text style={styles.text}>Reviews</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyCars")}>
        <Text style={styles.text}>Reports</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyCars")}>
        <Text style={styles.text}>Settings</Text>
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
    top: 0,
    height: "82.5%",
    width: "60%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    paddingTop: 30,
    paddingHorizontal: 20,
    zIndex: 1,
    gap: 20,
    alignContent: "center",
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
