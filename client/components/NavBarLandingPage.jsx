import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import localisation from "../assets/localisation1.png";
import User from "../assets/OIP.jpg";
import { useNavigation } from '@react-navigation/native'; 
function ProfileLandingPage({navigation}) {
  const navigation = useNavigation();


  return (

    <View   style={styles.navBar}>
      <View   style={styles.navbardetails}>
        
      <View   style={styles.allAdress}>
        <Image  style={styles.locationImage}  source={localisation}></Image>
      <View  style={styles.adress}>
      <Text  style={styles.yourLocation}>Your Location </Text>
      <Text style={styles.UserAdress}>Norvey,User </Text>
      </View>
      </View>
      <TouchableOpacity   onPress={() => navigation.navigate("Userprofile")}> 
      <Image  source={User}  style={styles.UserImage} ></Image>
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
navBar:{

  width:"100%",
  height:60,
},
locationImage:{
  width:50,
  height:40,
  alignItems:"center",
 
},
allAdress:{
  flex:1,
  flexDirection:"row",
  
  width:200,
  justifyContent:"flex-start",
  gap:1
},
UserImage:{
  width:50,
  height:50,
  borderRadius:20,

  
},
navbardetails:{

 width:350,
 height:100,
 justifyContent:"space-around",
flex:1,
flexDirection:"row",
 gap:10

},
yourLocation:{
     fontSize: 14,
    color: "rgb(130, 124, 140)"
},
UserAdress:{
    fontSize: 16,
     color: "black",
      fontWeight: "bold",
}

  
});

export default ProfileLandingPage;
