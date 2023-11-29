import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
import CheckBox from "react-native-check-box";
import { useDispatch, useSelector } from "react-redux";
import { setNewCar } from "../store/carFetch";
const { width, height } = Dimensions.get("screen");
import Arrowleft from "../assets/Svg/arrowleft.svg";
import Arrowright from "../assets/Svg/arrowright.svg";
import Image2 from "../assets/moneyImage.png";
import Dollar from "../assets/dollar.png";

function AddAgencyCar2() {
  const [form, setForm] = useState(useSelector((state) => state.car.NewCar));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [priceError, setPriceError] = useState("");
  const [priceErrorWeekly, setPriceWeeklyError] = useState("");
  const [priceErrorMonthly, setPriceMonthlyError] = useState("");

  const handlePrice = (price) => {
    setForm({ ...form, price });
  };
  const handlePriceWeekly = (price) => {
    setForm({ ...form, priceWeekly: price });
  };
  const handlePriceMonthly = (price) => {
    setForm({ ...form, priceMonthly: price });
  };

  const handleNext = () => {
    if (form.price === "") {
      setPriceError("Please enter your car price ");
    } else if (priceErrorWeekly === "") {
      setPriceWeeklyError("Please enter your car price of the week");
    } else if (priceErrorMonthly === "") {
      setPriceMonthlyError("Please enter your car price of the month");
    } else {
      dispatch(setNewCar(form));
      navigation.navigate("AddCarAgency3");
    }
  };

  return (
    <View style={styles.editProfilePage}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Image source={Image2} style={styles.mainImage} />
        <View style={styles.textSvgContainer}>
          <Text style={styles.introdcution1}>
            What is the price for the car
          </Text>
          <Image source={Dollar} style={styles.dollarSign} />
        </View>
        <View style={{ ...styles.form, gap: priceError ? 0 : height * 0.025 }}>
          <TextInput
            value={form.price}
            keyboardType="number-pad"
            onChangeText={handlePrice}
            placeholder=" price by day"
            style={styles.input}
          />
          {priceError !== "" && (
            <Text style={styles.errorText}>{priceError}</Text>
          )}
          <TextInput
            value={form.priceWeekly}
            keyboardType="number-pad"
            onChangeText={handlePriceWeekly}
            placeholder="price by week"
            style={styles.input}
          />
          {priceError !== "" && (
            <Text style={styles.errorText}>{priceErrorWeekly}</Text>
          )}
          <TextInput
            value={form.priceMonthly}
            keyboardType="number-pad"
            onChangeText={handlePriceMonthly}
            placeholder="price by month"
            style={styles.input}
          />
          {priceError !== "" && (
            <Text style={styles.errorText}>{priceErrorMonthly}</Text>
          )}
          <CheckBox
            checkBoxColor="#6a78c1"
            style={styles.input3}
            onClick={() => {
              setForm({ ...form, warrantyInsurance: !form.warrantyInsurance });
            }}
            leftText={"warranty Insurance"}
            leftTextStyle={{
              color: "rgb(130, 124, 140)",
              fontSize: 16,
            }}
            isChecked={form.warrantyInsurance}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomNavigation}>
        <Pressable
          style={styles.leftArrow}
          onPress={() => {
            navigation.navigate("AddAgencyCar");
          }}
        >
          <Arrowleft />
          <Text style={styles.textCss}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.rightArrow}
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
    backgroundColor: "#F2F2F2",
  },
  introdcution1: {
    textAlign: "center",
    fontSize: 20,
    paddingVertical: height * 0.01,
    fontWeight: "bold",
    color: "#6a78c1",
  },
  input: {
    width: "100%",
    borderRadius: 10,
    height: height * 0.06,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "white",
    // marginTop: height * 0.01,
  },
  profilePictureContainer: {
    width: "100%",
  },
  input3: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "lightgrey",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // marginTop: height * 0.01,
    height: height * 0.06,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingHorizontal: width * 0.02,
 
  },
  textSvgContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  mainImage: {
    width: width * 0.9,
    height: height * 0.4,
  },
  dollarSign: { width: width * 0.095, height: height * 0.04 },
  form: {},
  bottomNavigation: {
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor:"red"
  },
  leftArrow: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  rightArrow: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textCss: { color: "#6C77BF",  },
});

export default AddAgencyCar2;
