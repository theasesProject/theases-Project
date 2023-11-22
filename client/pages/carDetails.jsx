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
import { useDispatch, useSelector } from "react-redux";
import car from "../assets/car2.png";
import { carDetail } from "../store/carFetch";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

const CarDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const carData = useSelector((state) => state.car.RentDetails);
  useEffect(() => {
    // {"elllllllllllllllllllllllllll",console.log(carData)}
  }, []);
  return (
    <View style={styles.CarDetails}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.carImage}
          source={{
            uri: carData?.Media[0]?.media,
          }}
        />
      </View>
      <View style={styles.description}>
        <TouchableOpacity
          onPress={() => {
            dispatch(carDetail(carData));
            navigation.navigate("Booking");
          }}
        >
          <Text>booking</Text>
        </TouchableOpacity>
        <Text style={styles.carModel}>{carData.model}</Text>
        <Text>{carData.description}</Text>
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
          <ScrollView
            style={styles.scrollContainer}
            nestedScrollEnabled={true}
            horizontal={true}
          >
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                type Of Energy
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {console.log(carData)}
                {carData?.typeOfFuel}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>price</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.price}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                period
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.period}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Advance
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.deposit}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                type of car
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.typevehicle}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Status
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.status}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                horsePower
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.horsePower}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                createdAt
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.createdAt}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                transportation
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.transportation ? "true" : "false"}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                address
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.address}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                company Number
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.companyNumber}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Company name
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.name}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    marginLeft: -height * 0.01,
  },
  container_n2: {
    gap: 10,
    paddingTop: 10,
  },
  descContainer: {
    marginLeft: 10,
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
    height: height,
    backgroundColor: "white",
  },
  carImage: {
    width: 430,
    borderRadius: 10,
    height: height * 0.25,
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
