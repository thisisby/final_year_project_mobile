import Avatar from "@/components/ui/Avatar";
import Heading from "@/components/ui/Heading";
import TextCustom from "@/components/ui/Text";
import React, { useEffect } from "react";
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
import ArrowLeftIcon from "../../components/ui/icons/ArrowLeftIcon";
import SimcardIcon from "@/components/ui/icons/SimcardIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import SessionIcon from "@/components/ui/icons/TimerIcon";
import HotYogaIcon from "@/components/ui/icons/HotYogaIcon";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/store/userStore";
import WorkoutIcon from "@/components/ui/icons/WorkoutIcon";
import NutritionIcon from "@/components/ui/icons/NutritionIcon";
import { useWorkouts } from "@/hooks/useWorkouts";
import { useSessionStore } from "@/store/sessionStore";
import { useGetSessions } from "@/hooks/useSessions";
import { useAnalyticsStore } from "@/store/analyticsStore";

export default function Page() {
  const { user } = useUserStore();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const { isLoading, data } = useWorkouts();
  const { sessions, isLoading: isLoadingSessions } = useGetSessions();

  if (isLoading || isLoadingSessions) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 130 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Avatar title={user.avatar} />
        <View>
          <Text style={styles.headerHeading}>Welcome Back!</Text>
          <Text style={styles.headerName}>{user.username}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 40 }}>
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 12, fontSize: 26, fontWeight: 700 }}>
              Set Your{"\n"}Workout Plan
            </Text>
            <TextCustom variant="secondary">Training and Nutrition</TextCustom>
          </View>
          <View style={{ position: "absolute", top: -30, right: 0 }}>
            <Image
              style={{ width: 180, height: 180 }}
              source={require("@/assets/images/bottle-image.png")}
            />
          </View>
        </View>
      </View>

      <View>
        <Heading level={2} style={{ marginBottom: 20 }}>
          Your habbit
        </Heading>

        <View style={styles.habbit}>
          <View style={styles.habbitItem}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: "#f4f6f6" }]}
              onPress={() => router.push("/home/daily-report")}
            >
              <View style={{ marginBottom: 30 }}>
                <Text style={[styles.cardTitle, { color: "#3D3E3E" }]}>
                  Daily Report
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <ChartIcon width={36} height={36} color="#3D3E3E" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { backgroundColor: "#fff7ed" }]}
              onPress={() => router.push("/home/workouts")}
            >
              <View
                style={{
                  marginBottom: 40,
                }}
              >
                <WorkoutIcon width={60} height={60} />
              </View>
              <View>
                <Text style={[styles.cardTitle, { color: "#f97316" }]}>
                  Workouts
                </Text>
                <Text style={{ color: "#f97316", fontSize: 12 }}>
                  {data?.payload?.length} workout guides
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.habbitItem}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: "#cffafe" }]}
              onPress={() => router.push("/home/sessions")}
            >
              <View
                style={{
                  marginBottom: 40,
                }}
              >
                <SessionIcon width={60} height={60} />
              </View>
              <View>
                <Text style={[styles.cardTitle, { color: "#0891b2" }]}>
                  Sessions
                </Text>
                <Text style={{ color: "#0891b2", fontSize: 12 }}>
                  {sessions?.length} sessions saved
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: "#dcfce7" }]}
              onPress={() => router.push("/home/nutritions")}
            >
              <View style={{ marginBottom: 24 }}>
                <Text style={[styles.cardTitle, { color: "#15803d" }]}>
                  Nutrition
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <NutritionIcon width={40} height={40} color="#15803d" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 50,
    marginTop: 20,
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
