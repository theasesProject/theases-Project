import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import car from "../assets/car2.png";
const { height, width } = Dimensions.get("screen");

const CarDetails = () => {
  const carData = useSelector((state) => state.car.RentDetails);
  useEffect(() => {}, []);
  return (
    <View style={styles.CarDetails}>
      {/* <ScrollView> */}
      <View style={styles.imageContainer}>
        <Image style={styles.carImage} source={car} />
      </View>
      <View style={styles.description}>
        <Text style={styles.carModel}>{carData.model}</Text>
        <Text
          style={{
            color: "#00ab44",
            paddingTop: height * 0.01,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          available
        </Text>
        <View style={styles.container_n2}>
          <Text style={{ fontSize: 18.5, fontWeight: "600" }}>
            Specification
          </Text>
          <ScrollView style={styles.scrollContainer} nestedScrollEnabled={true} horizontal={true}>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Gas Pump
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Full</Text>
            </View>
          </ScrollView>
        </View>
        {/* <Text>{carData.characteristics}</Text>
          <Text>{carData.createdAt}</Text>
          <Text>{carData.deposit}</Text>
          <Text>{carData.description}</Text>
          <Text>{carData.horsePower}</Text>
          <Text>{carData.period}</Text>
          <Text>{carData.price}</Text>
          <Text>{carData.status}</Text>
          <Text>{carData.typeOfFuel}</Text>
          <Text>{carData.typevehicle}</Text>
          <Text>{carData.Agency.transportation ? "true" : "false"}</Text>
          <Text>{carData.Agency.address}</Text>
          <Text>{carData.Agency.name}</Text>
          <Text>{carData.Agency.companyNumber}</Text> */}
        {/* <Text>{carData.CarMedia[0]?carData.CarMedia:"no Images"} */}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  scrollContainer:{
    marginLeft:10
  },
  container_n2: {
    gap: 10,
    paddingTop: 10,
  },
  descContainer: {
    marginLeft:10,
    gap: 10,
    padding: 5,
    alignItems: "center",
    height: height * 0.075,
    borderWidth: width * 0.001,
    borderColor: "#rgb(138, 114, 185)",
    width: width * 0.32,
    borderRadius: 4,
    backgroundColor: "#dadcea",
  },
  description: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.04,
  },
  carModel: {
    fontSize: 23,
    fontWeight: "600",
  },
  CarDetails: {
    height: height ,
    backgroundColor: "rgb(233, 231, 238)",
    // justifyContent: "center",
  },
  carImage: {
    // padding: 10,
    width: 430,
    borderRadius: 10,
    height: height * 0.3,
    objectFit: "contain",
  },
  imageContainer: {
    width: 250,
    paddingHorizontal: 200,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default CarDetails;
