import { Stack } from "expo-router";

export default function Page() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
        animationDuration: 200,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="create-new" />
      <Stack.Screen name="create-new-ai" />
      <Stack.Screen name="copy-workout/[id]" />
    </Stack>
  );
}
