import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import * as Calendar from "expo-calendar";
import { useSelector, useDispatch } from "react-redux";
import { CreateBooking } from "../store/bookingSlice";
import { StatusBar } from "expo-status-bar";
import CalendarPicker from "react-native-calendar-picker";
// import { Calendar } from "react-native-calendars";
import moment from "moment";
function Booking() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user);
  console.log(selectedStartDate, "selectedStartDate");
  console.log(selectedEndDate, "selectedEndDate");
  console.log(markedDates, "markedDates");
  const createBooking = () => {
    if (selectedStartDate && selectedEndDate) {
      dispatch(
        CreateBooking({
          startDate: selectedStartDate.format("YYYY-MM-DD").toString(),
          endDate: selectedEndDate.format("YYYY-MM-DD").toString(),
          UserId: activeUser.id,
        })
      );
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
        todayBackgroundColor="blue"
        selectedDayColor="yellow"
        selectedDayTextColor="grey"
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

      <Text>Pick Time</Text>
      <TouchableOpacity onPress={createBooking}>
        <Text>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  calender: {
    backgroundColor: "red",
  },
});

export default Booking;
