import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import Open from "../assets/Svg/eyeOpen.svg";
import Close from "../assets/Svg/eyeClose.svg";
import cloudinaryUpload from "../HelperFunctions/Cloudinary";
import * as ImagePicker from "expo-image-picker";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
const EditProfile = ({ navigation }) => {
  const activeUser = useSelector(selectUser);
  const [color, setColor] = useState("#6C77BF");
  const [form, setForm] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);
  const [isSecure3, setIsSecure3] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [eyeState2, setEyeState2] = useState(true);
  const [eyeState3, setEyeState3] = useState(true);
  const [error, setError] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [formChecked, setFormChecked] = useState(false);
  const [img, setImg] = useState(activeUser?.avatar);

  const dispatch = useDispatch();

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      try {
        const cloudinaryResponse = await cloudinaryUpload(selectedAsset.uri);

        console.log("img link: ", cloudinaryResponse);
        setImg(cloudinaryResponse);
        setForm({ ...form, avatar: cloudinaryResponse });
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    }
  };

  const handleChangeUserName = (content) => {
    if (!content) {
      return delete form.userName;
    }
    setForm({ ...form, userName: content });
  };

  const handleChangeEmail = (content) => {
    if (!content) {
      return delete form.email;
    }
    setForm({ ...form, email: content });
  };

  const handleChangePhoneNumber = (content) => {
    if (!content) {
      return delete form.phoneNumber;
    }
    setForm({ ...form, phoneNumber: content });
  };

  const formValidation = () => {
    if (Object.keys(form).length < 1) {
      setFormChecked(false);
    } else {
      setFormChecked(true);
    }
  };

  const handleChangePassword = (content) => {
    if (!content) {
      return delete form.password;
    }
    setForm({ ...form, password: content });
  };

  const handleSave = async () => {
    if (!currentPassword) {
      return setError("insert Your password");
    }
    if (form.password && form.password !== confirmPassword) {
      return setMatchingError("passwords don't match");
    }
    setMatchingError(null);
    setError(null);
    try {
      const passCheck = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/passwordCheck/${activeUser.id}`,
        { password: currentPassword }
      );
      if (passCheck.data === "no match") {
        return setError("Your password is incorrect");
      }
      setError(null);
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/update/${activeUser.id}`,
        form
      );
      dispatch(setUser(response.data));
      setForm({});
      setCurrentPassword("");
      setConfirmPassword("");
      navigation.navigate("Userprofile");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    formValidation();
  }, [form]);

  return (
    <View style={styles.editProfilePage}>
      <TouchableOpacity
        style={styles.profilePictureContainer}
        onPress={selectImage}
      >
        <Image
          source={{
            uri: img,
          }}
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={activeUser?.userName}
        onChangeText={(content) => handleChangeUserName(content)}
      />
      <TextInput
        style={styles.input}
        placeholder={activeUser?.email}
        onChangeText={(content) => handleChangeEmail(content)}
      />
      <TextInput
        style={styles.input}
        placeholder={activeUser?.phoneNumber}
        onChangeText={(content) => handleChangePhoneNumber(content)}
      />
      <View style={styles.line} />
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          onChangeText={(content) => setCurrentPassword(content)}
          value={currentPassword}
          placeholder="insert your current password"
          style={
            error
              ? { ...styles.input, borderColor: "red", borderWidth: 1 }
              : styles.input
          }
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
      <View style={styles.errorsContainer}>
        <View style={styles.passwordErrorContainer}>
          <Text style={styles.error}>{error ? error : null}</Text>
        </View>
        <Pressable
          activeOpacity={0.8}
          onPressIn={() => setColor("darkblue")}
          onPressOut={() => setColor("#6C77BF")}
          onPress={() => navigation.navigate("forgotPassword")}
        >
          <Text style={{ color: color, ...styles.forgotPassword }}>
            Forgot Password?
          </Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          onChangeText={(content) => handleChangePassword(content)}
          placeholder="insert new password"
          value={form.password}
          style={
            matchingError
              ? { ...styles.input, borderColor: "red", borderWidth: 1 }
              : styles.input
          }
          secureTextEntry={isSecure2}
        />
        {!eyeState2 ? (
          <Open
            style={styles.eye}
            onPress={() => {
              setEyeState2(!eyeState2), setIsSecure2(!isSecure2);
            }}
          />
        ) : (
          <Close
            style={styles.eye}
            onPress={() => {
              setEyeState2(!eyeState2), setIsSecure2(!isSecure2);
            }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          onChangeText={(content) => setConfirmPassword(content)}
          value={confirmPassword}
          placeholder="confirm your new password"
          style={
            matchingError
              ? { ...styles.input, borderColor: "red", borderWidth: 1 }
              : styles.input
          }
          secureTextEntry={isSecure3}
        />
        {!eyeState3 ? (
          <Open
            style={styles.eye}
            onPress={() => {
              setEyeState3(!eyeState3), setIsSecure3(!isSecure3);
            }}
          />
        ) : (
          <Close
            style={styles.eye}
            onPress={() => {
              setEyeState3(!eyeState3), setIsSecure3(!isSecure3);
            }}
          />
        )}
      </View>
      <View style={styles.passwordErrorContainer}>
        <Text style={styles.error}>{matchingError ? matchingError : null}</Text>
      </View>
      <View style={styles.line} />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!formChecked}
        onPress={handleSave}
      >
        <LinearGradient
          colors={formChecked ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]}
          locations={[0, 1]}
          style={styles.saveBtn}
        >
          <Text style={styles.saveChangesBtnContent}>save changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

EditProfile.navigationOptions = {
  title: "editProfile",
};

const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },
  profilePictureContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6a78c1",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "FiraMonoMedium",
  },
  eye: {
    position: "absolute",
    top: 15,
    right: "3%",
    width: "10%",
    height: 20,
    zIndex: 1,
    padding: 10,
  },
  errorsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordErrorContainer: {
    textAlign: "left",
  },
  error: {
    color: "red",
    fontFamily: "FiraMonoMedium",
  },
  forgotPassword: {
    textAlign: "right",
    fontFamily: "FiraMonoMedium",
  },
  line: {
    height: 1,
    backgroundColor: "#e5e6e8",
    marginVertical: 20,
  },
  saveBtn: {
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  saveChangesBtnContent: {
    color: "white",
    fontSize: 18,
    fontFamily: "FiraMonoMedium",
  },
});

export default EditProfile;
