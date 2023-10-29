import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import IdentifierIcon from "../assets/Svg/user-normal.svg";
import Logo from "../assets/tempLogo.png";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import axios from "axios";
import { DOMAIN_NAME } from "../env";

const ForgotPassword = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [inputChecked, setInputChecked] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      let endPoint = null;
      if (identifierValidation(identifier) === "email") {
        endPoint = "getOneByEmail";
      } else if (identifierValidation(identifier) === "phoneNumber") {
        endPoint = "getOneByPhone";
      } else {
        return setError("please provide an email or a phone number");
      }
      const response = await axios.get(
        `http://${DOMAIN_NAME}:5000/api/users/${endPoint}/${identifier}`
      );
      if (response.data === "user exists") {
        navigation.navigate("confirmIdentity");
      }
      setError(null);
    } catch (err) {
      if (err.response.status == "404") {
        setError("user does not exist");
      } else {
        console.error(err.message);
      }
    }
  };

  const inputValidation = () => {
    if (!identifier) {
      setInputChecked(false);
    } else {
      setInputChecked(true);
    }
  };

  const identifierValidation = (identifier) => {
    // Regular expression for email
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;

    // Regular expression for phone number (this example assumes a simple format)
    const phonePattern = /^[\d\+\-]+$/;

    if (emailPattern.test(identifier)) {
      return "email";
    } else if (phonePattern.test(identifier)) {
      return "phoneNumber";
    }
  };

  useEffect(() => {
    inputValidation();
  }, [identifier]);

  return (
    <View style={styles.forgotPasswordPage}>
      <View style={styles.logoContainer}>
        <Image source={Logo} alt="logo" />
      </View>
      <View style={styles.inputContainer}>
        <IdentifierIcon style={styles.inputIcon} />
        <TextInput
          autoCapitalize="none"
          onChangeText={(content) => setIdentifier(content.trim())}
          placeholder="email or phone number"
          style={styles.identifierInput}
        />
        <View style={styles.identifierErrorContainer}>
          <Text style={styles.error}>
            {error === "user does not exist" ||
            error === "please provide an email or a phone number"
              ? error
              : null}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.loginBtnContainer}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={!inputChecked}
        >
          <LinearGradient
            colors={
              inputChecked ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]
            }
            locations={[0, 1]}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnContent}>Send the code</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ForgotPassword.navigationOptions = {
  title: "ForgotPassword",
};

const styles = StyleSheet.create({
  forgotPasswordPage: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    gap: 50,
  },
  logoContainer: {
    padding: 50,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  inputIcon: {
    position: "absolute",
    top: 13,
    left: "2%",
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
  identifierErrorContainer: {
    textAlign: "left",
  },
  error: {
    color: "red",
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
});
export default ForgotPassword;
