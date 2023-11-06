import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { format } from "timeago.js";

const socket = io.connect(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:3002`);

function Conversation() {
  const room = useSelector((state) => state.chatRoom.room);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [allMes, setAllMes] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const fetch = async () => {
    await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getMessages/${room.id}`
      )
      .then((res) => {
        setAllMes(res.data);
        console.log("messages returned");
      })
      .catch((err) => console.log("error getting messages"));
  };

  const handleInput = (content) => {
    setCurrentMessage(content);
  };

  const sendMessage = async (message) => {
    if (message !== "") {
      await axios
        .post(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/addMessage`,
          {
            senderId: user.id,
            roomId: room.id,
            message: currentMessage,
          }
        )
        .then(async (response) => {
          await socket.emit("send-message", response.data);
          setAllMes((allMes) => [...allMes, response.data]);
        });
    }
  };

  useEffect(() => {
    socket.emit("join-room", room.id + "");
    socket.on("receive-message", (data) => {
      // console.log(data);
      allMes.push(data);
      setAllMes((allMes) => [...allMes, data]);
    });
  }, [socket]);

  useEffect(() => {
    fetch();
    console.log(room);
  }, []);

  return (
    <View style={{ width: "100%", height: "83%" }}>
      <View style={styles.chatHeader}>
        <Image source={{ uri: room.avatarUrl }} style={styles.imageChat} />
        <Text style={{ marginLeft: 50, fontWeight: 500, fontSize: 20 }}>
          Chat with {room.name}!!
        </Text>
      </View>
      <ScrollView style={styles.feed}>
        {allMes.map((message, i) => {
          return (
            <View key={i} style={{ backgroundColor: message.senderId=== user.id ? "blue" : "grey", padding: 10 , position:"relative", float: message.senderId=== user.id ? "right" : "left" }}>
              <Text style={{color:"white" , alignSelf:"center"}}>{message.message}</Text>
              <Text style={{color:"white" , alignSelf:"center"}}>{format(message.createdAt)}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.inputs}>
        <TextInput
          placeholder="Type your Message Here"
          style={{
            borderColor: "black",
            borderWidth: 1,
            width: "70%",
            height: 40,
          }}
          onChangeText={handleInput}
        ></TextInput>
        <TouchableOpacity
          style={{
            borderColor: "black",
            borderWidth: 1,
            width: "30%",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            sendMessage(currentMessage);
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    position: "relative",
    top: 0,
    backgroundColor: "#ffff",
    display: "flex",
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  imageChat: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "scroll",
    height: "100%",
    gap: 2,
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "sticky",
    bottom: 60,
  },
});
export default Conversation;
