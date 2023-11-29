import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import carImage from "../assets/car2.png";
import { useDispatch } from "react-redux";
import { carDetail } from "../store/carFetch";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");

function AllCars({ cars }) {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {cars?.map((car, i) => {
        return (
          <View style={styles.card} key={i}>
            {car?.carImage?.media ? (
              // console.log('ele in map',car.car),
              <Image
                style={styles.carImage}
                source={{
                  uri: car?.carImage?.media,
                }}
              />
            ) : (
              <Image style={styles.carImage} source={carImage} />
            )}
            <View style={styles.informationView}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Model:</Text>
                <Text style={{ fontWeight: "500" }}>{car?.car?.brand}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Availability:</Text>
                <Text
                  style={{
                    color: car?.car?.status ? "green" : "red",
                    fontWeight: "500",
                  }}
                >
                  {car?.car?.status}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Price per day:</Text>
                <Text style={{ fontWeight: "700" }}>{car?.car?.price}$</Text>
              </View>
            </View>
            <TouchableOpacity
            style={styles.bookButton}
              onPress={() => {
                dispatch(carDetail(car.car));
                navigation.navigate("Booking");
              }}
            >
              <Text style={{fontWeight:"800",fontSize:18,color:"white"}}>Book Now!</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: height * 0.4,
    borderRadius: 15,
    padding: height * 0.03,
    display: "flex",
    alignItems: "center",
    marginTop: height * 0.04,
    borderBlockColor:"blue"
  },
  carImage: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
  },
  informationView: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "7%",
    gap: 5,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  infoTitle: {
    fontWeight: "500",
    color: "#6a71c1",
  },
  bookButton:{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: height * 0.01,
    backgroundColor:"#6a71c1",
    marginTop: "5%",
    borderRadius:10
  }
});

export default AllCars;
