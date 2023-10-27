import {SafeAreaView, ScrollView, View, Text,Button, Image,StyleSheet,TouchableOpacity,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import img from "../assets/Untitled.jpg";
import edpr from "../assets/edit.png";
import profil from "../assets/profile.png";
import React, { useState } from "react";
import Modal from "react-native-modal";
import UserProfilecard from "./UserProfileCard";
import bkg from "../assets/bkg.png";
import stg from "../assets/settings.png";
import lgt from "../assets/logout.png";
function Userprofile({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View>
          <Image source={img} style={styles.image} />
        </View>

        <View style={styles.userName}>
          <Text style={styles.userNametext}>Anna trust</Text>
          <Text style={{fontSize:12,color:"#6C77BF"}}> Edit Profile</Text>
        </View>

        <View style={styles.editProfile}>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={edpr} style={styles.edit} />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Modal isVisible={isModalVisible}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "white",
                    padding: 30,
                    marginTop: 20,
                    width: 300,
                    height: 450,
                    borderRadius: 25,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, marginLeft: -10 }}>
                      <Image
                        source={profil}
                        style={{ width: 30, height: 30 }}
                      />
                      Profile
                    </Text>
                    <View style={styles.linem} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      <Image style={{ width: 20, height: 20 }} source={bkg} />{" "}
                      My bookings
                    </Text>
                    <View style={styles.linem} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      <Image source={stg} style={{ width: 20, height: 20 }} />{" "}
                      Settings
                    </Text>
                    <View style={styles.linem} />
                  </View>

                  <View>
                    <Text style={{ fontSize: 16 }}>
                      <Image source={lgt} style={{ width: 20, height: 20 }} />{" "}
                      Logout
                    </Text>
                    <View style={styles.linem} />
                  </View>
                 <View style={{marginTop:30}}>
                  <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                    <LinearGradient
                      colors={["#6C77BF", "#4485C5"]}
                      locations={[0, 1]}
                      style={styles.buttonContainer}
                    >
                      <Text style={styles.buttonText}>{"Close"}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
          </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>

      <View style={styles.line} />

      <ScrollView style={styles.scrollContainer}>
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
        <UserProfilecard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop:10
  },
  buttonContainer: {
    // backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
 height:50,
    width:250,
  },
  scrollContainer: {
    height: "80%", // Adjust the height as needed
  },
  price: {
    marginTop: 20,
    marginLeft: 10,
  },
  numetoile: {
    marginTop: -25,
    marginLeft: 40,
  },
  cartext: {
    marginTop: 5,
    marginLeft: 5,
  },
  etoil: {
    marginTop: 5,
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  car: {
    width: 160,
    height: 148,
    borderRadius: 25,
    marginTop: -10,
    marginLeft: -10,
  },
  edit: {
    width: 18,
    height: 18,
   
   position:"absolute",
   bottom: -20,
   left:200
  },

  line: {
    borderBottomColor: "lightgrey", // Change the color as needed
    borderBottomWidth: 0.5, // Change the width as needed
    marginVertical: 30,
    width: 300, // Adjust the margin as needed
    marginLeft: 30,
  },
  linem: {
    borderBottomColor: "grey", // Change the color as needed
    borderBottomWidth: 1, // Change the width as needed
    marginVertical: 15,
    width: "100%", // Adjust the margin as needed
    marginLeft: 0,
  },

  image: {
    width: 65,
    height: 65,

    shadowColor: "black", // Shadow color
    padding: 10,

    padding: 10,
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 40,
  },
  userName: {
    gap: 8,
    marginLeft: 25,
    marginTop: 43,
  },
  userNametext: {
    fontSize: 21,
    fontWeight: "bold",

  },
  editProfile: {
    marginTop: 80,
    marginLeft: -90,
    fontSize:16
  },
});
export default Userprofile;
