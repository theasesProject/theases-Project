import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
import { getAllBoolMarks, removedBookMark } from "../store/carFetch.js";
import { selectUser } from "../store/userSlice";
import GreyHeart from "../assets/Svg/greyHeart";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import NavBar from "../components/NavBar.jsx";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function Favorites() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const bookMarks = useSelector((state) => state.car.bookMarks);

  useEffect(() => {
    dispatch(getAllBoolMarks(activeUser?.id));
  }, []);
  const renderRightActions = (progress, dragX, carId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 30],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => {
            dispatch(removedBookMark(carId));
            console.log("delete");
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.favoritesPage}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {bookMarks?.length > 0 ? (
          bookMarks
            .slice()
            .reverse()
            .map((bookmark, i) => (
              <Swipeable
                key={i}
                style={styles.swipe}
                renderRightActions={(progress, dragX) =>
                  renderRightActions(progress, dragX, bookmark.car.id)
                }
              >
                <View key={i} style={styles.carCard}>
                  <View>
                    <Image
                      style={styles.car}
                      source={{
                        uri: bookmark.carImage?.media,
                      }}
                    />

                    <View style={styles.lineContainer}>
                      <View style={styles.line}></View>
                    </View>

                    <View style={styles.modelagencyname}>
                      <View style={styles.model}>
                        <Text style={styles.title}>{bookmark.car?.model}</Text>
                      </View>

                      <View style={styles.name}>
                        <Text style={styles.title}>
                          {bookmark.agency?.name}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.brandprice}>
                      <View style={styles.brand}>
                        <Text style={styles.brandTitle}>
                          {bookmark.car?.brand}
                        </Text>
                      </View>

                      <View style={styles.price}>
                        <Text style={styles.titlePrice}>
                          ${bookmark.car?.price}/Daily
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Swipeable>
            ))
        ) : (
          <View style={styles.message}>
            <GreyHeart />
            <View style={styles.messageContainer}>
              <Text style={styles.emptyText1}>Empty Favourite list</Text>
              <Text style={styles.emptyText}>
                it feel like nothing to Collect in your favourite
              </Text>
              <Text style={styles.emptyText}>
                list let's add your favourite car{" "}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <NavBar style={styles.NavBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  favoritesPage: {
    height: height * 0.98,
    justifyContent: "center",
    alignItems: "center",
  },
  carCard: {
    borderColor: "#6C77BF",
    borderWidth: 1,
    width: width * 0.93,
    height: height * 0.35,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  swipe: {},
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

  messageContainer: {
    paddingTop: 15,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },

  message: {
    alignItems: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  cancelText: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
  },
  buttonText1: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  calender: {
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: height * 0.5,
    borderRadius: 10,
    padding: 10,
    marginVertical: "18%",
  },
  NavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07,
  },
});

export default Favorites;
