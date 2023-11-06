import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Calendar from "expo-calendar";
import { useSelector, useDispatch } from "react-redux";
import { CreateBooking } from "../store/bookingSlice";
import { StatusBar } from "expo-status-bar";
import CalendarPicker from "react-native-calendar-picker";
import { GetUnavailableDatesForCar } from "../store/bookingSlice";
// import { Calendar } from "react-native-calendars";
import moment from "moment";
import { selectUser, setUser } from "../store/userSlice";
function Booking() {
  const unavailableDate = useSelector((state) => state.booking.unavailableDate);
  const oneCar = useSelector((state) => state.car.OneCar);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(GetUnavailableDatesForCar(oneCar.id));
  }, [dispatch]);

  useEffect(() => {
    // Create an object with dates from unavailableDate array marked as red
    const markedDatesObject = {};
    unavailableDate.forEach((date) => {
      markedDatesObject[date] = {
        selectedDayColor: "red",
      };
    });

    // Update the markedDates state
    setMarkedDates(markedDatesObject);
  }, [unavailableDate]);
  console.log(unavailableDate, "unavailableDate");
  const createBooking = () => {
    if (selectedStartDate && selectedEndDate) {
      console.log(
        selectedStartDate.format("YYYY-MM-DD").toString(),
        "selectedStartDate"
      );
      console.log(
        selectedEndDate.format("YYYY-MM-DD").toString(),
        "selectedEndDate"
      );
      dispatch(
        CreateBooking({
          startDate: selectedStartDate.format("YYYY-MM-DD").toString(),
          endDate: selectedEndDate.format("YYYY-MM-DD").toString(),
          UserId: activeUser.id,
          CarId: oneCar.id,
        })
      );
      console.log("succes");
    } else {
      alert("Please select both a start date and an end date.");
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
  const handleDateSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset the end date.
      setMarkedDates({
        [date]: { selectedDayColor: "red", startingDay: true, endingDay: true },
      });
    } else if (moment(date).isSame(selectedStartDate, "day")) {
      setSelectedStartDate(null);
      setMarkedDates({}); // Clear all markings.
    } else if (moment(date).isAfter(selectedStartDate, "day")) {
      setSelectedEndDate(date);
      setMarkedDates({
        ...markedDates,
        [date]: { color: "red" },
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
    }
  };

  const customStyles = {
    calendar: {
      // Style for the calendar container
      backgroundColor: "red",
      width: 400,
      heigth: 400,
    },
    day: {
      // Style for individual day cells
      fontSize: 18,
      textAlign: "center",
    },
    weekend: {
      // Style for weekend days
      color: "red",
      backgroundColor: "blue",
    },
    selected: {
      // Style for selected dates
      backgroundColor: "blue",
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.page}>
      <CalendarPicker
        allowRangeSelection={true}
        onDateChange={(date) => handleDateSelect(date)}
        markedDates={markedDates}
        todayBackgroundColor="red"
        selectedDayColor="#daddf0"
        selectedDayTextColor="white"
        scaleFactor={375}
        textStyle={{
          // fontFamily: "Cochin",
          color: "black",

          fontSize: 18,
        }}
        previousTitle="<"
        nextTitle=">"
        customStyles={customStyles}
      />
      <View>
        <Text style={styles.Pick}>Pick Time</Text>
      </View>
      {/* <TouchableOpacity onPress={() => handleChara3("Manual")}>
        <LinearGradient
          colors={["#6C77BF", "#FFFF"]}
          locations={[0, 1]}
          style={styles.buttonContainer}
        >
          <Text>Manual</Text>
        </LinearGradient>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.bookNow} onPress={() => createBooking()}>
        <Text>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  calender: {
    backgroundColor: "red",
  },
  Pick: {
    width: "100%",
    height: 50,
    fontSize: 16,
    padding: 10,
    fontWeight: "bold",
  },
  bookNow: {
    backgroundColor: "yellow",
    height: 50,
    width: 100,
  },
});

export default Booking;
