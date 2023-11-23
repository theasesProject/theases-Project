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
import car2 from "../assets/car2.png";
import star from "../assets/star.jpg";
import deleteImge from "../assets/xBtn.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavBar from "../components/NavBar.jsx";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function Favorites() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const bookMarks = useSelector((state) => state.car.bookMarks);

  useEffect(() => {
    dispatch(getAllBoolMarks(activeUser.id));
  }, []);

  const handleDelete = (id) => {
    removedBookMark(id);
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
    <View style={styles.favoritesPage}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {bookMarks?.length > 0 ? (
          bookMarks
            .slice()
            .reverse()
            .map((bookmark, i) => (
              <View key={i} style={styles.carCard}>
                <View style={styles.items}>
                  <View style={styles.deleted2}>
                    <TouchableOpacity onPress={handleDelete(bookmark.car.id)}>
                      <Image style={styles.delete} source={deleteImge} />
                    </TouchableOpacity>
                  </View>
                  <Image
                    style={styles.car}
                    source={{
                      uri: bookmark.carImage?.media,
                    }}
                  />
                  <View style={styles.detail}>
                    <Text style={styles.title}>{bookmark.car?.model}</Text>
                    <View style={styles.stars}>
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                      <Image style={styles.star} source={star} />
                    </View>
                    <Text style={styles.agencyName}>
                      {bookmark.agency?.name}
                    </Text>
                    <Text style={styles.price}>
                      ${bookmark.car?.price}/{bookmark.car?.period}
                    </Text>
                  </View>
                </View>
              </View>
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
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    borderTopColor: "lightgrey",
    borderWidth: 1,
  },
  NavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: height * 0.89,
  },
  messageContainer: {
    paddingTop: 15,
  },
  carImage: {
    width: 100,
    height: 100,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
    fontFamily: "FiraMono-Medium",
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
  favouriteText: {
    color: "black",
    fontFamily: "FiraMono-Bold",
    fontSize: 18,
  },
  carCard: {
    borderColor: "lightgrey",
    borderWidth: 1,
    width: "100%",
    height: height * 0.17,
    marginBottom: height * 0.03,
    borderRadius: 10,
    backgroundColor: "white",
  },
  car: {
    width: 180,
    height: 120,
    borderRadius: 7,
  },
  star: {
    width: 15,
    height: 15,
  },
  items: {
    flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
    gap: 3,
  },
  detail: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: 140,
    gap: 7,
    padding: 8,
  },
  title: {
    color: "black",
    fontFamily: "FiraMono-Bold",
    fontSize: 16,
  },
  agencyName: {
    color: "lightgrey",
    fontSize: 14,
    fontFamily: "FiraMono-Medium",
  },
  delete: {
    justifyContent: "flex-end",
    width: width * 0.05,
    height: height * 0.03,
  },
  deleted2: {
    width: 320,
    height: 10,
    position: "absolute",
    alignItems: "flex-end",
    padding: 4,
  },
});

export default Favorites;
