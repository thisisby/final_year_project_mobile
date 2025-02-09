import { useUserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity } from "react-native";

export default function Page() {
  const clearUser = useUserStore((state) => state.clearUser);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    clearUser();
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Log out</Text>
    </TouchableOpacity>
  );
}
