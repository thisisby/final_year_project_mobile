import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
}

export default function Avatar(props: Props) {
  return (
    <View style={styles.avatar}>
      <Text>{props.title.slice(0, 2).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#efefef",
    width: 36,
    aspectRatio: "1/1",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
