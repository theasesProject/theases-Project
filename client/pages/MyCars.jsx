import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  getallCarByAgency,
  deletedAgencyCar,
  updateCar,
} from "../store/carFetch";
import {
  GetUnavailableDatesForCar,
  updateAgencyDate,
} from "../store/bookingSlice";
import { logUserOut, selectUser } from "../store/userSlice";
import NavBarAgency from "../components/NavBarAgency";
import car from "../assets/car2.png";
const { height, width } = Dimensions.get("screen");
import GreyHeart from "../assets/Svg/car-svgrepo-com.svg";
import car2 from "../assets/car2.png";
import star from "../assets/star.jpg";
import deleteImge from "../assets/delete.jpg";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
import MyCarsCard from "../components/MyCarsCard.jsx";
function MyCars() {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const unavailableDate = useSelector((state) => state.booking.unavailableDate);
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const agencyCars = useSelector((state) => state.car.agencyCar);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [updatedCarInfo, setUpdatedCarInfo] = useState({
    price: selectedCar?.price,
    priceWeekly: selectedCar?.priceWeekly,
    priceMonthly: selectedCar?.priceMonthly,
  });
  const handleDeleteCar = (carId) => {
    // console.log(carId);
    dispatch(
      deletedAgencyCar({
        id: carId,
        AgencyId: activeUser?.Agency.UserId,
      })
    );
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
  };
  const handleSetSelectedCar = (newCar) => {
    setSelectedCar(newCar);
    setModalVisible1(true);
  };
  const markDatesRed = () => {
    const markedRedDates = {};

    unavailableDate.forEach((date) => {
      markedRedDates[date] = { selectedDayColor: "red" };
    });

    return markedRedDates;
  };

  const handleUpdateCar = () => {
    dispatch(updateCar({ id: selectedCar?.id, ...updatedCarInfo }));
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(getallCarByAgency(activeUser?.Agency?.UserId));
    dispatch(GetUnavailableDatesForCar(selectedCar?.id));
  }, [dispatch, selectedCar?.id, selectedCar]);
  // const renderLeftActions = (progress, dragX, car) => {
  //   const trans = dragX.interpolate({
  //     inputRange: [-50, 0],
  //     outputRange: [30, 0],
  //     extrapolate: "clamp",
  //   });

  //   return (
  //     <View style={styles.leftActions}>
  //       <LinearGradient
  //         colors={["#88b4e2", "#6C77BF"]}
  //         style={[styles.actionButton, styles.updateButton]}
  //       >
  //         <TouchableOpacity
  //           onPress={() => {
  //             setSelectedCar(car);
  //             setModalVisible(true);
  //           }}
  //           style={[styles.actionButton, styles.updateButton]}
  //         >
  //           <Text style={styles.buttonText}>Update</Text>
  //         </TouchableOpacity>
  //       </LinearGradient>
  //     </View>
  // );
  // };
  const UpdateAvaibility = () => {
    dispatch(
      updateAgencyDate({
        CarId: selectedCar?.id,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      })
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={styles.scrollContentContainerStyle}
      >
        {agencyCars?.length > 0 ? (
          <View style={styles.headerContainer}>
            <Text style={styles.number}>You Have {agencyCars.length} cars</Text>
          </View>
        ) : null}
        {agencyCars?.length > 0 ? (
          agencyCars.map((agencycar, i) => (
            <MyCarsCard
              agencycar={agencycar}
              setSelectedCar={handleSetSelectedCar}
              handleDeleteCar={handleDeleteCar}
              handleUpdateCar={handleUpdateCar}
              setModalVisible={ setModalVisible}

              key={i}
            />
          ))
        ) : (
          <View style={styles.message}>
            <GreyHeart />
            <View style={styles.messageContainer}>
              <Text style={styles.emptyText1}>Empty Cars list</Text>
              <Text style={styles.emptyText}>
                I'm Sorry You don't Have any car,{" "}
              </Text>
              <Text style={styles.emptyText}>let's add a car to our list </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={updatedCarInfo.price}
              onChangeText={(text) =>
                setUpdatedCarInfo({ ...updatedCarInfo, price: text * 1 })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="PriceWeekly"
              value={updatedCarInfo.priceWeekly}
              onChangeText={(text) =>
                setUpdatedCarInfo({ ...updatedCarInfo, priceWeekly: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="PriceMonthly"
              value={updatedCarInfo.priceMonthly}
              onChangeText={(text) =>
                setUpdatedCarInfo({ ...updatedCarInfo, priceMonthly: text })
              }
            />
            <View styles={styles.buttons}>
              <TouchableOpacity onPress={() => handleUpdateCar(selectedCar.id)}>
                <LinearGradient
                  colors={["#88b4e2", "#6C77BF"]}
                  locations={[0, 1]}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText1}>Update Car</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Modal
          visible={isModalVisible1}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible1(false)}
          style={styles.calender}
        >
          <View style={styles.calender}>
            <CalendarPicker
              allowRangeSelection={true}
              onDateChange={(date) => handleDateSelect(date)}
              markedDates={{
                ...markedDates,
                ...markDatesRed(),
              }}
              todayBackgroundColor="#6C77BF"
              selectedDayColor="#daddf0"
              selectedDayTextColor="white"
              selectedDisabledDatesTextStyle={{ color: "white" }}
              scaleFactor={375}
              textStyle={{
                color: "black",
                fontSize: 18,
              }}
              previousTitle="<"
              nextTitle=">"
              disabledDates={unavailableDate}
            />
            <View style={styles.updateButton1}>
              <LinearGradient
                colors={["#88b4e2", "#6C77BF"]}
                style={styles.buttonContainer1}
              >
                <TouchableOpacity onPress={()=>{UpdateAvaibility();setModalVisible1(false)}}>
                  <Text style={styles.textBtn}>Update Date</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["white", "lightgrey"]}
                style={styles.buttonContainer1}
              >
                <TouchableOpacity onPress={() => setModalVisible1(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.navbarContainer}>
        <NavBarAgency />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: width,
  },
  pr: {
    flex: 1,
    marginLeft: 20,
  },
  brtitle: {
    flex: 1,
    backgroundColor: "#6C77BF",
    width: width * 0.5,
    height: height * 0.03,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  scrollStyle: {
    width: "100%",
    paddingHorizontal: width * 0.03,
  },
  scrollContentContainerStyle: {
    paddingBottom: height * 0.05,
  },
  sec: {
    flexDirection: "row",
    // justifyContent:"center",
    // alignItems:"center",
  },
  lineContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  sh: {
    flex: 1,
    marginLeft: -35,
  },
  line: {
    backgroundColor: "lightgrey",
    height: height * 0.002,
    width: width * 0.8,
  },
  details: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: height * 0.015,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  favoriteCar: {
    marginBottom: 10,
  },
  messageContainer: {
    paddingTop: 15,
  },
  th: {
    flex: 1,
    marginLeft: 50,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },

  message: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  emptyText1: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",

    color: "grey",
  },
  favouriteText: {
    color: "black",

    fontSize: 18,
  },

  car: {
    width: width * 0.9,
    height: height * 0.25,
    // borderRadius: 7,
  },
  star: {
    width: 15,
    height: 15,
  },

  title: {
    // flex:1,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  price: {
    color: "blue",
    fontSize: 18,
    width: width,
  },
  delete: {
    justifyContent: "flex-end",
    width: 20,
    height: 20,
  },
  deleted2: {
    width: 320,
    height: 10,
    position: "absolute",
    alignItems: "flex-end",
  },
  btn: {
    flex: 1,
    backgroundColor: "#6C77BF",
    // width:width *0.1,
    height: height * 0.03,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: height * 0.1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  carCard: {
    borderColor: "#6C77BF",
    borderWidth: 1,
    width: "100%",
    height: height * 0.36,
    marginBottom: height * 0.03,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    // padding:10
  },

  star: {
    width: 15,
    height: 15,
  },
  items: {
    // flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
    gap: 3,
  },
  detail: {
    // flexDirection: "row",
    // display:"flex",
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    gap: 7,
    padding: 8,
    flex: 1,
  },

  rightActions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  updateButton: {
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  leftActions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  buttonContainer1: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.01,
    width: width * 0.4,
  },
  textBtn: {
    color: "white",
  },
  headerContainer: {
    zIndex: 1,
    width: width,
    backgroundColor: "rgb(219, 217, 224)",
    paddingVertical: height * 0.01,
  },
  number: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  input: {
    height: 40,
    borderColor: "#88b4e2",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 10,
  },
  cancelText: {
    color: "#88b4e2",
    marginTop: 10,
    textAlign: "center",
  },
  buttonText1: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  calender: {
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: height * 0.5,
    borderRadius: 10,
    padding: 10,
    marginVertical: "18%",
  },
  updateButton1: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: "10%",
  },
});

export default MyCars;
