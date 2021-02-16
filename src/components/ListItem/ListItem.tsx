import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  label: string;
  onPress?: () => void;
}

function ListItem({ label, onPress }: ListItemProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
