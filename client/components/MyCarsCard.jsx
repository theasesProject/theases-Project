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

const MyCarsCard = ({ agencycar }) => {
  const renderRightActions = (progress, dragX, carId, car) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 30],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCar(carId)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={["#88b4e2", "#6C77BF"]}
          style={[styles.actionButton, styles.updateButton]}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedCar(car);
              setModalVisible(true);
            }}
            style={[styles.actionButton, styles.updateButton]}
          >
            <Text style={styles.buttonText}>Update</Text>
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
              setModalVisible1(true);
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
    // position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: height * 0.1,
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
});

export default MyCarsCard;
