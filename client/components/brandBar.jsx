import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import volkswagen from "../assets/Brands/volkswagen.png";
import renault from "../assets/Brands/renault.png";
import isuzu from "../assets/Brands/isuzu.png";
import BMW from "../assets/Brands/BMW.png";
import MercedesBenz from "../assets/Brands/MercedesBenz.png";
import dacia from "../assets/Brands/dacia.png";
import peugeot from "../assets/Brands/peugeot.png";
import skoda from "../assets/Brands/skoda.png";
import opel from "../assets/Brands/opel.png";
import suzuki from "../assets/Brands/suzuki.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { useDispatch, useSelector } from "react-redux";
import { filterCars } from "../store/carFetch";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function BrandBar({ onPress, onFilterByBrand, resetData }) {
  const dispatch = useDispatch();
  const [carByBrand, setCarByBrand] = useState([]);
  const allCars = useSelector((state) => state.car.allCars);
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const handleFilterByBrand = (brandName) => {
    !allCars.length
      ? null
      : axios
          .post(
            `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/byBrand`,
            { brand: brandName }
          )
          .then((response) => {
            onFilterByBrand(response.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
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
    <View style={styles.brand}>
      <View style={styles.BrandBar}>
        <View style={styles.barText}>
          <Text style={styles.topBrand}>Top Brands</Text>
          <Text
            style={styles.ViewAll}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            Notification{" "}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.allBrandImage}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("volkswagen")}
        >
          <Image style={styles.brandLogo} source={volkswagen}></Image>
          <Text style={styles.brandName}>volkswagen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("renault")}
        >
          <Image style={styles.brandLogo} source={renault}></Image>
          <Text style={styles.brandName}>renault</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("isuzu")}
        >
          <Image style={styles.brandLogo} source={isuzu}></Image>
          <Text style={styles.brandName}>isuzu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("BMW")}
        >
          <Image style={styles.brandLogo} source={BMW}></Image>
          <Text style={styles.brandName}>BMW</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("MercedesBenz")}
        >
          <Image style={styles.brandLogo} source={MercedesBenz}></Image>
          <Text style={styles.brandName}>Mercedes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("dacia")}
        >
          <Image style={styles.brandLogo} source={dacia}></Image>
          <Text style={styles.brandName}>dacia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("peugeot")}
        >
          <Image style={styles.brandLogo} source={peugeot}></Image>
          <Text style={styles.brandName}>peugeot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("skoda")}
        >
          <Image style={styles.brandLogo} source={skoda}></Image>
          <Text style={styles.brandName}>skoda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("opel")}
        >
          <Image style={styles.brandLogo} source={opel}></Image>
          <Text style={styles.brandName}>opel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brandDetails}
          onPress={() => handleFilterByBrand("suzuki")}
        >
          <Image style={styles.brandLogo} source={suzuki}></Image>
          <View style={styles.brandName}>
            <Text>suzuki</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  brand: {
    width: width,
    height: height * 0.21,
    borderRadius: 10,
    alignItems: "center",
    padding: height * 0.01,
    paddingBottom: height * 0.01,
  },
  BrandBar: {
    width: width,
    height: height * 0.05,
    borderRadius: 10,
    alignItems: "center",
  },
  barText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: height * 0.05,
    width: width * 0.88,
    alignItems: "center",
    paddingHorizontal: width * 0.04999999,
  },
  topBrand: {
    // fontWeight: "bold",
    fontSize: 21,
    paddingBottom: height * 0.01,
    fontFamily: "FiraMono-Bold",
  },
  ViewAll: {
    color: "#8B91B6",
    fontSize: 14,
    paddingBottom: height * 0.01,
  },
  allBrandImage: {
    // borderRadius: 10,
  },
  brandLogo: {
    width: width * 0.16,
    height: height * 0.06,
    paddingTop: height * 0.05,
    paddingLeft: width * 0.01,
    paddingRight: width * 0.01,
  },
  allBrandImage: {
    display: "flex",
    flexDirection: "row",
    // gap: 100,
  },
  brandDetails: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 10,
    width: width * 0.28,
    height: height * 0.13,
    marginLeft: width * 0.036,
  },
  brandName: {
    paddingTop: height * 0.01,
    fontWeight: "500",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12.5,
    // backgroundColor:"black",
    width: width * 0.22,
    fontFamily: "FiraMono-Medium",
  },
});

export default BrandBar;
