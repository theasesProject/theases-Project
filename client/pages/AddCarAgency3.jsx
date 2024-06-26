import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { createCar, emptyNewCar, setNewCar } from "../store/carFetch";
import { useNavigation } from "@react-navigation/native";
import RemoveBackground from "./RemoveBackground";
import * as ImagePicker from "expo-image-picker";
import cloudinaryUpload from "../HelperFunctions/Cloudinary";
import xBtn from "../assets/xBtn.png";
const { width, height } = Dimensions.get("screen");
import Arrowleft from "../assets/Svg/arrowleft.svg";
import Arrowright from "../assets/Svg/arrowright.svg";
import image from "../assets/page3Image.png";
import lastSvg from "../assets/lastSvg.png";

function AddCarAgency3() {
  const [form, setForm] = useState(useSelector((state) => state.car.NewCar));
  const [typeError, setTypeError] = useState("");
  const [charError, setCharError] = useState("");
  const [imgError, setImgError] = useState("");
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const selectImage = async () => {
    try {
      if (selectedDocuments.length >= 3) {
        return setError("You can't add more than three images");
      }
  
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== "granted") {
        // console.log("Permission to access media library denied");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 3,
      });
  
      if (!result.canceled) {
        const selectedAssets = result.assets;
        const updatedSelectedDocuments = await Promise.all(
          selectedAssets?.map(async (file) => {
            try {
              // console.log('file: ' + file.uri);
              const cloudinaryResponse = await cloudinaryUpload(file.uri);
              // console.log(cloudinaryResponse);
              return cloudinaryResponse;
            } catch (err) {
              console.error("Cloudinary Upload Error:", err);
              return ;
            }
          })
        );
       
        // console.log('in the form');
        setForm({
          ...form,
          img: [
            ...form.img,
            ...updatedSelectedDocuments.filter((image) => image !== null),
          ],
        });
      } else {
        // console.log("error");
      }
    } catch (error) {
      // console.log(error);
    }
   
  };
  const handleDelete = (uri) => {
    try {
      const copy = [...form.img];
      const position = copy.indexOf(uri);
      copy.splice(position, 1);
      setForm({ ...form, img: [...copy] });
    } catch (error) {
      // console.log(error);
    }
   
  };
  const handleFuel = (fuel) => {
    setForm({ ...form, typeOfFuel: fuel });
  };
  const handleChar = (char) => {
    setForm({ ...form, characteristics: char });
  };
  const handleType = (type) => {
    setForm({ ...form, typevehicle: type });
  };

  const typeOfFuel = [
    { label: "Gasoline", value: "Gasoline" },
    { label: "Diesel", value: "Diesel" },
    { label: "Electric", value: "Electric" },
  ];

  const types = [
    { label: "Economical", value: "Economical" },
    { label: "Luxury", value: "Luxury" },
    { label: "Sports", value: "Sports" },
    { label: "Commercial", value: "Commercial" },
  ];
  const characteristics = [
    { label: "Automatic", value: "Automatic" },
    { label: "Manual", value: "Manual" },
    { label: "Semi-Automatic", value: "Semi-Automatic" },
  ];

  const handleCreateCar = () => {
    if (form?.typevehicle === "") {
      setTypeError("Please enter your car type Vehicle");
    } else if (form?.characteristics === "") {
      setCharError("Please enter characteristics for your car ");
    } else if (form?.img?.length === 0) {
      setImgError("Please enter picture for your car ");
    } else {
      dispatch(
        createCar({
          body: form,
          media: form?.img?.map((file) => ({ media: file })),
        })
      );
      dispatch(emptyNewCar());
      setSuccessModalVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.navigate("Home");
      }, 5000);
    }
  };

  return (
    <View style={styles.editProfilePage}>
      <ScrollView>
        <Image source={image} style={styles.mainImage} />
        <View style={styles.textSvgContainer}>
          <Text style={styles.introdcution1}>Additional information</Text>
          <Image source={lastSvg} style={styles.introImage} />
        </View>
        <RNPickerSelect
          placeholder={{
            label: "Select type of Fuel ",
            value: null,
          }}
          value={form.typeOfFuel}
          items={typeOfFuel}
          onValueChange={(value) => handleFuel(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
        <View style={styles.errorContainer}>
          
        </View>
        <RNPickerSelect
          placeholder={{
            label: "Select characteristics  your  of car ",
            value: null,
          }}
          items={characteristics}
          onValueChange={(value) => handleChar(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
        <View style={styles.errorContainer}>
        {charError !== "" && <Text style={styles.errorText}>{charError}</Text>}
        </View>
        <RNPickerSelect
          placeholder={{
            label: "Select type  your  of car ",
            value: null,
          }}
          items={types}
          onValueChange={(value) => handleType(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
        <View style={styles.errorContainer}>
        {typeError !== "" && <Text style={styles.errorText}>{typeError}</Text>}
        </View>
        <RemoveBackground />
        <View style={styles.picture}>
          <TouchableOpacity
            style={styles.addImgTextContainer}
            activeOpacity={0.8}
          >
            {imgError !== "" && (
              <Text style={styles.errorText}>{imgError}</Text>
            )}
            <Text onPress={selectImage} style={styles.input2}>
              ADD PICTURE
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imgsContainer}>
          {form?.img?.map((uri, index) => (
            <View key={index} style={styles.imgContainer}>
              <Pressable onPress={() => handleDelete(uri)}>
                <Image source={xBtn} style={styles.xBtn} />
              </Pressable>
              <Image source={{ uri }} style={styles.img} />
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={styles.bottomNavigation}
      >
        <Pressable
          style={styles.leftArrow}
          onPress={() => {
            navigation.navigate("AddCarAgency2");
          }}
        >
          <Arrowleft />
          <Text style={styles.textCss}>
            Back
          </Text>
        </Pressable>
        <Pressable
          style={styles.rightArrow}
          onPress={() => {
            handleCreateCar();
          }}
        >
          <Text style={styles.textCss}>
            Add
          </Text>
          <Arrowright />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSuccessModalVisible}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Congratulations! You have successfully created your car.
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 13,
    paddingVertical: height * 0.012,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 4,
    color: "black",
    gap: 5,
    height: height * 0.06,
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "black",
    marginTop: "1%",
    paddingRight: 30,
    justifyContent: "center",
    height: height * 0.06,
    backgroundColor:"white"
  },
};

const styles = StyleSheet.create({
  textSvgContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02
  },
  editProfilePage: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    width,
    backgroundColor: "#F2F2F2",
  },
  introdcution1: {
    textAlign: "center",
    fontSize: 20,
    paddingVertical: height * 0.01,
    fontWeight: "bold",
    color: "#6a78c1",
  },
  input: {
    width: "100%",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "lightgrey",
    borderWidth: 2,
    marginTop: 5,
  },
  picture: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "yellow",
    borderRadius: 5,
    marginBottom: "5%",
  },
  input2: {
    fontSize: 18,
    justifyContent: "flex-start",
    color: "black",
    borderColor: "lightgrey",
    width: "100%",
    height: 40,
    borderRadius: 8,
    textAlign: "center",
    padding: 4,
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    // marginTop: 5,
  },
  addImgTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xBtn: {
    position: "absolute",
    zIndex: 0,
    width: 25,
    height: 25,
    right: 0,
  },
  img: {
    zIndex: -1,
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    color: "green",
  },
  introImage: { 
    width: width * 0.08,
    height: height * 0.04 
  },
  mainImage: {
    width: width * 0.9,
    height: height * 0.5,
  },
  bottomNavigation: {
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftArrow: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  rightArrow: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textCss: { 
    color: "#6C77BF",
  },
  errorContainer:{
    height:height * 0.03,
    justifyContent: "center",
  }
});

export default AddCarAgency3;
