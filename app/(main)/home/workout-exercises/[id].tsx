import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import MagicPenIcon from "@/components/ui/icons/MagicPenIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import NutritionIcon from "@/components/ui/icons/NutritionIcon";
import WorkoutIcon from "@/components/ui/icons/WorkoutIcon";
import NoteIcon from "@/components/ui/icons/NoteIcon";
import Avatar from "@/components/ui/Avatar";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import TrashLinearIcon from "@/components/ui/icons/TrashLinearIcon";

interface ExerciseListItem {
  id: string;
  title: string;
  count: number;
  description?: string;
}

const exerciseLists: ExerciseListItem[] = [
  { id: "1", title: "My Exercisesd", count: 29 },
  { id: "2", title: "Wednesday: Full-Body Workout", count: 7 },
  {
    id: "3",
    title: "Starting Strength: Workout B",
    count: 3,
    description: "Follow the same progression scheme as Workout A",
  },
  {
    id: "4",
    title: "Arnold’s Golden Six",
    count: 6,
    description: "Classic full-body routine designed to build strength",
  },
];

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to track dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleClose = () => {
    setIsDropdownVisible(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 130 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={30} height={30} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerHeading}>Records</Text>
        </View>
        <View>
          <TouchableOpacity onPress={toggleDropdown}>
            {isDropdownVisible ? (
              <CloseSquareIcon width={30} height={30} />
            ) : (
              <SettingLinearIcon width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isDropdownVisible && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <View style={[styles.dropdown]}>
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    setIsDropdownVisible(false);
                    router.push(`/modal/edit-workout-exercise/${id}`);
                  }}
                >
                  <View
                    style={[styles.cardIcon2, { backgroundColor: "#1f1f1f" }]}
                  >
                    <Ionicons name="reader-outline" size={22} color="#fff" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: "#fff" }]}>
                      Edit
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    setIsDropdownVisible(false);
                    router.push(`/modal/edit-workout/${id}`);
                  }}
                >
                  <View
                    style={[styles.cardIcon2, { backgroundColor: "#1f1f1f" }]}
                  >
                    <Ionicons name="reader-outline" size={22} color="#fff" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: "#fff" }]}>
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    },
                  ]}
                >
                  <View
                    style={[styles.cardIcon2, { backgroundColor: "#1f1f1f" }]}
                  >
                    <TrashLinearIcon color="#fff" width={24} height={24} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: "#fff" }]}>
                      Info
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: "#f8f9f9",
            borderBottomColor: "#e7eded",
            borderBottomWidth: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onPress={() => router.push(`/home/analytics/${id}`)}
        >
          <View style={styles.cardIcon2}>
            <Ionicons name="reader-outline" size={22} color="#52b788" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Analytics</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: "#f8f9f9",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View style={styles.cardIcon2}>
            <Ionicons name="reader-outline" size={22} color="#52b788" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>1RM</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Exercise Lists */}
      <View style={styles.sectionCard}>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 4,
            color: "#b7b8bc",
          }}
        >
          SUN, 8 DEC 2024
        </Text>
        <View
          style={{
            backgroundColor: "#f8f9f9",
            borderRadius: 10,
            paddingVertical: 4,
          }}
        >
          {exerciseLists.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card3,
                i === exerciseLists.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => router.push(`/home/workouts/${item.id}`)}
            >
              <View>
                <Text>16:20</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 30,
                }}
              >
                <Text style={{ color: "#525e75", fontWeight: 500 }}>
                  20 reps
                </Text>
                <Text style={{ color: "#d74a49", fontWeight: 500 }}>20 kg</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 4,
            color: "#b7b8bc",
          }}
        >
          SUN, 8 DEC 2024
        </Text>
        <View
          style={{
            backgroundColor: "#f8f9f9",
            borderRadius: 10,
            paddingVertical: 4,
          }}
        >
          {exerciseLists.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card3,
                i === exerciseLists.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => router.push(`/home/workouts/${item.id}`)}
            >
              <View>
                <Text>16:20</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 30,
                }}
              >
                <Text style={{ color: "#525e75", fontWeight: 500 }}>
                  20 reps
                </Text>
                <Text style={{ color: "#d74a49", fontWeight: 500 }}>20 kg</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: 20,
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
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e7eded",
  },
  cardIcon: { marginRight: 10 },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 16 },
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
    textAlign: "right",
  },
  headerName: {
    color: "#b7b8bc",
    textAlign: "right",
  },

  overlay: {
    position: "absolute",
    top: 40, // Adjust based on header height
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 70,
    width: "50%",
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    zIndex: 999,
    padding: 0,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    backgroundColor: "#1f1f1f",
  },
});
