import React, { useEffect } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";

import CardCar from "../components/CardCar.jsx";
import BrandBar from "../components/brandBar.jsx";

import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";

function Home({ navigation }) {
  return (
    <View style={styles.homePage}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileLandingPage />
        <SearchBar />
        <BrandBar />
        <CardCar />
        <CardCar />
        <CardCar />
        <Button
          title="Go to frst"
          onPress={() => navigation.navigate("LoadingScreen")}
        />
      </ScrollView>
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
