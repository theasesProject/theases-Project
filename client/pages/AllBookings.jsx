import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allServiceForUser } from "../store/bookingSlice";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { createNotifcationForSpecifiqueUser } from "../store/notificationSlice";
import Modal from "react-native-modal";
import { selectUser, setUser } from "../store/userSlice";
import io from "socket.io-client";
import {
  allServiceForAgency,
  UpdateServiceByAgency,
} from "../store/bookingSlice";
const AllBookings = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const userBookings = useSelector((state) => state.booking.allServiceUser);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const socket = io(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000`);
  useEffect(() => {
    dispatch(allServiceForUser(activeUser.id));
  }, [dispatch, activeUser?.id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelModalVisible(true);
  };

  const confirmCancelBooking = (message) => {
    setCancelModalVisible(false);
    const notificationData = {
      UserId: selectedBooking.Car.AgencyId,
      notification: ` the client ${activeUser?.userName}  cancel his booking for the car ${selectedBooking.Car.model}`,
      type: "reject",
    };

    dispatch(createNotifcationForSpecifiqueUser(notificationData));
    socket.emit("request", {
      senderId: activeUser.id,
      receiverId: selectedBooking.Car.AgencyId,
      message: `Service cancel ${selectedBooking.Car.model}`,
    });
    const obj = { id: selectedBooking.id, acceptation: "rejected" };
    dispatch(UpdateServiceByAgency(obj));
    Alert.alert(
      "Booking Canceled",
      `Booking with ID ${selectedBooking.id} canceled successfully.`
    );
  };

  const closeModal = () => {
    setCancelModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      {userBookings.map((booking) => (
        <View key={booking.id} style={styles.bookingCard}>
          <Text>{`Car: ${booking.Car.model}`}</Text>
          <Text>{`Start Date: ${formatDate(booking.startDate)}`}</Text>
          <Text>{`End Date: ${formatDate(booking.endDate)}`}</Text>
          <Text>{`Amount: ${booking.amount}$`}</Text>
          <Text>{`Status: ${booking.acceptation}`}</Text>
          {(booking.acceptation === "accepted" ||
            booking.acceptation === "pending") && (
            <TouchableOpacity style={styles.cancelButton}>
              <Button
                title="Cancel Booking"
                color="red"
                onPress={() => handleCancelBooking(booking)}
              />
            </TouchableOpacity>
          )}
          {booking.acceptation === "accepted" && (
            <TouchableOpacity style={styles.paymentButton}>
              <Button
                title="Make Payment"
                onPress={() => console.log("Payment")}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <Modal isVisible={cancelModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Are you sure you want to cancel the booking?
          </Text>
          <View style={styles.modalButtonsContainer}>
            <Button title="Yes" onPress={confirmCancelBooking} />
            <Button title="No" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentButton: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default AllBookings;
