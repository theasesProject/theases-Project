import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import localisation from "../assets/localisation1.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser, logStatus } from "../store/userSlice";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

function ProfileLandingPage() {
  const navigation = useNavigation();
  const activeUser = useSelector(selectUser);
  const loggedIn = useSelector(logStatus);
  const [userAddress, setUserAddress] = useState("Norvey ");

  const getUserLocationAndNearestAddress = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    // if (status === 'granted') {

    // Helper console.log (to know who's the user we're using or if we even have one while testing anything)
    console.log("NavBarLandingPage/Line 19");
    console.log("active user: ", activeUser);

    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { coords } = location;
      const nearestAddressResponse = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (nearestAddressResponse.length > 0) {
        const nearestAddress = nearestAddressResponse[0];
        const place = `${nearestAddress.region}, ${nearestAddress.country}`;
        const fullNearestAddress = `${nearestAddress.name}, ${nearestAddress.street}, ${nearestAddress.city}, ${nearestAddress.region}, ${nearestAddress.country}`;
        setUserAddress(place);
      }
    }
  };
  // };

  return (
    <View style={styles.navBar}>
      <View style={styles.allAdress}>
        <Pressable onPress={() => getUserLocationAndNearestAddress()}>
          <Image style={styles.locationImage} source={localisation} />
        </Pressable>
        <View style={styles.adress}>
          <Text style={styles.yourLocation}>Your Location </Text>

          <Text style={styles.UserAdress}>
            {userAddress},{activeUser?.userName}{" "}
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
              <Text>Sign In</Text>
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
    width: "100%",
    height: 60,
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
    width: 45,
    height: 40,
    alignItems: "center",
  },
  allAdress: {
    flex: 1,
    flexDirection: "row",

    width: 200,
    justifyContent: "flex-start",
    gap: 1,
  },
  userAvatar: {
    padding: 10,
  },
  UserImage: {
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
