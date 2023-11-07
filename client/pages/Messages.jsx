import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Search from "../assets/Svg/search-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { setRoom } from "../store/chatSlice";

function Messages() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [user2ID, setUser2ID] = useState("");
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.user);

  const fetch = async () => {
    const all = await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getAllRoomsUserId/${user.data.id}`
      )
      .then( async (response) => {
        setRooms(response.data)
        await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/chat/getAllRoomsUser2/${user.data.id}`).then((res) => {
        if(res.data.length !== 0 ){
          setRooms(rooms.concat(res.data))
        }
        })
      }).catch((error) => console.log(error));
    
  };



  const handleInput = (content) => {
    if (!(parseInt(content) === user.data.id)) {
      setUser2ID(parseInt(content))
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
      });
  };


  useEffect(() => {
    fetch();
    console.log(rooms);
  }, []);
  return (
    <View style={styles.messages}>
      <Text style={styles.title}> Messages </Text>
      <TouchableOpacity
        style={{ backgroundColor: "grey" }}
        onPress={handleAddRoom}
      >
        <Text style={{ color: "white" }}>add room</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="enter the other user id"
        onChangeText={handleInput}
      ></TextInput>
      <View style={styles.searchDiv}>
        <TouchableOpacity>
          <Search />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.input} />
      </View>
      <View style={styles.allRooms}>
        {rooms.length!==0 ? rooms.map((room , i) => {
          
          return (
            <TouchableOpacity style={styles.roomContainer} key={i} onPress={()=>{
              dispatch(setRoom(room))
              navigation.navigate("conversation")
            }}>
              <Image source={{uri:room.avatarUrl}} style={styles.image} />
              <Text style={{marginLeft:40,fontWeight:500,fontSize:17}}>{room.name}</Text>
            </TouchableOpacity>
          );
        }) : <Text>no rooms yet</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messages: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    marginBottom: "10%",
  },
  searchDiv: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    width: "80%",
    height: 50,
    paddingLeft: "3%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft:10
  },
  input: {
    marginLeft: 10,
    fontSize: 17,
    overflow: "hidden",
  },
  roomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:"grey"
  },
  allRooms: {
    display: "flex",
    flexDirection: "column",
    width:"100%",
    justifyContent:"center",
    paddingLeft:40
  },
});

export default Messages;
