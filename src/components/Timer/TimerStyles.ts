import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  timeView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  timeText: {
    fontSize: 40,
  },
  actions: {
    alignItems: "center",
  },
  acttionBtn: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 3,
    zIndex: 10,
  },
});
