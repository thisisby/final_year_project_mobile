import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import { router } from "expo-router";
import TickSquareIcon from "@/components/ui/icons/TickSquareIcon";
import TickSquareBoldIcon from "@/components/ui/icons/TickSquareBoldIcon";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import AddIcon from "@/components/ui/icons/AddIcon";
import AddSquareLinearIcon from "@/components/ui/icons/AddSquareLinearIcon";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [newExercise, setNewExercise] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Search and exercise selection
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exerciseLists, setExerciseLists] = useState<ExerciseListItem[]>([
    { id: "1", title: "My Exercises", count: 29 },
    { id: "2", title: "Wednesday: Full-Body Workout", count: 7 },
    { id: "3", title: "Squat", count: 3 },
    { id: "4", title: "Arnold’s Golden Six", count: 6 },
    { id: "5", title: "Friday: Full-Body Workout", count: 7 },
    { id: "6", title: "Bench Press", count: 7 },
    { id: "7", title: "Monday: Full-Body Workout", count: 7 },
    { id: "8", title: "Monday: Full-Body Workout", count: 7 },
    { id: "10", title: "Monday: Full-Body Workout", count: 7 },
    { id: "91", title: "Monday: Full-Body Workout", count: 7 },
    { id: "92", title: "Monday: Full-Body Workout", count: 7 },
    { id: "93", title: "Monday: Full-Body Workout", count: 7 },
    { id: "49", title: "Monday: Full-Body Workout", count: 7 },
    { id: "95", title: "Monday: Full-Body Workout", count: 7 },
    { id: "96", title: "Monday: Full-Body Workout", count: 7 },
    { id: "933", title: "Monday: Full-Body Workout", count: 7 },
    { id: "921", title: "Monday: Full-Body Workout", count: 7 },
    { id: "911", title: "Monday: Full-Body Workout", count: 7 },
  ]);

  interface ExerciseListItem {
    id: string;
    title: string;
    count: number;
  }

  const filteredExercises = exerciseLists.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (workoutName) {
      setStage(2); // Move to the next stage
    }
  };

  const handleSaveWorkout = () => {
    // Handle saving the workout with selected exercises
    console.log("Workout Name:", workoutName);
    console.log("Workout Description:", workoutDescription);
    console.log("Selected Exercises:", selectedExercises);
  };

  const handleAddCustomExercise = () => {
    if (search.trim() === "") return; // Don't add empty exercises

    // Generate a unique ID for the new exercise
    const newExerciseId = String(Math.random().toString(36).substr(2, 9));

    const count = exerciseLists.filter(
      (item) => item.title.toLowerCase() === search.toLowerCase()
    ).length;
    if (count > 0) {
      return;
    }

    // Create the new exercise object
    const newExerciseItem: ExerciseListItem = {
      id: newExerciseId,
      title: search,
      count: 0, // You can set this to 0 or any default value
    };

    // Add the new exercise to the list
    setExerciseLists([newExerciseItem, ...exerciseLists]);

    // Add the new exercise to the selected exercises
    setSelectedExercises([...selectedExercises, newExerciseId]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100, // Add padding to avoid overlap with the bottom button
        }}
      >
        <View style={styles.header}>
          {stage === 1 ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CloseSquareIcon width={36} height={36} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setStage(1)}>
              <ArrowSquareLeftIcon width={36} height={36} />
            </TouchableOpacity>
          )}

          <View>
            <Text style={styles.headerHeading}>Create Workout</Text>
            <Text style={styles.headerName}>Use correct names</Text>
          </View>
        </View>

        {stage === 1 ? (
          // Stage 1: Workout Name and Description
          <View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Name
              </Text>
              <TextInput
                style={[styles.input, { marginBottom: 18 }]}
                placeholder="Lower Body, Upper Body, etc."
                placeholderTextColor="#999999"
                value={workoutName}
                onChangeText={setWorkoutName}
              />

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Description
              </Text>
              <TextInput
                style={[styles.input, { marginBottom: 18 }]}
                placeholder="Set a description for the workout or a plan"
                placeholderTextColor="#999999"
                value={workoutDescription}
                onChangeText={setWorkoutDescription}
                multiline={true}
              />
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Stage 2: Search and Exercise Selection
          <View>
            <TextInput
              style={styles.input}
              placeholder="Search for exercises"
              placeholderTextColor="#999999"
              value={search}
              onChangeText={setSearch}
            />

            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Exercises
              </Text>

              <View style={styles.sectionCard}>
                {filteredExercises.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card3}
                    onPress={() => {
                      if (selectedExercises.includes(item.id)) {
                        setSelectedExercises(
                          selectedExercises.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedExercises([...selectedExercises, item.id]);
                      }
                    }}
                  >
                    <View style={styles.cardContent}>
                      {selectedExercises.includes(item.id) ? (
                        <TickSquareBoldIcon width={24} height={24} />
                      ) : (
                        <TickSquareIcon width={24} height={24} />
                      )}
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                {search.length > 0 && (
                  <TouchableOpacity
                    style={[styles.card3]}
                    onPress={handleAddCustomExercise}
                  >
                    <View style={styles.cardContent}>
                      <AddSquareLinearIcon width={24} height={24} />
                      <Text style={styles.cardTitle}>{search}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      {stage === 2 && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 30,
            left: 20,
            right: 20,
            backgroundColor: "#000",
            padding: 14,
            borderRadius: 20,
            paddingVertical: 16,
            paddingHorizontal: 20,
          }}
          onPress={handleSaveWorkout}
        >
          <AddIcon width={26} height={26} color={"#FFFFFF"} />
          <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
            CRETAE NEW WORKOUT
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative", // Ensure the container is relative for absolute positioning
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  headerHeading: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "right",
  },
  headerName: {
    color: "#898989",
    textAlign: "right",
    fontSize: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: "#1f1f1f",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    height: 47,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionCard: {
    borderRadius: 12,
  },
  card3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9f9",
    borderRadius: 10,
    marginBottom: 3,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: { fontSize: 14, fontWeight: "bold" },
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#1f1f1f",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
