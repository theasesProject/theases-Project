import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import Logo from "../assets/tempLogo.png";
import google from "../assets/googleIcon.png";
import facebook from "../assets/facebookIcon.png";
import IdentifierIcon from "../assets/Svg/user-normal.svg";
import PasswordIcon from "../assets/Svg/lock.svg";
import Open from "../assets/Svg/eyeOpen.svg";
import Close from "../assets/Svg/eyeClose.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUser, selectUser, logUserOut } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const { width, height } = Dimensions.get("screen");

function Login({ navigation }) {
  const [color, setColor] = useState("#6C77BF");
  const [color2, setColor2] = useState("#6C77BF");
  const [eyeState, setEyeState] = useState(true);
  const [isSecure, setIsSecure] = useState(true);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [formChecked, setFormChecked] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   // androidClientId: process.env.EXPO_PUBLIC_SHA_1_FINGERPRINT
  //   androidClientId:
  //     "1067545398456-jfc4hsmfrm3mhnjh6n35rqavijuroucs.apps.googleusercontent.com",
  // });

  const activeUser = useSelector(selectUser);
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      } else {
        return "Data not found";
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const { type, accessToken, user } = await GoogleSignIn.logInAsync({
        androidClientId:
          "1067545398456-jfc4hsmfrm3mhnjh6n35rqavijuroucs.apps.googleusercontent.com", // Replace with your Android client ID
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        // Successfully signed in with Google
        // Use the accessToken or user data as needed
        console.log("Google Sign-In success:", user);
      } else {
        console.log("Google Sign-In failed:", type);
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };
  const formValidation = () => {
    if (!form.identifier || !form.password) {
      setFormChecked(false);
    } else {
      setFormChecked(true);
    }
  };

  const handleChangeIdentifier = (content) => {
    setForm({
      ...form,
      identifier: content.trim(),
    });
  };

  const handleChangePassword = (content) => {
    setForm({
      ...form,
      password: content,
    });
  };

  const identifierValidation = (identifier) => {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;

    const phonePattern = /^[\d\+\-]+$/;

    if (emailPattern.test(identifier)) {
      return "email";
    } else if (phonePattern.test(identifier)) {
      return "phoneNumber";
    }
  };

  const handleLogin = async () => {
    try {
      let checkedIdentifier = null;
      let endPoint = null;
      if (identifierValidation(form.identifier) === "email") {
        checkedIdentifier = "email";
        endPoint = "emailLogin";
      } else if (identifierValidation(form.identifier) === "phoneNumber") {
        checkedIdentifier = "phoneNumber";
        endPoint = "phoneLogin";
      } else {
        return setError("please provide an email or a phone number");
      }
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/${endPoint}`,
        {
          [checkedIdentifier]: form.identifier,
          password: form.password,
        }
      );
      console.log(response.data.stateBlocked, "stateBlocked");
      if (response.data.stateBlocked === true) {
        dispatch(logUserOut());
        console.log(
          "Sorry, your account is banned. Please contact support for assistance."
        );
        Alert.alert(
          "Sorry, your account is banned. Please contact support for assistance."
        );
        return;
      }

      setError(null);
      storeData("token", response.data);

      dispatch(fetchUser(response.data)).then(async (response) => {
        await AsyncStorage.setItem("UserToken", response?.meta.arg);
      });

      navigation.navigate("Home");
    } catch (err) {
      if (err.response.status == "404") {
        setError("user does not exist");
      } else if (err.response.status == "401") {
        setError("incorrect password");
      } else {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    formValidation();
  }, [form, error]);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.loginPage}>
      <View style={styles.headers}>
        <View style={styles.logoContainer}>
          <Image source={Logo} alt="logo" style={styles.logo} />
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
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(content) => handleChangeIdentifier(content)}
            placeholder="email or phone number"
            style={styles.identifierInput}
          />
        </View>
        <View style={styles.identifierErrorContainer}>
          <Text style={styles.error}>
            {error === "user does not exist" ||
            error === "please provide an email or a phone number"
              ? error
              : null}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <PasswordIcon style={styles.inputIcon} />
          <TextInput
            autoCapitalize="none"
            onChangeText={(content) => handleChangePassword(content)}
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
        <View style={styles.passwordErrorContainer}>
          <Text style={styles.error}>
            {error === "incorrect password" ? error : null}
          </Text>
        </View>
        <Pressable
          activeOpacity={0.8}
          onPressIn={() => setColor2("darkblue")}
          onPressOut={() => setColor2("#6C77BF")}
          onPress={() => navigation.navigate("forgotPassword")}
        >
          <Text
            style={{
              color: color2,
              ...styles.forgotPassword,
              fontFamily: "FiraMono-Medium",
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
      </View>
      <TouchableOpacity
        style={styles.loginBtnContainer}
        activeOpacity={0.8}
        onPress={handleLogin}
        disabled={!formChecked}
      >
        <LinearGradient
          colors={formChecked ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]}
          locations={[0, 1]}
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnContent}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.bottomSection}>
        <View style={styles.createAcc}>
          <Text style={{ fontFamily: "FiraMono-Medium" }}>
            First time here?
          </Text>
          <Pressable
            activeOpacity={0.8}
            onPressIn={() => {
              setColor("darkblue");
              navigation.navigate("SignUp");
            }}
            onPressOut={() => setColor("#6C77BF")}
          >
            <Text style={{ color: color, fontFamily: "FiraMono-Medium" }}>
              Sign up
            </Text>
          </Pressable>
        </View>
        <View style={styles.loginWith}>
          <View style={styles.line}></View>
          <Text style={{ fontFamily: "FiraMono-Medium" }}>Or sign in with</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.quickLoginContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleGoogleSignIn()}
          >
            <View style={styles.quickLogin}>
              <View style={styles.icons}>
                <Image source={google} alt="google" style={styles.icons} />
              </View>
              <Text style={{ fontFamily: "FiraMono-Medium" }}>google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <View style={styles.quickLogin}>
              <View style={styles.icons}>
                <Image source={facebook} alt="facebook" style={styles.icons} />
              </View>
              <Text style={{ fontFamily: "FiraMono-Medium" }}>facebook</Text>
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
  logo: {
    height: height * 0.15,
    width: width * 0.61,
  },
  welcome: {
    fontSize: 24,

    textAlign: "center",
    fontFamily: "FiraMono-Bold",
  },
  paragraph: {
    color: "rgba(1,1,1,0.5)",
    textAlign: "center",
    width: 220,
    fontFamily: "FiraMono-Medium",
  },
  loginForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
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
    fontFamily: "FiraMono-Medium",
  },
  passwordInput: {
    backgroundColor: "#eef1f8",
    borderRadius: 5,
    height: 50,
    paddingLeft: 40,
    zIndex: 0,
    fontFamily: "FiraMono-Medium",
  },
  forgotPasswordContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -20,
  },
  identifierErrorContainer: {
    textAlign: "left",
  },
  passwordErrorContainer: {
    textAlign: "left",
  },
  error: {
    color: "red",
    fontFamily: "FiraMono-Medium",
  },
  forgotPassword: {
    textAlign: "right",
    fontFamily: "FiraMono-Medium",
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
    fontFamily: "FiraMono-Medium",
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
