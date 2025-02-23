import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import MagicPenIcon from "@/components/ui/icons/MagicPenIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import NutritionIcon from "@/components/ui/icons/NutritionIcon";
import WorkoutIcon from "@/components/ui/icons/WorkoutIcon";
import NoteIcon from "@/components/ui/icons/NoteIcon";
import Avatar from "@/components/ui/Avatar";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import TimerLinearIcon from "@/components/ui/icons/TimerLinearIcon";
import NoteLinearIcon from "@/components/ui/icons/NoteLinearIcon";
import { useWorkouts } from "@/hooks/useWorkouts";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const [isDelete, setIsDelete] = React.useState(false);
  const { isLoading, data } = useWorkouts();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 130,
      }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={30} height={30} />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerHeading}>Workouts</Text>
        </View>
        <View>
          <TouchableOpacity>
            <SettingLinearIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.habbit}>
        <View style={styles.habbitItem}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#fffef2" }]}
            onPress={() => router.push("/modal/create-new")}
          >
            <View style={{ marginBottom: 20 }}>
              <NoteIcon width={28} height={28} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Create New List</Text>
              <Text style={{ color: "#898989", fontSize: 12 }}>
                22 list generated
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.habbitItem}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#fef1fa" }]}
            onPress={() => router.push("/modal/create-new-ai")}
          >
            <View style={{ marginBottom: 20 }}>
              <MagicPenIcon width={28} height={28} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Generate with AI</Text>
              <Text style={{ color: "#898989", fontSize: 12 }}>
                60% of users used
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          marginBottom: 16,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        Exercise List
      </Text>

      {/* Exercise Lists */}
      <View style={styles.sectionCard}>
        {data.payload.map((item) => (
          <TouchableOpacity
            key={item.id}
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
              marginBottom: 6,
            }}
            onPress={() => router.push(`/home/workouts/${item.id}`)}
          >
            <View
              style={{
                padding: 4,
                borderRadius: 6,
                backgroundColor: "#f1f1f1",
              }}
            >
              <NoteLinearIcon width={24} height={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {item.title}
              </Text>
              {item.description && (
                <Text
                  style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  // Sticky Header
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  // Sections
  section: {
    backgroundColor: "#F7F8FA",
    borderRadius: 5,
    marginHorizontal: 16,
    padding: 10,
    marginVertical: 10,
  },
  section2: {
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  card2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  sectionCard: {
    // backgroundColor: "#F7F8FA",
    borderRadius: 12,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 20,
  },

  // List Items
  listItem: { fontSize: 16, paddingVertical: 8 },
  greenText: { color: "white" },

  // Cards
  card3: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f8f9f9",
    borderRadius: 10,
    marginBottom: 3,
  },

  cardIcon: { marginRight: 10 },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 16, fontWeight: 600 },
  cardDescription: { fontSize: 12, color: "#666" },
  cardCount: { fontSize: 16, fontWeight: "bold", color: "#777" },

  // Templates
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  templateCard: {
    width: "48%",
    backgroundColor: "#F7F8FA",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  templateTitle: { fontSize: 16, marginBottom: 4 },
  templateExercises: { fontSize: 14, color: "#666" },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray", marginTop: 4 },
  habbit: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  habbitItem: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: "#ced4da",
    borderRadius: 10,
    padding: 14,
  },
  headerHeading: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center",
  },
  headerName: {
    color: "#898989",
    textAlign: "center",
    fontSize: 12,
  },
});
