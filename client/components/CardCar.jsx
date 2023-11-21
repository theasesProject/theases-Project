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
import { LinearGradient } from "expo-linear-gradient";
import car from "../assets/car2.png";
import vitesse from "../assets/vitesse.png";
import emptyStar from "../assets/eto.png";
import star from "../assets/star1.png";
import RatingStar from "../assets/Svg/RatingStar.svg";
import BookMark from "../assets/Svg/bookMark.svg";
import emptyHeart from "../assets/emtyheartRed.jpg";
import heart from "../assets/heart.png";
import TopCorner from "../assets/Svg/BookMarkDone.svg";
import brand from "../assets/brand.png";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBookMark,
  removedBookMark,
  saveDetails,
  carDetail,
} from "../store/carFetch.js";
import axios from "axios";
import fuel from "../assets/fuel.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { selectUser } from "../store/userSlice";
import { Booking } from "../pages/Booking.jsx";

function CardCar({ oneCar, setNothing, handlePress }) {
  const [heartSelected, setHeartSelected] = useState(false);

  const activeUser = useSelector(selectUser) || {};

  const heartImage = heartSelected ? emptyHeart : heart;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleHeartPress = async () => {
    setHeartSelected(!heartSelected);
    if (!heartSelected) {
      setHeartSelected(!heartSelected);

      dispatch(CreateBookMark({ CarId: oneCar.id, UserId: activeUser.id }));
    } else if (heartSelected) {
      dispatch(removedBookMark(oneCar.id));
    }
  };
  const checkBookMarked = async () => {
    try {
      const task = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/check/${activeUser.id}/${oneCar.id}`
      );
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
    checkBookMarked();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.imageCar}>
        <View style={styles.favorities}>
          <TouchableOpacity onPress={handleHeartPress} style={styles.favourite}>
            <Image style={styles.favourite1} source={heartImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageCar1}>
          <Image style={styles.imageCar2} src={oneCar.Media[0]?.media}></Image>
        </View>
      </View>

      <TouchableOpacity onPress={handleRent} style={styles.information}>
        <View style={styles.carInformation}>
          <View style={styles.agencyName}>
            <Text style={styles.name}>{oneCar?.Agency.name}</Text>
          </View>
          <View style={styles.carName}>
            <Text style={styles.name1}>{oneCar?.model}</Text>
          </View>
        </View>
        <View style={styles.price}>
          <Text style={styles.price1}>${oneCar?.price}/day</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRent} style={styles.details}>
        <View style={styles.typeofFuel}>
          <Image style={styles.vitesse} source={brand} />
          <Text style={styles.VitesseName}>{oneCar?.brand}</Text>
        </View>
        <View style={styles.typeofFuel}>
          <LinearGradient colors={["#6C77BF", "#4485C5"]}></LinearGradient>
          <Image style={styles.vitesse} source={vitesse} />
          <Text style={styles.VitesseName}>{oneCar?.characteristics}</Text>
        </View>
        <View style={styles.typeofFuel}>
          <Image style={styles.vitesse} source={fuel} />
          <Text style={styles.VitesseName}>{oneCar?.typeOfFuel}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    alignItems: "center",
  },
  imageCar: {
    backgroundColor: "rgb(246, 246, 246)",
    width: width * 0.8,
    height: height * 0.2,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageCar1: {
    width: width * 0.8,
    height: height * 0.13,
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageCar2: {
    width: width * 0.65,
    height: height * 0.18,
    borderRadius: 15,
    padding: 5,

    justifyContent: "center",
  },
  information: {
    backgroundColor: "white",
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  details: {
    width: width * 0.8,
    height: height * 0.08,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    gap: 5,
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
  },
  favorities: {
    width: width * 0.8,
    height: height * 0.05,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 2,
    position: "absolute",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    width: width * 0.15,
    height: height * 0.05,
    borderRadius: 15,
  },
  favourite: {
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.15,
    height: height * 0.05,
    borderRadius: 15,
  },
  favourite1: {
    width: width * 0.08,
    height: height * 0.032,
  },
  carInformation: {
    width: width * 0.5,
    height: height * 0.08,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  price: {
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-end",

    width: width * 0.3,
    height: height * 0.08,
  },
  agencyName: {
    width: width * 0.5,
    height: height * 0.04,
  },
  carName: {
    width: width * 0.5,
    height: height * 0.04,
  },
  brand: {
    backgroundColor: "white",
    width: width * 0.255,
    height: height * 0.07,
  },
  typeofFuel: {
    flexDirection: "row",

    width: width * 0.255,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  typeOfVehecile: {
    backgroundColor: "white",
    width: width * 0.255,
    height: height * 0.07,
  },
  name: {
    color: "#9EB8D9",
    fontSize: 16,
  },
  name1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9EB8D9",
  },
  vitesse: {
    width: width * 0.06,
    height: height * 0.03,
    borderRadius: 10,
  },
  VitesseName: {
    color: "grey",
    fontSize: 16,
  },
  Vitesse1: {
    width: width * 0.081,
    height: height * 0.04,
    borderRadius: 10,
  },
});

export default CardCar;
