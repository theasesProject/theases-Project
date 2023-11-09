import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Touchable,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { logUserOut, selectUser } from "../store/userSlice";

import NavBarAgency from "../components/NavBarAgency";
import Stats from "../components/Stats";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapAgencyProfile from "./MapAgencyProfile";
import Left from "../assets/Svg/left-long-solid.svg";
import Dots from "../assets/Svg/three-dots-svgrepo-com.svg"
import SliderMenu from "../components/SideBar";
const { width, height } = Dimensions.get("screen");

function AgencyProfile({ navigation }) {
  const activeUser = useSelector(selectUser);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  console.log("here", activeUser)
  const handleSliderToggle = () => {
    setSliderOpen(!isSliderOpen);
  };
  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };
  return (<View>
    
      <View style={styles.trial}>
         
          <View style={styles.trle}>
      <Left />
        </View>

        <View style={styles.trri}>
        <Pressable style={styles.trri} onPress={()=>{handleSliderToggle()}}>
            <Dots />
        </Pressable>
      </View>

   
    </View>
    <View style={styles.agency}> 
    <SliderMenu isOpen={isSliderOpen} onClose={handleSliderToggle} navigation={navigation} />
      {isVisible?<ScrollView>
   
        <View style={styles.vbgImg}>
          <ImageBackground
            source={{
              uri: activeUser.Agency.backgroundImage,
            }}
            style={styles.bgim}
          />
        </View>
        <View style={styles.vav}>
          <View style={styles.bvav}>
            <Image
              source={{
                uri: activeUser.avatar,
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        <View style={styles.acna}>
          <View style={styles.leftSection}>
            <Text style={styles.leac}>{activeUser.Agency.name}</Text>
            <Text style={styles.number}>{activeUser.Agency.companyNumber}</Text>
          </View>
          <View style={styles.rightSection}>    

<Text >{activeUser.Agency.transportation?"With Delivery":"Without Delivery"}</Text>
<Text >{ activeUser.Agency.createdAt.slice(0,10)}</Text>
            {/* <Image source={dots} /> */}
          </View>
        </View>

        <View style={styles.stats}>
          <Stats />
        </View>
      </ScrollView>:null}
      <View style={styles.foot}>
        <NavBarAgency />
      </View>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  trial:{
height:"4%",
// backgroundColor:'green',
flexDirection: "row",


  },
  trle:{
    flex:1,
paddingRight:200,  
    // backgroundColor:'red'
  },
  trri:{
    // alignContent: 'center',
    // justifyContent: 'center',
    flex:1,
 
// backgroundColor:"green",
  },

  agency: {
 zIndex:0,
    width: width,
    height: "96%",
  },
  vbgImg: {
    height: height * 0.25,
    width: width,
    borderBottomColor: "#6a78c1",
    borderWidth:3,
   
  },
  bgim: {
    height: "100%",
    width: "100%", 
    // objectFit:'cover'

  },
  vav: {
    marginTop: -height * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  bvav: {
    // borderRadius: 10,
    //    width:width*0.25,
    // borderWidth: 1.25,
    // padding: 23,
    // height:height*0.12,
    marginTop: -height*0.02,
  },
  avatar: {
    height: height * 0.12,
    width: width * 0.25,
    borderWidth: 2,
    borderColor: "#6a78c1",
    borderRadius: 75,
  },
  acna: {
    // flex: 1,
    flexDirection: "row",
    padding: 20,
    // height:height*0.01,
    // backgroundColor:"lightgrey",
  },
  leftSection: {
    flex: 1, // Takes up 50% of the container's width
    // backgroundColor: 'lightblue', // Optional background color for the left section
    // height: height * 0.08,
    marginTop: -height * 0.06,
    // marginLeft:height*0.01,
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 1,
    // borderRadius: 10,
  },
  leac: {
    fontSize: 21,
    fontStyle: "italic",
  },
  rightSection: {
    // height: height * 0.12,
    // alignItems: "center",
    justifyContent: "center",
    marginTop: -height * 0.06,
marginLeft:100,
    flex: 1, // Takes up 50% of the container's width
    // backgroundColor: 'lightgreen', // Optional background color for the right section
  },
  stats: {
    height: height * 0.5,
    padding: 20, // Adjust the value as needed to move the "Stats" section up
    // flex: 1,
    // backgroundColor: "green",
  },
  map: {
    height: height * 0.15,
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    justifyContent: "center",
    height: height * 0.05,
    width: width * 0.2,
    // backgroundColor: "white",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  temap: { fontSize: 25, color: "lightblue" },
  foot: {
    flex: 1,
    justifyContent: "flex-end", // Align the component to the bottom
    alignItems: "center",
    // backgroundColor: "lightgray",
  },
});
export default AgencyProfile;
