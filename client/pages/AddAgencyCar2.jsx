import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
import CheckBox from "react-native-check-box";
import { useDispatch, useSelector } from "react-redux";
import { setNewCar } from "../store/carFetch";
const {width, height} = Dimensions.get("screen")
import Arrowleft from "../assets/Svg/arrowleft.svg";
import Arrowright from "../assets/Svg/arrowright.svg";
import Image2 from "../assets/moneyImage.png"
import Dollar from "../assets/dollar.png"

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
      <ScrollView>
        <Image source={Image2} style={{
            width: width * 0.9,
            height: height * 0.4,
          }}/>
        <View style={styles.textSvgContainer}>
          <Text style={styles.introdcution1}>
            What is the price for the car
          </Text>
          <Image source={Dollar} style={{width:width * 0.08,height:height*0.04}}/>
        </View>
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
            navigation.navigate("AddAgencyCar")
          }}
        >
          <Arrowleft />
          <Text style={{ color: "blue" }}>Back</Text>
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
          <Text style={{ color: "blue" }}>Next</Text>
          <Arrowright />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    editProfilePage: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
      flexDirection: "column",
      backgroundColor: "white",
      gap: 16,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    introdcution: {
      textAlign: "center",
      fontSize: 18,
      padding: 20,
    },
    introdcution1: {
      textAlign: "center",
      fontSize: 22,
      padding: 20,
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
    picture: {
      flexDirection: "row",
  
      alignItems: "center",
  
      borderColor: "yellow",
      borderRadius: 5,
      marginBottom: "5%",
    },
    profilePictureContainer: {
      width: "100%",
    },
    profilePicture: {
      width: 80,
      height: 40,
  
      borderWidth: 2,
      borderColor: "rgb(219, 217, 224)",
      backgroundColor: "white",
    },
    input1: {
      padding: 5,
      fontSize: 25,
      backgroundColor: "lightgrey",
      textAlign: "center",
      borderRadius: 8,
      color: "white",
    },
    input2: {
      fontSize: 18,
      justifyContent: "flex-start",
      color: "black",
      borderColor: "lightgrey",
      width: "100%",
      height: 40,
      borderRadius: 8,
      textAlign: "center",
      padding: 4,
      borderWidth: 2,
    },
    input3: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: 10,
      height: 40,
  
      borderColor: "lightgrey",
      marginBottom: "5%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      padding: 10,
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginTop: 5,
    },
    addImgTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    imgsContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      gap: 10,
      backgroundColor: "white",
  
      height: 100,
    },
    imgContainer: {
      position: "relative",
      backgroundColor: "#DBDBDB",
      width: 100,
      height: 70,
    },
    xBtn: {
      position: "absolute",
      zIndex: 0,
      width: 25,
      height: 25,
      right: 0,
    },
    img: {
      zIndex: -1,
      width: "100%",
      height: "100%",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalText: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      color: "green",
    },
    textSvgContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      marginTop: height * 0.01,
    },
  });

export default AddAgencyCar2;
