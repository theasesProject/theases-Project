import React, { useState  } from 'react'
import { View,Pressable , Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { format } from "timeago.js";

function OneMessage({message , user}) {
    const [showDate,setShowDate] = useState(false)
    console.log("donegit");
    console.log("done2");

  return (
    <View>
        <View
              style={{
                alignSelf:
                  message.senderId === user.id ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              <Pressable onPress={()=>{setShowDate(!showDate)}}>
              <LinearGradient
                colors={
                  message.senderId === user.id
                    ? ["#52affa", "#52affa"]
                    : ["#d6d6d6", "#d6d6d6"]
                }
                style={{
                  padding: 10,
                  borderRadius: 15,
                  borderBottomRightRadius:
                    message.senderId === user.id ? 5 : undefined,
                  borderBottomLeftRadius:
                    message.senderId !== user.id ? 5 : undefined,
                }}
              >
                <Text style={{ color: "white" }}>{message.message}</Text>
              </LinearGradient>
              </Pressable>
              {showDate ? <Text style={{ color: "black" , fontSize:10}}>
                {format(message.createdAt)}
              </Text>:null}
            </View>
    </View>
  )
}

export default OneMessage