import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColor.colorPrimary,
    padding: 15,
    // ...
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text color="appBarText" fontSize="subheading" fontWeight="bold">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
