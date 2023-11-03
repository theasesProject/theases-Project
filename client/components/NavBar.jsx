import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    Pressable,
  } from "react-native";
import { useNavigation } from "@react-navigation/native";

  import Hm from ".././assets/Svg/house-solid.svg"
  import Ms from ".././assets/Svg/envelope-solid.svg"
  import Fa from ".././assets/Svg/heart-solid.svg"
  import Pr from  ".././assets/Svg/circle-user-regular.svg"
  function NavBar({}){
  const navigation = useNavigation();

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.quarter} onPress={() => navigation.navigate("Home")}>
        <View style={styles.hm}>
            <Hm ></Hm>
        <Text>Home</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quarter} onPress={() => navigation.navigate("Messages")}>
        <View style={styles.hm}>
            <Ms ></Ms>
        <Text>Messeges</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quarter} onPress={() => navigation.navigate("favorites")}>
        <View style={styles.hm}>
        <Fa></Fa>
        <Text>Favorites</Text>
        </View>
        
        </TouchableOpacity>
        <TouchableOpacity style={styles.quarter} onPress={() => navigation.navigate("Userprofile")}>
        <View style={styles.hm}>
            <Pr></Pr>
        <Text>Profile</Text>
        </View>
        </TouchableOpacity>

      </View>
    )
  }
  const styles = StyleSheet.create({
    footer: {
        backgroundColor:"white",
    
      flexDirection: 'row',
      flexWrap: 'wrap',
      
   
      alignItems: "center",
 
    },
    quarter: {
      flex: 1,
  
      justifyContent:'center',
      alignItems: "center",
    },
  hm:{
    alignItems: "center",
  justifyContent:'center'

  },
 
  });
  
  export default NavBar