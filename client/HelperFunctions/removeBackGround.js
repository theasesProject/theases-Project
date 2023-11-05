// import RNFS from "react-native-fs";
// import FormData from "form-data";
// import axios from "axios";

// const apiKey = "H92yCURFaVLoHxUiSpmVE2ia";

// const removeBackground = async (inputPath, outputPath) => {
//   const formData = new FormData();
//   formData.append("size", "auto");
//   formData.append("image_file", {
//     uri: inputPath,
//     type: "image/jpeg", // Modify this based on your input file type
//     name: "image.jpg", // Modify the file name as needed
//   });

//   try {
//     const response = await axios.post(
//       "https://api.remove.bg/v1.0/removebg",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//           "X-Api-Key": apiKey,
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     if (response.status !== 200) {
//       console.error("Error:", response.status, response.statusText);
//     } else {
//       await RNFS.writeFile(outputPath, response.data, "base64");
//       console.log("Background removed and saved to", outputPath);
//     }
//   } catch (error) {
//     console.error("Request failed:", error);
//   }
// };

// export default removeBackground;
// //
