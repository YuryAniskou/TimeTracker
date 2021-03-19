import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TimeView from "./TimeView";

import styles from "./TimerStyles";

interface Timer {
  startDuration?: number;
  isStartedDefault?: boolean;
  onStop?: (duration: number) => void;
}

function Timer({
  startDuration = 0,
  isStartedDefault,
  onStop,
}: Timer): React.ReactElement {
  const [duration, setDuration] = useState(startDuration);
  const [animationID, setAnimationID] = useState(0);
  const [isStarted, setIsStarted] = useState(isStartedDefault);

  const timerAnimation = useCallback(
    (startTime) => () => {
      const currentTime = new Date().getTime() - new Date(startTime).getTime();

      setDuration(currentTime);
      const animationID = requestAnimationFrame(timerAnimation(startTime));
      setAnimationID(animationID);
    },
    []
  );

  const handleStartClick = useCallback(() => {
    const startTime = new Date().getTime();

    requestAnimationFrame(timerAnimation(startTime));
    setIsStarted(true);
  }, []);

  const handleStopClick = useCallback(() => {
    cancelAnimationFrame(animationID);

    onStop && onStop(duration);
    setIsStarted(false);
  }, [animationID, duration, onStop]);

  return (
    <View>
      <TimeView duration={duration} />

      {isStarted && (
        <TouchableOpacity style={styles.acttionBtn} onPress={handleStopClick}>
          <Text>STOP</Text>
        </TouchableOpacity>
      )}

      {!isStarted && (
        <TouchableOpacity style={styles.acttionBtn} onPress={handleStartClick}>
          <Text>START</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Timer;
