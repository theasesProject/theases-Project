import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import * as Location from "expo-location";

import CheckBox from "react-native-check-box";
import { useDispatch, useSelector } from "react-redux";
import { CreateAgency } from "../store/agencySlice";
import cloudinaryUpload from "../HelperFunctions/Cloudinary";
import * as ImagePicker from "expo-image-picker";
import Loc from "../assets/Svg/loc.svg";
import { selectUser } from "../store/userSlice";
import xBtn from "../assets/xBtn.png";
const { width, height } = Dimensions.get("screen");
function ChangeRole({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [color, setColor] = useState("#6C77BF");
  const [error, setError] = useState("");
  const [loc, setLoc] = useState("");
  const agencyLocation = useSelector(
    (state) => state.location.selectedAgencyLocation
  );
  const [form, setForm] = useState({
    transportation: false,
  });
  const activeUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const deposit = [
    "0%",
    "10%",
    "15%",
    "20%",
    "25%",
    "30%",
    "35%",
    "40%",
    "45%",
    "50%",
    "100%",
  ];

  const handleChangeName = (content) => {
    if (!content) {
      let copy = form;
      delete copy.agencyName;
      return setForm({ ...copy });
    }
    setForm({ ...form, agencyName: content });
  };
  const handleChangeCompanyPhone = (content) => {
    setForm({ ...form, companyNumber: content });
  };
  const handleChangeDeposit = (content) => {
    if (!content && content !== 0) {
      let copy = form;
      delete copy.deposit;
      return setForm({ ...copy });
    }
    setForm({ ...form, deposit: content });
  };

  const createNewAgency = () => {
    dispatch(
      CreateAgency({
        id: activeUser.id,
        body: { ...form, address: agencyLocation },
        media: selectedDocuments.map((file) => ({ media: file })),
      })
    );
    navigation.navigate("Home");
  };
  const getUserLocationAndNearestAddress = async () => {
    try {
      const nearestAddressResponse = await Location.reverseGeocodeAsync({
        latitude: JSON.parse(agencyLocation).latitude,
        longitude: JSON.parse(agencyLocation).longitude,
      });
      if (nearestAddressResponse.length > 0) {
        const nearestAddress = nearestAddressResponse[0];
        const place = ` ${nearestAddress.city}, ${nearestAddress.region}, ${nearestAddress.country}`;
        const fullNearestAddress = `${nearestAddress.name}, ${nearestAddress.street}, ${nearestAddress.city}, ${nearestAddress.region}, ${nearestAddress.country}`;
        setLoc(place);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectImage = async () => {
    if (selectedDocuments.length >= 6) {
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
      selectionLimit: 6,
    });

    if (!result.canceled) {
      const selectedAssets = result.assets;

      const updatedSelectedDocuments = await Promise.all(
        selectedAssets.map(async (file) => {
          try {
            const cloudinaryResponse = await cloudinaryUpload(file.uri);
            return cloudinaryResponse;
          } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            return;
          }
        })
      );

      setSelectedDocuments((prev) => [
        ...prev,
        ...updatedSelectedDocuments.filter((image) => image !== null),
      ]);
    }
  };

  const handleDropdownSelect = (index, value) => {
    if (value == "select") {
      return handleChangeDeposit(0);
    }
    handleChangeDeposit(Number(value.split("%")[0]));
  };

  const handleDelete = (uri) => {
    const copy = [...selectedDocuments];
    const position = copy.indexOf(uri);
    copy.splice(position, 1);
    setSelectedDocuments([...copy]);
  };
  useEffect(() => {
    getUserLocationAndNearestAddress();
  }, [agencyLocation]);
  return (
    <View style={styles.changeRolePage}>
      <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }}>
        <TextInput
          value={form.name}
          onChangeText={handleChangeName}
          placeholder="Enter Your Agency Name"
          style={styles.input}
        />
        <TextInput
          value={form.companyNumber}
          onChangeText={handleChangeCompanyPhone}
          keyboardType="phone-pad"
          placeholder="Enter Your Agency Number"
          style={styles.input}
        />
        {!agencyLocation ? (
          <Pressable
            style={styles.locationInput}
            onPress={() => navigation.navigate("mapforAgency")}
          >
            <Loc style={styles.icon} />
            <Text style={styles.inputIcon}>Use Your Agency Location </Text>
          </Pressable>
        ) : (
          <Text style={styles.locationText}>{loc}</Text>
        )}
        <CheckBox
          style={styles.check}
          onClick={() => {
            setForm({ ...form, transportation: !form.transportation });
          }}
          isChecked={form.transportation}
          leftText="Deliver cars to users locations"
          checkBoxColor="#6C77BF"
          activeOpacity={2}
        />

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>
            pick your default deposit value...
          </Text>
          <SelectDropdown
            onSelect={(selectedItem, index) => {
              handleDropdownSelect(index, selectedItem);
            }}
            buttonStyle={styles.dropdown}
            dropdownStyle={{ ...styles.dropdownOptions, height: 250 }} // adjust the height as needed
            defaultButtonText={
              <Text style={{ fontSize: 14, color: "gray" }}>deposit: </Text>
            }
            data={deposit}
            dropdownIconPosition="right"
          />
        </View>
        <Pressable onPress={selectImage} activeOpacity={0.8}>
          <LinearGradient
            colors={["#6C77BF", "#4485C5"]}
            locations={[0, 1]}
            style={styles.addImgTextContainer}
          >
            <Text style={styles.addImgText}>add images</Text>
          </LinearGradient>
        </Pressable>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.imgsContainer}>
          {selectedDocuments.map((uri, index) => (
            <View key={index} style={styles.imgContainer}>
              <Pressable onPress={() => handleDelete(uri)}>
                <Image source={xBtn} style={styles.xBtn} />
              </Pressable>
              <Image source={{ uri }} style={styles.img} />
            </View>
          ))}
        </View>
        <Pressable
          style={styles.submitBtnContainer}
          activeOpacity={0.8}
          onPress={createNewAgency}
        >
          <LinearGradient
            colors={["#6C77BF", "#4485C5"]}
            locations={[0, 1]}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnContent}>submit</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  changeRolePage: {
    backgroundColor: "rgb(233, 231, 238)",
    flex: 1,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6C77BF",
    width: "100%",
    backgroundColor: "white",
    marginBottom: height * 0.01,
    borderRadius: 5,
    height: 50,
    fontSize: 14,
    padding: 10,
  },
  locationInput: {
    borderWidth: 1,
    borderColor: "#6C77BF",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    display: "flex",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inputIcon: {
    borderRadius: 5,
    borderRadius: 5,
    paddingRight: 140,
    fontSize: 14,
  },
  locationText: {
    paddingVertical: height * 0.0155,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: 16,
    left: "88%",
    width: "10%",
    zIndex: 1,
  },
  check: {
    borderWidth: 1,
    borderColor: "#6C77BF",
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
    backgroundColor: "white",
    padding: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#6C77BF",
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTitle: {
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: "white",
    height: 47,
    width: "30%",
  },
  dropdownOptions: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  addImgTextContainer: {
    borderRadius: 5,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: height * 0.01,
    paddingVertical: height * 0.015,
  },
  addImgText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
  imgsContainer: {
    borderWidth: 1,
    borderColor: "#6C77BF",
    borderRadius: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
    backgroundColor: "white",
    padding: 10,
    height: "45%",
    marginBottom: height * 0.01,
  },
  imgContainer: {
    position: "relative",
    backgroundColor: "#DBDBDB",
    width: "30%",
    height: "48%",
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
  submitBtnContainer: {
    width: "100%",
  },
  submitBtn: {
    borderRadius: 5,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnContent: {
    color: "white",
    fontSize: 18,
  },
});

export default ChangeRole;
