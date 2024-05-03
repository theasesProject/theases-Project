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
import { Camera } from "expo-camera";
import * as CameraPermissions from "expo-camera";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector, useDispatch } from "react-redux";
import { SignUpClick } from "../store/userSlice";
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");
const NewSignUp = () => {
  const flatListRef = useRef(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [Ratio, setRatio] = useState(0);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [type, setType] = useState(CameraPermissions.CameraType.front);
  const [activeIndex, setActiveIndex] = useState(0);
  const [Document, setDocument] = useState("");
  const [portait, setPortrait] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "aymen",
    phone: "556685",
    email: "aymen@gmail.com",
    password: "Azerty123 @",
    dateOfBirth: "Select your birth date",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picsDetail, setPicsDetails] = useState({
    selfie: "zdfz",
    license: "fzef",
    backLicense: "zefzef",
    passport: "zefzef",
  });
  const [date, setDate] = useState(new Date());
  const [dateNow, setDateNow] = useState(new Date());
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation()

  // const SignUpHandle = () => {
  //   if (userDetails.password === confirmPassword) {
  //      console.log(userDetails.password, "thisss");
  //      const data ={
  //       userDetails,
  //       picsDetail,
  //      }
  //      // Dispatch the SignUpClick action with combined userDetails and picsDetail
  //      dispatch(SignUpClick( data ))
  //        .then((response) => {
  //          // Assuming response.payload is the data you're interested in
  //          if (response.payload) {
  //           console.log(response, "payload")
  //            navigation.navigate("NewHome");
  //          } else {
  //            // Handle the case where the request is not fulfilled
  //            console.error("Sign-up failed");
  //          }
  //        })
  //        .catch((error) => {
  //          console.error(error);
  //        });
  //   }
  //  };

  const SignUpHandle = async () => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/SignUpUser`,
        {
          userName: userDetails.name,
          phoneNumber: userDetails.phone,
          password: userDetails.password,
          email: userDetails.email,
          dateOfBirth: userDetails.dateOfBirth,
          selfie: picsDetail.selfie,
          drivingLicenseFront: picsDetail.license,
          drivingLicenseBack: picsDetail.backLicense,
          passport: picsDetail.passport
        },
      );

      if (response.status === 201) {
        showToast("Success","Success","Registration Successfully done 😃!")

        navigation.navigate("NewHome");
      }
      console.log("dddd",response);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setToastMessage("Email is already registered. Please use a different emailll.");
        setShowToast(!showToast)

      } else {
        console.error("Error registering user:", error);
      }
    }
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
  const onDismiss = () => {
    setShow(false);
  };
  console.log(userDetails, "lllll");

  const showMode = () => {
    setShow(true);
  };
  const cameraRef = useRef(null);
  const takePicture = async (portrait) => {
    try {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        // Assuming picsDetail is an object, use the spread operator to create a new object
        // with the existing picsDetail and the new portrait data
        setPicsDetails({ ...picsDetail, [portrait]: data.uri });
        // Here you can save the image URI to your state or handle it as needed
        setIsCameraVisible(false);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      // Optionally, you can set some state to indicate an error occurred
      // For example: setError("Error taking picture");
    }
  };
  useEffect(() => {
    async function requestCameraPermission() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
    requestCameraPermission();
    const loadFonts = async () => {
      await Font.loadAsync({
        "League-Spartan": require("../assets/fonts/LeagueSpartan-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);
  function isFormComplete(userDetails, picsDetail) {
    return (
      Object.values(userDetails).length === 5 &&
      Object.values(picsDetail).length === 4 &&
      Object.values(userDetails).every((value) => value !== "") &&
      Object.values(picsDetail).every((value) => value !== "") 
    );
  }

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleUserChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handlePics = (field, value) => {
    setPicsDetails({ ...picsDetail, [field]: value });
  };

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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setDocument(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
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
                <TextInput
                  style={styles.FirstInput}
                  placeholder="Username"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleUserChange("name", text)}
                  value={userDetails.name}
                />
                <TextInput
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
                />
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
                <TouchableOpacity onPress={showMode}
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
                />
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
                <Pressable
                  delayPressIn={0}
                  style={styles.inputContainer}
                  onPress={() => {
                    setType("front");
                    setPortrait("selfie");
                    setIsCameraVisible(true);
                  }}
                >
                  <View
                    style={{
                      paddingBottom: height * 0.007,
                    }}
                  >
                    {picsDetail.selfie ? <Change /> : <Add />}
                  </View>
                  {/* <View style={styles.inputContainer}> */}
                  <TextInput
                    style={[
                      styles.input,
                      {
                        opacity: picsDetail.selfie ? 0.5 : 1,
                      },
                      {
                        backgroundColor: picsDetail.selfie
                          ? "lightgreen"
                          : "transparent",
                      },
                    ]}
                    placeholder={
                      picsDetail.selfie
                        ? "Tap here to change Image  ☑️"
                        : "Take a Selfie"
                    }
                    placeholderTextColor={
                      picsDetail.selfie ? "#ff0000" : "#cccccc"
                    } // Assuming you meant "#ff0000" for red
                    editable={false} // Make the TextInput not editable
                  />
                  {!picsDetail.selfie && (
                    <Text
                      style={{
                        color: "white",
                        position: "absolute",
                        right: 5,
                        top: -15,
                      }}
                    >
                      *
                    </Text>
                  )}
                  {/* </View> */}
                </Pressable>
                <Pressable
                  style={styles.inputContainer}
                  onPress={() => {
                    setType("back");
                    setPortrait("license");
                    setIsCameraVisible(true);
                  }}
                >
                  <View
                    style={{
                      paddingBottom: height * 0.007,
                    }}
                  >
                    {picsDetail.license ? <Change /> : <Add />}
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { opacity: picsDetail.license ? 0.5 : 1 },
                    ]}
                    placeholder={
                      picsDetail.license
                        ? "Tap here to change Image  ☑️"
                        : " photo of your Driving License "
                    }
                    placeholderTextColor={"#cccccc"}
                    // keyboardType="email-address"
                    editable={false} // Make the TextInput not editable
                  />
                  {!picsDetail.license && (
                    <Text
                      style={{
                        color: "white",
                        position: "absolute",
                        right: 5,
                        top: -15,
                      }}
                    >
                      *
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  style={styles.inputContainer}
                  onPress={() => {
                    setType("back");
                    setPortrait("backLicense");
                    setIsCameraVisible(true);
                  }}
                >
                  <View
                    style={{
                      paddingBottom: height * 0.007,
                    }}
                  >
                    {picsDetail.backLicense ? <Change /> : <Add />}
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { opacity: picsDetail.backLicense ? 0.5 : 1 },
                    ]}
                    placeholder={
                      picsDetail.backLicense
                        ? "Tap here to change Image  ☑️"
                        : " photo of the back of your driving license "
                    }
                    placeholderTextColor={"#cccccc"}
                    // keyboardType="email-address"
                    editable={false} // Make the TextInput not editable
                  />
                  {!picsDetail.backLicense && (
                    <Text
                      style={{
                        color: "white",
                        position: "absolute",
                        right: 5,
                        top: -15,
                      }}
                    >
                      *
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  style={styles.inputContainer}
                  onPress={() => {
                    setType("back");
                    setPortrait("passport");
                    setIsCameraVisible(true);
                  }}
                >
                  <View
                    style={{
                      paddingBottom: height * 0.007,
                    }}
                  >
                    {picsDetail.passport ? <Change /> : <Add />}
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { opacity: picsDetail.passport ? 0.5 : 1 },
                    ]}
                    placeholder={
                      picsDetail.passport
                        ? "Tap here to change Image  ☑️"
                        : " photo of your Passport  "
                    }
                    placeholderTextColor={"#cccccc"}
                    // keyboardType="email-address"
                    editable={false} // Make the TextInput not editable
                  />
                  {!picsDetail.passport && (
                    <Text
                      style={{
                        color: "white",
                        position: "absolute",
                        right: 5,
                        top: -15,
                      }}
                    >
                      *
                    </Text>
                  )}
                </Pressable>
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
                isFormComplete(userDetails, picsDetail)
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
                  userDetails,
                  picsDetail
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
                  {isFormComplete(userDetails, picsDetail)
                    ? "Submit"
                    : activeIndex === 0
                      ? "Next"
                      : activeIndex === 1
                        ? "Previous"
                        : null}
                </Text>
                {isFormComplete(userDetails, picsDetail) ? (
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
              alignContent: "center",
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
    color: "white",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
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

export default NewSignUp;
