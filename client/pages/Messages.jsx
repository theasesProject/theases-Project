import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Search from "../assets/Svg/search-svgrepo-com.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dimensions } from "react-native";
import OneRoom from "../components/OneRoom";
const { height } = Dimensions.get("window");
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function Messages() {
  const [user2ID, setUser2ID] = useState("");
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  const fetch = async () => {
    await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getAllRoomsUserId/${user.data.id}`
      )
      .then(async (response) => {
        //ya gdim
        setRooms(response.data);
        await axios
          .get(
            `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getAllRoomsUser2/${user.data.id}`
          )
          .then((res) => {
            if (res.data.length !== 0) {
              setRooms(rooms.concat(res.data));
            }
          });
      })
      .catch((error) => console.log(error));
  };

  const handleInput = (content) => {
    if (!(parseInt(content) === user.data.id)) {
      setUser2ID(parseInt(content));
    }
  };
  const handleAddRoom = async () => {
    await axios

      .post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/makeRoom`,
        { UserId: parseInt(user.data.id), user2: parseInt(user2ID) }
      )
      .then(() => {
        console.log("success");
        setRefresh(!refresh);
      });
  };

  useEffect(() => {
    fetch();
    console.log(rooms);
  }, [refresh]);

  return (
    <View style={styles.messages}>
      <Text style={styles.title}> Messages </Text>
      <View style={styles.searchDiv}>
        <TouchableOpacity>
          <Search />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.input} />
      </View>
      <ScrollView style={styles.allRooms}>
        {rooms.length !== 0 ? (
          rooms.map((room, i) => {
            return <OneRoom room={room} key={i} />;
          })
        ) : (
          <View></View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  messages: {
    top: height * 0.05,
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    padding:15
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    marginBottom: "10%",
  },
  searchDiv: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    width: "100%",
    height: 50,
    paddingLeft: "3%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginLeft: 10,
    fontSize: 17,
    overflow: "hidden",
  },
  allRooms: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: 40,
  },
});

export default Messages;
