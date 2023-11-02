import axios from "axios";
// import cloudName from './env.js'
// import apiKey from './env.js'
// import apiSecret from './env.js'
// import myUploadPreset from './env.js'

export const cloudinaryUpload = async (imageUri) => {
  const cloudName = "torbaga";
  const myUploadPreset = "zpsqdpwt";

  try {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg", // Change the content type as needed
      name: "my_image.jpg",
    });

    formData.append("upload_preset", myUploadPreset); // Replace with your Cloudinary upload preset
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    if (response.status === 200) {
      return response.data.secure_url;
    } else {
      console.error("Image upload failed");
    }
  } catch (error) {
    console.error("Cloudinary upload error:", JSON.stringify(error));
  }
};

export default cloudinaryUpload;
