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
import { useState } from "react";
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
    { label: "toyota", value: "toyota" },
    { label: "bmw", value: "bmw" },
    { label: "peugeot", value: "peugeot" },

    { label: "ford", value: "ford" },
    { label: "honda", value: "honda" },
    { label: "hyndai", value: "hyndai" },
    { label: "porch", value: "porch" },
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
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 3,
      borderColor: "grey",
      borderRadius: 4,
      color: "black",
      gap: 5,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: "lightgrey",
      borderRadius: 10,
      gap: 5,
      color: "black",
      marginTop: "1%",
      marginBottom: "1%",
      paddingRight: 30,
      justifyContent: "center",
      height: 40,
      width: width * 0.95,
    },
  };
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
    <View style={styles.editProfilePage}>
      <ScrollView>
        <Image
          source={img1}
          style={{
            width: width * 0.9,
            height: height * 0.4,
          }}
        />
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
        {brandError !== "" && (
          <Text style={styles.errorText}>{brandError}</Text>
        )}
        <TextInput
          value={form.model}
          onChangeText={handleModel}
          placeholder="Enter Your Car Model"
          style={styles.input}
        />
        {modelError !== "" && (
          <Text style={styles.errorText}>{modelError}</Text>
        )}

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
        <TextInput
          value={form.horsePower}
          keyboardType="number-pad"
          onChangeText={handleHorse}
          placeholder="Enter horse power for your car "
          style={styles.input}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: width * 0.9,
        }}
      >
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Arrowleft />
          <Text style={{ color: "blue", fontFamily: "FiraMono-Medium" }}>
            Back
          </Text>
        </Pressable>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => {
            handleNext();
          }}
        >
          <Text style={{ color: "blue", fontFamily: "FiraMono-Medium" }}>
            Next
          </Text>
          <Arrowright />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
    gap: 16,
    alignItems: "center",
  },
  introdcution1: {
    fontSize: 20,
    marginTop: height * 0.01,
  },
  input: {
    width: "100%",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "lightgrey",
    borderWidth: 2,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  textSvgContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.01,
  },
});
export default AddAgencyCar;
