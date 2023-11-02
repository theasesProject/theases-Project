import { Text, View, StyleSheet, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "react-native-check-box";
import { useState } from "react";
import { createCar } from "../store/carFetch";
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
  const [img, setImg] = useState(
    "https://th.bing.com/th/id/R.2f63300883a685b3fe0dc893aa8e3e93?rik=8ZIIKX95eIpBOA&pid=ImgRaw&r=0"
  );

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
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      try {
        const cloudinaryResponse = await cloudinaryUpload(selectedAsset.uri);

        console.log("img link: ", cloudinaryResponse);
        setImg(cloudinaryResponse);
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    }
  };

  const handleModel = (model) => {
    setModel(model);
  };
  const handlePeriode = (period) => {
    setPeriodRent(period);
  };
  const handleBrand = (brand) => {
    setBrandCar(brand);
  };
  const handlePrice = (price) => {
    setPrice(price);
  };
  const handleHorse = (horse) => {
    setHorse(horse);
  };
  const handleFuel = (fuel) => {
    setFuel(fuel);
  };
  const handleDescription = (des) => {
    setDesciption(des);
  };
  const handleType = (type) => {
    setType(type);
  };

  return (
    <View style={styles.editProfilePage}>
      <Text style={styles.introdcution}>
        Welcome ,Now you can add Your car collection
      </Text>

      <TextInput
        value={model}
        onChangeText={handleModel}
        placeholder="Enter Your Car Model"
        style={styles.input}
      />
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
      <RNPickerSelect
        placeholder={{
          label: "period ",
          value: null,
        }}
        items={period}
        onValueChange={handlePeriode}
      />

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
        />
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
            label: "Select type  your  of car ",
            value: null,
          }}
          items={characteristics}
          onValueChange={(value) => handleType(value)}
        />

        <CheckBox
          style={styles.input}
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
          <Text style={styles.input}>Add picture</Text>
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
        </View>
        <Text style={styles.input}>ADD CAR </Text>
      </View>
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
    gap: 10,
  },
  introdcution: {
    textAlign: "center",
    fontSize: 16,
    padding: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    padding: 10,
  },
  picture: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default AddAgencyCar;
