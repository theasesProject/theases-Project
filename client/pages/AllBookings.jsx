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
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
import price from "../assets/price.jpg";
import agenda from "../assets/agenda.jpg";
const { width, height } = Dimensions.get("screen");
import { createNotifcationForSpecifiqueUser } from "../store/notificationSlice";
import Modal from "react-native-modal";
import { selectUser, setUser } from "../store/userSlice";
import io from "socket.io-client";
import car from "../assets/car2.png";
import charIcon from "../assets/chat.png";
import PaymentBtn from "../components/PaymentBtn";
import axios from "axios";
import { setRoom } from "../store/chatSlice";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";

const AllBookings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const userBookings = useSelector((state) => state.booking.allServiceUser);
  console.log("userrrrr", userBookings);
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
    console.log(activeUser?.id, selectedBooking?.id, "selectedBooking.id");
    dispatch(
      deletedServiceByUser({ UserId: activeUser?.id, id: selectedBooking?.id })
    );
    socket.emit("request", {
      senderId: activeUser.id,
      receiverId: selectedBooking?.Car.AgencyId,
      message: `Service cancel ${selectedBooking?.Car.model}`,
    });

    Alert.alert(
      "Booking Canceled",
      `Booking with ID ${selectedBooking?.id} canceled successfully.`
    );
  };
  // const scheduleNotification = (endDate) => {
  //   const daysUntilEnd = Math.ceil(
  //     (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  //   );

  //   if (daysUntilEnd > 0 && daysUntilEnd <= 7) {
  //     PushNotification.localNotification({
  //       channelId: "default",
  //       title: "Make review  ",
  //       message: `Your booking for ${selectedBooking?.Car.model} ends in ${daysUntilEnd} days.`,
  //       vibrate: true,
  //       vibration: 300,
  //       playSound: true,
  //       soundName: "default",
  //     });
  //   }
  // };
  const closeModal = () => {
    setCancelModalVisible(false);
    setSelectedBooking(null);
  };

  const getRoomData = async (room) => {
    console.log(room, "ghjkghgh");
    if (activeUser.id === room.UserId) {
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.user2}`
        )
        .then((response) => {
          console.log("res", response.data);
          dispatch(
            setRoom({
              ...room,
              name: response.data.userName,
              avatarUrl: response.data.avatar,
            })
          );
          setTimeout(() => {
            navigation.navigate("conversation");
          }, 200);
        });
    } else {
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.UserId}`
        )
        .then((response) => {
          console.log("res", response.data);
          dispatch(
            setRoom({
              ...room,
              name: response.data.userName,
              avatarUrl: response.data.avatar,
            })
          );
          setTimeout(() => {
            navigation.navigate("conversation");
          }, 200);
        });
    }
  };

  const handleChatting = async (id) => {
    // setRequestMakerId(id)
    try {
      const roomPossibility1 = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getOneRoom`,
        { user1: activeUser.id * 1, user2: id * 1 }
      );
      console.log("room1", roomPossibility1);
      const roomPossibility2 = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getOneRoom`,
        { user1: id * 1, user2: activeUser.id * 1 }
      );
      console.log("room2");
      if (!roomPossibility1 && !roomPossibility2) {
        const room = await axios.post(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/makeRoom`,
          { UserId: activeUser.id * 1, user2: id * 1 }
        );
        // console.log("here");
        getRoomData(room);

        return;
      } else {
        const room = roomPossibility1.data || roomPossibility2.data;
        console.log(room, "here");
        getRoomData(room);
      }
    } catch (e) {
      console.error(e);
    }
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
    <View style={styles.page}>
      <ScrollView style={styles.container}>
        {userBookings
          .slice()
          .reverse()
          .map((booking) => {
            const { endDate, Car } = booking;
            const carModel = Car?.model || "";
            // scheduleNotification(endDate, carModel);
            return (
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
                        <View style={styles.button}>
                          <TouchableOpacity
                            style={styles.cancel}
                            onPress={() => handleCancelBooking(booking)}
                          >
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {booking?.acceptation === "accepted" && (
                        <View style={styles.button}>
                          <LinearGradient
                            style={styles.payment}
                            colors={["#88b4e2", "#6C77BF"]}
                          >
                            <TouchableOpacity>
                              <Text style={{ fontFamily: "FiraMono-Medium" }}>
                                Payment
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>

                          {/* <View style={styles.payment}> */}
                          <PaymentBtn amount={booking.amount} />
                          {/* </View> */}
                          {/* <View style={styles.chatt}> */}
                          <TouchableOpacity
                            onPress={() =>
                              handleChatting(booking.Car.Agency.UserId)
                            }
                          >
                            <Image
                              style={styles.chat}
                              source={charIcon}
                            ></Image>
                          </TouchableOpacity>
                          {/* </View> */}
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

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
  paychat: {
    flex: 1,
    flexDirection: "row",
    gap: width * 0.07,
    //  backgroundColor:"red",
    paddingRight: width * 0.01,
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
  chatt: {
    flex: 1,
    // backgroundColor:"black",
    // alignItems:"center",
    justifyContent: "center",
    marginLeft: 20,
    // padding:50,
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
    fontFamily: "FiraMono-Medium",
  },
  status: {
    color: "grey",
    fontSize: 14,
    fontFamily: "FiraMono-Bold",
  },

  payment: {
    flex: 1,
    height: height * 0.05,
    width: width * 0.3,
    // justifyContent: "space-between",
    // alignItems: "center",
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
    // justifyContent: "space-between",
    width: width * 0.86,
    height: height * 0.06,
    borderRadius: 5,
    gap: 15,
    alignItems: "flex-end",
  },
  button: {
    flexDirection: "row",
    // flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    // backgroundColor:"green"
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
    fontFamily: "FiraMono-Bold",
  },
  noButton: {
    color: "white",
    backgroundColor: "blue",
    fontFamily: "FiraMono-Bold",
  },
});

export default AllBookings;
