import React from "react";
import car from "../assets/carselim.png";
import etoile from "../assets/etoile.png";
import { View, Text, Button, Image, StyleSheet,TouchableOpacity  } from "react-native";
function UserProfilecard(){
return(
    <View style={styles.card}>
    <View>
        <Image source={car} style={styles.car} />
      </View>
<View>
<Text style={styles.cartext}>CarName</Text>
<Image source={etoile} style={styles.etoil}/>
<Text style={styles.numetoile}>3 (75 reviews)</Text>
<Text style={styles.price}>$220/day</Text>
</View>

  </View>

)

}
export default UserProfilecard
const styles = StyleSheet.create({
    price:{
      marginTop:20,
      marginLeft:10
    },
    numetoile:{
      marginTop:-25,
      marginLeft:40, 
    }
    ,cartext:{
      marginTop:5,
      marginLeft:5,
    },
    etoil:{
      marginTop:5,
      marginLeft:5,
      width:30,
      height:30,
    },
  car:{
    width: 160,
    height: 148,
    borderRadius: 25,
  marginTop: -10,
  marginLeft:-10
  }, edit:{
  
      width: 30,
      height: 30,
  marginLeft: 160,
  marginTop:-25
    },
    card:{
      width: 333,
      height: 150,
      backgroundColor: 'white',
  
      shadowColor: 'black', // Shadow color
      padding: 10,
      display: "flex", flexDirection: "row",
      padding: 10,
      borderRadius: 25,
      marginLeft: 15,
      marginTop: 15,  
  
    },
    
    line: {
      borderBottomColor: "grey", // Change the color as needed
      borderBottomWidth: 1, // Change the width as needed
      marginVertical: 30,
      width: 300, // Adjust the margin as needed
      marginLeft: 30,
    },
  
    image: {
      width: 100,
      height: 100,
  
      shadowColor: 'black', // Shadow color
      padding: 10,
   
      padding: 10,
      borderRadius: 25,
      marginLeft: 15,
      marginTop: 15,
    },
    userName: {
      marginLeft: 25,
      marginTop: 15,
    },
    userNametext: {
      fontSize: 20,
    },
    editProfile: {
      marginTop: 80,
      marginLeft: -90,
    },
  });