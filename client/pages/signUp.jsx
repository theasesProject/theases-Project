import * as Rn from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import React from "react";
import UserNormal from "../assets/Svg/user-normal.svg";
import Email from "../assets/Svg/email.svg";
import Lock from "../assets/Svg/lock.svg";
import Open from "../assets/Svg/eyeOpen.svg";
import Close from "../assets/Svg/eyeClose.svg";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Rn.Dimensions.get("window");
import GooglePng from "../assets/google.png";
import FaceBookPng from "../assets/facebook.png";
const SignUp = ({ navigation, props }) => {
  
  const [color, setColor] = useState("#6C77BF");
  const [PassState, setPassState] = useState(true);
  const [PassState2, setPassState2] = useState(true);
  const [isSecure,setIsecure] = useState(true)
  const [isSecure2,setIsecure2] = useState(true)
  return (
    <Rn.View style={styles.container}>
      <Rn.Text style={styles.header}>Create New Account</Rn.Text>
      <Rn.Text style={styles.subheader}>
        Set up your username and password. You can always change it later.
      </Rn.Text>
      <Rn.View style={styles.InputContainer}>
        <Rn.View style={styles.inputHolder}>
          <UserNormal style={styles.icon} />
          <Rn.TextInput style={styles.input} placeholder="Username" />
        </Rn.View>
        <Rn.View style={styles.inputHolder}>
          <Email style={styles.icon} />
          <Rn.TextInput style={styles.input} placeholder="Email" />
        </Rn.View>
        <Rn.View style={styles.inputHolder}>
          <Lock style={styles.icon} />
          <Rn.TextInput
            Lock
            style={styles.input}
            placeholder="Password"
            secureTextEntry={isSecure}
          />
          {!PassState?<Open  style={styles.eyes} onPress={()=>{
            setPassState(!PassState),setIsecure(!isSecure)
          }}/>:<Close style={styles.eyes} onPress={()=>{
            setPassState(!PassState),setIsecure(!isSecure)
          }}/>}
        </Rn.View>

        <Rn.View style={styles.inputHolder}>
        <Lock style={styles.icon} />
          <Rn.TextInput
            style={styles.input}
            placeholder="Confirm Your Password"
            secureTextEntry={isSecure2}
          />
          {!PassState2?<Open style={styles.eyes} onPress={()=>{
            setPassState2(!PassState2),setIsecure2(!isSecure2)
          }}/>:<Close style={styles.eyes} onPress={()=>{
            setPassState2(!PassState2),setIsecure2(!isSecure2)
          }}/>}

        </Rn.View>
      </Rn.View>
      <Rn.TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <LinearGradient
          colors={["#6C77BF", "#4485C5"]}
          locations={[0, 1]}
          style={styles.buttonContainer}
        >
          <Rn.Text style={styles.buttonText}>{"Sign Up"}</Rn.Text>
        </LinearGradient>
      </Rn.TouchableOpacity>
      <Rn.Pressable
        activeOpacity={0.8}
        onPressIn={() => setColor("darkblue")}
        onPressOut={() => setColor("#6C77BF")}
      >
        <Rn.Text>
          Already have an account?
          <Rn.Text style={{ color: color }}> Log in</Rn.Text>
        </Rn.Text>
      </Rn.Pressable>
      <Rn.View
        style={styles.separatorContainer}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <Rn.View style={styles.separator} />
        <Rn.Text style={{ color: "grey" }}>Or sign in with</Rn.Text>
        <Rn.View style={styles.separator} />
      </Rn.View>
      <Rn.View style={styles.extraSignContainer}>
        <Rn.TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <Rn.View style={styles.extraSign}>
            <Rn.Image style={styles.GoogleCss} source={GooglePng} />
            <Rn.Text style={styles.googleText}>Google</Rn.Text>
          </Rn.View>
        </Rn.TouchableOpacity>
        <Rn.TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <Rn.View style={styles.extraSign}>
            <Rn.Image style={styles.FacebookCss} source={FaceBookPng} />
            <Rn.Text style={styles.googleText}>Facebook</Rn.Text>
          </Rn.View>
        </Rn.TouchableOpacity>
      </Rn.View>
    </Rn.View>
  );
};
const styles = StyleSheet.create({
  eyes:{
    position: "absolute",
    top: 25,
    right: "10%",
    width: "10%",
    height: 20,
    zIndex: 1,
  },
  icon: {
    position: "absolute",
    top: 25,
    right: "85%",
    width: "10%",
    height: 20,
    zIndex: 1,

    // height: height * 0.01,
    // width: width * 0.01,
  },
  separator: {
    marginVertical: 30,
    backgroundColor: "lightgrey",
    height: 0.5,
    width: "70%",
  },
  googleText: {
    fontSize: 15,
    fontWeight: "400",
  },
  extraSign: {
    display: "flex",
    height: height * 0.066,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15,
    width: width * 0.35,
    borderWidth: 0,
    borderColor: "grey",
    borderRadius: 10,
    // overflow: "hidden",
    flexDirection: "row",
    gap: width * 0.009,
    backgroundColor: "#F3F4F6",
  },
  extraSignContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 22,
  },
  GoogleCss: {
    height: height * 0.03,
    width: width * 0.059,
  },
  FacebookCss: {
    height: height * 0.04,
    width: width * 0.086,
  },
  separatorContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginVertical: 20,
    gap: 7,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  InputContainer: {
    height: "auto",
    gap: 10,
    width: "90%",
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputHolder: {
    position: "relative",
    height: "auto",
    gap: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    overflow: "visible",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    color: "#000",
    marginVertical: 10,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  input: {
    paddingLeft: 40,
    // paddingLeft: 10,
    zIndex: -1,
    height: 50,
    width: "90%",
    borderRadius: 5,
    borderWidth: "none",
    borderWidth: 0,
    backgroundColor: "#EFEFF9",
    marginTop: 10,
    padding: 10,
  },
  buttonContainer: {
    // backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 15,
    width: width * 0.8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default SignUp;
