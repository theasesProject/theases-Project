import React, { useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const ItineraryModal = ({
  isVisible,
  agency,
  closeModal,
  startItinerary,
  handleNavigateToProfile,
  estimatedDuration,
}) => {
  console.log("agency in modal", agency);
  console.log(estimatedDuration);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}> {agency?.name}</Text>
          <Text style={styles.number}>
            Agency Number : {agency?.companyNumber}
          </Text>
          <Text>Time to destination is {estimatedDuration}</Text>
          {/* Add your itinerary input fields and any other necessary components */}
          {/* For simplicity, let's include a start and close button for now */}
          <TouchableOpacity onPress={startItinerary}>
            <View style={styles.startButton}>
              <Text>Start Itinerary</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToProfile}>
            <View style={styles.closeButton}>
              <Text>Visit Agency </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal}>
            <View style={styles.closeButton}>
              <Text>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    justifyContent: "center",
    alignContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "75%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "FiraMono-Bold",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "green", // Adjust the color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: "red", // Adjust the color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
});

export default ItineraryModal;
