import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, Image, LayoutAnimation, Modal, TouchableOpacity } from 'react-native';
import ArrowBack from '../assets/Svg/blackArrow.svg';
import UnderlinedInputs from '../components/UnderlinedInputs';

const { height, width } = Dimensions.get("screen");

const MyInformation = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteAccount = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setModalVisible(false);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: height * 0.05 }}>
      <View style={styles.header}>
        <Pressable style={styles.arrowContainer}>
          <ArrowBack />
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>My information</Text>
          <UnderlinedInputs />
        </View>
      </ScrollView>
      <Pressable onPress={handleDeleteAccount} android_ripple={{ color: 'transparent' }}>
        <Text style={styles.deleteAccountText}>Delete account</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyInformation;

const styles = StyleSheet.create({
  arrowContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  container: {
    padding: 20,
  },
  deleteAccountText: {
    color: 'red',
    fontWeight: '700',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'600'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
