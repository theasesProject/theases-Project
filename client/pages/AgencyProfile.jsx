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
import { useSelector, useDispatch } from "react-redux";
import { logUserOut, selectUser } from "../store/userSlice";
import Logo from "../assets/tempLogo.png";
import NavBarAgency from "../components/NavBarAgency";
import Chart from "../components/Stats";
import BackArrow from "../assets/Svg/left-long-solid.svg";
import Options from "../assets/Svg/three-dots-svgrepo-com.svg";
import SliderMenu from "../components/SideBar";
import TrueIcon from "../assets/Svg/true.svg";
import FalseIcon from "../assets/Svg/false.svg";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import moment from "moment";
import { getallCarByAgency } from "../store/carFetch";
const { width, height } = Dimensions.get("screen");

const AgencyProfile = ({ navigation }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [someReviews, setSomeReviews] = useState([]);
  const [reviewsView, setReviewsView] = useState("view more");
  // ****************************************************************
  const activeUser = useSelector(selectUser);
  const myCars = useSelector((state) => state.car.agencyCar);
  // ****************************************************************
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const handleSliderToggle = () => {
    console.log("slider toggled");
    setSliderOpen(!isSliderOpen);
  };
  return (
    <View style={styles.agencyProfile}>
      <View style={styles.topSection}>
        <View style={styles.navBar}>
          <BackArrow
            style={styles.backArrow}
            onPress={() => navigation.navigate("Home")}
          />
          <Options style={styles.hamburger} onPress={handleSliderToggle} />
        </View>
        {isSliderOpen ? (
          <SliderMenu
            isOpen={isSliderOpen}
            onClose={handleSliderToggle}
            navigation={navigation}
          />
        ) : null}
        <Pressable
          style={{
            position: "absolute",
            top: height * 0.05,
            backgroundColor: "rgba(1, 1, 1, 0)",
            width: width,
            height: height,
            zIndex: 0,
          }}
          onPress={() => setSliderOpen(false)}
        ></Pressable>
        <View style={styles.logosContainer}>
          <View style={styles.agencyLogoContainer}>
            <Image
              style={styles.agencyLogo}
              source={{ uri: activeUser?.avatar }}
            />
          </View>
          <View style={styles.appLogoContainer}>
            <Image style={styles.appLogo} source={Logo} />
          </View>
        </View>
      </View>
      <ScrollView style={styles.dinamicPart} scrollEnabled={!isSliderOpen}>
        <View style={styles.agencyInfo}>
          <View style={styles.detailsSections}>
            <Text style={styles.agencyName}>{activeUser?.Agency.name}</Text>
            <Text style={styles.infoKeys}>
              Num:{" "}
              <Text style={styles.infoValues}>
                {activeUser?.Agency.companyNumber}
              </Text>
            </Text>
            <Text style={styles.infoKeys}>
              Joined:{" "}
              <Text style={styles.infoValues}>
                {moment(new Date()).format("DD/MM/YYYY")}
              </Text>
            </Text>
          </View>
          <View style={styles.detailsSections}>
            <View style={styles.deliveryLine}>
              <Text style={styles.infoKeys}>
                Delivery:{" "}
                <View style={styles.infoValues}>
                  {activeUser?.Agency.transportation ? (
                    <TrueIcon style={styles.trueIcon} />
                  ) : (
                    <FalseIcon style={styles.falseIcon} />
                  )}
                </View>
              </Text>
            </View>

            <Text style={styles.infoKeys}>
              Cars owned: <Text style={styles.infoValues}>{myCars.length}</Text>
            </Text>
            <Text style={styles.infoKeys}>
              Down Payment:{" "}
              <Text style={styles.infoValues}>
                {activeUser?.Agency.deposit}%
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.agencyStats}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>StAtIsTiCs</Text>
          </View>
          <View style={styles.chartContainer}>
            <Chart />
          </View>
        </View>
        <View style={styles.agencyReviews}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>reviews</Text>
          </View>
          {(reviewsView === "view more" ? someReviews : allReviews).map(
            (review, index) => (
              <ReviewCard review={review} key={index} />
            )
          )}
        </View>
        {allReviews.length > 0 ? (
          <Pressable
            onPress={() => {
              reviewsView === "view more"
                ? handleReviewsView("view less")
                : handleReviewsView("view more");
            }}
          >
            <View style={styles.reviewsViewContainer}>
              <Text style={styles.reviewsView}>{reviewsView}</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.reviewsViewContainer}>
            <Text style={styles.noReviews}>no reviews yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  agencyProfile: {
    flex: 1,
    zIndex: -1,
  },
  topSection: {
    height: height * 0.2,
    borderBottomWidth: 1,
    borderColor: "#6a78c1",
    flexDirection: "column",
  },
  navBar: {
    width: width,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  backArrow: {
    width: width * 0.05,
    height: height * 0.02,
  },
  hamburger: {
    width: width * 0.05,
    height: height * 0.02,
  },
  logosContainer: {
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.025,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: -1,
  },
  agencyLogoContainer: {
    width: width * 0.23,
    height: height * 0.103,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6a78c1",
    zIndex: -1,
  },
  agencyLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    zIndex: -1,
  },
  appLogoContainer: {
    width: width * 0.8,
    height: height * 0.09,
    zIndex: -1,
  },
  appLogo: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  dinamicPart: {
    minHeight: height * 0.7,
    paddingHorizontal: width * 0.02,
    zIndex: -1,
  },
  agencyInfo: {
    paddingVertical: height * 0.015,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsSections: {
    width: width * 0.45,
    height: height * 0.13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6a78c1",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    justifyContent: "space-between",
  },
  deliveryLine: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  infoKeys: {
    color: "#6a78c1",
  },
  infoValues: {
    color: "#0e207f",
  },
  trueIcon: {},
  falseIcon: {},
  agencyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0e207f",
  },
  agencyStats: {
    flexDirection: "column",
    marginBottom: height * 0.02,
  },
  headerContainer: {
    width: width,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    color: "#6a78c1",
    fontWeight: "bold",
    letterSpacing: 5,
    textTransform: "uppercase",
  },
  reviewsViewContainer: {
    width: width,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  temap: { fontSize: 25, color: "lightblue" },
  foot: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  agencyReviews: {},
});
export default AgencyProfile;
