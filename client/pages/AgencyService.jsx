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
import { registerIndieID, unregisterIndieDevice } from "native-notify";
import axios from "axios";
// import * as Device from "expo-device";

// import Constants from "expo-constants";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token.data;
// }

function AgencyService() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allService = useSelector((state) => state.booking.allServiceByAgency);

  useEffect(() => {
    dispatch(allServiceForAgency(activeUser.id));
    // registerForPushNotificationsAsync();
  }, [dispatch]);

  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  const acceptService = (idservice, message, id) => {
    const obj = { id: idservice, acceptation: "accepted" };
    dispatch(UpdateServiceByAgency(obj));
    notification(id);
  };

  const notification = (id) => {
    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${id}`,
      appId: 14608,
      appToken: "0IjK45dvxv48dlwYcWDWTR",
      title: "Booking",
      message: "you are succes to booking",
    });
    console.log(id, "notifcation");
  };
  const rejectService = (idservice, message) => {
    const obj = { id: idservice, acceptation: "rejected" };
    dispatch(UpdateServiceByAgency(obj));
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer}>
        {allService ? (
          allService.map((service, i) => (
            <View key={i} style={styles.cardContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{service.user.userName} </Text>
                <Text style={styles.text}>want to rent you car </Text>
                <Text style={styles.name}>{service.car.model} </Text>
              </View>
              <View style={styles.carContainer}>
                <Text style={styles.text}>From </Text>
                <Text style={styles.time}>
                  {moment(service.service.startDate)
                    .format("YYYY-MM-DD")
                    .toString()}
                </Text>
                <Text style={styles.text}>To</Text>
                <Text style={styles.time}>
                  {moment(service.service.endDate)
                    .format("YYYY-MM-DD")
                    .toString()}{" "}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    rejectService(service.service.id, service.car.model);
                  }}
                  style={styles.rejectButton}
                >
                  <Text>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    acceptService(
                      service.service.UserId,
                      service.service.id,
                      service.car.model
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
