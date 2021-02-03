import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from "react-native";

interface Values {
  name: string;
  hourRate: string;
}

function Task(): React.ReactElement {
  const [duration, setDuration] = useState<number>(0);

  const handleStartClick = useCallback(() => {
    const startTime = new Date().getTime();

    requestAnimationFrame(timerAnimation(startTime));
  }, []);

  const timerAnimation = useCallback(
    (startTime) => () => {
      const currentTime = new Date().getTime() - new Date(startTime).getTime();

      setDuration(currentTime);
      requestAnimationFrame(timerAnimation(startTime));
    },
    []
  );

  const formatedTime = useMemo(() => {
    const currentTime = moment.duration(duration);

    return moment.utc(currentTime.asMilliseconds()).format("HH:mm:ss:SS");
  }, [duration]);

  return (
    <SafeAreaView
      style={{ height: "100%", position: "relative", backgroundColor: "#fff" }}
    >
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 40 }}>{formatedTime}</Text>
        </View>
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
        onPress={handleStartClick}
      >
        <Text>START</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Task;
