import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCars,
  fetchFilteredCars,
  setSelected,
  filterSelection,
} from "../store/carFetch";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import back from "../assets/back.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllCarByDate } from "../store/bookingSlice";
import { ScrollView } from "react-native-gesture-handler";
import BackArrow from "../assets/Svg/left-long-solid.svg";
import { selectUser } from "../store/userSlice";
import ToggleTypesBtn from "../components/ToggleTypesBtn";
import ToggleCharacteristicsBtn from "../components/ToggleCharacteristicsBtn";
import ToggleDownPaymentBtn from "../components/ToggleDownPaymentBtn";
import moment from "moment";
const { width, height } = Dimensions.get("screen");

function AdvancedSearch() {
  const navigation = useNavigation();
  const allCars = useSelector((state) => state.car.allCars);
  const dispatch = useDispatch();
  const actualFilter = useSelector(filterSelection);

  const [sliderMinValue, setSliderMinValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(0);
  const [priceSearched, setPriceSearched] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const handleStartDateConfirm = (date) => {
    setStartDate(moment(date).format("DD-MM-YYYY"));
    hideStartDatePicker();
  };

  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);
  const handleEndDateConfirm = (date) => {
    setEndDate(moment(date).format("DD-MM-YYYY"));
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
        price: [sliderMinValue, priceSearched],
        typevehicle:
          actualFilter.type.value === "All" ? "" : actualFilter.type.value,
        characteristics:
          actualFilter.characteristics.value === "All"
            ? ""
            : actualFilter.characteristics.value,
        deposit:
          actualFilter.downPayment.value === "All"
            ? ""
            : actualFilter.downPayment.value,
      })
    );
    navigation.navigate("FiltredCar");
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

  const handleSliderChange = (value) => {
    setPriceSearched(value);
  };

  const prices = () => {
    if (allCars.length === 0) {
      console.log("AdvancedSearch.jsx LINE 145");
      console.log("no cars fetched");
      return;
    }

    let minPrice = Number.MAX_VALUE; // Set initial minPrice to maximum possible value
    let maxPrice = Number.MIN_VALUE; // Set initial maxPrice to minimum possible value

    for (let car of allCars) {
      const price = car.price;
      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    }

    if (minPrice !== Number.MAX_VALUE && maxPrice !== Number.MIN_VALUE) {
      setSliderMinValue(minPrice);
      setSliderMaxValue(maxPrice);
      setPriceSearched(minPrice);
    }
  };

  const handleResetFilter = () => {
    dispatch(setSelected({ key: "type", value: "All" }));
    dispatch(setSelected({ key: "downPayment", value: "All" }));
    dispatch(setSelected({ key: "characteristics", value: "All" }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <BackArrow
          style={styles.backArrow}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <ScrollView contentContainerStyle={{ marginTop: height * 0.02 }}>
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "#6a78c1",
              fontWeight: "bold",
              letterSpacing: width * 0.02,
              textTransform: "uppercase",
            }}
          >
            Filter
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={sliderMinValue}
            maximumValue={sliderMaxValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#4485C5"
            maximumTrackTintColor="black"
            maximumTrackTintSize="bold"
            thumbTintColor="#6C77BF"
            trackWidth={styles.slider.width}
            thumbWidth={styles.slider.height}
            step={10}
          />
          <Text style={{ fontSize: 18, color: "#6a78c1", fontWeight: "bold" }}>
            {priceSearched} $
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Types</Text>
        </View>
        <ScrollView
          horizontal={true}
          // showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typesContainer}
        >
          <ToggleTypesBtn text={"All"} />
          <ToggleTypesBtn text={"Commercial"} />
          <ToggleTypesBtn text={"Sports"} />
          <ToggleTypesBtn text={"Luxury"} />
          <ToggleTypesBtn text={"Economical"} />
        </ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Characteristics</Text>
        </View>
        <ScrollView
          horizontal={true}
          // showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typesContainer}
        >
          <ToggleCharacteristicsBtn text={"All"} />
          <ToggleCharacteristicsBtn text={"Automatic"} />
          <ToggleCharacteristicsBtn text={"Semi"} />
          <ToggleCharacteristicsBtn text={"Manual"} />
        </ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Down Payment</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <ScrollView
            horizontal={true}
            // showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typesContainer}
          >
            <ToggleDownPaymentBtn text={"All"} />
            {depositOptions.map((option, i) => (
              <ToggleDownPaymentBtn text={option} key={i} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Filter by Date</Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={showStartDatePicker}>
            <LinearGradient
              colors={["#E9E9E9", "#E9E9E9"]}
              locations={[0, 1]}
              style={styles.dataBtns}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                {startDate || "Start Date"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />
          <TouchableOpacity onPress={showEndDatePicker}>
            <LinearGradient
              colors={["#E9E9E9", "#E9E9E9"]}
              locations={[0, 1]}
              style={styles.dataBtns}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                {endDate || "End Date"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
        </View>
        <View style={styles.typesContainer2}>
          <Text style={styles.titleText}>Filter by Map</Text>
          <LinearGradient
            style={styles.map}
            colors={["#E9E9E9", "#E9E9E9"]}
            locations={[0, 1]}
          >
            <TouchableOpacity
              onPress={() => {
                fetchData();
                navigation.navigate("MapForUser");
              }}
            >
              <Text>Open Map</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.resultsBtns}>
          <LinearGradient
            colors={["#E9E9E9", "#E9E9E9"]}
            locations={[0, 1]}
            style={styles.showResult}
          >
            <TouchableOpacity onPress={handleResetFilter}>
              <Text style={styles.showResults}>Reset Filter</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#6C77BF", "#4485C5"]}
            locations={[0, 1]}
            style={styles.showResult}
          >
            <TouchableOpacity onPress={fetchData}>
              <Text style={{ ...styles.showResults, color: "white" }}>
                Apply
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
    backgroundColor: "#F2F2F2",
  },
  navBar: {
    width: width,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    zIndex: 1,
    backgroundColor: "#F2F2F2",
  },
  backArrow: {
    width: width * 0.05,
    height: height * 0.02,
  },
  titleContainer: {
    alignItems: "center",
    width: "100%",
  },
  dropdownContainer: {
    marginVertical: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  dropdown: {
    marginVertical: height * 0.01,
    width: 100,
    borderRadius: 10,
    height: height * 0.05,
    backgroundColor: "#E9E9E9",
  },
  dropdownOptions: {
    marginVertical: height * 0.01,
    borderRadius: 5,
  },
  slider: {
    marginVertical: height * 0.01,
    width: "100%",
    height: 30,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: width * 0.277,
  },
  dataBtns: {
    marginVertical: height * 0.01,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: width * 0.45,
  },
  titleText: {
    marginTop: height * 0.01,
    fontWeight: "bold",
    fontSize: 18,
    color: "#6a78c1",
    textAlign: "center",
  },
  typesContainer: {
    marginVertical: height * 0.01,
    gap: width * 0.055,
    maxHeight: height * 0.05,
  },
  characteristicsContainer: {
    marginVertical: height * 0.01,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: width * 0.02,
  },
  typesContainer2: {
    marginVertical: height * 0.01,
    flexDirection: "column",
    gap: 5,
    width: "100%",
  },
  dateContainer: {
    marginVertical: height * 0.01,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showResult: {
    marginVertical: height * 0.025,
    borderRadius: 10,
    paddingVertical: height * 0.015,
  },
  showResults: {
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    width: width * 0.45,
  },
  backImage: {
    marginVertical: height * 0.01,
    width: 22,
    height: 20,
  },
  map: {
    marginVertical: height * 0.01,
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarContainer: {
    marginVertical: height * 0.01,
    width: width,
    position: "absolute",
    bottom: 0,
  },
  resultsBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AdvancedSearch;
