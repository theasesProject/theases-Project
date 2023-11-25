import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
import back from "../assets/back.png";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import star from "../assets/star.jpg";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function FiltredCar() {
  const navigation = useNavigation();

  const avaibleCar = useSelector((state) => state.booking.avaibleCar);
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
    <View style={styles.homePage}>
      <ScrollView>
        <View>
          {avaibleCar
            ? avaibleCar.map((element, i) => (
                <View key={i} style={styles.all}>
                  {console.log(element)}
                  <View style={styles.carCard}>
                    <View style={styles.items}>
                     
                      <Image
                        style={styles.car}
                        source={{
                          uri: element.Media[0]?.media,
                        }}
                      />
                        <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                      </View>

                      <View style={styles.modelagencyname}>

                      <View style={styles.model}>
                        <Text style={styles.title}>
                          {element.model}
                          </Text>
                          </View>

                          <View style={styles.name}>
                        <Text style={styles.title}>{element.typeOfFuel}</Text>
                          </View>
</View>
                          <View style={styles.brandprice}>
                        <View style={styles.brand}>
                        <Text style={styles.titlePrice}>
                            {element.brand}
                          </Text>
                        </View>
                        
                        <View style={styles.price}>
                        <Text style={styles.titlePrice}>
                          ${element.price}/Daily
                        </Text> 
                        </View>
                    
                      </View>
                    </View>
                  </View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  carCard: {
    borderColor: "#6C77BF",
    borderWidth: 1,
    width: width*0.93,
    height: height * 0.35,
    marginBottom:5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  swipe: {
    
  },
  lineContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  line: {
    backgroundColor: "lightgrey",
    height: height * 0.002,
    width: width * 0.8,
  },
  modelagencyname: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  model: {
    backgroundColor: "#6C77BF",
    justifyContent: "center",
    alignItems: "center",
    // height: height * 0.1,
    width: "48%",
    borderRadius: 3,
  },
  name: {
    backgroundColor: "#6C77BF",
    // backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 3,
  },
  brandprice: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  brand: {
    // flex:1,
    //  backgroundColor: "#6C77BF",
    justifyContent: "center",
    alignItems: "center",
    // height: height * 0.1,
    width: "48%",
    borderRadius: 3,
  },
  brandTitle: {
    color: "blue",
    fontSize: 18,
  },
  price: {
    // flex:1,
    // backgroundColor: "#6C77BF",
    // backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 3,
  },
  titlePrice: {
    color: "blue",
    fontSize: 18,
  },
  scroll: {
    marginBottom: 60,
  },
  container: {
    height: height * 0.96,
    // alignItems: "center",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  favoriteCar: {
    marginBottom: 10,
  },
  messageContainer: {
    paddingTop: 15,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
  
  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  
  emptyText1: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    color: "grey",
  },

  car: {
    width: width * 0.9,
    height: height * 0.25,
    // borderRadius: 7,
  },
  title: {
    // flex:1,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  delete: {
    justifyContent: "flex-end",
    width: 20,
    height: 20,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: height * 0.1,
  },
  rightActions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
 
  });

export default FiltredCar;
