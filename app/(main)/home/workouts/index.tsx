import React, { useRef, useState } from "react";
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
import { useDeleteWorkout, useWorkouts } from "@/hooks/useWorkouts";
import SwipeableWorkoutItem from "@/components/SwipeableItem"; // Import the new component
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const [isDelete, setIsDelete] = React.useState(false);
  const { isLoading, data } = useWorkouts();
  const scrollViewRef = useRef(null);
  const { deleteWorkout, isLoading: isDeleteLoading } = useDeleteWorkout();

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    console.log("Deleted item with id:", id);
    deleteWorkout(id);
  };

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
      <GestureHandlerRootView style={styles.sectionCard}>
        {data.payload.length > 0 ? (
          data.payload.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#efefef",
                marginBottom: 6,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
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
            </View>
          ))
        ) : (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>You have no workouts yet</Text>
          </View>
        )}
      </GestureHandlerRootView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 10,
  },
  headerHeading: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center",
  },
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
  cardTitle: { fontSize: 16, fontWeight: 600 },
  sectionCard: {
    borderRadius: 12,
  },
  noRecordsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7eded",
    borderStyle: "dashed",
    padding: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  noRecordsText: { textAlign: "center" },
});
