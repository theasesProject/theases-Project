import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoolMarks, removedBookMark } from "../store/carFetch.js";
import { selectUser } from "../store/userSlice";
import greyHeart from "../assets/greyHeart.jpg";
import car2 from "../assets/car2.png";
import star from "../assets/star.jpg";
import deleteImge from "../assets/delete.jpg";
import { TouchableOpacity } from "react-native-gesture-handler";
function Favorites() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const bookMarks = useSelector((state) => state.car.bookMarks);

  useEffect(() => {
    dispatch(getAllBoolMarks(activeUser.id));
  }, []);
console.log('heeere',bookMarks)
  const handleDeled = (id) => {
    removedBookMark(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.favouriteText}>Favourite</Text>

        {bookMarks.length > 0 ? (
          bookMarks.map((bookmark,i) => (
            <View key={i} style={styles.carCard}>
              <View style={styles.items}>
                <View style={styles.deleted2}>
                  <TouchableOpacity onPress={handleDeled(bookmark.car.id)}>
                    <Image style={styles.delete} source={deleteImge} />
                  </TouchableOpacity>
                </View>
                <Image style={styles.car} source={bookmark.carImage.media} />
                <View style={styles.detail}>
                  <Text style={styles.title}>{bookmark.car.model}</Text>
                  <View style={styles.stars}>
                    <Image style={styles.star} source={star} />
                    <Image style={styles.star} source={star} />
                    <Image style={styles.star} source={star} />
                    <Image style={styles.star} source={star} />
                    <Image style={styles.star} source={star} />
                  </View>
                  <Text style={styles.agencyName}>{bookmark.agency.name}</Text>
                  <Text style={styles.price}>
                    ${bookmark.car.price}/{bookmark.car.period}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.message}>
            <Image source={greyHeart} style={styles.heart} />
            <Text style={styles.emptyText1}>Empty Favourite list</Text>
            <Text style={styles.emptyText}>
              it feel like nothing to Collect in your favourite{" "}
            </Text>
            <Text style={styles.emptyText}>
              list let's add your favourite car{" "}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 7,
    marginVertical: 7,
    marginTop: "12%",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteCar: {
    marginBottom: 10,
  },
  carImage: {
    width: 100,
    height: 100,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "rgb(219, 217, 224)",
  },
  heart: {
    width: 60,
    height: 55,
  },
  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 180,
    gap: 20,
  },

  emptyText1: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    color: "rgb(219, 217, 224)",
  },
  favouriteText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  carCard: {
    marginTop: "7%",
    borderColor: "grey",
    borderWidth: 2,
    width: "100%",
    height: 120,
    borderRadius: 10,
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
    fontWeight: "bold",
    fontSize: 16,
  },
  agencyName: {
    color: "lightgrey",
    fontSize: 14,
  },
  price: {
    color: "blue",
  },
  delete: {
    justifyContent: "flex-end",
    width: 20,
    height: 20,
  },

  deleted2: {
    width: 320,
    height: 10,
    position: "absolute",
    alignItems: "flex-end",
  },
});

export default Favorites;
