import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import localisation from "../assets/localisation1.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser, logStatus } from "../store/userSlice";

function ProfileLandingPage() {
  const navigation = useNavigation();
  const activeUser = useSelector(selectUser);
  const loggedIn = useSelector(logStatus);

  console.log("active user: ", activeUser);

  return (
    <View style={styles.navBar}>
      <View style={styles.allAdress}>
        <Image style={styles.locationImage} source={localisation} />
        <View style={styles.adress}>
          <Text style={styles.yourLocation}>Your Location </Text>
          <Text style={styles.UserAdress}>Norvey,{activeUser?.userName} </Text>
        </View>
      </View>
      <View>
        {loggedIn ? (
          <Image
            source={activeUser?.avatar}
            alt="userPic"
            style={styles.UserImage}
            onPress={() => navigation.navigate("Userprofile")}
          />
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
  UserImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
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
