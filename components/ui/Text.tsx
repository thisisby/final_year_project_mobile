import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  variant?: "primary" | "secondary";
  style?: object;
  children?: React.ReactNode;
}

const TextCustom: React.FC<Props> = ({
  variant = "primary",
  style,
  children,
}) => {
  const textStyle = variant === "primary" ? styles.primary : styles.secondary;
  return <Text style={[textStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  primary: {
    color: "#333333",
  },
  secondary: {
    color: "#898989",
  },
});

export default TextCustom;
