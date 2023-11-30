import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import vitesse from "../assets/vitesse.png";
import FilledHeart from "../assets/Svg/filledHeart.svg";
import EmptyHeart from "../assets/Svg/emptyHeart.svg";
import brand from "../assets/brand.png";
import { useDispatch, useSelector } from "react-redux";
import { saveDetails, carDetail } from "../store/carFetch.js";
import axios from "axios";
import fuel from "../assets/fuel.png";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../store/userSlice";
import { Booking } from "../pages/Booking.jsx";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
function CardCar({ oneCar, handlePress }) {
  const [heartSelected, setHeartSelected] = useState(false);

  const activeUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleHeartPress = async () => {
    try {
      console.log("activeUser: ", activeUser);
      if (!activeUser) {
        navigation.navigate("Login");
      }
      if (!heartSelected) {
        setHeartSelected(true);
        await axios.post(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/add`,
          { CarId: oneCar.id, UserId: activeUser.id }
        );
      } else {
        setHeartSelected(false);
        await axios.delete(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/delete/${oneCar.id}`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  const checkBookMarked = async () => {
    try {
      const task = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/check/${activeUser?.id}/${oneCar.id}`
      );
      if (task?.data?.CarId === oneCar?.id) {
        setHeartSelected(true);
      }
    } catch (er) {
      console.error(er);
    }
  };

  const handleRent = async () => {
    dispatch(carDetail(oneCar));
    dispatch(saveDetails(oneCar));
    handlePress();
    navigation.navigate("details");
  };

  useEffect(() => {
    checkBookMarked();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.imageCar1}>
        <Image style={styles.imageCar2} src={oneCar?.Media[0]?.media} />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleRent}
        style={styles.information}
      >
        <View style={styles.carInformation}>
          <Text style={styles.name}>{oneCar?.Agency?.name}</Text>
          <Text style={styles.name1}>{oneCar?.model}</Text>
        </View>
        <View style={styles.price}>
          <TouchableOpacity onPress={handleHeartPress} style={styles.favourite}>
            {heartSelected ? <FilledHeart /> : <EmptyHeart />}
          </TouchableOpacity>
          <Text style={styles.price1}>${oneCar?.price}/day</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleRent}
        style={styles.details}
      >
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
    marginBottom: "5%",
  },
  imageCar: {
    backgroundColor: "rgb(246, 246, 246)",
    width: width * 0.85,
    height: height * 0.2,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  favourite: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    zIndex: 1,
  },
  favourite1: {
    width: width * 0.08,
    height: height * 0.032,
  },
  imageCar1: {
    width: "100%",
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageCar2: {
    width: width * 0.82,
    height: height * 0.2,
    borderRadius: 7,
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
    zIndex: -1,
  },
  carInformation: {
    width: width * 0.5,
    height: height * 0.08,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  agencyName: {
    width: width * 0.5,
    height: height * 0.04,
  },
  name: {
    color: "#9EB8D9",
    fontSize: 16,
  },
  carName: {
    width: width * 0.5,
    height: height * 0.04,
  },
  name1: {
    fontSize: 16,
  },
  price: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: width * 0.3,
    height: height * 0.08,
  },
  price1: {
    fontSize: 16,
    color: "#9EB8D9",
  },
  line: {
    height: height * 0.001,
    backgroundColor: "lightgray",
    width: width * 0.85,
  },
  details: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeofFuel: {
    flexDirection: "row",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.007,
  },
  vitesse: {
    width: width * 0.06,
    height: height * 0.03,
    borderRadius: 10,
  },
  VitesseName: {
    color: "grey",
    fontSize: 13,
  },
});

export default CardCar;
