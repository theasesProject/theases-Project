import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import {
  allServiceForAgency,
  UpdateServiceByAgency,
} from "../store/bookingSlice";

const { width, height } = Dimensions.get("screen");
import { selectUser, setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import carImage from "../assets/Brands/BMW.png";
import userImage from "../assets/user.jpg";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

import axios from "axios";
import io from "socket.io-client";
import PushNotification from "react-native-push-notification";
function AgencyService() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allService = useSelector((state) => state.booking.allServiceByAgency);
  const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const openModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };
  useEffect(() => {
    dispatch(allServiceForAgency(activeUser.id));

    socket.on("receive-notification", (data) => {
      console.log("Received Notification:", data);

      PushNotification.localNotification({
        channelId: "default",
        title: data.title,
        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("receive-notification");
      socket.off("disconnect");
    };
  }, [dispatch]);

  const acceptService = (idservice, id, message) => {
    const obj = { id: idservice, acceptation: "accepted" };
    console.log(activeUser, "activeUser");
    dispatch(UpdateServiceByAgency(obj));
    console.log("Accepting service:", idservice, message, id);
    socket.emit("acceptService", {
      senderId: activeUser.id,
      receiverId: id,
      message: `Service request accepted: ${message}`,
    });
    setModalVisible(false);
  };

  const rejectService = (idservice, message, id) => {
    const obj = { id: idservice, acceptation: "rejected" };
    dispatch(UpdateServiceByAgency(obj));

    socket.emit("rejectService", {
      senderId: activeUser.id,
      receiverId: id,
      message: `Service request rejected: ${message}`,
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer}>
        {allService ? (
          allService.map((service, i) => (
            <View key={i} style={styles.cardContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{service.User.userName} </Text>
                <Text style={styles.text}>want to rent you car </Text>
                <Text style={styles.name}>{service.service.model} </Text>
              </View>
              <View style={styles.carContainer}>
                <Text style={styles.text}>From </Text>
                <Text style={styles.time}>
                  {moment(service.service?.Service.startDate).format(
                    "YYYY-MM-DD"
                  )}
                </Text>
                <Text style={styles.text}>To</Text>
                <Text style={styles.time}>
                  {moment(service.service?.Service.startDate).format(
                    "YYYY-MM-DD"
                  )}
                </Text>
              </View>
              <View>
                {/* <Text>{service.service?.Service.amount}</Text> */}
              </View>

              <TouchableOpacity
                onPress={() => openModal(service)}
                style={styles.acceptButton}
              >
                <Text>Details</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.modalView}>
                  <Text style={styles.name}>User:{service.User.userName} </Text>
                  <Text>want to rent your car</Text>
                  <Text style={styles.name}>
                    Model:{service.service.model}{" "}
                  </Text>
                  <Text>price:{service.service?.Service.amount}</Text>
                  <View style={styles.actionContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        rejectService(
                          service.service.Service.id,
                          service.service.model,
                          service.User.id
                        );
                      }}
                      style={styles.rejectButton}
                    >
                      <Text>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        acceptService(
                          service?.service.Service.id,

                          service.service.model,
                          service.User.id
                        );
                      }}
                      style={styles.acceptButton}
                    >
                      <Text>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ))
        ) : (
          <Text>Nothing</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  cardContainer: {
    backgroundColor: "white",
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: width * 0,
      height: height * 0.1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  carContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  acceptButton: {
    backgroundColor: "#98E4FF",
    width: 55,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,

    marginLeft: 5,
  },
  rejectButton: {
    backgroundColor: "#BEADFA",
    width: 55,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    marginLeft: 5,
  },
  scrollContainer: {},
  carImage: {
    width: 50,
    height: 50,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  time: {
    color: "#0174BE",
    fontSize: 14,
    fontWeight: "bold",
  },
  name: {
    color: "#435585",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: { color: "grey" },
  modalCloseButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },

  modalText: {
    fontSize: 14,
    marginBottom: 10,
    color: "grey",
  },
});

export default AgencyService;
