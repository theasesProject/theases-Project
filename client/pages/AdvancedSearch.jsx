import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, fetchFilteredCars } from "../store/carFetch";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import back from "../assets/back.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllCarByDate } from "../store/bookingSlice";
import SelectDropdown from "react-native-select-dropdown";

function AdvancedSearch() {
  const navigation = useNavigation();
  const allCars = useSelector((state) => state.car.allCars);
  const dispatch = useDispatch();

  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(80000);
  const [priceSearched, setPriceSearched] = useState(80000);
  const [typeVehicule, setTypeVehicule] = useState("");
  const [chara, setChar] = useState("");
  const [deposits, setDeposit] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);
  const [isPressed4, setIsPressed4] = useState(false);
  const [isPressed5, setIsPressed5] = useState(false);
  const [isPressed6, setIsPressed6] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [availableCars, setAvailableCars] = useState([]);

  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const handleStartDateConfirm = (date) => {
    setStartDate(date.toISOString().split("T")[0]);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);
  const handleEndDateConfirm = (date) => {
    setEndDate(date.toISOString().split("T")[0]);
    hideEndDatePicker();
  };

  useEffect(() => {
    prices();
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, dispatch]);

  const fetchData = async () => {
    dispatch(
      getAllCarByDate({
        startDate: startDate,
        endDate: endDate,
        price: [sliderValue, priceSearched],
        typevehicle: typeVehicule,
        characteristics: chara,
        deposit: deposits,
      })
    );
  };

  const depositOptions = [
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

  const handleDropdownSelect = (index, value) => {
    handleChangeDeposit(value === "select" ? 0 : Number(value.split("%")[0]));
  };

  const handleChangeDeposit = (content) => {
    setDeposit(content);
  };

  const handleTypeVehcule = (value) => {
    setTypeVehicule(value);
    setIsPressed(!isPressed);
  };

  const handleSliderChange = (value) => {
    setPriceSearched(value);
  };

  const handleButtonPress = (value) => {
    setPriceSearched(value);
  };

  const prices = () => {
    let minPrice = allCars[0].price;
    let maxPrice = allCars[0].price;
    for (const car of allCars) {
      const price = car.price;
      if (price < minPrice) {
        setSliderValue(price);
      }
      if (price > maxPrice) {
        setSliderValue2(price);
      }
    }
  };

  const renderButton = (text, onPress, gradientColors, isPressedState) => (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={isPressedState ? gradientColors : ["#6C77BF", "#4485C5"]}
        locations={[0, 1]}
        style={styles.button}
      >
        <Text>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>All Cars</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={sliderValue}
        maximumValue={sliderValue2}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#4485C5"
        maximumTrackTintColor="black"
        maximumTrackTintSize="bold"
        thumbTintColor="#6C77BF"
        trackWidth={styles.slider.width}
        thumbWidth={styles.slider.height}
        step={10}
      />
      {renderButton(
        `${priceSearched}$`,
        () => handleButtonPress(sliderValue),
        ["#6C77BF", "#4485C5"],
        true
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Types</Text>
      </View>
      <View style={styles.typesContainer}>
        {renderButton(
          "Commercial",
          () => handleTypeVehcule("Commercial"),
          ["#6C77BF", "#4485C5"],
          isPressed
        )}
        {renderButton(
          "Sports",
          () => handleTypeVehcule("Sports"),
          ["#6C77BF", "#4485C5"],
          isPressed1
        )}
        {renderButton(
          "Luxury",
          () => handleTypeVehcule("Luxury"),
          ["#6C77BF", "#4485C5"],
          isPressed2
        )}
      </View>
      <View style={styles.typesContainer}>
        {renderButton(
          "Economical",
          () => handleTypeVehcule("Economical"),
          ["#6C77BF", "#4485C5"],
          isPressed3
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Characteristics</Text>
      </View>

      <View style={styles.typesContainer}>
        {renderButton(
          "Automatic",
          () => handleTypeVehcule("Automatic"),
          ["#6C77BF", "#4485C5"],
          isPressed4
        )}
        {renderButton(
          "Semi",
          () => handleTypeVehcule("Semi-Automatic"),
          ["#6C77BF", "#4485C5"],
          isPressed5
        )}
        {renderButton(
          "Manual",
          () => handleTypeVehcule("Manual"),
          ["#6C77BF", "#4485C5"],
          isPressed6
        )}
      </View>

      <Text style={styles.titleText}>Down Payment:</Text>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          onSelect={(selectedItem, index) => {
            handleDropdownSelect(index, selectedItem);
          }}
          buttonStyle={styles.dropdown}
          dropdownStyle={styles.dropdownOptions}
          defaultButtonText="select"
          data={depositOptions}
          dropdownIconPosition="right"
        />
      </View>
      <Text style={styles.titleText}>Search by Date</Text>
      <View style={styles.dateContainer}>
        {renderButton(
          `Start Date ${startDate || ""}`,
          showStartDatePicker,
          ["#6C77BF", "#4485C5"],
          isPressed4
        )}
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
        />

        {renderButton(
          `End Date  ${endDate || ""}`,
          showEndDatePicker,
          ["#6C77BF", "#4485C5"],
          isPressed4
        )}
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={hideEndDatePicker}
        />
      </View>
      <TouchableOpacity
        style={styles.showResult}
        onPress={() => {
          fetchData();
          navigation.navigate("FiltredCar");
        }}
      >
        <LinearGradient colors={["#6C77BF", "#4485C5"]} locations={[0, 1]}>
          <Text style={styles.showResults}>Show Results</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: "white",
    gap: 5,
  },
  slider: {
    width: 350,
    height: 30,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 12,
    width: 100,
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
  },
  // dropdownTitle: {
  //   marginRight: 5,
  // },
  dropdown: {
    width: 100,
    borderRadius: 5,
    padding: 10,
    height: 40,
    backgroundColor: "#6C77BF",
  },
  dropdownOptions: {
    backgroundColor: "lightgrey",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  showResult: {
    borderRadius: 10,

    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#6C77BF",
  },
  showResults: {
    textAlign: "center",

    justifyContent: "center",
    color: "black",
    fontSize: 20,
    height: 50,
    borderRadius: 14,
  },
  backImage: {
    width: 22,
    height: 20,
  },
});

export default AdvancedSearch;
