import * as Rn from "react-native";
import { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import React from "react";
import UserNormal from "../assets/Svg/user-normal.svg";
import Email from "../assets/Svg/email.svg";
import Lock from "../assets/Svg/lock.svg";
import Open from "../assets/Svg/eyeOpen.svg";
import Close from "../assets/Svg/eyeClose.svg";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Rn.Dimensions.get("window");
import GooglePng from "../assets/googleIcon.png";
import FaceBookPng from "../assets/facebookIcon.png";
const SignUp = ({ navigation, props }) => {
  const inputRefName = useRef();
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();
  const inputRefConfirmed = useRef();
  const [checkUp, setCheckUp] = useState(true);
  const SignUp = (inputForm) => {
    inputForm.password === confirm && !checkUp ? console.log(inputForm) : null;
  };
  const [confirm, setConfirm] = useState("");
  const [inputForm, setInputForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedError, setConfirmedError] = useState("");

  const [color, setColor] = useState("#6C77BF");
  const [PassState, setPassState] = useState(true);
  const [PassState2, setPassState2] = useState(true);
  const [isSecure, setIsecure] = useState(true);
  const [isSecure2, setIsecure2] = useState(true);

  const checkInput = (value, placeholder) => {
    if (value === "") {
      if (placeholder === "Username") {
        setNameError("Username cannot be empty.");
      } else if (placeholder === "Email") {
        setEmailError("Email cannot be empty.");
      } else if (placeholder === "Password") {
        setPasswordError("Password cannot be empty.");
      } else if (placeholder === "Confirm Your Password") {
        setConfirmedError("Please confirm your password.");
      }
    } else {
      if (placeholder === "Username") {
        if (value.length < 3 || value.length > 30) {
          setNameError("Username should be between 3 and 30 characters long.");
        } else if (!/^[a-z0-9_-]+$/i.test(value)) {
          setNameError(
            "Username should only contain alphanumeric characters, hyphens, and underscores."
          );
        } else {
          setNameError("");
        }
        // For uniqueness check, you need to implement a function that checks the username against a database of existing usernames.
      } else if (placeholder === "Email") {
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9-]*\.com$/;

        if (!emailRegex.test(value.trim())) {
          setEmailError("Email should match the email format.");
        } else {
          setEmailError("");
        }
        // For uniqueness check, you need to implement a function that checks the email against a database of existing emails.
      } else if (placeholder === "Password") {
        if (value.length < 8) {
          setPasswordError("Password should be at least 8 characters long.");
        }
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        if (!passwordRegex.test(value)) {
          setPasswordError(
            "Password should include a mix of uppercase letters, lowercase letters, numbers, and special characters."
          );
        } else {
          setPasswordError("");
        }
      } else if (placeholder === "Confirm Your Password") {
        if (inputForm.password !== confirm) {
          setConfirmedError("Your Password Does not match .");
        } else {
          setConfirmedError("");
        }
      }
    }
  };

  return (
    <Rn.ScrollView style={styles.container}>
      <Rn.View style={styles.SignUpContainer}>
        <Rn.Text style={styles.header}>Create New Account</Rn.Text>
        <Rn.Text style={styles.subheader}>
          Set up your username and password. You can always change it later.
        </Rn.Text>
        <Rn.View style={styles.InputContainer}>
          <Rn.View style={styles.inputHolder}>
            <UserNormal style={styles.icon} />
            <Rn.TextInput
              autoCapitalize="none"
              ref={inputRefName}
              value={inputForm.userName}
              onBlur={() => {
                checkInput(inputForm.userName, "Username");
              }}
              onFocus={() => inputRefName.current.focus()}
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => {
                setInputForm({ ...inputForm, userName: text.trim() });
                setCheckUp(
                  !!text &&
                    !!inputForm.email &&
                    !!inputForm.password &&
                    !!confirm
                );
              }}
            />
          </Rn.View>
          {nameError ? (
            <Rn.Text style={{ color: "red" }}>{nameError}</Rn.Text>
          ) : null}
          <Rn.View style={styles.inputHolder}>
            <Email style={styles.icon} />
            <Rn.TextInput
              ref={inputRefEmail}
              value={inputForm.email}
              onBlur={() => {
                checkInput(inputForm.email, "Email");
              }}
              autoCapitalize="none"
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => {
                setInputForm({ ...inputForm, email: text.trim() });
                setCheckUp(
                  !!inputForm.userName &&
                    !!text &&
                    !!inputForm.password &&
                    !!confirm
                );
              }}
            />
          </Rn.View>
          {emailError ? (
            <Rn.Text style={{ color: "red" }}>{emailError}</Rn.Text>
          ) : null}
          <Rn.View style={styles.inputHolder}>
            <Lock style={styles.icon} />
            <Rn.TextInput
              ref={inputRefPassword}
              onBlur={() => {
                checkInput(inputForm.password, "Password");
              }}
              Lock
              value={inputForm.password}
              autoCapitalize="none"
              style={styles.input}
              placeholder="Password"
              secureTextEntry={isSecure}
              onChangeText={(text) => {
                setInputForm({ ...inputForm, password: text });
                setCheckUp(
                  !!inputForm.userName &&
                    !!inputForm.email &&
                    !!text &&
                    !!confirm
                );
              }}
            />
            {!PassState ? (
              <Open
                style={styles.eyes}
                onPress={() => {
                  setPassState(!PassState), setIsecure(!isSecure);
                }}
              />
            ) : (
              <Close
                style={styles.eyes}
                onPress={() => {
                  setPassState(!PassState), setIsecure(!isSecure);
                }}
              />
            )}
          </Rn.View>
          {passwordError ? (
            <Rn.Text style={{ color: "red" }}>{passwordError}</Rn.Text>
          ) : null}

          <Rn.View style={styles.inputHolder}>
            <Lock style={styles.icon} />
            <Rn.TextInput
              ref={inputRefConfirmed}
              onBlur={() => {
                checkInput(confirm, "Confirm Your Password");
              }}
              autoCapitalize="none"
              value={confirm}
              style={styles.input}
              placeholder="Confirm Your Password"
              secureTextEntry={isSecure2}
              onChangeText={(text) => {
                setConfirm(text);
                setCheckUp(
                  !!inputForm.userName &&
                    !!inputForm.email &&
                    !!inputForm.password &&
                    !!text
                );
              }}
            />
            {!PassState2 ? (
              <Open
                style={styles.eyes}
                onPress={() => {
                  setPassState2(!PassState2), setIsecure2(!isSecure2);
                }}
              />
            ) : (
              <Close
                style={styles.eyes}
                onPress={() => {
                  setPassState2(!PassState2), setIsecure2(!isSecure2);
                }}
              />
            )}
          </Rn.View>
          {confirmedError ? (
            <Rn.Text style={{ color: "red" }}>{confirmedError}</Rn.Text>
          ) : null}
        </Rn.View>
        <Rn.TouchableOpacity
          disabled={!checkUp}
          activeOpacity={0.8}
          onPress={() => {
            inputForm.password === confirm ? SignUp(inputForm) : null;
          }}
        >
          <LinearGradient
            colors={checkUp ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]}
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
    </Rn.ScrollView>
  );
};
const styles = StyleSheet.create({
  eyes: {
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
  SignUpContainer: {
    height: height,
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    width: width * 0.38,
    borderWidth: 0,
    borderColor: "grey",
    borderRadius: 10,
    // overflow: "hidden",
    flexDirection: "row",
    gap: width * 0.01,
    backgroundColor: "#F3F4F6",
  },
  extraSignContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 22,
  },
  GoogleCss: {
    height: height * 0.038,
    width: width * 0.069,
  },
  FacebookCss: {
    height: height * 0.036,
    width: width * 0.07,
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  InputContainer: {
    height: "auto",
    gap: 10,
    width: "90%",
    display: "flex",
    flexDirection: "column",
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