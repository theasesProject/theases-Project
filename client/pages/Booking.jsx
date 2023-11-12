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
import { useNavigation } from "@react-navigation/native";

import moment from "moment";
import { selectUser, setUser } from "../store/userSlice";

function Booking() {
  const navigation = useNavigation();

  const unavailableDate = useSelector((state) => state.booking.unavailableDate);
  const oneCar = useSelector((state) => state.car.OneCar);
  console.log(oneCar, "onecar");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const succes = useSelector((state) => state.booking.succes);
  const [total, setTotal] = useState(0);

  const createBooking = () => {
    if (selectedStartDate && selectedEndDate) {
      dispatch(
        CreateBooking({
          startDate: selectedStartDate.format("YYYY-MM-DD").toString(),
          endDate: selectedEndDate.format("YYYY-MM-DD").toString(),
          UserId: activeUser.id,
          CarId: oneCar.id,
          amount: total,
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

  const calculTotalPrice = () => {
    const startDate = moment(selectedStartDate);
    const endDate = moment(selectedEndDate);

    if (selectedStartDate && selectedEndDate) {
      const durationInDays = endDate.diff(startDate, "days") + 1;

      let pricePerDay = oneCar.price;
      if (durationInDays > 7) {
        pricePerDay = oneCar.priceWeekly;
      }
      if (durationInDays > 29) {
        pricePerDay = oneCar.priceMonthly;
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

  return (
    <View style={styles.page}>
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

      <Text>{total}$</Text>

      <TouchableOpacity
        style={{ paddingRight: 10 }}
        onPress={() => createBooking()}
      >
        <LinearGradient
          colors={["#6C77BF", "#4485C5"]}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </LinearGradient>
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
  total: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },
  buttonContainer: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 15,
    width: 100,
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default Booking;
