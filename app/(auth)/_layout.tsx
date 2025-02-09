import { Redirect, Slot, Stack } from "expo-router";
import { useUserStore } from "../../store/userStore";
import Toast from "react-native-toast-message";
import toastConfig from "@/components/common/CustomToast";

export default function PublicLayout() {
  const { user } = useUserStore();

  console.log(user);

  if (user) {
    return <Redirect href="/(main)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        animationDuration: 200,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
