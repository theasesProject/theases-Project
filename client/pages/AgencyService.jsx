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
  deletedServiceByAgency,
} from "../store/bookingSlice";
import GreyHeart from "../assets/Svg/car-svgrepo-com.svg";
import agenda from "../assets/agenda.jpg";
import car from "../assets/car2.png";
import charIcon from "../assets/chat.png";
const { width, height } = Dimensions.get("screen");
import { selectUser, setUser } from "../store/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import carImage from "../assets/Brands/BMW.png";
import userImage from "../assets/user.jpg";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { createNotifcationForSpecifiqueUser } from "../store/notificationSlice";
import price from "../assets/price.jpg";
import io from "socket.io-client";
import PushNotification from "react-native-push-notification";
import axios from "axios";
import { setRoom } from "../store/chatSlice";
import { useNavigation } from "@react-navigation/native";
function AgencyService() {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allService = useSelector((state) => state.booking.allServiceByAgency);
  const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
  const [selectedService, setSelectedService] = useState(null);
  const [requestMakerId,setRequestMakerId] = useState(null);
  const [avatarUrl , setAvatarUrl] = useState(null);
  const [name,setName] = useState(null);

  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const getRoomData = async (room)=>{
    if(activeUser.id === room.UserId){
      await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.user2}`).then((response)=>{
        setAvatarUrl(response.data.avatar)
        setName(response.data.userName)
      })
    }
    else{
      await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.UserId}`).then((response)=>{
        setAvatarUrl(response.data.avatar)
        setName(response.data.userName)
      })
    }
  }

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

  const handleChatting = async (id)=>{
    try {
      const roomPossibility1= await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getOneRoom`,{user1:activeUser.id,user2:requestMakerId});
      const roomPossibility2= await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getOneRoom`,{user1:requestMakerId,user2:activeUser})
      if(!roomPossibility1 && !roomPossibility2 ){
        const room = await axios
      .post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/makeRoom`,
        { UserId: activeUser.id, user2: requestMakerId }
      )
        getRoomData(room.data)
        dispatch(setRoom({...room.data,name,avatarUrl}))
        navigation.navigate("conversation")
      return
      } else{
        getRoomData(room.data)
        dispatch(setRoom({...room.data,name,avatarUrl}))
        navigation.navigate("conversation")
      }
    } catch (e) {
      console.error(e);
    }
  }

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
    alert("you success to accept the booking ");
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
        <ScrollView style={styles.container}>
          {allService
            .slice()
            .reverse()
            .map((service) => {
              // console.log(service);
              return service.service.Service.acceptation === "pending" ? (
                <View style={styles.card} key={service.service.id}>
                  <View style={styles.cardContainer}>
                    <Image style={styles.ImageCar} source={car}></Image>
                    <View style={styles.carDetails}>
                      <Text style={styles.CarName}>
                        {service.User.userName}
                      </Text>
                      <View style={styles.dates}>
                        <Image style={styles.agenda} source={agenda}></Image>
                        <Text style={styles.date}>
                          {formatDate(service.service?.Service.startDate)} -{" "}
                          {formatDate(service.service?.Service.endDate)}
                        </Text>
                        <View style={styles.prices}>
                          <Image style={styles.price} source={price}></Image>
                          <Text style={styles.date}>
                            {service.service?.Service.amount}$
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.status}>
                          Time : {service.service?.Service.time}
                        </Text>
                      </View>
                      <View style={styles.buttons}>
                        <View style={styles.button}>
                          <LinearGradient
                            style={styles.payment}
                            colors={["#88b4e2", "#6C77BF"]}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                acceptService(
                                  service?.service.Service.id,
                                  service.User.id,
                                  service.service.model
                                );
                              }}
                            >
                              <Text>Accept</Text>
                            </TouchableOpacity>
                          </LinearGradient>
                          <TouchableOpacity
                            onPress={() =>
                              rejectService(
                                service.service.Service.id,
                                service.service.model,
                                service.User.id,
                                service.service.id
                              )
                            }
                            style={styles.cancel}
                          >
                            <Text>Refuse</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.payment} onPress={()=>{
                            handleChatting(service.service.Service.UserId)
                          }}>
                            <Image
                              style={styles.chat}
                              source={charIcon}
                            ></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null;
            })}
        </ScrollView>
      ) : (
        <View style={styles.message}>
          <GreyHeart />
          <View style={styles.messageContainer}>
            <Text style={styles.emptyText1}>Empty Cars list</Text>
            <Text style={styles.emptyText}>
              I'm Sorry You don't Have any request,{" "}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

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
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },

  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText1: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    color: "grey",
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
    gap: 20,
    alignItems: "flex-end",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 13,
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

export default AgencyService;
