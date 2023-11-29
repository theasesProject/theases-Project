import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { setRoom } from "../store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
function OneRoom({ room }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.data);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");

  const getRoomData = async () => {
    if (user.id === room.UserId) {
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.user2}`
        )
        .then((response) => {
          console.log(response.data);
          setAvatarUrl(response.data.avatar);
          setName(response.data.userName);
        });
    } else {
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/getOne/${room.UserId}`
        )
        .then((response) => {
          setAvatarUrl(response.data.avatar);
          setName(response.data.userName);
        });
    }
  };

  useEffect(() => {
    getRoomData();
    console.log(avatarUrl, name);
  }, []);
  return (
    <Pressable
      style={styles.roomContainer}
      onPress={() => {
        dispatch(setRoom({ ...room, name: name, avatarUrl: avatarUrl }));
        navigation.navigate("conversation");
      }}
    >
      <Image source={{ uri: avatarUrl || null }} style={styles.image} />
      <Text
        style={{
          marginLeft: 40,
          fontWeight: 500,
          fontSize: 17,
        }}
      >
        {name || null}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    padding: height * 0.015,
    paddingLeft: 0,
    paddingBottom: height * 0.02,
    paddingTop: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#ede4e4",
  },
  image: {
    width: height * 0.08,
    height: width * 0.16,
    borderRadius: 50,
  },
});

export default OneRoom;
