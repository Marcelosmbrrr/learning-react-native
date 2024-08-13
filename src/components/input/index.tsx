import React from "react";
import { View, TextInput, TextInputProps, ViewProps } from "react-native";

import { styles } from "./styles";
import { theme } from "@/theme";

function Input({ children, style }: ViewProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      {...rest}
      style={styles.input}
      placeholderTextColor={theme.colors.gray_400}
    />
  );
}

Input.Field = Field;

export { Input };
