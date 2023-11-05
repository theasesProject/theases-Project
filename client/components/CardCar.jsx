import { View, Text, StyleSheet, Image, TouchableOpacity ,Pressable} from "react-native";
import { useEffect, useState } from "react";
import car from "../assets/car2.png";
import emptyStar from "../assets/eto.png";
import star from "../assets/star1.png";
import heartBleu from "../assets/filledPurpleHeart.png";
import BookMark from "../assets/Svg/bookMark.svg";
import TopCorner from "../assets/Svg/BookMarkDone.svg"
import { useDispatch, useSelector } from "react-redux";
import { CreateBookMark, removedBookMark } from "../store/carFetch.js";
import axios from "axios";
import { selectUser } from "../store/userSlice";
function CardCar({ oneCar }) {
  const [starSelected, setStarSelected] = useState(false);
  // const {process.env.EXPO_PUBLIC_SERVER_IP} = require("../env.js")
  const [isHeartClicked, setHeartClicked] = useState(false);
  // const [heartSelected, setHeartSelected] = useState(false);
  const [done,setDone]= useState(null)
  const activeUser = useSelector(selectUser);
  const starImage = starSelected ? star : emptyStar;
  // const heartImage = heartSelected ? heartBleu : EmptyHeart;
  const dispatch = useDispatch();

  const handleStarPress = () => {
    setStarSelected(!starSelected);
  };
  const handleHeartPress = async () => {
    // setHeartSelected(!heartSelected);
    // if (!heartSelected) {
      setHeartClicked(!isHeartClicked);
    // console.log(oneCar.id + "selim")
      dispatch(CreateBookMark({CarId:oneCar.id, UserId:activeUser.id}));
    // } else if (heartSelected) {
      // dispatch(removedBookMark(oneCar.id));
    // }
  };
  const checkBookMarked=async()=>{
try {
  const task =await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/check/${activeUser.id}/${oneCar.id}`)
  if (task.data) {
    console.log("taskkkkkkkkkkkkkk",task.data);
    setDone(true)
  }else{
    setDone(false)
  }
} catch (er) {
  console.error(er);
}
  }
useEffect(()=>{
  setDone(false)
  checkBookMarked()
},[])
  return (
    <View style={styles.card}>
    <View style={styles.Image}>
      <Image style={styles.carImage} source={car} />
      {Object.values(activeUser).length ? (!done ? <BookMark onPress={handleHeartPress}/> : <TopCorner/>) : null}
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
    backgroundColor: "white",
    width: "98%",
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
