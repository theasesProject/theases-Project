import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  DocumentSelectionState,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import OneMessage from "../components/OneMessage";
import Send from "../assets/Svg/send-alt-1-svgrepo-com.svg";
import Attach from "../assets/Svg/attachFile.svg";
import * as DocumentPicker from "expo-document-picker";
import Phone from "../assets/Svg/call.svg";

const socket = io.connect(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:3002`);

function Conversation() {
  const room = useSelector((state) => state.chatRoom.room);
  const user = useSelector((state) => state.user.data);
  const [allMes, setAllMes] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollViewRef = useRef();

  const fetch = async () => {
    await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getMessages/${room.id}`
      )
      .then((res) => {
        setAllMes(res.data);
        console.log("messages returned");
        scrollViewRef.current?.scrollToEnd({ animated: true });
      })
      .catch((err) => console.log("error getting messages"));
  };

  const handleInput = (content) => {
    setCurrentMessage(content);
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      console.log(result);
      if (!result.canceled) {
        socket.emit("send-document", {
          name: result.name,
          type: result.type,
          uri: result.uri,
        });
      }
    } catch (error) {
      console.error(error);
    }
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
          scrollViewRef.current?.scrollToEnd({ animated: true });
          setCurrentMessage("");
        });
    }
  };

  useEffect(() => {
    socket.emit("join-room", room.id + "");
    socket.on("receive-message", (data) => {
      allMes.push(data);
      setAllMes((allMes) => [...allMes, data]);
    });
  }, [socket]);

  useEffect(() => {
    fetch();
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -height}
    >
      <View style={styles.chatHeader}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: "40%",
          }}
        >
          <Image source={{ uri: room.avatarUrl }} style={styles.imageChat} />
          <Text
            style={{ fontWeight: 700, fontSize: 20, fontFamily: "notoserif" }}
          >
            {room.name.charAt(0).toUpperCase() + room.name.slice(1)}
          </Text>
        </View>
        <Pressable>
          <Phone />
        </Pressable>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.feed}
        keyboardShouldPersistTaps="always"
      >
        {allMes.map((message, i) => {
          return <OneMessage message={message} key={i} user={user} />;
        })}
      </ScrollView>
      <View style={styles.inputs}>
        <TextInput
          placeholder="Type your Message Here"
          style={{
            width: width * 0.7,
            height: height * 0.04,
            fontSize: 17,
            paddingLeft: width * 0.03,
          }}
          onChangeText={handleInput}
          onFocus={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
          value={currentMessage}
        ></TextInput>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: width * 0.3,
          }}
        >
          <Pressable
            style={{
              height: height * 0.04,
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              sendMessage(currentMessage);
            }}
          >
            <Send />
          </Pressable>
          <Pressable
            style={{
              height: height * 0.04,
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              pickDocument();
            }}
          >
            <Attach />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#ffff",
    display: "flex",
    height: height * 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  imageChat: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "scroll",
    height: height * 0.87,
    backgroundColor: "#faf5f5",
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "sticky",
    bottom: 0,
    backgroundColor: "white",
    height: height * 0.09,
  },
});
export default Conversation;
