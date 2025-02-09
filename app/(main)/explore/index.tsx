import RowHorizontalIcon from "@/components/ui/icons/RowHorizontalIcon";
import RowVerticalIcon from "@/components/ui/icons/RowVerticalIcon";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMasonryView, setIsMasonryView] = useState(true); // Toggle between views

  const categories = [
    "All",
    "Full Body",
    "Upper Body",
    "Lower Body",
    "Lats",
    "Core",
    "Legs",
  ];

  // Fake data for workout list
  const workouts = [
    {
      id: 1,
      title: "Push-ups",
      description:
        "A basic upper body exercise to strengthen your chest, shoulders, and arms.",
    },
    {
      id: 2,
      title: "Squats",
      description:
        "Excellent for building leg strength and improving lower body endurance.",
    },
    {
      id: 3,
      title: "Deadlifts",
      description:
        "A powerful full-body movement that targets your back, legs, and core. Great for building overall strength.",
    },
    {
      id: 4,
      title: "Pull-ups",
      description:
        "Targets your lats and biceps. A challenging but effective upper body workout.",
    },
    {
      id: 5,
      title: "Plank",
      description:
        "A core stability exercise that strengthens your abs and lower back. Try holding for 60 seconds!",
    },
    {
      id: 6,
      title: "Burpees",
      description:
        "A high-intensity movement that works the entire body. Ideal for cardio and endurance training.",
    },
    {
      id: 7,
      title: "Lunges",
      description:
        "Works your quads, hamstrings, and glutes while improving balance and coordination.",
    },
    {
      id: 8,
      title: "Jump Rope",
      description:
        "An excellent cardio workout that improves footwork, endurance, and overall agility.",
    },
    {
      id: 9,
      title: "Bench Press",
      description:
        "One of the best exercises for chest and tricep strength. Focus on form and control.",
    },
    {
      id: 10,
      title: "Russian Twists",
      description:
        "A great core exercise to strengthen obliques and improve rotational strength.",
    },
    {
      id: 11,
      title: "Leg Raises",
      description:
        "Targets the lower abs and helps build core strength. Keep your movements controlled.",
    },
    {
      id: 12,
      title: "Dumbbell Shoulder Press",
      description:
        "Strengthens your shoulders and triceps. Keep your core engaged for stability.",
    },
    {
      id: 13,
      title: "Kettlebell Swings",
      description:
        "A dynamic movement that improves power and endurance. Focus on hip drive.",
    },
    {
      id: 14,
      title: "Mountain Climbers",
      description:
        "A great full-body workout that boosts cardiovascular endurance and core strength.",
    },
    {
      id: 15,
      title: "Seated Row",
      description:
        "A great back exercise that improves posture and strengthens pulling muscles.",
    },
    {
      id: 16,
      title: "Bicep Curls",
      description:
        "Targets your arms. Use proper form to avoid swinging the weights.",
    },
    {
      id: 17,
      title: "Triceps Dips",
      description:
        "A bodyweight movement that strengthens your triceps and shoulders.",
    },
    {
      id: 18,
      title: "Step-ups",
      description:
        "A great way to improve leg strength and coordination using a bench or step.",
    },
    {
      id: 19,
      title: "Treadmill Sprints",
      description:
        "Boost your cardiovascular fitness with high-intensity sprints.",
    },
    {
      id: 20,
      title: "Side Plank",
      description:
        "Strengthens your obliques and core while improving balance and stability.",
    },
    {
      id: 21,
      title: "Hip Thrusts",
      description:
        "One of the best exercises for glute activation and lower body strength.",
    },
    {
      id: 22,
      title: "Battle Ropes",
      description:
        "An intense conditioning workout that improves endurance and arm strength.",
    },
    {
      id: 23,
      title: "Box Jumps",
      description:
        "Improves explosiveness and leg power. Focus on landing softly.",
    },
    {
      id: 24,
      title: "Lat Pulldown",
      description:
        "Strengthens your upper back and helps improve pull-up performance.",
    },
    {
      id: 25,
      title: "Jump Squats",
      description:
        "A plyometric movement that builds leg strength and enhances speed.",
    },
    {
      id: 26,
      title: "Farmer’s Walk",
      description:
        "Builds grip strength and overall conditioning. Keep your core tight.",
    },
    {
      id: 27,
      title: "Calf Raises",
      description: "Strengthens your lower legs and improves ankle stability.",
    },
    {
      id: 28,
      title: "Bent-over Rows",
      description:
        "A compound movement for building a strong back and improving posture.",
    },
    {
      id: 29,
      title: "Turkish Get-up",
      description:
        "A complex movement that improves stability, coordination, and total-body strength.",
    },
    {
      id: 30,
      title: "Jumping Jacks",
      description:
        "A classic warm-up exercise to get your heart rate up and body moving.",
    },
  ];
  // Split workouts into two columns for masonry effect
  const column1 = workouts.filter((_, index) => index % 2 === 0);
  const column2 = workouts.filter((_, index) => index % 2 !== 0);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Explore</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
            paddingRight: 4,
          }}
        >
          <TouchableOpacity
            disabled={!isMasonryView}
            onPress={() => setIsMasonryView((prev) => !prev)}
          >
            <RowVerticalIcon
              width={24}
              height={24}
              color={isMasonryView ? "#69787b" : "#1f1f1f"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isMasonryView}
            onPress={() => setIsMasonryView((prev) => !prev)}
          >
            <RowHorizontalIcon
              width={24}
              height={24}
              color={isMasonryView ? "#1f1f1f" : "#69787b"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Scroll for Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              activeCategory === category && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Input */}
      <TextInput
        placeholder="Search: e.g. Push-ups, Squats, etc."
        placeholderTextColor="#999999"
        style={styles.searchInput}
      />

      {/* Conditional Rendering Based on View Mode */}
      {isMasonryView ? (
        // Masonry Layout
        <View style={styles.masonryContainer}>
          <View style={styles.masonryColumn}>
            {column1.map((workout) => (
              <TouchableOpacity
                onPress={() => router.push(`/modal/copy-workout/${workout.id}`)}
                key={workout.id}
                style={styles.workoutItem}
              >
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDescription}>
                  {workout.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.masonryColumn}>
            {column2.map((workout) => (
              <TouchableOpacity
                onPress={() => router.push(`/modal/copy-workout/${workout.id}`)}
                key={workout.id}
                style={styles.workoutItem}
              >
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDescription}>
                  {workout.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        // List View
        <View style={styles.listContainer}>
          {workouts.map((workout) => (
            <TouchableOpacity
              onPress={() => router.push(`/modal/copy-workout/${workout.id}`)}
              key={workout.id}
              style={styles.listItem}
            >
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutDescription}>
                {workout.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 130,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  activeCategory: {
    borderColor: "#333",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#69787b",
  },
  activeCategoryText: {
    color: "#1f1f1f",
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Masonry View Styles
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  masonryColumn: {
    width: "48%",
  },
  workoutItem: {
    backgroundColor: "#f4f6f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  workoutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  workoutDescription: {
    color: "#898989",
    fontSize: 12,
  },
  // List View Styles
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    backgroundColor: "#f4f6f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
});
