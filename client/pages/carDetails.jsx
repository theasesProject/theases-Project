import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import car from "../assets/car2.png";
import star from "../assets/star1.png";
import heart from "../assets/heart.png";
import user from "../assets/user.jpg";
import location from "../assets/localisation.png";
import phone from "../assets/phone.png";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const CarDetails = () => {
  const navigation = useNavigation();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const carData = useSelector((state) => state.car.RentDetails);
  useEffect(() => {
    const enableButtonAfter24Hours = () => {
      setTimeout(() => {
        setButtonEnabled(true);
      }, 24 * 60 * 60 * 1000);
    };

    enableButtonAfter24Hours();
  }, []);

  const handleAnotherButtonClick = () => {
    if (isButtonEnabled) {
      console.log("Another Button clicked");
    } else {
      console.log("Another Button is disabled");
    }
  };
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.CarDetails}>
      <View style={styles.page}>
        <View style={styles.carImage}>
          <Image style={styles.imageCar} source={car} />
        </View>

        <View style={styles.details}>
          <View style={styles.type}>
            <Text style={styles.textType}>{carData.typevehicle}</Text>
          </View>
          <View style={styles.reviewsDetails}>
            <View style={styles.reviews}>
              <Text style={styles.reviewText}>Out of 5/5</Text>
              <Image style={styles.star} source={star}></Image>
              <Image style={styles.star} source={star}></Image>
              <Image style={styles.star} source={star}></Image>
              <Image style={styles.star} source={star}></Image>
              <Image style={styles.star} source={star}></Image>
            </View>
            <Image style={styles.heart} source={heart}></Image>
          </View>
          <View style={styles.detailsCar}>
            <Text style={styles.carName}>Car Name</Text>
            <View style={styles.carNameDetails}>
              <View style={styles.textDetails}>
                <Text style={{ fontFamily: "FiraMono-Medium" }}>Car Name </Text>
                <Text style={{ fontFamily: "FiraMono-Medium" }}>Rental</Text>
              </View>
              <View style={styles.textDetails}>
                <Text>:</Text>
                <Text>:</Text>
              </View>
              <View style={styles.textDetails}>
                <Text style={{ fontFamily: "FiraMono-Medium" }}>
                  {" "}
                  {carData.model}
                </Text>
                <Text style={{ fontFamily: "FiraMono-Medium" }}>
                  {" "}
                  ${carData.price}/day
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.descreptionCar}>
            <Text style={styles.storyTitle}>Car Description</Text>
            <Text style={styles.descreption}>
              {`Horsepower: ${carData.horsePower}`}
            </Text>
            <Text style={styles.descreption}>
              {`Type of Fuel: ${carData.typeOfFuel}`}
            </Text>
            <Text style={styles.descreption}>
              {`Characteristics: ${carData.characteristics}`}
            </Text>
            <Text style={styles.descreption}>
              {`Weekly Price: $${carData.priceWeekly} `}{" "}
              {`  |   Monthly Price: $${carData.priceMonthly}`}
            </Text>
          </View>
          <View style={styles.descreptionCar}>
            <Text style={styles.storyTitle}>Agency Details</Text>
            <View style={styles.OwnerDetails}>
              <Image
                style={styles.userImage}
                src={carData.Agency.avatar}
              ></Image>
              <View style={styles.detailsOwner}>
                <Text style={styles.agencyName}>{carData.Agency.name}</Text>
                <View style={styles.owner}>
                  <Image style={styles.location} source={location}></Image>
                  <Text style={styles.descreption1}>Tunis</Text>
                </View>
                <View style={styles.owner}>
                  <Image style={styles.phone} source={phone}></Image>
                  <Text style={styles.descreption1}>
                    +{carData.Agency.companyNumber}
                  </Text>
                  {/* <LinearGradient
                    style={styles.book1}
                    colors={["#6C77BF", "#4485C5"]}
                  >
                    <TouchableOpacity
                      onPress={handleAnotherButtonClick}
                      disabled={!isButtonEnabled}
                    >
                      <Text style={styles.anotherButtonText}>AddReview</Text>
                    </TouchableOpacity>
                  </LinearGradient> */}
                </View>
              </View>
            </View>
          </View>
          <LinearGradient style={styles.book} colors={["#6C77BF", "#4485C5"]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Booking");
              }}
            >
              <Text style={styles.bookText}>Book Your Suitable Car</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      {/* <View style={styles.imageContainer}>
        <Image style={styles.carImage}  source={{
              uri: carData?.Media[0]?.media,
            }} />
      </View>
      <View style={styles.description}>
        <TouchableOpacity
          onPress={() => {
            dispatch(carDetail(carData));
            navigation.navigate("Booking");
          }}
        >
          <Text>booking</Text>
        </TouchableOpacity>
        <Text style={styles.carModel}>{carData.model}</Text>
        <Text>{carData.description}</Text>
        <Text
          style={{
            color: "#00ab44",
            paddingTop: height * 0.01,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          available
        </Text>
        <View style={styles.container_n2}>
          <Text style={{ fontSize: 18.5, fontWeight: "600" }}>
            Specification
          </Text>
          <ScrollView
            style={styles.scrollContainer}
            nestedScrollEnabled={true}
            horizontal={true}
          >
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                type Of Energy
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {console.log(carData)}
                {carData?.typeOfFuel}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>price</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.price}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                period
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.period}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Advance
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.deposit}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                type of car
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.typevehicle}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Status
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.status}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                horsePower
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.horsePower}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                createdAt
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.createdAt}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                transportation
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.transportation ? "true" : "false"}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                address
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.address}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                company Number
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.companyNumber}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={{ fontWeight: "300", color: "#8771b1" }}>
                Company name
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {carData?.Agency?.name}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  CarDetails: {
    backgroundColor: "white",
    width: width,
    // height: height,
  },
  page: {
    backgroundColor: "white",
    width: width,
  },
  carImage: {
    backgroundColor: "lightgrey",
    width: width,
    height: height * 0.3,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCar: {
    width: width * 0.95,
    height: height * 0.25,
  },

  details: {
    backgroundColor: "white",
    width: width * 0.95,
    marginHorizontal: 10,
    height: height,
  },
  type: {
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  textType: {
    fontSize: 22,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    fontFamily: "FiraMono-Bold",
  },
  reviewsDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: height * 0.03,
  },
  reviews: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 4,
  },
  reviewText: {
    fontSize: 10,
    fontFamily: "FiraMono-Medium",
  },
  star: {
    width: width * 0.03,
    height: height * 0.014,
  },
  heart: {
    width: width * 0.05,
    height: height * 0.02,
  },
  detailsCar: {
    // backgroundColor: "red",
    height: height * 0.14,
    borderRadius: 7,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    gap: 2,
    // borderColor: "lightgrey",
    // borderWidth: 1,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  carNameDetails: {
    width: width * 0.7,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 15,
  },
  carName: {
    fontSize: 22,
    fontFamily: "FiraMono-Bold",
  },
  textDetails: {
    flexDirection: "column",
    gap: 10,
  },
  descreptionCar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    padding: 7,
  },
  storyTitle: {
    fontSize: 16,
    fontFamily: "FiraMono-Bold",
  },
  descreption: {
    fontSize: 12,
    color: "grey",
    fontFamily: "FiraMono-Medium",
  },
  userImage: {
    width: width * 0.15,
    height: height * 0.073,
    borderRadius: 40,
    borderColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
  },
  OwnerDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // gap: 5,
  },
  detailsOwner: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  location: {
    width: width * 0.07,
    height: height * 0.03,
  },
  owner: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  descreption1: {
    fontSize: 14,
    color: "grey",
    fontFamily: "FiraMono-Bold",
  },
  phone: {
    width: width * 0.038,
    height: height * 0.023,
    marginLeft: "5%",
  },
  book: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: width * 0.9,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3%",
    marginTop: "5%",
  },
  book1: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: width * 0.25,
    height: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3%",
    // marginTop: "5%",
  },
  bookText: {
    fontSize: 16,
    fontFamily: "FiraMono-Bold",
    color: "white",
  },
  agencyName: {
    fontSize: 12,
    color: "grey",
    fontFamily: "FiraMono-Bold",
    marginLeft: "4%",
  },
  // scrollContainer: {
  //   marginLeft: -height * 0.01,
  // },
  // container_n2: {
  //   gap: 10,
  //   paddingTop: 10,
  // },
  // descContainer: {
  //   marginLeft: 10,
  //   gap: 10,
  //   padding: 5,
  //   alignItems: "center",
  //   height: height * 0.075,
  //   borderWidth: width * 0.001,
  //   borderColor: "#rgb(138, 114, 185)",
  //   width: width * 0.32,
  //   borderRadius: 4,
  //   backgroundColor: "#dadcea",
  // },
  // description: {
  //   paddingHorizontal: width * 0.04,
  //   paddingVertical: height * 0.04,
  // },
  // carModel: {
  //   fontSize: 23,
  //   fontWeight: "600",
  // },
  // CarDetails: {
  //   height: height,
  //   backgroundColor: "white",
  // },
  // carImage: {
  //   width: 430,
  //   borderRadius: 10,
  //   height: height * 0.25,
  //   objectFit: "contain",
  // },
  // imageContainer: {
  //   width: 250,
  //   paddingHorizontal: 200,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
});
export default CarDetails;
