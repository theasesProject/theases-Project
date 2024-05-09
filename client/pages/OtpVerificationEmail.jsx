import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather,SimpleLineIcons } from '@expo/vector-icons';const { width, height } = Dimensions.get("screen");
import axios from "axios"
import appConfig from "../appConfig";
const OtpVerificationEmail = () => {
  const navigation = useNavigation();
  const codeInputRefs = useRef([]);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const [email, setEmail] = useState("makhloufaymen.fr@gmail.com");

  const handleCodeChange = async (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  
    const isCodeComplete = newCode.every((item) => item !== "");
    if (isCodeComplete) {
      const enteredCode = newCode.join("");
  
      try {
        const response = await axios.post(
          `http://192.168.1.102:5000/api/users/verificationAccount`,
          {
            email,
            otpCode: enteredCode,
          }
        );
  
        if (response.status === 404) {
          console.log("User not found");
          setCode(["", "", "", "", "", ""]);
          codeInputRefs.current[0]?.focus();


        } else if (response.status === 400) {
          console.log("Incorrect OTP code");
          setCode(["", "", "", "", "", ""]);
          codeInputRefs.current[0]?.focus();


        } else if (response.status === 200) {
          console.log("Your account verified successfully");
          setCode(["", "", "", "", "", ""]);
          codeInputRefs.current[0]?.focus();


        }
        console.log("Code Verification done!");
      } catch (error) {
        console.error("Error during code verification:", error);
        setCode(["", "", "", "", "", ""]);
        codeInputRefs.current[0]?.focus();

      }
    } else if (text !== "") {
      codeInputRefs.current[index + 1]?.focus();
    }
  };
  
  return (
    <View>
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
              <View style={styles.container}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Verify your account</Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoText}>
                    We've sent you a 6-digit code to your email.
                  </Text>
                </View>
                <View>
                  <View style={styles.codeInputContainer}>
                    {code.map((code, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (codeInputRefs.current[index] = ref)}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={code}
                          onChangeText={(text) => handleCodeChange(text, index)}
                      />
                    ))}
                  </View>
                  {codeError ? (
                    <Text style={styles.errorText}>{codeError}</Text>
                  ) : null}
                </View>
                <View style={styles.bigResendContainer}>
                <View style={styles.resendContainer}>
                  <Text style={styles.resendCodeText}>Have you not received the verification code?</Text>
                  <TouchableOpacity style={styles.resendBtnContainer}>
                    <Text style={styles.resendText}>Resend</Text>
                    <Feather name="refresh-cw" size={13} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.resendContainer}>
                  {/* <Text style={styles.resendCodeText}>You would to try later?</Text> */}
                  <TouchableOpacity style={styles.resendBtnContainer}>
                    <Text style={styles.resendText}>Press here to return to the home page</Text>
                    <SimpleLineIcons name="home" size={16} color="white" />
                  </TouchableOpacity>
                </View>

                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default OtpVerificationEmail;

const styles = StyleSheet.create({
  ScrollContainer: {
    height,
    alignItems: "center",
    // justifyContent: "space-evenly",
    flexGrow: 1,
  },
  img: {
    height: height * 0.2,
    width: width,
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    paddingBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  },
  infoText: {
    paddingBottom: 20,
    paddingLeft: 8,
    paddingRight: 4,
    fontSize: 12,
    color: "gray",
    fontStyle: "italic",
  },
  resendBtnContainer:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    gap:5
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: -13,
  },
  codeInput: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginHorizontal: 5,
    width: 40,
    textAlign: "center",
    fontSize: 16,
    color:"white"
  },
  errorText: {
    color: "red",
    paddingLeft: "37%",
  },
  bigResendContainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    gap:170,
    width:"100%"
  },
  resendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  resendCodeText:{
    color: "gray",
  },
  resendText: {
    color: "white",
    paddingLeft: 5,
  },
});
