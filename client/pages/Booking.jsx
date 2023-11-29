import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
  Modal,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("screen");
import * as Calendar from "expo-calendar";
import { useSelector, useDispatch } from "react-redux";
import { CreateBooking } from "../store/bookingSlice";
import { StatusBar } from "expo-status-bar";
import CalendarPicker from "react-native-calendar-picker";
import { GetUnavailableDatesForCar } from "../store/bookingSlice";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import moment from "moment";
import { selectUser, setUser } from "../store/userSlice";
import { createNotifcationForSpecifiqueUser } from "../store/notificationSlice";
// import Toast from "react-native-toast-message";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
function Booking() {
  const navigation = useNavigation();
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [period, setPeriod] = useState("day");
  const [agreed, setAgreed] = useState(false);
  const unavailableDate = useSelector((state) => state.booking.unavailableDate);
  const oneCar = useSelector((state) => state.car.OneCar);
  const [canReview, setCanReview] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const error = useSelector((state) => state.booking.error);
  const [total, setTotal] = useState(0);
  const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
  const isTransportationAvailable = oneCar?.Agency.transportation;
  console.log(unavailableDate, oneCar.id, "unvaibledate");
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const createBooking = () => {
    if (selectedStartDate && selectedEndDate) {
      if (error) {
        alert("error to create");
      } else {
        dispatch(
          CreateBooking({
            startDate: selectedStartDate.format("YYYY-MM-DD").toString(),
            endDate: selectedEndDate.format("YYYY-MM-DD").toString(),
            UserId: activeUser.id,
            CarId: oneCar.id,
            amount: total,
            acceptation: "pending",
            time: selectedTime,
          })
        );
      }
    }
  };
  const getDatesInRange = (start, end) => {
    const dates = [];
    let currentDate = moment(start);
    while (currentDate.isSameOrBefore(end, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }
    return dates;
  };
  const showRoleModal = () => {
    if (!selectedStartDate || !selectedEndDate) {
      alert("Please select both a start date and an end date.");
    } else {
      const datesInRange = getDatesInRange(selectedStartDate, selectedEndDate);
      const datesInRangeFormatted = datesInRange.map((date) =>
        moment(date).format("YYYY-MM-DD")
      );

      const isDatesAvailable = datesInRangeFormatted.every(
        (date) => !unavailableDate.includes(date)
      );
      console.log(unavailableDate, "unavailableDate");
      console.log(isDatesAvailable, "isDatesAvailable");

      if (!isDatesAvailable) {
        alert(
          "Some or all of the selected dates are not available. Please choose different dates."
        );
      } else {
        setRoleModalVisible(true);
      }
    }
  };

  const handleRoleResponse = (response) => {
    setRoleModalVisible(false);
    if (response === "agree") {
      createBooking();
      alert("Congratulations! Your booking was successful.");
      const notificationData = {
        UserId: oneCar.AgencyId,
        notification: `You have request  for the car:${oneCar.model}`,
        type: "request",
      };

      dispatch(createNotifcationForSpecifiqueUser(notificationData));
      socket.emit("request", {
        senderId: activeUser.id,
        receiverId: oneCar.AgencyId,
        message: `Service request accepted: ${oneCar.model}`,
      });
      navigation.navigate("Home");
    } else {
      setRoleModalVisible(false);
    }
  };
  const calculTotalPrice = () => {
    const startDate = moment(selectedStartDate);
    const endDate = moment(selectedEndDate);

    if (selectedStartDate && selectedEndDate) {
      const durationInDays = endDate.diff(startDate, "days") + 1;

      let pricePerDay = oneCar.price;
      setPeriod("day");
      if (durationInDays > 7) {
        pricePerDay = oneCar.priceWeekly;
        setPeriod("weekly");
      }
      if (durationInDays > 29) {
        pricePerDay = oneCar.priceMonthly;
        setPeriod("Monthly");
      }

      const total = durationInDays * pricePerDay;
      console.log(total, "total");
      setTotal(total);
    } else if (startDate && !endDate) {
      setTotal(0);
    }
  };

  const handleDateSelect = (date) => {
    if (!selectedStartDate && !selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setMarkedDates({
        [date]: { startingDay: true, endingDay: true },
      });
    } else if (moment(date).isSame(selectedStartDate, "day")) {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setMarkedDates({});
    } else if (moment(date).isAfter(selectedStartDate, "day")) {
      setSelectedEndDate(date);

      setMarkedDates({
        ...markedDates,
      });

      const datesInRange = getDatesInRange(selectedStartDate, date);
      const markedDatesInRange = datesInRange.reduce((result, date) => {
        result[date] = { color: "pink" };
        return result;
      }, {});

      setMarkedDates({
        ...markedDates,
        ...markedDatesInRange,
        [selectedStartDate]: {
          ...markedDates[selectedStartDate],
          endingDay: true,
        },
        [date]: { ...markedDates[date], startingDay: true },
      });
    } else if (selectedEndDate && !selectedStartDate) {
      setSelectedEndDate(null);
      setSelectedStartDate(null);
    }
    calculTotalPrice();
  };
  const markDatesRed = () => {
    const markedRedDates = {};

    unavailableDate.forEach((date) => {
      markedRedDates[date] = { selectedDayColor: "red" };
    });

    return markedRedDates;
  };

  useEffect(() => {
    dispatch(GetUnavailableDatesForCar(oneCar.id));

    calculTotalPrice();
  }, [dispatch, selectedStartDate, selectedEndDate]);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.calender}>
        <CalendarPicker
          allowRangeSelection={true}
          onDateChange={(date) => handleDateSelect(date)}
          markedDates={{
            ...markedDates,
            ...markDatesRed(),
          }}
          todayBackgroundColor="blue"
          selectedDayColor="#daddf0"
          selectedDayTextColor="white"
          selectedDisabledDatesTextStyle={{ color: "red" }}
          scaleFactor={375}
          textStyle={{
            color: "black",

            fontSize: 18,
          }}
          previousTitle="<"
          nextTitle=">"
          disabledDates={unavailableDate}
        />
      </View>
      <View>
        <View>
          {isTransportationAvailable ? (
            <Text style={styles.pickTime}>Pick Time</Text>
          ) : (
            <Text style={styles.pickTime}>
              Pick Time(Transportation Not available)
            </Text>
          )}
        </View>
        <View style={styles.pickButton}>
          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[0]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>09:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>09:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[1]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>10:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>10:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[2]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>11:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>11:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.pickButton}>
          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[3]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                onPress={() => {
                  handleTimeSelect(timeSlots[4]);
                }}
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>14:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>14:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[4]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>15:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>15:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[5]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>16:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>16:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.pickButton}>
          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[6]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>17:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>17:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {isTransportationAvailable ? (
            <TouchableOpacity
              onPress={() => {
                handleTimeSelect(timeSlots[7]);
              }}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>18:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!isTransportationAvailable}
              style={{ paddingLeft: 12 }}
            >
              <LinearGradient
                colors={["#DDE6ED", "#DDE6ED"]}
                style={styles.buttonContainer1}
              >
                <Text style={styles.buttonText}>18:00 PM</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.all}>
          <View style={styles.price}>
            <View style={styles.dates}>
              <Text style={styles.date}>
                {moment(selectedStartDate).format("YYYY-MM-DD").toString()}
              </Text>

              <Text style={styles.date}>
                {moment(selectedEndDate).format("YYYY-MM-DD").toString()}
              </Text>
            </View>

            <View style={styles.total1}>
              <Text style={styles.total}>
                {total}$/{period}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={showRoleModal} style={{ paddingLeft: 12 }}>
            <LinearGradient
              colors={["#6C77BF", "#4485C5"]}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={roleModalVisible}
        onRequestClose={() => {
          setRoleModalVisible(!roleModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            1:Driver's License Verification: The client must possess a valid and
            current driver's license. Provide a clear photocopy or image of the
            driver's license for verification.{" "}
          </Text>
          <Text style={styles.modalText}>
            {" "}
            2:Insurance Agreement: Understandand agree to the insurance terms
            and conditions. Provide necessary insurance information if required.
            Responsible Driving: Ensure responsible and safe driving during the
            rental period.
          </Text>

          <Text style={styles.modalText}>
            3:traffic laws and regulations. Return Conditions: Return the car in
            the same condition it was received. Report any damages or issues
            immediately.
          </Text>

          <Text style={styles.modalText}>
            {" "}
            4:Rental Duration: Abide by the agreed-upon rental duration. Notify
            in advance if an extension is needed.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: "#2196F3" }}
              onPress={() => handleRoleResponse("agree")}
            >
              <Text style={styles.buttonText}>Agree</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: "#2196F3" }}
              onPress={() => handleRoleResponse("reject")}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Pick: {
    width: "100%",
    height: 50,
    fontSize: 16,
    padding: 10,
    fontFamily: "FiraMono-Bold",
  },
  page: {
    padding: 4,
    height: 100,
    backgroundColor: "white",
    height: "100%",
  },
  bookNow: {
    backgroundColor: "yellow",
    height: 50,
    width: 100,
  },
  pickButton: {
    flexDirection: "row",
    justifyContent: "flex-Start",
    alignItems: "center",
  },

  total: {
    // padding: 10,
    color: "blue",
    fontFamily: "FiraMono-Bold",
    fontSize: 16,
  },
  calender: {
    backgroundColor: "white",
    padding: 5,
    marginBottom: "2%",
  },
  buttonContainer: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: width * 0.43,
    height: 47,
  },
  total1: {
    alignItems: "center",

    width: width * 0.45,
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "FiraMono-Medium",
  },

  button: {
    backgroundColor: "#6C77BF",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    marginVertical: 5,
    width: width * 0.8,
    height: 40,
  },

  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "FiraMono-Medium",
  },
  pickTime: {
    fontSize: 17,
    fontFamily: "FiraMono-Bold",
    color: "black",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },

  modalText: {
    fontSize: 14,
    marginBottom: 10,
    color: "grey",
    fontFamily: "FiraMono-Medium",
  },
  buttonContainer1: {
    borderRadius: 10,
    padding: 7,
    alignItems: "flex-Start",
    justifyContent: "center",
    marginVertical: 15,
    height: 45,

    width: width * 0.28,
  },
  price: {
    flexDirection: "column",

    gap: 0,
    width: "45%",
    paddingVertical: 10,
  },
  date: {
    fontSize: 12,
    color: "grey",
    fontFamily: "FiraMono-Medium",
  },
  dates: {
    flexDirection: "row",

    gap: 7,
  },
  all: {
    height: height * 0.1,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default Booking;
