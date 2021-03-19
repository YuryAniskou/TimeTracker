import React, { ChangeEvent } from "react";
import { TextInput } from "react-native-gesture-handler";

import styles from "./FieldStyles";

interface FieldProps {
  value?: string | number;
  placeholder?: string;
  onChangeText?: (e: string | ChangeEvent<any>) => void;
}

function Field({
  value = "",
  placeholder,
  onChangeText,
}: FieldProps): React.ReactElement {
  return (
    <TextInput
      keyboardType="numeric"
      style={styles.field}
      onChangeText={onChangeText}
      value={String(value)}
      placeholder={placeholder}
    />
  );
}

export default Field;
