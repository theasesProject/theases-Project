import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "react-native-check-box";
import { useState } from "react";
import { createCar } from "../store/carFetch";
import * as ImagePicker from "expo-image-picker";
import cloudinaryUpload from "../HelperFunctions/Cloudinary";
import { useSelector, useDispatch } from "react-redux";
function AddAgencyCar() {
  const [model, setModel] = useState("");
  const [brandCar, setBrandCar] = useState("");
  const [horse, setHorse] = useState("");
  const [fuel, setFuel] = useState("");
  const [type, setType] = useState("");
  const [char, setChar] = useState("");
  const [periodRent, setPeriodRent] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesciption] = useState("");
  const [warranty, setWarrranty] = useState(false);
  const [modelError, setModelError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [periodError, setPeriodError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [charError, setCharError] = useState("");
  const [imgError, setImgError] = useState("");
  const [img, setImg] = useState(
    "https://th.bing.com/th/id/OIP.pfmvcg0taUpBapQUtsDpWwHaE8?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  );

  const handleCreateCar = () => {
    if (model === "") {
      setModelError("Please enter your car model");
      console.log(modelError, "modelError");
    } else if (brandCar === "") {
      setBrandError("Please enter your car brand");
    } else if (price === "") {
      setPriceError("Please enter your car price ");
    } else if (periodRent === "") {
      setPeriodError("Please enter your car period");
    } else if (type === "") {
      setTypeError("Please enter your car type Vehicle");
    } else if (char === "") {
      setCharError("Please enter characteristics for your car ");
    } else if (img === "") {
      setImgError("Please enter picture for your car ");
    } else {
      dispatch(
        createCar({
          model: model,
          brand: brandCar,
          price: price,
          period: periodRent,
          status: "available",
          horsePower: horse,
          typeOfFuel: fuel,
          description: description,
          warrantyInsurance: warranty,
          acceptation: "pending",
          typevehicle: type,
          characteristics: char,
        })
      );
    }
  };
  const brand = [
    { label: "Toyota", value: "Toyota" },
    { label: "Ford", value: "Ford" },
    { label: "Honda", value: "Honda" },
    { label: "Hyndai", value: "Hyndai" },
    { label: "Porch", value: "Porch" },
    { label: "Other", value: "Other" },
  ];
  const typeOfFuel = [
    { label: "Gasoline", value: "Gasoline" },
    { label: "Diesel", value: "Diesel" },
    { label: "Electric", value: "Electric" },
  ];
  const typevehicle = [
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
  const period = [
    { label: "daily", value: "daily" },
    { label: "weekly", value: "weekly" },
    { label: "monthly", value: "monthly" },
  ];
  const types = [
    { label: "Economical", value: "Economical" },
    { label: "Luxury", value: "Luxury" },
    { label: "Sports", value: "Sports" },
    { label: "Commercial", value: "Commercial" },
  ];
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 4],
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      try {
        const cloudinaryResponse = await cloudinaryUpload(selectedAsset.uri);

        console.log("img link: ", cloudinaryResponse);
        setImg(cloudinaryResponse);
        console.log(img, "img");
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    }
  };

  const handleModel = (model) => {
    setModel(model);
    console.log(model, "model");
  };
  const handlePeriode = (period) => {
    setPeriodRent(period);
    console.log(period, "period");
  };
  const handleBrand = (brand) => {
    setBrandCar(brand);
    console.log(brand, "brand");
  };
  const handlePrice = (price) => {
    setPrice(price);
    console.log(price, "price");
  };
  const handleHorse = (horse) => {
    setHorse(horse);
    console.log(horse, "horse");
  };
  const handleFuel = (fuel) => {
    setFuel(fuel);
    console.log(fuel, "fuel");
  };
  const handleDescription = (des) => {
    setDesciption(des);
    console.log(des, "des");
  };
  const handleChar = (char) => {
    setChar(char);
    console.log(char, "char");
  };
  const handleType = (type) => {
    setType(type);
    console.log(type, "type");
  };

  return (
    <View style={styles.editProfilePage}>
      <ScrollView>
        <Text style={styles.introdcution1}>
          Welcome ,Now you can add Your car collection
        </Text>

        <TextInput
          value={model}
          onChangeText={handleModel}
          placeholder="Enter Your Car Model"
          style={styles.input}
        />
        {modelError !== "" && (
          <Text style={styles.errorText}>{modelError}</Text>
        )}

        <TextInput
          value={description}
          onChangeText={handleDescription}
          placeholder="Enter Same description for your Car"
          style={styles.input}
        />

        <TextInput
          value={price}
          onChangeText={handlePrice}
          placeholder="rental price by period"
          style={styles.input}
        />
        {priceError !== "" && (
          <Text style={styles.errorText}>{priceError}</Text>
        )}

        <RNPickerSelect
          placeholder={{
            label: "period ",
            value: null,
          }}
          items={period}
          onValueChange={handlePeriode}
        />
        {periodError !== "" && (
          <Text style={styles.errorText}>{periodError}</Text>
        )}

        <TextInput
          value={horse}
          onChangeText={handleHorse}
          placeholder="Enter horse power for your car "
          style={styles.input}
        />

        <View style={styles.selectedItem}>
          <RNPickerSelect
            placeholder={{
              label: "Select Brand for your car ",
              value: null,
            }}
            items={brand}
            value={brandCar}
            onValueChange={(value) => handleBrand(value)}
            style={pickerSelectStyles}
          />
          {brandError !== "" && (
            <Text style={styles.errorText}>{brandError}</Text>
          )}

          <RNPickerSelect
            placeholder={{
              label: "Select type of Fuel ",
              value: null,
            }}
            value={fuel}
            items={typeOfFuel}
            onValueChange={(value) => handleFuel(value)}
          />

          <RNPickerSelect
            placeholder={{
              label: "Select characteristics  your  of car ",
              value: null,
            }}
            items={characteristics}
            onValueChange={(value) => handleChar(value)}
          />
          {charError !== "" && (
            <Text style={styles.errorText}>{charError}</Text>
          )}
          <RNPickerSelect
            placeholder={{
              label: "Select type  your  of car ",
              value: null,
            }}
            items={types}
            onValueChange={(value) => handleType(value)}
          />
          {typeError !== "" && (
            <Text style={styles.errorText}>{typeError}</Text>
          )}
          <CheckBox
            style={styles.input3}
            onClick={() => {
              setWarrranty(!warranty);
            }}
            leftText={"warranty Insurance"}
            leftTextStyle={{
              color: "rgb(130, 124, 140)",
              fontSize: 16,
            }}
            isChecked={!warranty}
          />
          <View style={styles.picture}>
            <Text style={styles.input2}>ADD PICTURE</Text>
            <TouchableOpacity
              style={styles.profilePictureContainer}
              onPress={selectImage}
            >
              <Image
                source={{
                  uri: img,
                }}
                style={styles.profilePicture}
              />
            </TouchableOpacity>
            {imgError !== "" && (
              <Text style={styles.errorText}>{imgError}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleCreateCar}>
            <Text style={styles.input1}>ADD CAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 12,
  },
  introdcution: {
    textAlign: "center",
    fontSize: 18,
    padding: 20,
  },
  introdcution1: {
    textAlign: "center",
    fontSize: 22,
    padding: 20,
  },
  input: {
    width: "100%",
    // Set background color to light gray
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "lightgrey", // Set border color to blue
    borderWidth: 2, // Add border width
    marginTop: 5, // Add some margin at the top for separation
  },
  picture: {
    // marginLeft: "15%",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    // gap: 150,
    // backgroundColor: "rgb(219, 217, 224)",
    borderColor: "yellow",
    borderRadius: 5,
    marginBottom: "5%",
  },
  profilePictureContainer: {
    width: "100%",
    // alignItems: "center",
  },
  profilePicture: {
    width: 80,
    height: 40,

    borderWidth: 2,
    borderColor: "rgb(219, 217, 224)",
    backgroundColor: "white",
  },
  input1: {
    padding: 5,
    fontSize: 25,
    backgroundColor: "lightgrey",
    textAlign: "center",
    borderRadius: 8,
    color: "white",
  },
  input2: {
    fontSize: 18,
    justifyContent: "flex-start",
    color: "black",
    borderColor: "lightgrey",
    width: 240,
    height: 40,
    borderRadius: 8,
    textAlign: "center",
    padding: 4,
    borderWidth: 2,
  },
  input3: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    // paddingHorizontal: 10,
    borderColor: "lightgrey",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default AddAgencyCar;
