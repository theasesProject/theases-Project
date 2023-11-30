import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LeftArrow from "../assets/Svg/leftArrowProfile.svg";
import Hamburger from "../assets/Svg/hamburgerProfile.svg";
import { useSelector, useDispatch } from "react-redux";
import { OneAgency, getOne } from "../store/agencySlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getallCarByAgency } from "../store/carFetch";
import AgencySvg from "../assets/Svg/agencyName.svg";
import Phone from "../assets/Svg/agencyPhone.svg";
import NumberOfCars from "../assets/Svg/carsNumber.svg";
import AverageRating from "../assets/Svg/averageRating.svg";
import Delivery from "../assets/Svg/delivery.svg";
import AllCars from "../components/AllCars";
import AllReviews from "../components/AllReviews";
import AgencyStatistics from "../components/AgencyStatistics";
import SliderMenu from "../components/SideBar";
import { selectUser } from "../store/userSlice";
const { height, width } = Dimensions.get("screen");

function AgencyProfileUser() {
  const ag = useSelector(OneAgency);
  const agencyCars = useSelector((state) => state.car.agencyCar)
  const loading = useSelector((state) => state.car.loading);
  const route = useRoute();
  // const {agencyId} = route.params
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const activeUser = useSelector(selectUser)
  const agencyId = activeUser?.id;
  // const agencyId= activeUser.Agency.UserId;
  // console.log( activeUser.Agency.UserId);
  const [selectedView, setSelectedView] = useState({
    view1: true,
    view2: false,
    view3: false,
  });
  const [isSliderOpen, setSliderOpen] = useState(false);
  console.log(ag?.agencyById);
  const handleSliderToggle = () => {
    console.log("slider toggled");
    setSliderOpen(!isSliderOpen);
  };

  useEffect(() => {
    dispatch(getallCarByAgency(agencyId));
    dispatch(getOne(agencyId));
  }, [dispatch]);

  const handleRent = async () => {
    handlePress();
  };


  return (
    <View style={styles.entirePage}>
      <View style={styles.staticTopView}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Home")
          }}>
            <LeftArrow />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSliderToggle}>
            <Hamburger />
          </TouchableOpacity>
        </View>
        <Text style={styles.textProfile}>Profile</Text>
        <View style={styles.mainInfo}>
          <Image
            source={{ uri: ag?.userid?.avatar }}
            style={styles.agencyImage}
          />
          <View style={styles.agencyNameContainer}>
            <AgencySvg />
            <Text style={styles.agencyNameText}>{ag?.agencyById?.name}</Text>
          </View>
          <View style={styles.rowsContainer}>
            <View style={styles.agencyLastInfo}>
              <View style={styles.numberOfCarsContainer}>
                <NumberOfCars />
                <View>
                  <Text>
                    {agencyCars?.length} car{agencyCars?.length > 1 ? "s" : null}
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: "500", opacity: 0.3 }}
                  >
                    Offered
                  </Text>
                </View>
              </View>
              <View style={styles.agencyNumberContainer}>
                <Delivery />
                <Text
                  style={{
                    marginLeft: width * 0.01,
                    fontWeight: "500",
                    color: ag?.agencyById?.transportation ? "green" : "red",
                  }}
                >
                  {ag?.agencyById?.transportation ? "Delivery" : "No Delivery"}
                </Text>
              </View>
            </View>
            <View style={styles.agencySecondInfo}>
              <View style={styles.numberOfCarsContainer}>
                <AverageRating />
                <View>
                  <Text>3.9</Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: "500", opacity: 0.3 }}
                  >
                    Rating
                  </Text>
                </View>
              </View>
              <View style={styles.agencyNumberContainer}>
                <Phone />
                <Text style={styles.agencyNumberText}>
                  {ag?.agencyById?.companyNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.selectViews}>
        <Text
          style={{
            ...styles.selectableViewText,
            fontWeight: selectedView.view1 ? "600" : "400",
            color: selectedView.view1 ? "#6a71c1" : null,
          }}
          onPress={() => {
            setSelectedView({ view1: true, view2: false, view3: false });
          }}
        >
          All Cars
        </Text>
        <Text
          style={{
            ...styles.selectableViewText,
            fontWeight: selectedView.view2 ? "600" : "400",
            color: selectedView.view2 ? "#6a71c1" : null,
          }}
          onPress={() => {
            setSelectedView({ view1: false, view2: true, view3: false });
          }}
        >
          Reviews
        </Text>
        <Text
          style={{
            ...styles.selectableViewText,
            fontWeight: selectedView.view3 ? "600" : "400",
            color: selectedView.view3 ? "#6a71c1" : null,
          }}
          onPress={() => {
            setSelectedView({ view1: false, view2: false, view3: true });
          }}
        >
          Statistics
        </Text>
      </View>
      {selectedView.view1 ? (
        <AllCars cars={agencyCars} />
      ) : selectedView.view2 ? (
        <AllReviews />
      ) : selectedView.view3 ? (
        <AgencyStatistics />
      ) : null}
      {isSliderOpen ? (
          <SliderMenu
            isOpen={isSliderOpen}
            onClose={handleSliderToggle}
            navigation={navigation}
          />
        ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  entirePage: {
    height,
    width,
    backgroundColor: "#F2F2F2",
    display: "flex",
    flexDirection: "column",
    padding: height * 0.02,
  },
  staticTopView: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    padding: height * 0.02,
    backgroundColor: "#293859",
    height: height * 0.25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  mainInfo: {
    backgroundColor: "white",
    height: height * 0.25,
    borderRadius: 15,
    padding: height * 0.03,
    display: "flex",
    alignItems: "center",
  },
  textProfile: {
    color: "white",
    textAlign: "center",
    margin: height * 0.02,
    fontWeight: "500",
    fontSize: 20,
  },
  agencyImage: {
    height: "40%",
    borderRadius: 15,
    width: "50%",
    resizeMode: "contain",
  },
  rowsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: width * 0.015,
  },
  agencyNameContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: height * 0.005,
  },
  agencyNameText: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: width * 0.01,
  },
  agencyNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  agencyNumberText: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: width * 0.01,
  },
  agencySecondInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  agencyLastInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  numberOfCarsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectViews: {
    position: "relative",
    marginTop: height * 0.4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectableViewText: {
    fontSize: 15,
  },
});

export default AgencyProfileUser;
