import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser, logUserOut } from "../store/userSlice";

const Sidebar = ({ isOpen, onClose, navigation }) => {
  if (!isOpen) {
    return null;
  }

  const dispatch = useDispatch();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          onClose();
        } else if (gestureState.dx > 50) {
          onClose();
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  if (!isOpen) {
    return null;
  }
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logUserOut());
    navigation.navigate("Home");
  };

  return (
    <View
      style={[styles.sidebar, styles.swipeContainer]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "80%", // Adjust the width as needed
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
  swipeContainer: {
    // Additional styles for the container that handles swipe gestures
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 1,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
});

export default Sidebar;
