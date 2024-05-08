import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");

const ImagePreviewModal = ({ visible, imageUri, onConfirm, onRetake }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Icon name="check" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onRetake} style={styles.button}>
            <Feather name="x-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Set the background color to transparent
    padding: 20,
  },
  innerContainer: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    padding: 20
  },
  image: {
    width: 350,
    height: 350,
    // resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ImagePreviewModal;
