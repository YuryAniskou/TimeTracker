import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./TimerStyles";

interface TimerActionsProps {
  isStarted: boolean;
  onStart: () => void;
  onStop: () => void;
}

function TimerActions({
  isStarted,
  onStart,
  onStop,
}: TimerActionsProps): React.ReactElement {
  return (
    <View style={styles.actions}>
      {isStarted && (
        <TouchableOpacity style={styles.acttionBtn} onPress={onStop}>
          <Text>STOP</Text>
        </TouchableOpacity>
      )}

      {!isStarted && (
        <TouchableOpacity style={styles.acttionBtn} onPress={onStart}>
          <Text>START</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default TimerActions;
