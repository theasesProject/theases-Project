import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  AppState,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import localisation from "../assets/localisation1.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logStatus, fetchUser } from "../store/userSlice";
import { useEffect, useState } from "react";

function ProfileLandingPage() {
  const navigation = useNavigation();
  const activeUser = useSelector(selectUser);
  const loggedIn = useSelector(logStatus);
  const dispatch = useDispatch();
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
    <View style={styles.navBar}>
      <View style={styles.allAdress}>
        <Image style={styles.locationImage} source={localisation} />
        <View style={styles.adress}>
          <Text style={styles.yourLocation}>Your Location </Text>
          <Text style={styles.UserAdress}>Norvey</Text>
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
    width: 50,
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
