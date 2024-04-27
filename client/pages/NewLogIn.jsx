import React, { useEffect, useRef, useState } from "react";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { Camera } from "expo-camera";
import { Image } from "react-native";
import Arrowright from "../assets/Svg/arrowright.svg";
import RotatableSvg from "../components/RotatedArrow";
const { width, height } = Dimensions.get("screen");
const NewLogIn = () => {
  const flatListRef = useRef(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [Document, setDocument] = useState("");
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [managerDetails, setManagerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "League-Spartan": require("../assets/fonts/LeagueSpartan-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);
  function isFormComplete(companyDetails, managerDetails, Document) {
    return (
      Object.values(companyDetails).length === 4 &&
      Object.values(managerDetails).length === 4 &&
      Object.values(companyDetails).every((value) => value !== "") &&
      Object.values(managerDetails).every((value) => value !== "") &&
      Document
    );
  }

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCompanyChange = (field, value) => {
    setCompanyDetails({ ...companyDetails, [field]: value });
  };

  const handleManagerChange = (field, value) => {
    setManagerDetails({ ...managerDetails, [field]: value });
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
    if (item.id === "company") {
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
              <View style={{
                height:height*.2,
                // backgroundColor:"green"
              }}>
              <Image
                style={styles.img}
                source={require("../assets/aqwaWhite.png")}
              /></View>
              <View
                style={{
                  height: height * 0.4,
                  // backgroundColor:"yellow"
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Company Name"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleCompanyChange("name", text)}
                  value={companyDetails.name}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Company Address"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleCompanyChange("address", text)}
                  value={companyDetails.address}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Company Phone Number"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleCompanyChange("phone", text)}
                  value={companyDetails.phone}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Company Email"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleCompanyChange("email", text)}
                  value={companyDetails.email}
                  keyboardType="email-address"
                />
                <Pressable onPress={pickImage}>
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
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      );
    } else if (item.id === "manager") {
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
              <View style={{
                height:height*.2,
                // backgroundColor:"green"
              }}>
              <Image
                style={styles.img}
                source={require("../assets/aqwaWhite.png")}
              /></View>
              <View
                style={{
                  height: height * 0.4,
                  // backgroundColor:"yellow"
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Manager's Name"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleManagerChange("name", text)}
                  value={managerDetails.name}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Manager's Phone Number"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleManagerChange("phone", text)}
                  value={managerDetails.phone}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Manager's Email"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleManagerChange("email", text)}
                  value={managerDetails.email}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Manager's Password"
                  placeholderTextColor={"#cccccc"}
                  onChangeText={(text) => handleManagerChange("password", text)}
                  value={managerDetails.password}
                  keyboardType="default"
                  secureTextEntry={true}
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      );
    }
  };

  return (
    <LinearGradient
      locations={[0.1, 0.9]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#321947", "#000000"]}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={[{ id: "company" }, { id: "manager" }]}
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
            isFormComplete(companyDetails, managerDetails, Document)
              ? console.log("form Submitted")
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
              companyDetails,
              managerDetails,
              Document,
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
              {isFormComplete(companyDetails, managerDetails, Document)
                ? "Submit"
                : activeIndex === 0
                  ? "Next"
                  : activeIndex === 1
                    ? "Previous"
                    : null}
            </Text>
            {isFormComplete(companyDetails, managerDetails, Document) ? (
              <Arrowright />
            ) : activeIndex === 0 ? (
              <Arrowright />
            ) : null}
          </View>
        </Pressable>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: Dimensions.get("window").height * 0.05,
    width: width * 0.75,
    borderColor: "gray",
    borderBottomWidth: 1,
    color: "white",
    marginBottom: 10,
    padding: 10,
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
    flexGrow:1
  },
});

export default NewLogIn;
