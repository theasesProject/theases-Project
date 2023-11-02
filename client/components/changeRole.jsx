import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  LinearGradient,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import CheckBox from "react-native-check-box";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { CreateAgency } from "../store/agencySlice";
import axios from "axios";

function ChangeRole() {
  const transporation = ["accept", "refuse"];
  const [isChecked, setCheck] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [adress, setAdress] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

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

  const createNewAgency = () => {
    dispatch(
      CreateAgency({
        papers: selectedDocument,
        address: adress,
        verificationStatus: true,
        companyNumber: companyNumber,
        deposit: selectedValue.split("%")[0] * 1,
        transportation: isChecked,
      })
    );
  };
  const handleAdress = (input) => {
    setAdress(input);
  };
  const handleCompanyNumber = (input) => {
    setCompanyNumber(input);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      const image = cloudinaryUpload(result.uri);

      setSelectedDocument(image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownSelect = (index, value) => {
    setSelectedValue(value);
  };

  const cloudinaryUpload = async (imageUri) => {
    const cloudName = "torbaga";
    const myUploadPreset = "zpsqdpwt";

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "my_image.jpg",
      });

      formData.append("upload_preset", myUploadPreset);
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

  return (
    <View style={styles.editProfilePage}>
      <TextInput
        value={adress}
        onChangeText={handleAdress}
        placeholder="Enter Your Adress"
        style={styles.input}
      />
      <TextInput
        value={companyNumber}
        onChangeText={handleCompanyNumber}
        placeholder="Enter Your Agency Number"
        style={styles.input}
      />
      <CheckBox
        style={styles.check}
        onClick={() => {
          setCheck(!isChecked);
          console.log(isChecked);
        }}
        isChecked={!isChecked}
        leftText={"Deliver cars to users locations"}
      />

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownTitle}> Deposit:</Text>
        <SelectDropdown
          onSelect={(selectedItem, index) => {
            handleDropdownSelect(index, selectedItem);
          }}
          style={styles.dropdown}
          data={deposit}
        />
      </View>
      <View style={styles.line} />
      <View>
        <Button
          style={styles.input}
          title="Enter your Papier"
          onPress={pickDocument}
        />
        {selectedDocument && (
          <View>
            <Text>Selected Document:</Text>
            <Text>Name: {selectedDocument.name}</Text>
            <Text>Size: {selectedDocument.size} bytes</Text>
          </View>
        )}
      </View>
      <Button
        onPress={
          createNewAgency
        }
        title="submit"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
  },
  profilePictureContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6a78c1",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    padding: 10,
  },
  check: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    padding: 10,
  },
  eye: {
    position: "absolute",
    top: 15,
    right: "3%",
    width: "10%",
    height: 20,
    zIndex: 1,
    padding: 10,
  },
  errorsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordErrorContainer: {
    textAlign: "left",
  },
  error: {
    color: "red",
  },
  forgotPassword: {
    textAlign: "right",
  },
  line: {
    height: 1,
    backgroundColor: "#e5e6e8",
    marginVertical: 20,
  },
  saveBtn: {
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  saveChangesBtnContent: {
    color: "white",
    fontSize: 18,
  },
  check: {
    width: 100,
  },

  dropdownContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    padding: 10,
  },
  dropdownTitle: {
    fontSize: 16,
  },
  dropdown: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
});

export default ChangeRole;
