import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const ResultSearch = ({ results, onLocationSelect }) => {
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
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.locationItem}
            onPress={() => onLocationSelect(item)}
          >
            <Text style={{ fontFamily: "FiraMono-Medium" }}>{item.name}</Text>
            <Text style={{ fontFamily: "FiraMono-Medium" }}>
              {item.address}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    maxHeight: 200, // Adjust the maximum height as needed
  },
  locationItem: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
});

export default ResultSearch;
