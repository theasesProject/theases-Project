import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("screen");
import localisation from "../assets/localisation1.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  logStatus,
  fetchUser,
  logoutUser,
  logUserOut,
} from "../store/userSlice";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

function ProfileLandingPage({ style }) {
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
        setUserAddress(fullNearestAddress);
      }
    }
  };
  // console.log("active user: ", activeUser);
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

    getUserLocationAndNearestAddress();
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
        {loggedIn && activeUser?.type === "client" ? (
          <Pressable
            onPress={() => navigation.navigate("UsersProfile")}
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
        ) : null}
        {loggedIn && activeUser?.type === "agency" ? (
          <Pressable
            onPress={() => navigation.navigate("AgencyProfile")}
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
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    width: width,
    height: 60,
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
  },
  authBtn: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  locationImage: {

    width: 45,
    height: 40,

  },
  allAdress: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    width: 200,
    gap: 1,
  },
  userAvatar: {
    padding: 23,
  },
  UserImage: {
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
    width: 230,
  },
});

export default ProfileLandingPage;
