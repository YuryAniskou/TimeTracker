import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  label: string;
  onPress?: () => void;
  onRemove?: () => void;
}

function ListItem({
  label,
  onPress,
  onRemove,
}: ListItemProps): React.ReactElement {
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
        <Text>{label}</Text>
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
