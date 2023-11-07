import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Modal,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "react-native-check-box";
import { useState, useEffect } from "react";
import { createCar } from "../store/carFetch";
import * as ImagePicker from "expo-image-picker";
import cloudinaryUpload from "../HelperFunctions/Cloudinary";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/userSlice";
import xBtn from "../assets/xBtn.png";
import RemoveBackground from "./RemoveBackground";
// import removeBackground from "../HelperFunctions/removeBackGround";
function AddAgencyCar({ navigation }) {
  const dispatch = useDispatch();
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

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
  const [succes, setSucces] = useState("");
  const [img, setImg] = useState([]);
  const activeUser = useSelector(selectUser);
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
      const form = {
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
        media: img.map((file) => ({ media: file })),
        AgencyId: activeUser.id,
      };

      dispatch(
        createCar({
          body: form,
          media: img.map((file) => ({ media: file })),
        })
      );
      setSuccessModalVisible(true);

      setTimeout(() => {
        setSuccessModalVisible(false);
    navigation.navigate("Home");

      }, 5000);
    }
  };

  const brand = [
    { label: "toyota", value: "toyota" },
    { label: "bmw", value: "bmw" },
    { label: "peugeot", value: "peugeot" },

    { label: "ford", value: "ford" },
    { label: "honda", value: "honda" },
    { label: "hyndai", value: "hyndai" },
    { label: "porch", value: "porch" },
    { label: "renault", value: "renault" },
    { label: "volkswagen", value: "volkswagen" },
    { label: "other", value: "other" },
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
    if (img.length >= 3) {
      return setError("You can't add more than six images");
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library denied");
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
        selectedAssets.map(async (file) => {
          try {
            // const removedBgImage = removeBackground(file.uri);
            // console.log(removedBgImage, "bbb");
            // return removedBgImage;
            const cloudinaryResponse = await cloudinaryUpload(file.uri);
            return cloudinaryResponse;
          } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            return null;
          }
        })
      );

      setImg((prev) => [
        ...prev,
        ...updatedSelectedDocuments.filter((image) => image !== null),
      ]);
    }
  };

  const handleDelete = (uri) => {
    const copy = [...img];
    const position = copy.indexOf(uri);
    copy.splice(position, 1);
    setImg([...copy]);
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
  
const pickerSelectStyles = {
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
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
  justifyContent: "center",
  
  // to ensure the text is never behind the icon
  },
	
};


  return (
    <View style={styles.editProfilePage}>
      <ScrollView>
        <Text style={styles.introdcution1}>
          Welcome ,Now you can add Your car collection
        </Text>
        <RNPickerSelect
            placeholder={{
              label: "Select Brand for your car ",
              value: null,
            }}
            items={brand}
            value={brandCar}
            onValueChange={(value) => handleBrand(value)}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
          {brandError !== "" && (
            <Text style={styles.errorText}>{brandError}</Text>
          )}
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
          keyboardType="number-pad"
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
          style={pickerSelectStyles}

          useNativeAndroidPickerStyle={false}
        />
        {periodError !== "" && (
          <Text style={styles.errorText}>{periodError}</Text>
        )}

        <TextInput
          value={horse}
          keyboardType="number-pad"
          onChangeText={handleHorse}
          placeholder="Enter horse power for your car "
          style={styles.input}
        />

        <View style={styles.selectedItem}>
         

          <RNPickerSelect
            placeholder={{
              label: "Select type of Fuel ",
              value: null,
            }}
            value={fuel}
            items={typeOfFuel}
            onValueChange={(value) => handleFuel(value)}
            style={pickerSelectStyles}

            useNativeAndroidPickerStyle={false}
          />

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
            style={pickerSelectStyles}

            useNativeAndroidPickerStyle={false}
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
            isChecked={warranty}
          />
          <RemoveBackground />

          <View style={styles.picture}>
            <Pressable
              onPress={selectImage}
              style={styles.addImgTextContainer}
              activeOpacity={0.8}
            >
              <Text style={styles.input2}>ADD PICTURE</Text>

              {imgError !== "" && (
                <Text style={styles.errorText}>{imgError}</Text>
              )}
            </Pressable>
          </View>
          <View style={styles.imgsContainer}>
            {img.map((uri, index) => (
              <View key={index} style={styles.imgContainer}>
                <Pressable onPress={() => handleDelete(uri)}>
                  <Image source={xBtn} style={styles.xBtn} />
                </Pressable>
                <Image source={{ uri }} style={styles.img} />
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={handleCreateCar}>
            <Text style={styles.input1}>ADD CAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 12,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
  profilePictureContainer: {
    width: "100%",
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
    width: "100%",
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
  addImgTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",

    height: 100,
  },
  imgContainer: {
    position: "relative",
    backgroundColor: "#DBDBDB",
    width: 100,
    height: 70,
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
});

export default AddAgencyCar;
