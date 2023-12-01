import { Image, StyleSheet, View, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("screen");

const FilterCard = ({ element }) => {
  return (
    <View style={styles.carCard}>
      <Image
        style={styles.car}
        source={{
          uri: element.Media[0]?.media,
        }}
      />
      <View style={styles.line} />
      <View style={styles.modelagencyname}>
        <View style={styles.button}>
          <Text style={styles.title}>{element.model}</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.title}>{element.typeOfFuel}</Text>
        </View>
      </View>
      <View style={styles.brandprice}>
        <View style={styles.brand}>
          <Text style={styles.titlePrice}>{element.brand}</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.titlePrice}>${element.price}/Daily</Text>
        </View>
      </View>
    </View>
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
  modelagencyname: {
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
  brandprice: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  brand: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 3,
  },
  titlePrice: {
    color: "#4485C5",
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 3,
  },
});

export default FilterCard;
