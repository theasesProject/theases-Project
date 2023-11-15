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
import ring from "../assets/12.png";
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
                <TouchableOpacity style={styles.image}>
                  <Image style={styles.ring} source={ring}></Image>
                </TouchableOpacity>
                <View style={styles.container}>
                  <Text style={styles.text} key={i}>
                    {notification.notification}
                  </Text>

                  <Text style={styles.time}>
                    {formatNotificationTime(notification.createdAt)}
                  </Text>
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
    backgroundColor: "lightgrey",
    padding: 7,
  },
  cardContainer: {
    backgroundColor: "white",
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: "5%",
    paddingTop: 4,
    padding: 5,
    gap: 7,
  },
  scrollContainer: {
    gap: 10,
  },

  ring: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
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
});

export default NotificationPage;
