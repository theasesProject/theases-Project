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
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  getallCarByAgency,
  deletedAgencyCar,
  updateCar,
} from "../store/carFetch";
import { logUserOut, selectUser } from "../store/userSlice";
import NavBarAgency from "../components/NavBarAgency";
import car from "../assets/car2.png";
const { height, width } = Dimensions.get("screen");
import GreyHeart from "../assets/Svg/car-svgrepo-com.svg";
import car2 from "../assets/car2.png";
import star from "../assets/star.jpg";
import deleteImge from "../assets/delete.jpg";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

function MyCars() {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const agencyCars = useSelector((state) => state.car.agencyCar);
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatedCarInfo, setUpdatedCarInfo] = useState({
    price: "",
    priceWeekly: "",
    priceMonthly: "",
  });

  useEffect(() => {
    dispatch(getallCarByAgency(activeUser?.Agency.UserId));
  }, [dispatch]);

  const handleDeleteCar = (carId) => {
    console.log(carId);
    dispatch(
      deletedAgencyCar({
        id: carId,
        AgencyId: activeUser?.Agency.UserId,
      })
    );
  };

  const handleUpdateCar = () => {
    dispatch(updateCar({ id: selectedCar?.id, ...updatedCarInfo }));
    setModalVisible(false);
  };
  const renderLeftActions = (progress, dragX, car) => {
    const trans = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [30, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.leftActions}>
        <LinearGradient
          colors={["#88b4e2", "#6C77BF"]}
          style={[styles.actionButton, styles.updateButton]}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedCar(car);
              setModalVisible(true);
            }}
            style={[styles.actionButton, styles.updateButton]}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const renderRightActions = (progress, dragX, carId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 30],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCar(carId)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {agencyCars?.length > 0 ? (
          <Text style={styles.number}>You Have {agencyCars.length} cars</Text>
        ) : null}
        {agencyCars?.length > 0 ? (
          agencyCars.map((agencycar, i) => (
            <Swipeable
              key={i}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, agencycar.car?.id)
              }
              renderLeftActions={(progress, dragX) =>
                renderLeftActions(progress, dragX, agencycar?.car)
              }
            >
              <View key={i} style={styles.carCard}>
                <View style={styles.items}>
                  <Image
                    style={styles.car}
                    source={{
                      uri: agencycar.carImage?.media,
                    }}
                  />
                  <View style={styles.detail}>
                    <Text style={styles.title}>{agencycar?.car.model}</Text>
                    <View style={styles.stars}>
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                    </View>

                    <Text style={styles.price}>${agencycar.car?.price}</Text>
                    <TouchableOpacity style={{ paddingRight: 10 }}>
                      <LinearGradient
                        colors={["#88b4e2", "#6C77BF"]}
                        style={styles.buttonContainer1}
                      >
                        <Text style={styles.buttonText}>Avaibility</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
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
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={updatedCarInfo.price}
              onChangeText={(text) =>
                setUpdatedCarInfo({ ...updatedCarInfo, price: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="PriceWeekly"
              value={updatedCarInfo.priceWeekly}
              onChangeText={(text) =>
                setUpdatedCarInfo({ ...updatedCarInfo, priceWeekly: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="PriceMonthly"
              value={updatedCarInfo.priceMonthly}
              onChangeText={(text) =>
                setUpdatedCarInfo({ ...updatedCarInfo, priceMonthly: text })
              }
            />
            <View styles={styles.buttons}>
              <TouchableOpacity onPress={() => handleUpdateCar(selectedCar.id)}>
                <LinearGradient
                  colors={["#88b4e2", "#6C77BF"]}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText1}>Update Car</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <NavBarAgency style={styles.NavBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    height: height,

    flexDirection: "column",

    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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

  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
    borderWidth: 1,
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 10,
    flexDirection: "row",
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
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: height * 0.1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "blue",
  },
  deleteButton: {
    backgroundColor: "grey",
  },
  carCard: {
    borderColor: "lightgrey",
    borderWidth: 1,
    width: "100%",
    height: height * 0.17,
    marginBottom: height * 0.03,
    borderRadius: 10,
    backgroundColor: "white",
  },
  car: {
    width: 180,
    height: 120,
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
  rightActions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  updateButton: {
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  leftActions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  buttonContainer1: {
    borderRadius: 7,

    alignItems: "center",
    justifyContent: "center",

    height: 30,
    marginRight: "17%",
    width: width * 0.3,
  },
  number: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    color: "grey",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 10,
  },
  cancelText: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
  },
  buttonText1: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
});

export default MyCars;
