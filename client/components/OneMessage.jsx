import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import { format } from "timeago.js";
import { Dimensions } from "react-native";

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const { height, width } = Dimensions.get("window");

function OneMessage({ message, user, user2avatar, isLastMessage }) {
  const [showDate, setShowDate] = useState(false);
  const isCurrentUser = message.senderId === user.id;
  const translateY = useSharedValue(-10);

  const startAnimation = () => {
    translateY.value = withTiming(showDate ? 0 : 20);
  };

  useEffect(() => {
    if (showDate) {
      startAnimation();
    } else {
      // Reset the animation state when showDate is false
      translateY.value = -10;
    }
  }, [showDate]);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  const renderContent = () => {
    if (message.type && message.type.startsWith("image/")) {
      return (
        <Image
          style={{ width: 200, height: 200, borderRadius: 8 }}
          source={{ uri: message.message }}
        />
      );
    } else if (message.type && message.type.startsWith("video/")) {
      return (
        <Video
          source={{ uri:message.message}}
          style={{ width: 200, height: 200, borderRadius: 8 }}
          useNativeControls
          resizeMode="contain"
        />
      );
    } else if (message.type && message.type.endsWith("/pdf")){
      return (
       <View>
<Text  style={{
            color: isCurrentUser ? "white" : "black",
            fontSize: 18,
            fontFamily: "FiraMono-Medium",
          }}>{"Document received"}</Text>
       </View>
      );
    }
    else {
      // Default case: text message
      return (
        <Text
          style={{
            color: isCurrentUser ? "white" : "black",
            fontSize: 18,
            fontFamily: "FiraMono-Medium",
          }}
        >
          {message.message}
        </Text>
      );
    }
  };

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View>
      <View style={{ marginBottom: isLastMessage ? 20 : 3 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "70%",
            alignSelf: isCurrentUser ? "flex-end" : "flex-start",
          }}
        >
          {!isCurrentUser && isLastMessage && (
            <Image
              style={{
                width: 20,
                height: 20,
                borderRadius: 15,
                marginRight: 8,
                marginTop: 5,
              }}
              source={{ uri: user2avatar }}
            />
          )}
          <Pressable onPress={() => setShowDate(!showDate)}>
            <LinearGradient
              colors={
                isCurrentUser ? ["#52affa", "#52affa"] : ["white", "white"]
              }
              style={{
                padding: 10,
                borderRadius: 15,
                borderTopRightRadius: isCurrentUser ? 5 : 15,
                borderTopLeftRadius: !isCurrentUser ? 5 : 15,
                borderBottomRightRadius:
                  isCurrentUser && !isLastMessage
                    ? 5
                    : isCurrentUser && isLastMessage
                    ? 15
                    : undefined,
                borderBottomLeftRadius: isCurrentUser ? undefined : 5,
                marginBottom: isLastMessage ? 5 : 0,
                marginLeft:
                  !isCurrentUser && !isLastMessage ? width * 0.075 : 0,
                marginRight:
                  isCurrentUser && !isLastMessage ? width * 0.075 : 0,
              }}
            >
              {renderContent()}
            </LinearGradient>
          </Pressable>
          {isCurrentUser && isLastMessage && (
            <Image
              style={{
                width: 20,
                height: 20,
                borderRadius: 15,
                marginLeft: 8,
                marginTop: 5,
              }}
              source={{ uri: user.avatar }}
            />
          )}
        </View>
        {showDate && (
          <Animated.Text
            style={[
              {
                color: "black",
                fontSize: 12,
                alignSelf: "flex-end",
                marginLeft: !isCurrentUser ? width * 0.075 : 0,
                marginRight: isCurrentUser ? width * 0.075 : 0,
                alignSelf: isCurrentUser ? "flex-end" : "flex-start",
              },
              animatedTextStyle,
            ]}
          >
            {format(message.createdAt)}
          </Animated.Text>
        )}
      </View>
    </View>
  );
}

export default OneMessage;
