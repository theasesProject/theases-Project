import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Logo from "../assets/tempLogo.png";
import Google from "../assets/googleIcon.png";
import Facebook from "../assets/facebookIcon.png";
import IdentifierIcon from "../assets/Svg/user-normal.svg";
import PasswordIcon from "../assets/Svg/lock.svg";
import Open from "../assets/Svg/eyeOpen.svg";
import Close from "../assets/Svg/eyeClose.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

function Login({ navigation }) {
  const [color, setColor] = useState("#6C77BF");
  const [color2, setColor2] = useState("#6C77BF");
  const [eyeState, setEyeState] = useState(true);
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.loginPage}>
      <View style={styles.headers}>
        <View style={styles.logoContainer}>
          <Image source={Logo} alt="logo" />
        </View>
        <Text style={styles.welcome}>Welcome Back</Text>
        <Text style={styles.paragraph}>
          Log in to your account using email or phone number
        </Text>
      </View>
      <View style={styles.loginForm}>
        <View style={styles.inputContainer}>
          <IdentifierIcon style={styles.inputIcon} />
          <TextInput
            placeholder="email or phone number"
            style={styles.identifierInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <PasswordIcon style={styles.inputIcon} />
          <TextInput
            placeholder="password"
            style={styles.passwordInput}
            secureTextEntry={isSecure}
          />
          {!eyeState ? (
            <Open
              style={styles.eye}
              onPress={() => {
                setEyeState(!eyeState), setIsSecure(!isSecure);
              }}
            />
          ) : (
            <Close
              style={styles.eye}
              onPress={() => {
                setEyeState(!eyeState), setIsSecure(!isSecure);
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Pressable
          activeOpacity={0.8}
          onPressIn={() => setColor2("darkblue")}
          onPressOut={() => setColor2("#6C77BF")}
        >
          <Text style={{ color: color2, ...styles.forgotPassword }}>
            Forgot Password?
          </Text>
        </Pressable>
      </View>
      <TouchableOpacity
        style={styles.loginBtnContainer}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <LinearGradient
          colors={["#6C77BF", "#4485C5"]}
          locations={[0, 1]}
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnContent}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.bottomSection}>
        <View style={styles.createAcc}>
          <Text>First time here?</Text>
          <Pressable
            activeOpacity={0.8}
            onPressIn={() => {
              setColor("darkblue");
              navigation.navigate("SignUp");
            }}
            onPressOut={() => setColor("#6C77BF")}
          >
            <Text style={{ color: color }}>Sign up</Text>
          </Pressable>
        </View>
        <View style={styles.loginWith}>
          <View style={styles.line}></View>
          <Text>Or sign in with</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.quickLoginContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <View style={styles.quickLogin}>
              <View style={styles.icons}>
                <Image source={Google} alt="google" style={styles.icons} />
              </View>
              <Text>Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <View style={styles.quickLogin}>
              <View style={styles.icons}>
                <Image source={Facebook} alt="facebook" style={styles.icons} />
              </View>
              <Text>Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

Login.navigationOptions = {
  title: "Login",
};

const styles = StyleSheet.create({
  loginPage: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
    gap: 30,
  },
  headers: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    color: "rgba(1,1,1,0.5)",
    textAlign: "center",
    width: 220,
  },
  loginForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputContainer: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    top: 13,
    left: "2%",
    width: "10%",
    height: 20,
    zIndex: 1,
  },
  eye: {
    position: "absolute",
    top: 15,
    right: "3%",
    width: "10%",
    height: 20,
    zIndex: 1,
  },
  identifierInput: {
    backgroundColor: "#eef1f8",
    borderRadius: 5,
    height: 50,
    paddingLeft: 40,
    zIndex: 0,
  },
  passwordInput: {
    backgroundColor: "#eef1f8",
    borderRadius: 5,
    height: 50,
    paddingLeft: 40,
    zIndex: 0,
  },
  forgotPasswordContainer: {
    width: "100%",
    marginTop: -20,
  },
  forgotPassword: {
    textAlign: "right",
  },
  loginBtnContainer: {
    width: "100%",
  },
  loginBtn: {
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnContent: {
    color: "white",
    fontSize: 18,
  },
  bottomSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  createAcc: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  loginWith: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    width: 110,
    backgroundColor: "#e5e6e8",
  },
  quickLoginContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  quickLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // border: "solid",
    // borderColor: "#e5e6e8",
    // borderWidth: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    width: 150,
    height: 50,
    gap: 15,
  },
  icons: {
    width: 25,
    height: 25,
  },
});
export default Login;
