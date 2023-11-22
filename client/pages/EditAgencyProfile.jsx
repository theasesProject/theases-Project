import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import Logo from "../assets/tempLogo.png";
import { LinearGradient } from "expo-linear-gradient";
import BackArrow from "../assets/Svg/left-long-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../store/userSlice";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import Open from "../assets/Svg/eyeOpen.svg";
import Close from "../assets/Svg/eyeClose.svg";
const { width, height, fontScale } = Dimensions.get("screen");

const EditAgencyProfile = ({ navigation }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const activeUser = useSelector(selectUser);
  const activeAgency = activeUser.Agency;
  const [currentPassword, setCurrentPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    transportation: activeAgency.transportation,
  });
  const [formChecked, setFormChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const deposit = [
    "0%",
    "10%",
    "15%",
    "20%",
    "25%",
    "30%",
    "35%",
    "40%",
    "45%",
    "50%",
    "100%",
  ];
  const dispatch = useDispatch();

  const handleChangeAgencyName = (content) => {
    if (content) {
      setForm({ ...form, name: content });
      setUpdate(!update);
    } else {
      let copy = form;
      delete copy.name;
      setForm(copy);
      setUpdate(!update);
    }
  };

  const handleChangeAgencyPhonneNumber = (content) => {
    if (content) {
      setForm({ ...form, companyNumber: content });
      setUpdate(!update);
    } else {
      let copy = form;
      delete copy.companyNumber;
      setForm(copy);
      setUpdate(!update);
    }
  };

  const handleChangeDeposit = (content) => {
    if (content) {
      setForm({ ...form, deposit: content });
      setUpdate(!update);
    } else {
      let copy = form;
      delete copy.deposit;
      setForm(copy);
      setUpdate(!update);
    }
  };

  const handleDropdownSelect = (value) => {
    if (value == "select") {
      return handleChangeDeposit(0);
    }
    handleChangeDeposit(Number(value.split("%")[0]));
  };

  const handleChangeDelivery = () => {
    setForm({ ...form, transportation: !form.transportation });
    setUpdate(!update);
  };

  const formValidation = () => {
    if (
      Object.keys(form).length < 2 &&
      form.transportation === activeAgency.transportation
    ) {
      setFormChecked(false);
    } else {
      setFormChecked(true);
    }
  };

  const handleSave = async () => {
    try {
      if (!currentPassword) {
        return setError("insert Your password");
      }
      setError(null);
      const passCheck = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/passwordCheck/${activeUser.id}`,
        { password: currentPassword }
      );
      if (passCheck.data === "no match") {
        return setError("Your password is incorrect");
      }
      setError(null);
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/agency/UpdateAgency/${activeAgency.id}`,
        form
      );
      setForm({});
      setUpdate(!update);
      setCurrentPassword("");
      dispatch(setUser({ ...activeUser, Agency: response.data }));
      navigation.navigate("AgencyProfile");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    formValidation();
  }, [update]);

  return (
    <View style={styles.editAgencyProfilePage}>
      <View style={styles.navBar}>
        <BackArrow
          style={styles.backArrow}
          onPress={() => navigation.navigate("AgencyProfile")}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image source={Logo} alt="logo" style={styles.logo} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={activeAgency.name}
          onChangeText={(content) => handleChangeAgencyName(content)}
        />
        <TextInput
          style={styles.input}
          placeholder={activeAgency.companyNumber}
          onChangeText={(content) => handleChangeAgencyPhonneNumber(content)}
        />
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>change your deposit value...</Text>
          <SelectDropdown
            onSelect={(selectedItem) => {
              handleDropdownSelect(selectedItem);
            }}
            defaultValue={activeAgency.deposit}
            buttonStyle={styles.dropdown}
            dropdownStyle={styles.dropdownOptions} // adjust the height as needed
            data={deposit}
            buttonTextStyle={{ left: -20 }}
            defaultButtonText={<Text>{dropDownOpen ? "🔼" : "🔽"}</Text>}
            dropdownIconPosition="right"
            onFocus={() => setDropDownOpen(true)}
            onBlur={() => setDropDownOpen(false)}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: width * 0.025,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Text>Delivery:</Text>
          <Switch
            style={styles.switchBtn}
            value={form.transportation}
            thumbColor={form.transportation ? "#6C77BF" : "#88b4e2"}
            onChange={handleChangeDelivery}
          />
        </View>
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
        <View style={styles.passwordErrorContainer}>
          <Text style={styles.error}>{error ? error : null}</Text>
        </View>
        <View style={styles.line} />
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!formChecked}
          onPress={handleSave}
        >
          <LinearGradient
            colors={
              formChecked ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]
            }
            locations={[0, 1]}
            style={styles.saveBtn}
          >
            <Text style={styles.saveChangesBtnContent}>save changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  editAgencyProfilePage: {
    flex: 1,
  },
  navBar: {
    width: width,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    zIndex: 1,
    backgroundColor: "#F2F2F2",
  },
  backArrow: {
    width: width * 0.05,
    height: height * 0.02,
  },
  scrollView: {
    paddingHorizontal: width * 0.05,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: height * 0.07,
  },
  logo: {
    height: height * 0.15,
    width: width * 0.61,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: height * 0.065,
    paddingHorizontal: width * 0.025,
    fontSize: 16,
    marginBottom: height * 0.015,
    zIndex: -1,
  },
  dropdownContainer: {
    position: "relative",
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,

    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTitle: {
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: "white",
    height: 47,
    width: "30%",
  },
  dropdownOptions: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  dropDownIcon: {
    position: "absolute",
    width: width * 0.05,
    height: height * 0.02,
    zIndex: 1,
  },
  switchBtn: {},
  line: {
    height: 1,
    backgroundColor: "#e5e6e8",
    marginVertical: height * 0.01,
  },
  eye: {
    position: "absolute",
    top: height * 0.02,
    right: "3%",
    width: "10%",
    height: height * 0.02,
    zIndex: 1,
    padding: ((height + width) / 2) * 0.017,
  },
  passwordErrorContainer: {
    textAlign: "left",
  },
  error: {
    color: "red",
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
    marginVertical: height * 0.03,
  },
  saveChangesBtnContent: {
    color: "white",
    fontSize: 18,
  },
});

export default EditAgencyProfile;
