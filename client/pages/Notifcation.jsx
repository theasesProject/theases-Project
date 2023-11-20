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
                  <TouchableOpacity style={styles.image}>
                    <Image style={styles.ring} source={ring}></Image>
                  </TouchableOpacity>
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
  // container: {
  //   flexDirection: "column",
  //   justifyContent: "space-between",
  //   gap: 10,
  // },
  text: {
    alignItems: "flex-start",
    // fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  time: {
    color: "darkgrey",
    fontSize: 12,
  },
  image: {
    backgroundColor: "green",
    justifyContent: "center",
    width: 70,
    height: 70,
    alignItems: "center",
    borderRadius: 37,
  },
  booking: {
    fontWeight: "bold",
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
