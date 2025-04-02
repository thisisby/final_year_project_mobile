import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import { router, useLocalSearchParams } from "expo-router";
import TickSquareIcon from "@/components/ui/icons/TickSquareIcon";
import TickSquareBoldIcon from "@/components/ui/icons/TickSquareBoldIcon";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import AddIcon from "@/components/ui/icons/AddIcon";
import AddSquareLinearIcon from "@/components/ui/icons/AddSquareLinearIcon";
import {
  useCreateCustomExercise,
  useExercises,
  useMyExercises,
} from "@/hooks/useExercise";
import { useWorkouts } from "@/hooks/useWorkouts";
import {
  useAddWorkoutExercise,
  useDeleteWorkoutExercise,
} from "@/hooks/useWorkoutExercise";

interface ExerciseListItem {
  id: string;
  title: string;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const { isLoading, data } = useWorkouts();
  const { id } = useLocalSearchParams();
  const [exerciseLists, setExerciseLists] = useState<ExerciseListItem[]>([]);

  const { addWorkoutExercise, isLoading: isAddWorkoutExerciseLoading } =
    useAddWorkoutExercise();
  const { deleteWorkoutExercise, isLoading: isDeleteWorkoutExerciseLoading } =
    useDeleteWorkoutExercise();
  const createCustomExercise = useCreateCustomExercise();
  const handleAddCustomExercise = async () => {
    if (search.trim() === "") return;

    const existingExercise = exerciseLists.find(
      (exercise) => exercise.name.toLowerCase() === search.toLowerCase()
    );

    if (existingExercise) {
      return;
    }

    try {
      const newExercise = await createCustomExercise({ name: search });
      const updatedExerciseLists = [
        { id: newExercise.payload.id, name: search },
        ...exerciseLists,
      ];
      setExerciseLists(updatedExerciseLists);
      await handleAddWorkoutExercise(newExercise.payload.id);
      setSelectedExercises([newExercise.payload.id, ...selectedExercises]);
    } catch (error) {}
  };

  const { isLoading: isExercisesLoading, data: exercisesData } = useExercises();
  const { isLoading: isMyExercisesLoading, data: myExercisesData } =
    useMyExercises();

  useEffect(() => {
    const combinedExercises = [
      ...(myExercisesData?.payload || []),
      ...(exercisesData?.payload || []),
      ...exerciseLists,
    ];

    const uniqueExercises = Array.from(
      new Map(combinedExercises.map((item) => [item.id, item])).values()
    );

    setExerciseLists(uniqueExercises);

    if (!isLoading && data) {
      const workout = data.payload.find((item) => item.id === Number(id));

      workout.exercises.forEach((ex) => {
        setSelectedExercises((prevSelectedExercises) => [
          ex.exercise.id,
          ...prevSelectedExercises,
        ]);
      });
    }
  }, [exercisesData, myExercisesData, isLoading, data]);

  const filteredExercises = exerciseLists.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddWorkoutExercise = async (exercise_id: number) => {
    await addWorkoutExercise({
      exercise_id: exercise_id,
      workout_id: Number(id),
    });
  };

  const handleDeleteWorkoutExercise = async (exercise_id: number) => {
    const workout = data.payload.find((item) => item.id === Number(id));
    const workoutExercise = workout.exercises.find(
      (ex) => ex.exercise_id === exercise_id
    );

    await deleteWorkoutExercise(workoutExercise.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100, // Add padding to avoid overlap with the bottom button
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseSquareIcon width={36} height={36} />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerHeading}>Session Types</Text>
          </View>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Search for exercises"
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
            onFocus={() => setKeyboardStatus(true)}
            onBlur={() => setKeyboardStatus(false)}
          />

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
                    handleDeleteWorkoutExercise(Number(item.id));
                  } else {
                    setSelectedExercises([...selectedExercises, item.id]);
                    handleAddWorkoutExercise(Number(item.id));
                  }
                }}
              >
                <View style={styles.cardContent}>
                  {selectedExercises.includes(item.id) ? (
                    <TickSquareBoldIcon width={26} height={26} />
                  ) : (
                    <TickSquareIcon width={26} height={26} />
                  )}
                  <Text style={styles.cardTitle}>{item.name}</Text>
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
      </ScrollView>
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
    paddingVertical: 10,
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
