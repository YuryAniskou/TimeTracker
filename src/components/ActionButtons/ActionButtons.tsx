import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ActionButtonsProps {
  onPress: () => void;
}

function ActionButtons({ onPress }: ActionButtonsProps): React.ReactElement {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 10,
        bottom: 10,
        backgroundColor: "#ccc",
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 3,
        zIndex: 10,
      }}
      onPress={onPress}
    >
      <Text>ADD</Text>
    </TouchableOpacity>
  );
}

export default ActionButtons;
