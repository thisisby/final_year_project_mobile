import { useUserStore } from "@/store/userStore";
import { Redirect } from "expo-router";

export default function Page() {
  const { user } = useUserStore();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  } else {
    return <Redirect href="/(main)/home" />;
  }
}
