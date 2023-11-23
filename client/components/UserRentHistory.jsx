import { StyleSheet, Text, View } from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const UserRentHistory = () => {
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
    <View style={styles.editProfilePage}>
      <Text>UserRentHistory</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
  },
});

export default UserRentHistory;
