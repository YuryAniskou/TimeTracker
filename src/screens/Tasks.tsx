import React, { useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

function Tasks(): React.ReactElement {
  const handleAddClick = useCallback(() => {
    console.log("add");
  }, []);

  return (
    <SafeAreaView
      style={{ height: "100%", position: "relative", backgroundColor: "#fff" }}
    >
      <ScrollView>
        <Text>Tasks screen</Text>
      </ScrollView>

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
        onPress={handleAddClick}
      >
        <Text>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Tasks;
