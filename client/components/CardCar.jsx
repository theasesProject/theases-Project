import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import car from "../assets/car2.png";
import emptyStar from "../assets/eto.png";
import star from "../assets/star1.png";
import heartBleu from "../assets/filledPurpleHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import { useDispatch, useSelector } from "react-redux";
import { CreateBookMark, removedBookMark } from "../store/carFetch.js";
import { selectUser } from "../store/userSlice";
function CardCar({ oneCar, openPanel }) {
  const [starSelected, setStarSelected] = useState(false);
  // const {process.env.EXPO_PUBLIC_SERVER_IP} = require("../env.js")
  const [heartSelected, setHeartSelected] = useState(false);
  const activeUser = useSelector(selectUser);
  const starImage = starSelected ? star : emptyStar;
  const heartImage = heartSelected ? heartBleu : emptyHeart;
  const dispatch = useDispatch();

  const handleStarPress = () => {
    setStarSelected(!starSelected);
  };
  const handleHeartPress = async () => {
    setHeartSelected(!heartSelected);

    if (!heartSelected) {
      CreateBookMark(oneCar.id, activeUser.id);
    } else if (heartSelected) {
      removedBookMark(oneCar.id);
    }
  };

  return (
    <View style={styles.card} onPress={openPanel}>
      <View style={styles.Image}>
        <Image style={styles.carImage} source={car} />
        <TouchableOpacity onPress={handleHeartPress}>
          <Image style={styles.heart} source={heartImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.carDetails}>
        <View style={styles.NameAvaib}>
          <Text style={styles.carName}>{oneCar.model}</Text>
          <Text style={styles.avaible}>{oneCar.status}</Text>
        </View>
        <View style={styles.PriceStar}>
          <View style={styles.reviews}>
            <TouchableOpacity onPress={handleStarPress}>
              <Image style={styles.heart} source={starImage}></Image>
            </TouchableOpacity>
            <Text style={styles.avaible}>(150 review)</Text>
          </View>
          <Text style={styles.carPrice}>
            ${oneCar.price}/{oneCar.period}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgb(237, 238, 247)",
    width: "100%",
    height: 250,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  barText: {
    width: 360,
    height: 35,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  carImage: {
    width: 300,
    height: 150,
  },
  heart: {
    width: 30,
    height: 28,
  },
  Image: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    gap: 10,
    height: 150,
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
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  avaible: {
    fontSize: 14,
    color: "rgb(130, 124, 140)",
  },
  carPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(172, 133, 234)",
  },
});

export default CardCar;
