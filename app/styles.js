import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  box: {
    width: SCREEN_WIDTH - 60,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },
  header: {
    height: 70,
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: "lightgray"
  },
  footer: {
    height: 40,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "lightgray"
  },
  main: {
    alignItems: "center",
    marginTop: 70,
    justifyContent: "center",
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 110
  },
  text: {
    color: "#fff",
    fontSize: 25
  }
});

export default styles;
