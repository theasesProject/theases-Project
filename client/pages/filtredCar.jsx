import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
import back from "../assets/back.png";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import star from "../assets/star.jpg";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import FilterCard from "../components/FilterCard.jsx";
import * as Font from "expo-font";
import { selectUser } from "../store/userSlice.js";
import NavBarAgency from "../components/NavBarAgency.jsx";
import NavBar from "../components/NavBar.jsx";
function FiltredCar() {
  const avaibleCar = useSelector((state) => state.booking.avaibleCar);

  return (
    <View style={styles.homePage}>
      <ScrollView style={styles.scrollView}>
        <View>
          {avaibleCar
            ? avaibleCar.map((element, i) => (
                <FilterCard element={element} key={i} />
              ))
            : null}
        </View>
      </ScrollView>
      <View style={styles.tabBarContainer}>
        {activeUser?.type === "agency" ? <NavBarAgency /> : <NavBar />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
  },
  scrollView: {
    width: "100%",
  },
  tabBarContainer: {
    width: width,
    position: "absolute",
    bottom: 0,
  },
});

export default FiltredCar;
