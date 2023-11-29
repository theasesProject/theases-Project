import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useState, useEffect } from "react";
import { setNewCar } from "../store/carFetch";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/userSlice";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");
import img1 from "../assets/09.-Mechanic.png";
import Arrowleft from "../assets/Svg/arrowleft.svg";
import Arrowright from "../assets/Svg/arrowright.svg";
import Thinker from "../assets/Svg/thinking1.svg";
import Thinker2 from "../assets/Svg/thinker2.svg";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function AddAgencyCar() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const [form, setForm] = useState({
    ...useSelector((state) => state.car.NewCar),
    AgencyId: activeUser.id,
  });
  const [modelError, setModelError] = useState("");
  const [brandError, setBrandError] = useState("");

  const handleNext = () => {
    if (!form.brand) {
      setBrandError("Please enter your car brand");
    } else if (!form.model) {
      setModelError("Please enter your car model");
      setBrandError("");
    } else {
      setModelError("");
      dispatch(setNewCar(form));
      navigation.navigate("AddCarAgency2");
    }
  };

  const brand = [
    { label: "isuzu", value: "isuzu" },
    { label: "bmw", value: "bmw" },
    { label: "peugeot", value: "peugeot" },
    {label: "suzuki", value: "suzuki" },
    { label: "Mercedes", value: "Mercedes" },
    { label: "dacia", value: "dacia" },
    { label: "skoda", value: "skoda" },
    { label: "opel", value: "opel" },
    { label: "renault", value: "renault" },
    { label: "volkswagen", value: "volkswagen" },
    { label: "other", value: "other" },
  ];

  const handleModel = (model) => {
    setForm({ ...form, model: model });
  };
  const handleBrand = (brand) => {
    setForm({ ...form, brand });
  };

  const handleHorse = (horse) => {
    setForm({ ...form, horsePower: horse });
  };
  const handleDescription = (des) => {
    setForm({ ...form, description: des });
  };

  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 13,
      paddingVertical: height * 0.012,
      paddingHorizontal: 10,
      borderWidth: 3,
      borderColor: "grey",
      borderRadius: 4,
      color: "black",
      gap: 5,
      height: height * 0.06,
    },
    inputAndroid: {
      fontSize: 13,
      paddingHorizontal: 10,
      borderRadius: 10,
      color: "black",
      marginTop: "1%",
      paddingRight: 30,
      justifyContent: "center",
      height: height * 0.06,
      backgroundColor:"white"
    },
  };
  // useEffect(() => {
  //   const loadFonts = async () => {
  //     await Font.loadAsync({
  //       "FiraMono-Bold": FiraMonoBold,
  //       "FiraMono-Medium": FiraMonoMedium,
  //     });
  //   };

  //   loadFonts();
  // }, []);
  return (
    <View style={styles.editProfilePage}>
      <ScrollView>
        <Image source={img1} style={styles.mainImage} />
        <View style={styles.textSvgContainer}>
          <Text style={styles.introdcution1}>
            What are your car characteristics
          </Text>
          <Thinker />
        </View>
        <RNPickerSelect
          placeholder={{
            label: "Select Brand for your car ",
            value: null,
          }}
          items={brand}
          value={form.brandCar}
          onValueChange={(value) => handleBrand(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
        <View style={styles.errorContainer}>
        {brandError !== "" ? 
          <Text style={styles.errorText}>{brandError}</Text> : null
        }
        </View>
        <TextInput
          value={form.model}
          onChangeText={handleModel}
          placeholder="Enter Your Car Model"
          style={styles.input}
        />
        <View style={styles.errorContainer}>
        {modelError !== "" && (
          <Text style={styles.errorText}>{modelError}</Text>
        )}
        </View>

        <View style={styles.textSvgContainer}>
          <Text style={styles.introdcution1}>Optional information</Text>
          <Thinker2 />
        </View>
        <TextInput
          value={form.description}
          onChangeText={handleDescription}
          placeholder="Enter Some description for your Car"
          style={styles.input}
        />
        <View style={styles.errorContainer} />
        <TextInput
          value={form.horsePower}
          keyboardType="number-pad"
          onChangeText={handleHorse}
          placeholder="Enter horse power for your car "
          style={styles.input}
        />
      </ScrollView>
      <View style={styles.bottomNavigation}>
        <Pressable
          style={styles.arrowLeftCss}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Arrowleft />
          <Text style={styles.textCss}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.arrowRightCss}
          onPress={() => {
            handleNext();
          }}
        >
          <Text style={styles.textCss}>Next</Text>
          <Arrowright />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
    paddingHorizontal: width * 0.03,
    width,
    backgroundColor:"#F2F2F2"
  },
  introdcution1: {
    fontSize: 20,
    fontWeight:"bold",
    // marginTop: height * 0.01,
    color:"#6a78c1"
  },
  input: {
    width: "100%",
    borderRadius: 10,
    height: height * 0.06,
    paddingHorizontal: 10, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    fontSize: 16,
    backgroundColor:"white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    // marginTop: 5,
    paddingHorizontal:width * 0.02
  },
  textSvgContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  mainImage: {
    width: width * 0.9,
    height: height * 0.38,
  },
  bottomNavigation: {
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowLeftCss: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  arrowRightCss: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  textCss: { color: "#6C77BF", fontFamily: "FiraMono-Medium" },
  errorContainer:{
    height:height * 0.03,
    justifyContent: "center",
  }
});
export default AddAgencyCar;
