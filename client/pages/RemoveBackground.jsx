const { remove } = require('rembg');
import React, { useState } from 'react';
import {  View,  Button, } from "react-native";
const Remobg =()=>{
    const [url,setUrl]=useState('')
async function removeBackground(inputImagePath, outputImagePath) {
  try {
    const outputImage = await remove(inputImagePath);
    // Save the image without the background
    outputImage.pipe(require('fs').createWriteStream(outputImagePath));
    console.log('Background removed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Specify the paths to your input and output images
const inputImage = '../assets/Fst.png';
const outputImage = '../assets/output.png';

// Call the function to remove the background
// removeBackground(inputImage, outputImage);
return (
<View>
<input onChange={(e)=>setUrl(e.target.value)}/>
<Button
title='try'
onPress={removeBackground(inputImage,outputImage)}/>
</View>

)
}
export default Remobg