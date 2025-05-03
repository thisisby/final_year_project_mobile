import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface Props {
  title: string;
}

export default function Avatar(props: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.avatar}
      onPress={() => router.push("/(main)/profile/general")}
    >
      {props.title ? (
        <Image
          source={{ uri: props.title }}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
        />
      ) : (
        <Text>{props.title.slice(0, 2).toUpperCase()}</Text>
      )}
    </TouchableOpacity>
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
