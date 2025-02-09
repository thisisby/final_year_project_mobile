import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Copy Workout with ID: {id}</Text>
    </View>
  );
}
