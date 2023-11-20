import React, { useState  } from 'react'
import { View,Pressable , Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { format } from "timeago.js";


function OneMessage({message , user}) {
    const [showDate,setShowDate] = useState(false)

    const renderMessageContent = () => {
      if (message.type === 'text') {
        return <Text style={{ color: 'white' }}>{message.content}</Text>;
      } else if (message.type === 'document') {
        return (
          <View>
            <Text style={{ color: 'white' }}>{message.content}</Text>
            <Pressable onPress={() => handleDocumentPress(message)}>
              <Text style={{ color: 'white' }}>Open Document</Text>
            </Pressable>
          </View>
        );
      } else if (message.type === 'image') {
        return <Image source={{ uri: message.content }} style={{ width: 100, height: 100 }} />;
      }
  
      return null;
    };
  
    const handleDocumentPress = (document) => {
      Alert.alert('Document Pressed', `You pressed the document: ${document.name}`);
    }


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
                 {renderMessageContent()}
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




        
    


