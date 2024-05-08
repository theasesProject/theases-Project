import React, { useEffect, useRef, useState } from "react";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import axios  from "axios";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import {showToast} from "./../Helpers.js"
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import Arrowright from "../assets/Svg/arrowright.svg";
import RotatableSvg from "../components/RotatedArrow";
import BackARrow from "../assets/Svg/backArrrow.svg";
import Add from "../assets/Svg/add-picture.svg";
import Change from "../assets/Svg/change-picture.svg";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native';
import CustomInput from "../components/CustomInput.jsx";
const { width, height } = Dimensions.get("screen");
const SignUpNew = () => {
  const flatListRef = useRef(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmePassword:"",
    dateOfBirth: "",
    selfie: "",
    license: "",
    backLicense: "",
    passport: "",
  });
  const [error, setError] = useState({
    nameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
    confirmePasswordError:"",
    dateOfBirthError: "",
    selfieError: "",
    licenseError: "",
    backLicenseError: "",
    passportError: "",
  });
  
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [picsDetail, setPicsDetails] = useState({
//     selfie: "zdfz",
//     license: "fzef",
//     backLicense: "zefzef",
//     passport: "zefzef",
//   });
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation()

  const errorConditionFullName = (text) => {
    if (!text.trim()) {
      return { error: true, errorMessage: "Full Name is required" };
    } else {
      return { error: false, errorMessage: "" };
    }
  };

  const OnchangeFullName = (value) => {
    setUserDetails({ ...userDetails, name: value });
  };
  const handleErrorFullName = (value) => {
    setError({ ...error, nameError: value });
  };
   
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    if (currentDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      setUserDetails({ ...userDetails, dateOfBirth: formattedDate });
      console.log(formattedDate, "formdata");
    }
  };

  useEffect(() => {

    const loadFonts = async () => {
      await Font.loadAsync({
        "League-Spartan": require("../assets/fonts/LeagueSpartan-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);


  function isFormComplete(userDetails) {
    return (
      Object.values(userDetails).length === 9 &&
      Object.values(userDetails).every((value) => value !== "") 
    );
  }

 

  const handleButtonPress = () => {
    if (activeIndex === 0) {
      setActiveIndex(1);
      flatListRef.current.scrollToIndex({ animated: true, index: 1 });
    } else if (activeIndex === 1) {
      setActiveIndex(0);
      flatListRef.current.scrollToIndex({ animated: true, index: 0 });
    } else {
      console.log("Submitting form...");
      // Perform your submission logic here
    }
  };

  const handleScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(pageNum);
  };



  if (!fontLoaded) {
    return null; // or a loading indicator
  }

  

  const renderItem = ({ item }) => {
    if (item.id === "User") {
      return (
        <LinearGradient
          locations={[0.2, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#321947", "#000000"]}
          // style={styles.formContainer}
        >
          <ScrollView
            contentContainerStyle={styles.ScrollContainer}
            keyboardShouldPersistTaps="always"
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                // backgroundColor:"red",
                height,
              }}
            >
              <View
                style={{
                  height: height * 0.2,
                  // backgroundColor:"green"
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../assets/aqwaWhite.png")}
                />
              </View>
              <View
                style={{
                  height: height * 0.4,
                  // backgroundColor:"yellow"
                }}
              >
                <CustomInput
                //   style={styles.FirstInput}
                //   placeholder="Username"
                //   placeholderTextColor={"#cccccc"}
                //   onChangeText={(text) => handleUserChange("name", text)}
                //   value={userDetails.name}
                label="Full name"
                value={userDetails.name}
                errorCondition={errorConditionFullName}
                inputOnChange={OnchangeFullName}
                style={styles.FirstInput}
                handleError={handleErrorFullName}
                error={error.name}
                keyboardType="default"
                />
                {/* <TextInput
                  style={styles.FirstInput}
                  placeholder="Enter Your  Email"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleUserChange("email", text)}
                  value={userDetails.email}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.FirstInput}
                  placeholder="Type Your Phone Number"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleUserChange("phone", text)}
                  value={userDetails.phone}
                  keyboardType="phone-pad"
                /> */}
                {/* <Pressable onPress={() => console.log("haha")}>
                  <TextInput
                    style={styles.FirstInput}
                    placeholder="Date Of Birth"
                    editable={false}
                    placeholderTextColor={"#cccccc"}
                    // value={userDetails.email}
                    keyboardType="email-address"
                  />
                </Pressable> */}
                {/* <TouchableOpacity onPress={showMode}
                style={styles.birthText}
                >
                    <Text
                                    style={styles.birthBtn}

                    >{userDetails.dateOfBirth}</Text>
                </TouchableOpacity>
                {show && (
                  
                  <DateTimePicker
                  
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    onDismiss={onDismiss}
                  />
                )}
                <TextInput
                  style={styles.FirstInput}
                  placeholder="Type Your Password"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleUserChange("password", text)}
                  value={userDetails.password}
                  keyboardType="default"
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.FirstInput}
                  placeholder="Confirm Your Password"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  keyboardType="default"
                  secureTextEntry={true}
                /> */}
                {/* <Pressable onPress={pickImage}>
                  <TextInput
                    style={[styles.input,{opacity:Document?0.5:1}]}
                    placeholder={
                      Document
                        ? "Tap here to change Image  ☑️"
                        : "Upload a photo of your work license  🖨️"
                    }
                    placeholderTextColor={"#cccccc"}
                    // keyboardType="email-address"
                    editable={false} // Make the TextInput not editable
                  />
                </Pressable> */}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      );
    } else if (item.id === "Pics") {
      return (
        <LinearGradient
          locations={[0.2, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#321947", "#000000"]}
          // style={styles.formContainer}
        >
          <ScrollView
            contentContainerStyle={styles.ScrollContainer}
            keyboardShouldPersistTaps="always"
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                // backgroundColor:"red",
                height,
              }}
            >
              <View
                style={{
                  height: height * 0.2,
                  // backgroundColor:"green"
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../assets/aqwaWhite.png")}
                />
              </View>
              <View
                style={{
                  height: height * 0.4,
                  // backgroundColor:"yellow",
                  justifyContent: "center",
                }}
              >
               
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      );
    }
  };

  return (
    <>
      {!isCameraVisible && (
        <LinearGradient
          locations={[0.1, 0.9]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={["#321947", "#000000"]}
          style={styles.container}
        >
          <FlatList
            ref={flatListRef}
            data={[{ id: "User" }, { id: "Pics" }]}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={handleScrollEnd}
          />
          {keyboardVisible ? null : (
            <Pressable
              activeOpacity={0.5}
              style={[styles.FlatBtn, { backgroundColor: "#321947" }]} // Adjusted to use a solid color
              onPress={() =>
                isFormComplete(userDetails)
                  ? SignUpHandle()
                  : handleButtonPress()
              }
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  backgroundColor: "transparent",
                }}
              >
                {isFormComplete(
                  userDetails
                ) ? null : activeIndex === 1 ? (
                  <RotatableSvg rotation={180} />
                ) : null}
                <Text
                  style={{
                    color: "#fff",
                    backgroundColor: "transparent",
                    fontSize: 18,
                    fontFamily: "League-Spartan",
                    paddingBottom: height * 0.01,
                  }}
                >
                  {isFormComplete(userDetails)
                    ? "Submit"
                    : activeIndex === 0
                      ? "Next"
                      : activeIndex === 1
                        ? "Previous"
                        : null}
                </Text>
                {isFormComplete(userDetails) ? (
                  <Arrowright />
                ) : activeIndex === 0 ? (
                  <Arrowright />
                ) : null}
              </View>
            </Pressable>
          )}
        </LinearGradient>
      )}
      {isCameraVisible && (
        <>
          <Camera
            ref={cameraRef}
            style={{
              flex: 0.9,
              height: height * 0.4,
              width: height * 0.4,
              justifyContent: "flex-end",
            }}
            focusable={true}
            type={type}
            onCameraReady={() => console.log("Camera is ready")}
            onBarCodeScanned={() => {}}
            onFacesDetected={() => {}}
            ratio="16:9"
            onTextRecognized={() => {}}
            onPictureSaved={() => {}}
            onSubjectAreaChanged={() => {}}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            onFrameProcessed={() => {}}
            onError={() => {}}
          ></Camera>
          <View
            style={{
              flex: 0.1,
              // height: height * 0.1,
              width,
              alignItems: "center",
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between", // Aligns items to the edges
              padding: width * 0.04, // Adds some padding around the buttons
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginRight: 20,
                // flex: 0.2,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "black", // Background color
                borderRadius: 50, // Rounded corners
                // paddingHorizontal: height * 0.03, // Padding inside the button
                width: height * 0.1, // Width of the button
                height: height * 0.06, // Height of the button
              }}
              onPress={() => setIsCameraVisible(false)}
            >
              <BackARrow />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                right: width * 0.385,
                bottom: height * 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff", // Background color
                borderRadius: 50, // Rounded corners
                width: height * 0.1, // Width of the button
                height: height * 0.1, // Height of the button
              }}
            >
              <TouchableOpacity
                onPress={() => takePicture(portait)}
                style={{
                  flex: 1, // Adjusted to fill the container
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                  borderWidth: 4, // Corrected to a number
                  backgroundColor: "#fff", // Background color
                  borderRadius: 50, // Rounded corners
                  width: "100%", // Adjusted to fill the container
                  height: "100%", // Adjusted to fill the container
                }}
              >
                {/* Placeholder for button content */}
                {/* <Text>Take Picture</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    borderColor: "gray",
    borderBottomWidth: 1,
    height: height * 0.03,
    marginBottom: height * 0.03,
  },
  FlatBtn: {
    height: height * 0.08,
    width: width,
    // paddingRight:width*.15,
    // borderBottomEndRadius: 100,
    // backgroundColor:"red",
    // borderBottomLeftRadius: 100,
    // backgroundColor: "transparent",
    alignItems: "center",
    // justifyContent: "flex-end",
    // flexDirection: "row",
    // borderTopColor: "#000000",
    // justifyContent: "center",
    paddingBottom: height * 0.005,
    paddingLeft: width * 0.6,
  },
  formContainer: {
    width: Dimensions.get("window").width,
    height: height,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  FirstInput: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    // color: "white",
    // marginBottom: 10,
    // padding: 5,
    // borderRadius: 5,
    // borderColor: "gray",
    // borderBottomWidth: 1,
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,

    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  cameraButton: {
    alignItems: "center",
    width: width * 0.75,
    backgroundColor: "#fff",
    padding: height * 0.01,
    borderRadius: 100,
    // marginTop: 10,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  cameraButtonText: {
    fontSize: 16,
  },
  img: {
    height: height * 0.2,
    width: width,
  },
  ScrollContainer: {
    height,
    alignItems: "center",
    // justifyContent: "space-evenly",
    flexGrow: 1,
  },
  birthText:{
    color: "white",
  }
});

export default SignUpNew;
