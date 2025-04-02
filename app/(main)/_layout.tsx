import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { useUserStore } from "../../store/userStore";

export default function ProtectedLayout() {
  const { user } = useUserStore();
  const router = useRouter();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        animationDuration: 200,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="home/workouts/index" />
      <Stack.Screen name="home/nutritions/index" />
      <Stack.Screen name="home/analytics" />
      <Stack.Screen name="explore/index" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="samba/index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
