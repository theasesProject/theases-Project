// NotificationPage.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifcationByUser,
  deletedNotification,
} from "../store/notificationSlice";
const { width, height } = Dimensions.get("screen");
import ring from "../assets/r.jpg";
import { selectUser, setUser } from "../store/userSlice";
const NotificationPage = () => {
  const activeUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const allNotifications = useSelector(
    (state) => state.notification.allNotification
  );

  const handleDelete = (notificationId) => {
    dispatch(deletedNotification(notificationId));
  };
  useEffect(() => {
    dispatch(getAllNotifcationByUser(activeUser.id));
  }, [dispatch, activeUser.id]);

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
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer}>
        {allNotifications
          .slice()
          .reverse()
          .map((notification, i) => (
            <View>
              <View style={styles.cardContainer} key={i}>
                <View style={styles.allText}>
                  <LinearGradient
                    style={styles.image}
                    colors={["#88b4e2", "#6C77BF"]}
                  >
                    <TouchableOpacity>
                      <Image style={styles.ring} source={ring}></Image>
                    </TouchableOpacity>
                  </LinearGradient>
                  <View style={styles.bookingText}>
                    {notification.type === "reject" ? (
                      <View>
                        <Text style={styles.booking} key={i}>
                          Booking Rejected
                        </Text>
                        <Text style={styles.text}>
                          We're sorry, but your {notification.notification}
                        </Text>
                        <Text style={styles.text}>has been rejected.</Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.booking} key={i}>
                          Booking Successfully
                        </Text>
                        <Text style={styles.text}>
                          Congradulation.Your {notification.notification}
                        </Text>
                        <Text style={styles.text}>booking successfully.</Text>
                      </View>
                    )}

                    <Text style={styles.time}>
                      {formatNotificationTime(notification.createdAt)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};
const formatNotificationTime = (createdAt) => {
  const date = new Date(createdAt);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 7,

    height: 70,
  },
  cardContainer: {
    backgroundColor: "white",
    height: height * 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: "5%",
    // paddingTop: 4,
    marginLeft: "4%",
    paddingLeft: 15,
    marginBottom: "2%",
    gap: 7,
    elevation: 12,
    width: width * 0.9,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  scrollContainer: {
    gap: 7,
  },

  ring: {
    width: 30,
    height: 30,
  },

  text: {
    alignItems: "flex-start",
    fontFamily: "FiraMono-Medium",
    fontSize: 16,
    color: "black",
  },
  time: {
    color: "darkgrey",
    fontSize: 12,
    fontFamily: "FiraMono-Medium",
  },
  image: {
    justifyContent: "center",
    width: 70,
    height: 70,
    alignItems: "center",
    borderRadius: 37,
  },
  booking: {
    fontFamily: "FiraMono-Bold",
    fontSize: 18,
  },
  bookingText: {
    flexDirection: "column",
    gap: 5,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  allText: {
    flexDirection: "row",
    gap: 8,
    padding: 5,
  },
});

export default NotificationPage;
