import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  allServiceForAgency,
  UpdateServiceByAgency,
} from "../store/bookingSlice";
import { selectUser, setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import carImage from "../assets/Brands/BMW.png";
import userImage from "../assets/user.jpg";
import { useEffect } from "react";
import moment from "moment";
function AgencyService() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUser);
  const allService = useSelector((state) => state.booking.allServiceByAgency);

  useEffect(() => {
    dispatch(allServiceForAgency(activeUser.id));
  }, [dispatch]);

  const acceptService = (idservice) => {
    const obj = { id: idservice, acceptation: "accepted" };
    dispatch(UpdateServiceByAgency(obj));
  };

  const rejectService = (idservice) => {
    const obj = { id: idservice, acceptation: "rejected" };
    dispatch(UpdateServiceByAgency(obj));
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer}>
        {allService ? (
          allService.map((service, i) => (
            <View key={i} style={styles.cardContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{service.user.userName} </Text>
                <Text style={styles.text}>want to rent you car </Text>
                <Text style={styles.name}>{service.car.model} </Text>
              </View>
              <View style={styles.carContainer}>
                <Text style={styles.text}>From </Text>
                <Text style={styles.time}>
                  {moment(service.service.startDate)
                    .format("YYYY-MM-DD")
                    .toString()}
                </Text>
                <Text style={styles.text}>To</Text>
                <Text style={styles.time}>
                  {moment(service.service.endDate)
                    .format("YYYY-MM-DD")
                    .toString()}{" "}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    rejectService(service.service.id);
                  }}
                  style={styles.rejectButton}
                >
                  <Text>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    acceptService(service.service.id);
                  }}
                  style={styles.acceptButton}
                >
                  <Text>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>Nothing</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  cardContainer: {
    backgroundColor: "white",
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userContainer: {
    // flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  carContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  acceptButton: {
    backgroundColor: "#98E4FF",
    width: 55,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,

    marginLeft: 5,
  },
  rejectButton: {
    backgroundColor: "#BEADFA",
    width: 55,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    marginLeft: 5,
  },
  scrollContainer: {},
  carImage: {
    width: 50,
    height: 50,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  time: {
    color: "#0174BE",
    fontSize: 14,
    fontWeight: "bold",
  },
  name: {
    color: "#435585",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: { color: "grey" },
});

export default AgencyService;
