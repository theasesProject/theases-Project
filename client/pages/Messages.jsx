import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Search from "../assets/Svg/search-svgrepo-com.svg"
import {useDispatch, useSelector} from "react-redux"

function Messages() {
  const dispatch = useDispatch()
  const [rooms,setRooms] = useState([])
  const user = useSelector(state => state.user)
  console.log(user.data);

  useEffect(()=>{
    
  },[])
  return (
    <View style={styles.messages}>
      <Text style={styles.title}> Messages </Text>
      <View style={styles.searchDiv}>
        <TouchableOpacity >
            <Search />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.input} />
      </View>
      <View>
        <Image source={user.data.avatar}></Image>
      </View>
      <View></View>
      <View></View>
      <View></View>
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
    borderColor:"#d4d4d4",
    width: "80%",
    height: 50,
    paddingLeft:"3%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
  },
  image:{
    width: "100%",
    height: "100%",
  },
  input : {
    marginLeft: 10,
    fontSize:17,
    overflow: "hidden",
  }
});

export default Messages;
