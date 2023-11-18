import React, { useEffect, useState, useRef } from "react";
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
} from "react-native";
import * as FileSystem from "expo-file-system";
const { width, height } = Dimensions.get("window");
import { useSelector } from "react-redux";
import axios from "axios";
import OneMessage from "../components/OneMessage";
import Send from "../assets/Svg/send-alt-1-svgrepo-com.svg";
import Attach from "../assets/Svg/attachFile.svg";
import * as DocumentPicker from "expo-document-picker";
import socket from "../socket-io.front.server"

function Conversation() {
  const room = useSelector((state) => state.chatRoom.room);
  const user = useSelector((state) => state.user.data);
  const [allMes, setAllMes] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollViewRef = useRef();
  const OneMessageMemo = React.memo(OneMessage);
  const [currentPage, setCurrentPage] = useState(1);

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
      if (!result.canceled) {
        const file = result.assets[0];

        // Read the file as binary data
        const binaryData = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Encode the binary data using btoa
        const base64Data = btoa(binaryData);

        // Send the Base64 string as part of the message
        sendMessage(base64Data, file.type);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isLastMessage = (index) => {
    if (index < allMes.length - 1) {
      const currentSenderId = allMes[index].senderId;
      const nextSenderId = allMes[index + 1].senderId;
      return currentSenderId !== nextSenderId;
    }
    return true; // Last message in the array is always considered the last
  };
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (message, type = undefined) => {
    if (!isSending && message !== "") {
      try {
        setIsSending(true);
        await socket.emit("send-message", {
          senderId: user.id,
          roomId: room.id,
          message,
          type,
        });
        await axios.post(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/addMessage`,
          {
            senderId: user.id,
            roomId: room.id,
            message: message,
            type: type,
          }
          );
          setAllMes((allMes) => [
            ...allMes,
            { senderId: user.id, message, type },
          ]);
          setCurrentMessage("");
        scrollViewRef.current?.scrollToEnd({ animated: true });
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        // Reset the sending flag after the cooldown period (e.g., 2 seconds)
        setTimeout(() => {
          setIsSending(false);
        }, 1000); // Set your desired cooldown time in milliseconds
      }
    }
  };

  useEffect(() => {
    socket.emit("join-room", room.id + "");
    socket.on("receive-message", (data) => {
      // allMes.push(data);
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
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.feed}
        keyboardShouldPersistTaps="always"
      >
        {allMes.map((message, i) => (
          <OneMessageMemo
            message={message}
            key={i}
            user={user}
            user2avatar={room.avatarUrl}
            isLastMessage={isLastMessage(i)}
          />
        ))}
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
              justifyContent: "center",
            }}
            onPress={pickDocument}
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
    backgroundColor: "white",
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
    backgroundColor: "#f2f6f9",
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
