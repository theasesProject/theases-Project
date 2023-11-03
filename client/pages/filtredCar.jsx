import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import CardCar from "../components/CardCar.jsx";
import { useDispatch, useSelector } from "react-redux";
import back from "../assets/back.png";
import { useNavigation } from "@react-navigation/native";

function FiltredCar() {
  const navigation = useNavigation();
  const filteredCars = useSelector((state) => state.car.carFiltred);
  console.log(filteredCars, "selected");
  return (
    <View style={styles.homePage}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image style={styles.backImage} source={back}></Image>
      </TouchableOpacity>
      <ScrollView>
        {filteredCars
          ? filteredCars.map((element, i) => (
              <View style={styles.all}>
                <CardCar key={i} oneCar={element} />
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  homePage: {
    marginTop: "20%",
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  all: {
    paddingBottom: 20,
  },
  backImage: {
    width: 22,
    height: 20,
    justifyContent: "flex-start",
  },
});

export default FiltredCar;
