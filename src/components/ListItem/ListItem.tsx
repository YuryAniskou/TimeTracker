import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formatedTime } from "../../utils/time";

interface ListItemProps {
  label: string;
  duration: number;
  isActive?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
}

function ListItem({
  label,
  duration,
  isActive,
  onPress,
  onRemove,
}: ListItemProps): React.ReactElement {
  const time = useMemo(() => formatedTime(duration), [duration]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <Text style={{ color: isActive ? "red" : "black" }}>{label}</Text>
        <Text>{time}</Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove}>
            <Text>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
