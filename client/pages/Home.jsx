
import React, { useEffect } from "react";

import { View, Text, StyleSheet, ScrollView, Button ,TouchableOpacity} from 'react-native';
import CardCar from "../components/CardCar.jsx";
import BrandBar from "../components/brandBar.jsx";

import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";

function Home({ navigation }) {
  return (
    <View style={styles.homePage}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity  onPress={() => navigation.navigate("Userprofile")}>
      <ProfileLandingPage     />
      </TouchableOpacity>
      <SearchBar/>
      <BrandBar/>
      <CardCar />
      <CardCar />
      <CardCar />
     
      </ScrollView> 
        <Button
        title="Go to frst"
        onPress={() => navigation.navigate("LoadingScreen")}
      />
 <Button
        title="Go to log"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  scrollContent: {
    gap: 20,
  },
});

export default Home;
