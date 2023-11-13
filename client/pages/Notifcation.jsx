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

import { selectUser, setUser } from "../store/userSlice";
const NotificationPage = () => {
  const activeUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const allNotifications = useSelector(
    (state) => state.notification.allNotification
  );

  console.log(allNotifications, "allNotifications");

  const handleDelete = (notificationId) => {
    dispatch(deletedNotification(notificationId));
  };
  useEffect(() => {
    dispatch(getAllNotifcationByUser(activeUser.id));
  }, [dispatch, activeUser.id]);
  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer}>
        {allNotifications ? (
          allNotifications
            .slice()
            .reverse()
            .map((notification, i) => (
              <View key={i} style={styles.cardContainer}>
                <View style={styles.userContainer}>
                  <Text style={styles.name}>{notification.notification} </Text>
                </View>

                <View>
                  {/* <Text>{service.service?.Service.amount}</Text> */}
                </View>

                <View style={styles.actionContainer}>
                  <LinearGradient
                    style={styles.rejectButton}
                    colors={["#6C77BF", "#4485C5"]}
                  >
                    <TouchableOpacity>
                      <Text>payment</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(notification.id);
                    }}
                    style={styles.acceptButton}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
        ) : (
          <Text>Nothing</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  cardContainer: {
    backgroundColor: "white",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: width * 0,
      height: height * 0.1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  carContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  acceptButton: {
    backgroundColor: "#FF6969",
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,

    marginLeft: 5,
  },
  rejectButton: {
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    marginLeft: 5,
  },
  scrollContainer: {},
  carImage: {
    width: 50,
    height: 50,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    color: "#0174BE",
    fontSize: 14,
    fontWeight: "bold",
  },
  name: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: { color: "grey" },
  modalCloseButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },

  modalText: {
    fontSize: 14,
    marginBottom: 10,
    color: "grey",
  },
});

export default NotificationPage;
