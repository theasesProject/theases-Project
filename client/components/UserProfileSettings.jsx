import { StyleSheet, Text, View } from "react-native";
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const UserProfileSettings = () => {
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
      <Text style={{ fontFamily: "FiraMono-Medium" }}>UserProfileSettings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfilePage: {
    flex: 1,
  },
});

export default UserProfileSettings;
