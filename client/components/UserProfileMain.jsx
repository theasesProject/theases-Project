import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import profil from "../assets/profile.png";
import React, { useEffect, useState } from "react";
import bkg from "../assets/bkg.png";
import stg from "../assets/settings.png";
import UserRentHistory from "../components/UserRentHistory.jsx";
import UserProfileSettings from "../components/UserProfileSettings.jsx";

function Userprofile({ navigation }) {
  const [view, setView] = useState("main");

  const changeView = (newView) => setView(newView);

  //   useEffect(() => {
  //     render();
  //   }, [view]);

  const render = () => {
    if (view === "history") {
      return <UserRentHistory />;
    } else if (view === "settings") {
      return <UserProfileSettings />;
    }
    return (
      <View style={styles.bottomSection}>
        <View style={styles.profileOptions}>
          {/* <TouchableOpacity
            style={styles.profileOption}
            onPress={() => changeView("profile")}
          >
            <Image source={profil} style={styles.icon} />
            <Text>Profile</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.profileOption}
            onPress={() => changeView("history")}
          >
            <Image style={styles.icon} source={bkg} />
            <Text>My bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileOption}
            onPress={() => changeView("settings")}
          >
            <Image source={stg} style={styles.icon} />
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return render();
}

const styles = StyleSheet.create({
  bottomSection: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileOptions: {},
  profileOption: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e6e8",
  },

  icon: {
    width: 20,
    height: 20,
  },
});
export default Userprofile;
