import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

const MyCarsCard = ({ agencycar, setSelectedCar,handleDeleteCar, setModalVisible,handleUpdateCar }) => {
  const renderRightActions = (progress, dragX, carId, car) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 30],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActions}>
        <LinearGradient
          colors={["#F2F2F2", "white"]}
          style={[styles.actionButton, styles.updateButton]}
        >
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteCar(carId)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={["#88b4e2", "#6C77BF"]}
          style={[styles.actionButton, styles.updateButton]}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true)
              
            }}
            style={[styles.actionButton, styles.updateButton]}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, agencycar.car?.id, agencycar?.car)
      }
    >
      <View style={styles.carCard}>
        <Image
          style={styles.car}
          source={{
            uri: agencycar.carImage?.media,
          }}
        />
        <View style={styles.line} />

        <View style={styles.details}>
          <View style={styles.button}>
            <Text style={styles.title}>{agencycar?.car.model}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedCar(agencycar?.car);
            }}
            style={styles.button}
          >
            <Text style={styles.title}>Avaibility</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sec}>
          <View style={styles.pr}>
            <Text style={styles.price}>{agencycar.car?.brand}</Text>
          </View>

          <View style={styles.th}>
            <Text style={styles.price}>Daily:DT {agencycar.car?.price}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  carCard: {
    marginBottom: height * 0.02,
    borderRadius: 7,
    backgroundColor: "white",
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    gap: height * 0.008,
  },
  car: {
    borderRadius: 7,
    height: height * 0.25,
  },
  line: {
    backgroundColor: "lightgrey",
    height: height * 0.001,
    marginVertical: height * 0.01,
    width: "100%",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#6C77BF",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    paddingVertical: height * 0.005,
    borderRadius: 7,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  btn: {
    flex: 1,
    backgroundColor: "#6C77BF",
    height: height * 0.03,
    alignItems: "center",
    borderRadius: 3,
  },
  sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  pr: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 3,
  },
  price: {
    color: "#4485C5",
    fontSize: 18,
    fontWeight: "500",
  },
  th: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 3,
  },
  //   ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

  rightActions: {
    // backgroundColor: "red",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    flexDirection: "row",
    gap: width * 0.06,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "50%",
    height: height * 0.08,
  },
  deleteButton: {
    alignItems: "center",
  },
  updateButton: {
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#6C77BF",
    fontWeight: "bold",
  },
  updateButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default MyCarsCard;
