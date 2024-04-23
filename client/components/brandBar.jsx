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
function BrandBar({ onPress, onFilterByBrand, resetData }) {
  const dispatch = useDispatch();
  const [carByBrand, setCarByBrand] = useState([]);
  const allCars = useSelector((state) => state.car.allCars);
  const navigation = useNavigation();
  const [isFontsLoaded, setFontsLoaded] = useState(false);
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
            // console.log("error", error);
          });
  };

  return (
    <View style={styles.brand}>
      {/* <View style={styles.BrandBar}> */}
      <View style={styles.barText}>
        <Text style={styles.topBrand}>Top Brands</Text>
        <View style={styles.line} />
        <Text
          style={styles.ViewAll}
          onPress={() => {
            resetData();
          }}
        >
          View All{" "}
        </Text>
      </View>
      {/* </View> */}
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
    gap: height * 0.01,
    width: width,
    height: height * 0.21,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: width * 0.02,
  },
  BrandBar: {
    width: width,
    height: height * 0.05,
    borderRadius: 10,
    alignItems: "center",
  },
  barText: {
    borderRadius: 5,
    // flex: 1,
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: height * 0.05,
    width: width * 0.88,
    alignItems: "center",
    paddingHorizontal: width * 0.04999999,
    // paddingBottom: height * 0.01,
    borderWidth: 1,
    borderColor: "#6C77BF",
  },
  topBrand: {
    fontSize: 21,
    lineHeight:24
  },
  ViewAll: {
    color: "#8B91B6",
    fontSize: 15,
    lineHeight:24,
  },
  line: {
    position: 'absolute',
    top: '50%', // Center vertically
    bottom: '50%', // Center vertically
    right:   0, // Align to the right edge of the parent
    width:   1, // Width of the line
    height:   1, // Height of the line
    backgroundColor: '#6C77BF', // Color of the line
    transform: [{ rotate: '45deg' }], // Rotate the line  45 degrees
  },
  allBrandImage: {},
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
  },
  brandDetails: {
    borderWidth: 1,
    borderColor: "#6C77BF",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 10,
    width: width * 0.274,
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
  },
});

export default BrandBar;
