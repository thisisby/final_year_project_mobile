import { Slot, Stack } from "expo-router";
import { View, StyleSheet, StatusBar } from "react-native";
import CustomTabBar from "../components/common/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import Toast from "react-native-toast-message";
import toastConfig from "@/components/common/CustomToast";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { user } = useUserStore();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
        <Slot />
        {user && <CustomTabBar />}
        <StatusBar />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    fontFamily: "Helvetica",
  },
});
