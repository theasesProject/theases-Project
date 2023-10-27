import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import localisation from "../assets/localisation1.png";
import User from "../assets/OIP.jpg";

function ProfileLandingPage() {
  return (
    <View style={styles.Profile}>
        <View  style={styles.locationDetails}>
            <TouchableOpacity>
                <Image source={localisation} style={styles.localisation} />
            </TouchableOpacity>
            <View>
                <Text>Your location</Text>
                <Text>Norvey, USA</Text>
            </View>
        </View>
            <TouchableOpacity style={styles.frame} >
                <Image source={User} style={styles.User} />
            </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    frame:{
        flex:1,
        width:"50%",
        height:"50%",
        justifyContent:"center",
        alignItems:"center",
        overflow:"hidden",
        borderRadius:"50%",

    },

    locationDetails:{
        flex:1,
        flexDirection:"row",
        width:"50%",
       
        gap:10
    },
  Profile: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70, 
    // borderRadius: 9,
    backgroundColor: "yellow",
  },
  localisation: {
    // width: "14%",
    // height: "70%",
    width: 35,
    height: 35,

    // backgroundColor: "red",
  },
  yourLocation: {
    fontSize: 12,
    color: "rgb(130, 124, 140)",
    
  },
  adress: {
    fontSize: 14,
    color: "black",
  
    fontWeight: "bold",
  },
  User: {
width: "100%",
height: "100%",

  },
  
});

export default ProfileLandingPage;
