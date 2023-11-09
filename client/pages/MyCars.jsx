import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getallCarByAgency, deletedAgencyCar } from "../store/carFetch";
import { logUserOut, selectUser } from "../store/userSlice";
import NavBarAgency from "../components/NavBarAgency";
const { height, width } = Dimensions.get("screen");
import GreyHeart from "../assets/Svg/car-svgrepo-com.svg";
import car2 from "../assets/car2.png";
import star from "../assets/star.jpg";
import deleteImge from "../assets/delete.jpg";
import { Swipeable } from "react-native-gesture-handler"; // Import Swipeable
import { useNavigation, useRoute } from "@react-navigation/native";

function MyCars() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const agencyCars = useSelector((state) => state.car.agencyCar);

  useEffect(() => {
    dispatch(getallCarByAgency(activeUser.Agency.UserId));
  }, [dispatch]);

  const handleDeleteCar = (carId) => {
    console.log(carId);
    dispatch(
      deletedAgencyCar({
        id: carId,
        AgencyId: activeUser.Agency.UserId,
      }))
     dispatch(getallCarByAgency(activeUser.Agency.UserId))
 
  };
  const ccc = [];
  const renderRightActions = (progress, dragX, carId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 10, 30],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteCar(carId)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {agencyCars?.length > 0 ? (
          <Text>You Only Have {agencyCars.length} cars</Text>
        ) : null}
        {agencyCars?.length > 0 ? (
          agencyCars.map((agencycar, i) => (
            <Swipeable
              key={i}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, agencycar.car?.id)
              }
            >
              <View style={styles.carCard}>
                <Image
                  style={styles.car}
                  source={{
                    uri: agencycar?.carImage?.media,
                  }}
                />
                {/* Rest of your car item code */}
              </View>
            </Swipeable>
          ))
        ) : (
          <View style={styles.message}>
            <GreyHeart />
            <View style={styles.messageContainer}>
              <Text style={styles.emptyText1}>Empty Cars list</Text>
              <Text style={styles.emptyText}>
                I'm Sorry You don't Have any car,{" "}
              </Text>
              <Text style={styles.emptyText}>let's add a car to our list </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <NavBarAgency style={styles.NavBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Your existing styles remain the same
  // ...
  NavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // paddingBottom: 5,
    // ... rest of your styles
  },
  container: {
    flex: 1,
    height: height,
    // marginHorizontal: 7,
    // marginVertical: 7,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteCar: {
    marginBottom: 10,
  },
  messageContainer: {
    paddingTop: 15,
  },
  carImage: {
    width: 100,
    height: 100,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
  // heart: {
  //   width: 60,
  //   height: 55,
  // },
  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // paddingTop: 180,
    // gap: 20,
  },

  emptyText1: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    color: "grey",
  },
  favouriteText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  carCard: {
    marginTop: "7%",
    borderColor: "grey",
    borderWidth: 2,
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 10,
  },
  car: {
    width: 200,
    height: 150,

    borderRadius: 7,
  },
  star: {
    width: 15,
    height: 15,
  },
  items: {
    flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
    gap: 3,
  },
  detail: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    width: 140,
    gap: 7,
    padding: 8,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  agencyName: {
    color: "lightgrey",
    fontSize: 14,
  },
  price: {
    color: "blue",
  },
  delete: {
    justifyContent: "flex-end",
    width: 20,
    height: 20,
  },
  deleted2: {
    width: 320,
    height: 10,
    position: "absolute",
    alignItems: "flex-end",
  },
  rightActions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  deleteButton: {
    justifyContent: "center",
    backgroundColor: "red",
    padding: 10,
    marginRight: 10,
    // marginBottom: 10,
    height: height * 0.2,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MyCars;
