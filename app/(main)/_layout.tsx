import { Redirect, Slot, useRouter } from "expo-router";
import { useUserStore } from "../../store/userStore";

export default function ProtectedLayout() {
  const { user } = useUserStore();
  const router = useRouter();

  console.log(user);

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
