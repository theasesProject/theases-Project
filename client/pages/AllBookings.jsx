import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allServiceForUser, deletedServiceByUser } from "../store/bookingSlice";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import price from "../assets/price.jpg";
import { LinearGradient } from "expo-linear-gradient";
import agenda from "../assets/agenda.jpg";
const { width, height } = Dimensions.get("screen");
import croix from "../assets/croix.jpg";
import { createNotifcationForSpecifiqueUser } from "../store/notificationSlice";
import Modal from "react-native-modal";
import { selectUser, setUser } from "../store/userSlice";
import io from "socket.io-client";
import car from "../assets/car2.png";
import charIcon from "../assets/chat.png";
const AllBookings = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const userBookings = useSelector((state) => state.booking.allServiceUser);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
  useEffect(() => {
    dispatch(allServiceForUser(activeUser.id));
  }, [dispatch, activeUser?.id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelModalVisible(true);
  };

  const confirmCancelBooking = (id) => {
    setCancelModalVisible(false);
    const notificationData = {
      UserId: selectedBooking.Car.AgencyId,
      notification: ` the client ${activeUser?.userName}  cancel his booking for the car ${selectedBooking.Car.model}`,
      type: "reject",
    };

    dispatch(createNotifcationForSpecifiqueUser(notificationData));
    console.log(activeUser.id, selectedBooking.id, "selectedBooking.id");
    dispatch(
      deletedServiceByUser({ UserId: activeUser.id, id: selectedBooking.id })
    );
    socket.emit("request", {
      senderId: activeUser.id,
      receiverId: selectedBooking.Car.AgencyId,
      message: `Service cancel ${selectedBooking.Car.model}`,
    });

    Alert.alert(
      "Booking Canceled",
      `Booking with ID ${selectedBooking.id} canceled successfully.`
    );
  };

  const closeModal = () => {
    setCancelModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {userBookings
          .slice()
          .reverse()
          .map((booking) => (
            <View style={styles.card} key={booking.id}>
              <View style={styles.cardContainer}>
                <Image style={styles.ImageCar} source={car}></Image>
                <View style={styles.carDetails}>
                  <Text style={styles.CarName}>{booking?.Car?.model}</Text>
                  <View style={styles.dates}>
                    <Image style={styles.agenda} source={agenda}></Image>
                    <Text style={styles.date}>
                      {formatDate(booking?.startDate)} -{" "}
                      {formatDate(booking?.endDate)}
                    </Text>
                    <View style={styles.prices}>
                      <Image style={styles.price} source={price}></Image>
                      <Text style={styles.date}>{booking?.amount}$</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.status}>
                      Status: {booking?.acceptation}
                    </Text>
                  </View>
                  <View style={styles.buttons}>
                    {(booking?.acceptation === "accepted" ||
                      booking?.acceptation === "pending") && (
                      <TouchableOpacity
                        style={styles.cancel}
                        onPress={() => handleCancelBooking(booking)}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                    )}
                    {booking?.acceptation === "accepted" && (
                      <View style={styles.button}>
                        <LinearGradient
                          style={styles.payment}
                          colors={["#88b4e2", "#6C77BF"]}
                        >
                          <TouchableOpacity>
                            <Text>Payment</Text>
                          </TouchableOpacity>
                        </LinearGradient>

                        <TouchableOpacity style={styles.payment}>
                          <Image style={styles.chat} source={charIcon}></Image>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}

        <Modal
          isVisible={cancelModalVisible}
          onBackdropPress={closeModal}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to cancel this booking?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmCancelBooking}>
                <Text style={[styles.modalButton, styles.yesButton]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text style={[styles.modalButton, styles.noButton]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    width: width,
    height: height,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: "5%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 30,
    elevation: 7,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 5,
    shadowRadius: 10,
  },
  container: {
    flexDirection: "column",
    marginBottom: "25%",
  },
  ImageCar: {
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 15,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 5,
  },
  carDetails: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    gap: 3,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    borderColor: "lightgrey",
    alignItems: "flex-end",
    borderBottomWidth: 1,
  },
  CarName: {
    fontSize: 18,
    padding: 1,
    color: "black",
    fontWeight: "bold",
  },
  date: {
    color: "grey",
  },
  status: {
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
  },

  payment: {
    height: height * 0.05,
    width: width * 0.27,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  agenda: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },
  price: {
    width: 22,
    height: 22,
  },
  prices: {
    flexDirection: "row",
    justifyContent: "flex-end",

    gap: 10,
  },
  chat: {
    width: 40,
    height: 40,
  },
  cancel: {
    height: height * 0.05,
    width: width * 0.27,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "lightgrey",
    padding: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    width: width * 0.86,
    height: height * 0.06,
    borderRadius: 5,
    gap: 15,
    alignItems: "flex-end",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  yesButton: {
    color: "white",
    backgroundColor: "grey",
  },
  noButton: {
    color: "white",
    backgroundColor: "blue",
  },
});

export default AllBookings;
