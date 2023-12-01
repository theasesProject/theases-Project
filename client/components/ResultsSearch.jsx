import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ResultSearch = ({ results, onLocationSelect }) => {

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
            <Text >{item.name}</Text>
            <Text >
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
