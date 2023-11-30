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
import FavoritesCard from "../components/FavoritesCard.jsx";
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
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {bookMarks?.length > 0 ? (
            bookMarks
              .reverse()
              .map((bookmark, i) => (
                <FavoritesCard bookmark={bookmark} key={i} />
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
        </View>
      </ScrollView>
      <View style={styles.tabBarContainer}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  favoritesPage: {
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
  },
  scrollView: {
    width: "100%",
  },
  tabBarContainer: {
    width: width,
    position: "absolute",
    bottom: 0,
  },
});

export default Favorites;
