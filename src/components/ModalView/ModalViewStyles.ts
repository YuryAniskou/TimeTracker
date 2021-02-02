import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "100%",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  modalHeaderTitle: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
  },
});
