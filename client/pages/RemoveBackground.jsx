
import React, { useState, useEffect } from 'react';
import { View, Image, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

const apiKey = 'hM4Tnd79Kjf9fbEYSwzw86BF'; // Replace with your API key
var Buffer = require('buffer/').Buffer 
const RemoveBackground = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [outputDirectory, setOutputDirectory] = useState(null);


  const selectImages = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      multiple: true,
    });

    if (results && results.assets) {
      const imageUris = results.assets.map((asset) => asset.uri);
      setSelectedImages(imageUris);
    } else if (results.canceled) {
      console.log('Image selection was canceled.');
    } else {
      console.error('Error in image selection:', results);
    }
  };


  const removeBackground = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image_file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      });

      if (response.status === 200) {
        const outputUri = outputDirectory + `output_${Date.now()}.png`;
        const resultBase64 = Buffer.from(response.data, 'binary').toString('base64');

        await FileSystem.writeAsStringAsync(outputUri, resultBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setProcessedImages([...processedImages, outputUri]);
      } else {
        console.error('Error removing background:', response.status, response.statusText);
        console.error('Error details:', response.data);
      }
    } catch (error) {
      console.error('Error removing background:', error);
    }
  };
  

  useEffect(() => {
    if (!outputDirectory) {
      const setDirectory = async () => {
        const directory = await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + 'output'
        );
        if (!directory.exists) {
          await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + 'output'
          );
        }
        setOutputDirectory(FileSystem.documentDirectory + 'output/');
      };
      setDirectory();
    }
  }, []);



  const saveToGallery = async () => {
    try {
      if (processedImages.length === 0) {
        Alert.alert('No processed images to save.');
        return;
      }

      const assetPromises = processedImages.map(async (imageUri) => {
        const asset = await MediaLibrary.createAssetAsync(imageUri);
        return asset;
      });

      const assets = await Promise.all(assetPromises);

      Alert.alert('Images saved to gallery.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={selectImages} />
      <ScrollView>
        {selectedImages.map((imageUri, index) => (
          <View key={index}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Button title="Remove Background" onPress={() => removeBackground(imageUri)} />
          </View>
        ))}
      </ScrollView>
      {processedImages.length > 0 && (
        <Button title="Save to Gallery" onPress={saveToGallery} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default RemoveBackground;
