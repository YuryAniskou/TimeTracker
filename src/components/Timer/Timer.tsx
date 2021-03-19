import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TimeView from "./TimeView";

import styles from "./TimerStyles";
import TimerActions from "./TimerActions";

interface Timer {
  enabled?: boolean;
  startDuration?: number;
  isStartedDefault?: boolean;
  onStop?: (duration: number) => void;
}

function Timer({
  enabled,
  startDuration = 0,
  isStartedDefault,
  onStop,
}: Timer): React.ReactElement {
  const [duration, setDuration] = useState(startDuration);
  const [animationID, setAnimationID] = useState(0);
  const [isStarted, setIsStarted] = useState(!!isStartedDefault);

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
    <View style={styles.container}>
      <TimeView duration={duration} />

      {enabled && (
        <TimerActions
          isStarted={isStarted}
          onStart={handleStartClick}
          onStop={handleStopClick}
        />
      )}
    </View>
  );
}

export default Timer;
