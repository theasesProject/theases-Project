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
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";
import OneMessage from "../components/OneMessage";
import Send from "../assets/Svg/send-alt-1-svgrepo-com.svg";
import Attach from "../assets/Svg/attachFile.svg";
import * as DocumentPicker from "expo-document-picker";
import socket from "../socket-io.front.server";
import Phone from "../assets/Svg/call.svg";
import * as FileSystem from "expo-file-system";
import base64 from "base-64";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const { width, height } = Dimensions.get("screen");
var Buffer = require("buffer/").Buffer;

const cloudinaryUpload = async (fileUri, fileType) => {
  const cloudName = "torbaga";
  const myUploadPreset = "zpsqdpwt";

  try {
    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      type: fileType,
      name: "my_media", // You can customize the file name as needed
    });

    formData.append("upload_preset", myUploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );

    if (response.status === 200) {
      return response.data.secure_url;
    } else {
      // console.error("Media upload failed");
    }
  } catch (error) {
    // console.error("Cloudinary upload error:", JSON.stringify(error));
  }
};
function Conversation() {
  const [outputDirectory, setOutputDirectory] = useState(null);

  const room = useSelector((state) => state.chatRoom.room);
  // console.log('hhhhh',room);
  const user = useSelector((state) => state.user.data);
  const [allMes, setAllMes] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollViewRef = useRef();
  const OneMessageMemo = React.memo(OneMessage);
  const [receivedDocuments, setReceivedDocuments] = useState([]);
  const fetch = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getMessages/${room.id}`
      );
      setAllMes(response.data);
      // console.log("messages returned");
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      // console.log("error getting messages", error);
    }
  };

  const handleInput = (content) => {
    setCurrentMessage(content);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf", "video/*"],
      });

      if (!result.canceled && result.assets[0].uri) {
        const cloudinaryResponse = await cloudinaryUpload(
          result.assets[0].uri,
          result.assets[0].mimeType
        );

        sendMessage(cloudinaryResponse, result.assets[0].mimeType);
        await socket.emit("send-document", {
          name: result.assets[0].name,
          type: result.assets[0].type,
          data: cloudinaryResponse,
        });

        // console.log("sent to the server");
      }
    } catch (error) {
      // console.error(error);
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
        // console.error("Error sending message:", error);
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
  // useEffect(() => {
  //   const loadFonts = async () => {
  //     await Font.loadAsync({
  //       "FiraMono-Bold": FiraMonoBold,
  //       "FiraMono-Medium": FiraMonoMedium,
  //     });
  //   };

  //   loadFonts();
  // }, []);

  useEffect(() => {
    const handleReceiveDocument = async (data) => {
      try {
        // console.log("Receive document", data);
        // sendMessage(data.data,data.mimeType,data)
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const dir = `${FileSystem.documentDirectory}received_documents/`;
        const filePath = `${dir}${data.name}`;
        // console.log("dir: ", dir);

        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

        // Use ImagePicker to download and save the image
        await FileSystem.downloadAsync(data.data, filePath);

        const updatedDocuments = [
          ...receivedDocuments,
          { ...data, localUri: filePath },
        ];

        setReceivedDocuments(updatedDocuments);

        // console.log("The file has been saved!", `${dir}${data.name}`);

        if (updatedDocuments.length === 0) {
          Alert.alert("No processed images to save.");
          return;
        }

        const assetPromises = updatedDocuments.map(async (imageUri) => {
          // console.log("imageUri: ", imageUri?.localUri, "imguri");
          if (imageUri?.localUri) {
            const asset = await MediaLibrary.createAssetAsync(
              imageUri.localUri
            );
            return asset;
          }
          return null; // Handle undefined or null values
        });

        const assets = await Promise.all(assetPromises.filter(Boolean));

        Alert.alert("Images saved to gallery.");
      } catch (error) {
        // console.error("Error receiving document:", error);
      }
    };

    socket.on("receive-document", handleReceiveDocument);

    return () => {
      socket.off("receive-document", handleReceiveDocument);
    };
  }, [socket, receivedDocuments]);
  const openDocument = () => {
    Alert.alert("already saved !");
  };

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
            style={{
              fontWeight: 700,
              fontSize: 20,
            
            }}
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
