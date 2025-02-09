import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
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
          <ArrowSquareLeftIcon width={36} height={36} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerHeading}>Wednesday Full body workout</Text>
          <Text style={styles.headerName}>22 total lifts asada sa...</Text>
        </View>
      </View>
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
            {loremText}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        {exerciseLists.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card3}
            onPress={() => router.push(`/home/workout-exercises/${item.id}`)}
          >
            <View style={[styles.cardContent, { paddingVertical: 6 }]}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              {item.description && (
                <Text style={styles.cardDescription}>{item.description}</Text>
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
    textAlign: "right",
  },
  headerName: {
    color: "#898989",
    textAlign: "right",
    fontSize: 12,
  },
});
