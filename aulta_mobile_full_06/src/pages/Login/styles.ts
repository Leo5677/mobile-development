import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonView: {
    marginTop: 30,
    width: Dimensions.get("screen").width - 250,
  },
});
