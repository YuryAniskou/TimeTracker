import React, { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { formatedTime } from "../../utils/time";

import styles from "./TimerStyles";
interface TimeView {
  duration: number;
}

function TimeView({ duration }: TimeView): React.ReactElement {
  const time = useMemo(() => {
    return formatedTime(duration);
  }, [duration]);

  return (
    <View style={styles.timeView}>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
}

export default TimeView;
