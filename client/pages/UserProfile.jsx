import { View, Text, Button, Image, StyleSheet,TouchableOpacity  } from "react-native";
import img from "../photos/Untitled.jpg";
import edpr from "../assets/edit.png";
import car from "../assets/carselim.png";
import etoile from "../assets/etoile.png";
import React, { useState } from "react";
import Modal from 'react-native-modal';
function Userprofile({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{marginTop:20}}>
      <View style={{ display: "flex", flexDirection: "row" }}>

        <View>
          <Image source={img} style={styles.image} />
        </View>

        <View style={styles.userName}>
          <Text style={styles.userNametext}>Anna trust</Text>
        </View>

        <View style={styles.editProfile}>
          <Text> Edit Profile</Text> 
          <TouchableOpacity onPress={toggleModal}>
         <Image source={edpr} style={styles.edit}  />
         </TouchableOpacity>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 ,gap:20,width:200,height:250, borderRadius: 25}}>
     
            <Text style={{fontSize:20 }}>Profile</Text>
            <Text style={{fontSize:20 }}>My bookings</Text>
            <Text style={{fontSize:20 }}>Settings</Text>
            <Text style={{fontSize:20 }}>Logout</Text>

            <Button title="close" style={{  borderRadius: 25}} onPress={toggleModal} />
          </View>
        </View>
      </Modal>

    </View>  
        </View>

      </View>

      <View style={styles.line} />

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

    </View>
  );
}

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

    elevation: 5, // Controls the shadow depth
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
export default Userprofile;
