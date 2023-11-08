import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Touchable,
} from "react-native";
import { useSelector } from "react-redux";
import { logUserOut, selectUser } from "../store/userSlice";
import dots from "../assets/icons8-three-dots-48.png";
import NavBarAgency from "../components/NavBarAgency";
import Stats from "../components/Stats";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapAgencyProfile from "./MapAgencyProfile";
const { width, height } = Dimensions.get("screen");

function AgencyProfile({ navigation }) {
  const activeUser = useSelector(selectUser);
  console.log("here", activeUser.Agency.companyNumber);
  return (
    <View style={styles.agency}>
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
          <ImageBackground
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
          <Image source={dots} />
        </View>
      </View>

      <View style={styles.stats}>
        <Stats />
      </View>

      <View >
        <TouchableOpacity style={styles.map} onPress={()=> navigation.navigate("MapAgencyProfile")}>
            <View style={styles.btn}>
          <Text style={styles.temap}>Map</Text></View>
        </TouchableOpacity>

      </View>
      {/* <MapAgencyProfile/> */}
<View style={styles.foot}>
      <NavBarAgency />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  agency: {
    width: width,
    height: height,
  },
  vbgImg: {
    height: height * 0.25,
    width: width,
  },
  bgim: {
    height: height * 0.25,
    width: width,
    borderRadius: 5,
  },
  vav: {
    marginTop: -height * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  bvav: {
    borderRadius: 10,
    //    width:width*0.25,
    borderWidth: 1.25,

    // height:height*0.12,
  },
  avatar: {
    height: height * 0.12,
    width: width * 0.25,
  },
  acna: {
    // flex: 1,
    flexDirection: "row",
    padding:10
    // height:height*0.01,
    // backgroundColor:"lightgrey",
  },
  leftSection: {
    flex: 1, // Takes up 50% of the container's width
    // backgroundColor: 'lightblue', // Optional background color for the left section
    height: height * 0.12,

    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  leac: {
    fontSize: 33,
    fontStyle: "italic",
    
  },
  rightSection: {
    height: height * 0.12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    flex: 1, // Takes up 50% of the container's width
    // backgroundColor: 'lightgreen', // Optional background color for the right section
  },
  stats: {
    height: height * 0.35,
    padding:20 // Adjust the value as needed to move the "Stats" section up
    // flex: 1,
    // backgroundColor: "green",
  },
  map: {
height:height*0.15,
width:width*0.5,
    alignItems: "center",
    justifyContent: "center",
    
  },
  btn:{
    justifyContent: "center",
    height: height*0.05,
    width: width*0.2,
    backgroundColor: "white",
    alignItems:'center',
    borderWidth:1,
    borderRadius:5,
    
  },
  temap: {fontSize:25,
color:"lightblue",},
  foot:{

    flex: 1,
    justifyContent: 'flex-end', // Align the component to the bottom
    alignItems: 'center',
    backgroundColor: 'lightgray',
  }
});
export default AgencyProfile;
