import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import {
  allServiceForAgency,
  UpdateServiceByAgency,
} from "../store/bookingSlice";
// import { Notifications } from "expo-notifications";
const { width, height } = Dimensions.get("screen");
import { selectUser, setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import carImage from "../assets/Brands/BMW.png";
import userImage from "../assets/user.jpg";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import axios from "axios";
const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
import PushNotification from "react-native-push-notification";

function AgencyService() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allService = useSelector((state) => state.booking.allServiceByAgency);

  useEffect(() => {
    dispatch(allServiceForAgency(activeUser.id));
    socket.on("serviceAccepted", ({ senderId, message }) => {
      console.log(
        `Service accepted from user ${senderId}. Message: ${message}`
      );
      // You can handle the accepted service on the client side as needed
    });

    // Event listener for when a service is rejected
    socket.on("serviceRejected", ({ senderId, message }) => {
      console.log(
        `Service rejected from user ${senderId}. Message: ${message}`
      );
      // You can handle the rejected service on the client side as needed
    });

    // Cleanup the event listeners when the component is unmounted
    return () => {
      socket.off("serviceAccepted");
      socket.off("serviceRejected");
    };

    // };
  }, [dispatch]);

  const acceptService = (idservice, message, id) => {
    const obj = { id: idservice, acceptation: "accepted" };
    dispatch(UpdateServiceByAgency(obj));
    socket.emit("acceptService", {
      senderId: activeUser.id,
      receiverId: id,
      message: `Service request accepted: ${message}`,
    });
  };

  const rejectService = (idservice, message, id) => {
    const obj = { id: idservice, acceptation: "rejected" };
    dispatch(UpdateServiceByAgency(obj));
    socket.emit("rejectService", {
      senderId: activeUser.id,
      receiverId: id,
      message: `Service request rejected: ${message}`,
    });
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
                  {service.Service
                    ? service.Service.startDate.split("T").join("-").toString()
                    : "N/A"}
                </Text>
                <Text style={styles.text}>To</Text>
                <Text style={styles.time}>
                  {service.Service
                    ? service.Service.startDate.split("T").join("-").toString()
                    : "N/A"}
                </Text>
              </View>
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
                      service.service.Service.Id,

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
    // flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  carContainer: {
    // flex: 1,
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
});

export default AgencyService;
