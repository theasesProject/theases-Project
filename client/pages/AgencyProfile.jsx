import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { logUserOut, selectUser } from "../store/userSlice";
import bg from "../assets/tempLogo.png";
import NavBarAgency from "../components/NavBarAgency";
import Stats from "../components/Stats";
import Left from "../assets/Svg/left-long-solid.svg";
import Dots from "../assets/Svg/three-dots-svgrepo-com.svg";
import SliderMenu from "../components/SideBar";
const { width, height } = Dimensions.get("screen");

function AgencyProfile({ navigation }) {
  const activeUser = useSelector(selectUser);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSliderToggle = () => {
    setSliderOpen(!isSliderOpen);
  };
  return (
    <View>
      <View style={styles.trial}>
        <View style={styles.trle}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Left />
          </Pressable>
        </View>

        <View style={styles.trri}>
          <Pressable
            style={styles.trri}
            onPress={() => {
              handleSliderToggle();
            }}
          >
            <Dots />
          </Pressable>
        </View>
      </View>
      <View style={styles.agency}>
        <SliderMenu
          isOpen={isSliderOpen}
          onClose={handleSliderToggle}
          navigation={navigation}
        />
        {isVisible && activeUser?.Agency ? (
          <ScrollView>
            <View style={styles.vbgImg}>
              <ImageBackground source={bg} style={styles.bgim} />
            </View>
            <View style={styles.vav}>
              <View style={styles.bvav}>
                <Image
                  source={{
                    uri: activeUser?.avatar,
                  }}
                  style={styles.avatar}
                />
              </View>
            </View>

            <View style={styles.acna}>
              <View style={styles.leftSection}>
                <Text style={styles.leac}>{activeUser?.Agency.name}</Text>
                <Text style={styles.number}>
                  {activeUser?.Agency.companyNumber}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <Text>
                  {activeUser?.Agency.transportation
                    ? "With Delivery"
                    : "Without Delivery"}
                </Text>
                <Text>{activeUser?.Agency.createdAt.slice(0, 10)}</Text>
                {/* <Image source={dots} /> */}
              </View>
            </View>

            <View style={styles.stats}>
              <Stats />
            </View>
          </ScrollView>
        ) : null}
        <View style={styles.foot}>
          <NavBarAgency />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  trial: {
    height: "6%",
    width: width,

    flexDirection: "row",
    paddingHorizontal: width * 0.07,
    alignItems: "center",
    justifyContent: "space-between",
  },
  trle: {},
  trri: {
    width: width * 0.1,
  },

  agency: {
    zIndex: 0,
    width: width,
    height: "94%",
  },
  vbgImg: {
    height: height * 0.25,
    width: width,
    borderBottomColor: "#6a78c1",
    borderBottomWidth: 3,
  },
  bgim: {
    height: "88%",
    width: "100%",
  },
  vav: {
    marginTop: -height * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  bvav: {
    marginTop: -height * 0.02,
  },
  avatar: {
    height: height * 0.12,
    width: width * 0.25,
    borderWidth: 2,
    borderColor: "#6a78c1",
    borderRadius: 75,
  },
  acna: {
    flexDirection: "row",
    padding: 20,
  },
  leftSection: {
    flex: 1,
    marginTop: -height * 0.06,
  },
  leac: {
    fontSize: 21,
    fontStyle: "italic",
  },
  rightSection: {
    justifyContent: "center",
    marginTop: -height * 0.06,
    marginLeft: 100,
    flex: 1,
  },
  stats: {
    height: height * 0.5,
    padding: 20,
  },
  map: {
    height: height * 0.15,
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    justifyContent: "center",
    height: height * 0.05,
    width: width * 0.2,

    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  temap: { fontSize: 25, color: "lightblue" },
  foot: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
export default AgencyProfile;
