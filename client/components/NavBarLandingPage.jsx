import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  AppState,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {height,width}= Dimensions.get("screen")
import localisation from "../assets/localisation1.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logStatus, fetchUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

function ProfileLandingPage({style}) {
  const navigation = useNavigation();
  const activeUser = useSelector(selectUser);
  const loggedIn = useSelector(logStatus);
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState("</> click here");

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
  // };
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
  }, []);
  return (
    <View style={[styles.navBar,style]}>
      <View style={styles.allAdress}>
        <Pressable>
          <Image style={styles.locationImage} source={localisation}  onPress={() => getUserLocationAndNearestAddress()} />
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
        {loggedIn ? (
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
        ) : (
          <View style={styles.authBtnsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.authBtn}
            >
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={styles.authBtn}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
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
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  authBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  locationImage: {
    // marginLeft: 30,
    width: 45,
    height: 40,
    alignItems: "center",
  },
  allAdress: {
    paddingLeft:10,
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
    fontSize: 14,
    color: "rgb(130, 124, 140)",
  },
  UserAdress: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
});

export default ProfileLandingPage;
