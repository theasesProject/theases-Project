import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  allServiceForAgency,
  UpdateServiceByAgency,
  deletedServiceByAgency,
} from "../store/bookingSlice";
import GreyHeart from "../assets/Svg/car-svgrepo-com.svg";
import agenda from "../assets/agenda.jpg";
import car from "../assets/car2.png";
import charIcon from "../assets/chat.png";
const { width, height, fontScale } = Dimensions.get("screen");
import { selectUser } from "../store/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createNotifcationForSpecifiqueUser } from "../store/notificationSlice";
import price from "../assets/price.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";
import io from "socket.io-client";
// import PushNotification from "react-native-push-notification";
import axios from "axios";
import { setRoom } from "../store/chatSlice";
import NavBarAgency from "../components/NavBarAgency";
import NavBar from "../components/NavBar";
function AgencyService() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allService = useSelector((state) => state.booking.allServiceByAgency);
  const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
  const [selectedService, setSelectedService] = useState(null);
  const [requestMakerId, setRequestMakerId] = useState(null);
  // const [avatarUrl, setAvatarUrl] = useState(null);
  // const [name, setName] = useState(null);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const getRoomData = async (room) => {
    // console.log(room, "ghjkghgh");
    if (activeUser.id === room.UserId) {
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.user2}`
        )
        .then((response) => {
          // console.log("res", response.data);
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
          // console.log("res", response.data);
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

  useEffect(() => {
    dispatch(allServiceForAgency(activeUser.id));

    socket.on("receive-notification", (data) => {
      // console.log("Received Notification:", data);

      PushNotification.localNotification({
        channelId: "default",
        title: data.title,
        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      // console.log("Socket disconnected");
    });

    return () => {
      socket.off("receive-notification");
      socket.off("disconnect");
    };
  }, [dispatch]);

  const handleChatting = async (id) => {
    // setRequestMakerId(id)
    try {
      const roomPossibility1 = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getOneRoom`,
        { user1: activeUser.id * 1, user2: id * 1 }
      );
      const roomPossibility2 = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getOneRoom`,
        { user1: id * 1, user2: activeUser.id * 1 }
      );
      // console.log(roomPossibility1.data);
      // console.log(roomPossibility2.data);
      if (!roomPossibility1.data && !roomPossibility2.data) {
        // console.log("heeeeeerrrreeee");
        const room = await axios.post(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/makeRoom`,
          { UserId: activeUser.id * 1, user2: id * 1 }
        );
        // console.log("here");
        getRoomData(room);

        return;
      } else {
        const room = roomPossibility1.data || roomPossibility2.data;

        getRoomData(room);
      }
    } catch (e) {
      // console.error(e);
    }
  };

  const acceptService = (idservice, id, message) => {
    const obj = { id: idservice, acceptation: "accepted" };

    dispatch(UpdateServiceByAgency(obj));
    const notificationData = {
      UserId: id,
      notification: `${message} `,
      type: "accept",
    };

    dispatch(createNotifcationForSpecifiqueUser(notificationData));
    socket.emit("acceptService", {
      senderId: activeUser.id,
      receiverId: id,
      message: `Service request accepted: ${message}`,
    });
    alert("you have accepted this Request");
  };

  const rejectService = (idservice, message, id, CarId) => {
    const obj = { id: idservice, acceptation: "rejected" };
    dispatch(UpdateServiceByAgency(obj));
    const notificationData = {
      UserId: id,
      notification: `${message}`,
      type: "reject",
    };

    dispatch(createNotifcationForSpecifiqueUser(notificationData));
    socket.emit("rejectService", {
      senderId: activeUser.id,
      receiverId: id,
      message: `Service request rejected: ${message}`,
    });
    dispatch(deletedServiceByAgency({ CarId: CarId, id: idservice }));
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const closeModal = () => {
    setCancelModalVisible(false);
    setSelectedService(null);
  };

  return (
    <View style={styles.page}>
      {allService ? (
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {allService
            .slice()
            .reverse()
            .map((service, index) => {
              return  service.Service.acceptation==="pending"? (
                <View style={styles.card} key={index}>
                  <Image style={styles.ImageCar} src={service?.Media[0].media} />
                {/* {console.log(service, "hhhhhhh")} */}
                  <View style={styles.carDetails}>
                    <Text style={styles.CarName}>{service?.Service?.User?.userName}</Text>
                    <View style={styles.dates}>
                      <Image style={styles.agenda} source={agenda} />
                      <Text style={styles.greyText}>
                        {formatDate(service?.Service.startDate)} -{" "}
                        {formatDate(service?.Service?.endDate)}
                      </Text>
                      <View style={styles.priceContainer}>
                        <Image style={styles.priceIcon} source={price} />
                        <Text style={styles.greyText}>
                          {service?.Service?.amount}$
                        </Text>
                      </View>
                    </View>
                    <View style={styles.buttons}>
                      <LinearGradient
                        style={styles.button}
                        colors={["#6C77BF", "#4485C5"]}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            acceptService(
                              service?.Service.id,
                              service?.Service?.User.id,
                              service?.model
                            );
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 17,
                            }}
                          >
                            Accept
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                      <LinearGradient
                        colors={["#88b4e2", "#88b4e2"]}
                        style={styles.button}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            rejectService(
                              service?.Service?.id,
                              service?.model,
                              service?.Service?.User.id,
                              service?.id
                            )
                          }
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 17,
                            }}
                          >
                            Refuse
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                      <TouchableOpacity
                        onPress={() => {
                          handleChatting(service?.Service?.UserId);
                        }}
                      >
                        <Image style={styles.chat} source={charIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ):null ;
            })}
        </ScrollView>
      ) : (
        <View style={styles.noRequestsMessage}>
          <GreyHeart />
          <View style={styles.messageContainer}>
            <Text style={styles.noRequestsHeader}>Empty Cars list</Text>
            <Text style={styles.noRequestsText}>
              I'm Sorry You don't Have any request,{" "}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.tabBarContainer}>
        {activeUser?.type === "agency" ? <NavBarAgency /> : <NavBar />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F2F2F2",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: width * 0.03,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    marginVertical: "3%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: height * 0.45,
    borderRadius: 15,
    justifyContent: "space-around",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
  },
  ImageCar: {
    width: "100%",
    height: height * 0.2,
    borderRadius: 10,
  },
  carDetails: {
    flexDirection: "column",
    paddingVertical: height * 0.01,
    gap: height * 0.015,
    width: "100%",
  },
  CarName: {
    fontSize: 24,
    color: "#0e207f",
    fontWeight: "bold",
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "lightgrey",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: height * 0.01,
    width: "100%",
  },
  agenda: {
    width: width * 0.06,
    height: height * 0.03,
  },
  greyText: {
    color: "grey",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.04,
  },
  priceIcon: {
    width: width * 0.06,
    height: height * 0.026,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.01,
    borderRadius: 10,
  },
  chat: {
    width: width * 0.133,
    height: height * 0.06,
  },
  noRequestsMessage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: width,
  },
  noRequestsHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
  noRequestsText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
  tabBarContainer: {
    width: width,
  },
});

export default AgencyService;
