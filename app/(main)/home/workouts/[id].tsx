import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
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
import {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
import TrashLinearIcon from "@/components/ui/icons/TrashLinearIcon";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import { useWorkouts } from "@/hooks/useWorkouts";

interface ExerciseListItem {
  id: string;
  title: string;
  count: number;
  description?: string;
}

const exerciseLists: ExerciseListItem[] = [
  { id: "1", title: "My Exercises", count: 29 },
  { id: "2", title: "Wednesday: Full-Body Workout", count: 7 },
  {
    id: "3",
    title: "Squat",
    count: 3,
    description: "1 x 5 reps \n4 x 6 reps \nRest: 3 minutes",
  },
  {
    id: "4",
    title: "Arnold’s Golden Six",
    count: 6,
    description: "Do 3 sets of 6 reps for each exercise",
  },
  { id: "5", title: "Friday: Full-Body Workout", count: 7 },
  {
    id: "6",
    title: "Bench Press",
    count: 7,
    description: "Do 3 sets of 6 reps for each exercise \nRest: 3 minutes",
  },
  {
    id: "7",
    title: "Monday: Full-Body Workout",
    count: 7,
    description: "Designed for beginners with gym access",
  },
  {
    id: "8",
    title: "Monday: Full-Body Workout",
    count: 7,
    description: "Designed for beginners with gym access",
  },
  {
    id: "10",
    title: "Monday: Full-Body Workout",
    count: 7,
    description: "Designed for beginners with gym access",
  },
  {
    id: "9",
    title: "Monday: Full-Body Workout",
    count: 7,
    description:
      "Designed for beginners with gym access. Designed for beginners with gym access. Designed for beginners",
  },
];

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isLoading, data } = useWorkouts();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to track dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClose = () => {
    setIsDropdownVisible(false);
  };
  const [isExpanded, setIsExpanded] = useState(false); // State to track expanded state

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle expanded state
  };
  const loremText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam facere ipsam esse odit nemo ad as asd asd naisdn sajdiajsdnasdasdn sadn isand sandasnd and iansd isadn asnd asnd asnd asnd asnd asnd asnd asnd asnd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam facere ipsam esse odit nemo ad as asd asd naisdn sajdiajsdnasdasdn sadn isand sandasnd and iansd isadn asnd asnd asnd asnd asnd asnd asnd asnd asnd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam facere ipsam esse odit nemo ad as asd asd naisdn sajdiajsdnasdasdn sadn isand sandasnd and iansd isadn asnd asnd asnd asnd asnd asnd asnd asnd asnd";
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
          <Text style={styles.headerHeading}>
            {data.payload.find((item) => item.id === Number(id)).title}
          </Text>
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
                      Edit
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
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      <View
        style={{
          marginBottom: 20,
          borderRadius: 10,
          padding: 10,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity onPress={toggleExpand}>
          <Text
            style={{
              color: "#666",
              lineHeight: 18,
              letterSpacing: 0.4,
            }}
            numberOfLines={isExpanded ? undefined : 3}
            ellipsizeMode="tail"
          >
            {data.payload.find((item) => item.id === Number(id)).description}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        {data.payload
          .find((item) => item.id === Number(id))
          .exercises.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card3}
              onPress={() => router.push(`/home/workout-exercises/${item.id}`)}
            >
              <View style={[styles.cardContent, { paddingVertical: 6 }]}>
                <Text style={styles.cardTitle}>{item.exercise.name}</Text>

                {item.main_note && (
                  <Text style={styles.cardDescription}>{item.main_note}</Text>
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
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#1f1f1f",
  },
  // Sticky Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
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
    marginBottom: 6,
  },

  cardIcon: { marginRight: 10 },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 14, fontWeight: "bold" },
  cardDescription: { fontSize: 12, color: "#666", marginTop: 4 },
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
