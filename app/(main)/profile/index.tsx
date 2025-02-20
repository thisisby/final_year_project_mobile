import Avatar from "@/components/ui/Avatar";
import Heading from "@/components/ui/Heading";
import TextCustom from "@/components/ui/Text";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import SimcardIcon from "@/components/ui/icons/SimcardIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import SessionIcon from "@/components/ui/icons/TimerIcon";
import HotYogaIcon from "@/components/ui/icons/HotYogaIcon";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/store/userStore";
import WorkoutIcon from "@/components/ui/icons/WorkoutIcon";
import NutritionIcon from "@/components/ui/icons/NutritionIcon";
import TimerLinearIcon from "@/components/ui/icons/TimerLinearIcon";

export default function Page() {
  const { user } = useUserStore();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const clearUser = useUserStore((state) => state.clearUser);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    clearUser();
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 130 }}
      style={styles.container}
    >
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          Account
        </Text>
      </View>
      <View style={styles.header}>
        <View
          style={{
            backgroundColor: "#efefef",
            width: 60,
            aspectRatio: "1/1",
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{user.email.slice(0, 2).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.headerHeading}>Baistan</Text>
          <Text style={styles.headerName}>{user.email}</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#efefef",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
          onPress={() => router.push(`/home/sessions/1`)}
        >
          <View
            style={{
              padding: 4,
              borderRadius: 6,
              backgroundColor: "#f1f1f1",
            }}
          >
            <TimerLinearIcon width={24} height={24} />
          </View>
          <View>
            <Text style={styles.cardTitle}>General</Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Profile, notification & storage
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#efefef",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
          onPress={() => router.push(`/home/sessions/1`)}
        >
          <View
            style={{
              padding: 4,
              borderRadius: 6,
              backgroundColor: "#f1f1f1",
            }}
          >
            <TimerLinearIcon width={24} height={24} />
          </View>
          <View>
            <Text style={styles.cardTitle}>Security</Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Control how you access oxx.club
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#efefef",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
          onPress={() => router.push(`/home/sessions/1`)}
        >
          <View
            style={{
              padding: 4,
              borderRadius: 6,
              backgroundColor: "#f1f1f1",
            }}
          >
            <TimerLinearIcon width={24} height={24} />
          </View>
          <View>
            <Text style={styles.cardTitle}>FAQ</Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Explore frequently asken questions
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 8,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
            backgroundColor: "#f1f1f1",
          }}
          onPress={handleLogout}
        >
          <View
            style={{
              padding: 4,
              borderRadius: 6,
              backgroundColor: "#fff",
            }}
          >
            <TimerLinearIcon width={24} height={24} />
          </View>
          <View>
            <Text style={[styles.cardTitle, { color: "#000" }]}>Log out</Text>
            <Text style={{ fontSize: 12, color: "#000", marginTop: 2 }}>
              End session
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 20,
    backgroundColor: "#f4f6f6",
    padding: 20,
    borderRadius: 18,
  },
  headerHeading: {
    fontWeight: 700,
    fontSize: 20,
    textAlign: "right",
  },
  headerName: {
    color: "#898989",
    textAlign: "right",
  },

  hero: {
    backgroundColor: "#f4f6f6",
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  cardTitle: {
    fontWeight: 700,
  },
  habbit: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  habbitItem: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: "#ced4da",
    borderRadius: 16,
    padding: 14,
  },
});
