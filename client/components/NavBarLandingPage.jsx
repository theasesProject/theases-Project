import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  AppState,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("screen");
import localisation from "../assets/localisation1.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logStatus, fetchUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import io from "socket.io-client";
function ProfileLandingPage({ style }) {
  const navigation = useNavigation();
  const activeUser = useSelector(selectUser);
  const loggedIn = useSelector(logStatus);
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState("</> click here");
  const [notifications, setNotifications] = useState([]);
  const getUserLocationAndNearestAddress = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    // if (status === 'granted') {

    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { coords } = location;
      const nearestAddressResponse = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (nearestAddressResponse.length > 0) {
        const nearestAddress = nearestAddressResponse[0];
        const place = ` ${nearestAddress.city}`;
        const fullNearestAddress = `${nearestAddress.name}, ${nearestAddress.street}, ${nearestAddress.city}, ${nearestAddress.region}, ${nearestAddress.country}`;
        setUserAddress(place);
      }
    }
  };
  console.log("active user: ", activeUser);
  const [tokenValue, setTokenValue] = useState(false);
  const retrieveToken = async () => {
    try {
      const tokenResponse = await AsyncStorage.getItem("UserToken");
      if (tokenResponse) {
        console.log(tokenResponse);
        setTokenValue(true);
        dispatch(fetchUser(tokenResponse));
      } else {
        setTokenValue(false);
      }
    } catch (e) {
      console.error("error coming from token", e);
    }
  };
  useEffect(() => {
    retrieveToken();
    // AppState.addEventListener("change", retrieveToken);
    // return () => {
    //   AppState.removeEventListener("change", retrieveToken);
    // };
    getUserLocationAndNearestAddress();
    const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`); // Replace with your server's URL

    // Listen for notifications
    socket.on("notification", (message) => {
      // Update the notifications state with the received message
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <View style={[styles.navBar, style]}>
      <View style={styles.allAdress}>
        <Pressable>
          <Image
            style={styles.locationImage}
            source={localisation}
            onPress={() => getUserLocationAndNearestAddress()}
          />
        </Pressable>
        <View style={styles.adress}>
          <Text style={styles.yourLocation}>Your Location </Text>
          <Text
            style={styles.UserAdress}
            onPress={() => {
              if (userAddress === "</> click here") {
                getUserLocationAndNearestAddress();
              }
            }}
          >
            {userAddress}
          </Text>
        </View>
      </View>
      <View>
        {
          loggedIn ? (
            <Pressable
              onPress={() => navigation.navigate("Userprofile")}
              style={styles.userAvatar}
            >
              <Image
                source={{
                  uri: activeUser?.avatar,
                }}
                alt="userPic"
                style={styles.UserImage}
              />
            </Pressable>
          ) : null
          // <View style={styles.authBtnsContainer}>
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate("Login")}
          //     style={styles.authBtn}
          //   >
          //     <Text>Login</Text>
          //   </TouchableOpacity>
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate("SignUp")}
          //     style={styles.authBtn}
          //   >
          //     <Text>Sign Up</Text>
          //   </TouchableOpacity>
          // </View>
        }
      </View>
      <View style={styles.notificationsContainer}>
        <Text style={styles.notificationTitle}>Notifications</Text>
        {notifications.map((notification, index) => (
          <Text key={index} style={styles.notificationText}>
            {notification}
          </Text>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    width: width,
    height: 60,
    // paddingHorizontal:,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  authBtnsContainer: {
    paddingRight: 20,
    height: height * 0.1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // padding: 10,
  },
  authBtn: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  locationImage: {
    // marginLeft: 30,
    width: 45,
    height: 40,
    // alignItems: "center",
  },
  allAdress: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    width: 200,
    // justifyContent: "flex-start",
    gap: 1,
  },
  userAvatar: {
    padding: 23,
  },
  UserImage: {
    // marginRight: 20,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#6a78c1",
    borderRadius: 50,
  },
  yourLocation: {
    fontSize: 12,
    color: "rgb(130, 124, 140)",
  },
  UserAdress: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    width: 180,
  },
  notificationsContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ProfileLandingPage;
