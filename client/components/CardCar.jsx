import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Button,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import { useEffect, useState } from "react";
import car from "../assets/car2.png";
import emptyStar from "../assets/eto.png";
import star from "../assets/star1.png";
import RatingStar from "../assets/Svg/RatingStar.svg";
import BookMark from "../assets/Svg/bookMark.svg";
import TopCorner from "../assets/Svg/BookMarkDone.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBookMark,
  removedBookMark,
  saveDetails,
  carDetail,
} from "../store/carFetch.js";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { selectUser } from "../store/userSlice";
import { Booking } from "../pages/Booking.jsx";

function CardCar({ oneCar, setNothing, handlePress }) {
  const [starSelected, setStarSelected] = useState(false);
  // const {process.env.EXPO_PUBLIC_SERVER_IP} = require("../env.js")
  const [isHeartClicked, setHeartClicked] = useState(false);
  // const [heartSelected, setHeartSelected] = useState(false);
  const [done, setDone] = useState(null);
  const activeUser = useSelector(selectUser) || {};
  const starImage = starSelected ? star : emptyStar;
  // const heartImage = heartSelected ? heartBleu : EmptyHeart;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleStarPress = () => {
    setStarSelected(!starSelected);
  };

  const handleHeartPress = async () => {
    // setHeartSelected(!heartSelected);
    // if (!heartSelected) {
    setHeartClicked(!isHeartClicked);

    dispatch(CreateBookMark({ CarId: oneCar.id, UserId: activeUser.id }));
    // } else if (heartSelected) {
    // dispatch(removedBookMark(oneCar.id));
    // }
  };
  const checkBookMarked = async () => {
    try {
      const task = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/check/${activeUser.id}/${oneCar.id}`
      );
      if (task.data) {
        setNothing("");
        setDone(true);
      } else {
        setDone(false);
      }
    } catch (er) {
      console.error(er);
    }
  };
  const handleRent = async () => {
    dispatch(carDetail(oneCar));
    dispatch(saveDetails(oneCar));
    handlePress();
  };

  useEffect(() => {
    setDone(false);
    checkBookMarked();
  }, []);

  return (
    <View style={styles.card}>
      <Pressable style={styles.Image}  onPress={handleRent}>
        {oneCar.Media? (
          console.log(oneCar.Media),
          <Image
            style={styles.carImage}
            source={{
              car
            }}
          />
        ) : (
          <Image style={styles.carImage} source={car} /> 
          )} 

        {/* {Object.values(activeUser).length ? (
          !done ? (
            <BookMark onPress={handleHeartPress} />
          ) : (
            <TopCorner />
          )
        ) : null} */}
      </Pressable>
      <View style={styles.carDetails}>
        <View style={styles.NameAvaib}>
          <Text style={styles.carName}>{oneCar.model}</Text>
          <Text style={styles.avaible}>{oneCar.status}</Text>
        </View>
        <View style={styles.PriceStar}>
          <View style={styles.booking}>
            <Text style={styles.carPrice}>
              ${oneCar.price}/{oneCar.period}
            </Text>
            <View style={styles.bookingCar}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(carDetail(oneCar));
                  navigation.navigate("Booking");
                }}
              >
                <Text style={styles.bookingCar1}>Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.reviews}>
            <TouchableOpacity onPress={handleStarPress}>
              <Image style={styles.heart} source={starImage} />
            </TouchableOpacity>
            <Text style={styles.avaible}>(150 review)</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: height * 0.31,
    width:width*.9,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 20,
    // paddingVertical: 110,
  },
  barText: {
    width: 360,
    height: 35,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  carImage: {
    // width:width*.85,
    width: '100%', // Take the full width of the Image div
    // borderRadius:8,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    height: height*.21,
  },
  heart: {
    width: 30,
    height: 28,
  },
  Image: {
    // width: width * 0.85,
    width: '100%', // Take the full width of the Image div
    display: "flex",
    paddingBottom:1,
    flexDirection: "row",
    justifyContent: "center", // Center the carImage horizontally
    alignItems: "center", // Center the carImage vertically
    gap: 10,
    height: height * 0.18,
  },
  
  NameAvaib: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 180,
  },
  PriceStar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviews: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  carDetails:{
paddingTop:10
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  avaible: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
  },
  carPrice: {
    fontSize: 17,
    paddingLeft: width * 0.5,
    fontWeight: "bold",
    color: "#6C77BF",
    fontSize: 14,
    color: "rgb(130, 124, 140)",
  },
  carPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(172, 133, 234)",
  },
  bookingCar: {
    borderWidth: 2,
    width: 120,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgrey",
    borderRadius: 5,
    backgroundColor: "lightblue",
  },
  bookingCar1: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardCar;
