import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const ItineraryModal = ({ isVisible, agency, closeModal, startItinerary }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Itinerary for {agency?.name}</Text>
          {/* Add your itinerary input fields and any other necessary components */}
          {/* For simplicity, let's include a start and close button for now */}
          <TouchableOpacity onPress={startItinerary}>
            <View style={styles.startButton}>
              <Text>Start Itinerary</Text>
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
