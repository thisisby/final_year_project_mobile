import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

interface Props {
  level: 1 | 2 | 3;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Heading: React.FC<Props> = ({ level, style, children }) => {
  let headingStyle;

  switch (level) {
    case 1:
      headingStyle = styles.h1;
      break;
    case 2:
      headingStyle = styles.h2;
      break;
    case 3:
      headingStyle = styles.h3;
      break;
    default:
      headingStyle = styles.h1;
  }

  return <Text style={[headingStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 22,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Heading;
