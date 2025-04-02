import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Platform,
  ActivityIndicator,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import AddIcon from "@/components/ui/icons/AddIcon";
import TickSquareIcon from "@/components/ui/icons/TickSquareIcon";
import TickSquareBoldIcon from "@/components/ui/icons/TickSquareBoldIcon";
import AddSquareLinearIcon from "@/components/ui/icons/AddSquareLinearIcon";
import { useCreateWorkout } from "@/hooks/useWorkouts";
import {
  useCreateCustomExercise,
  useExercises,
  useMyExercises,
} from "@/hooks/useExercise";
import { CreateWorkoutRequest } from "@/services/workoutsService";

// Define types outside of component for better performance
interface ExerciseListItem {
  id: number;
  name: string;
}

// Exercise item component - memoized to prevent unnecessary re-renders
const ExerciseItem = React.memo(
  ({
    item,
    isSelected,
    onToggle,
  }: {
    item: ExerciseListItem;
    isSelected: boolean;
    onToggle: (id: number) => void;
  }) => {
    const handlePress = useCallback(() => {
      onToggle(item.id);
    }, [item.id, onToggle]);

    return (
      <TouchableOpacity style={styles.card3} onPress={handlePress}>
        <View style={styles.cardContent}>
          {isSelected ? (
            <TickSquareBoldIcon width={24} height={24} />
          ) : (
            <TickSquareIcon width={24} height={24} />
          )}
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Search and exercise selection
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exerciseLists, setExerciseLists] = useState<ExerciseListItem[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const { createWorkout, isLoading: isCreateLoading } = useCreateWorkout();
  const { isLoading: isExercisesLoading, data: exercisesData } = useExercises();
  const { isLoading: isMyExercisesLoading, data: myExercisesData } =
    useMyExercises();
  const createCustomExercise = useCreateCustomExercise();

  // Handle workout name input
  const handleWorkoutNameChange = useCallback((text: string) => {
    setWorkoutName(text.replace(/\s{2,}/g, " "));
  }, []);

  // Handle continue to next stage
  const handleContinue = useCallback(() => {
    if (workoutName) {
      setStage(2);
    }
  }, [workoutName]);

  // Handle price input
  const handlePriceChange = useCallback((text: string) => {
    const parsed = parseFloat(text);
    if (!isNaN(parsed)) {
      setPrice(parsed);
    } else if (text === "") {
      setPrice(null);
    }
  }, []);

  // Toggle exercise selection - optimized with Set for faster lookup
  const toggleExerciseSelection = useCallback((id: number) => {
    setSelectedExercises((prev) => {
      // Using Set for faster lookups
      const selectedSet = new Set(prev);
      if (selectedSet.has(id)) {
        selectedSet.delete(id);
      } else {
        selectedSet.add(id);
      }
      return Array.from(selectedSet);
    });
  }, []);

  // Handle save workout
  const handleSaveWorkout = useCallback(async () => {
    if (selectedExercises.length === 0) {
      return;
    }

    const newWorkout: CreateWorkoutRequest = {
      title: workoutName,
      description: workoutDescription,
      is_private: isPrivate,
      price: isPaid ? Number(price) : 0,
      workoutExercises: selectedExercises,
    };

    await createWorkout(newWorkout);
    navigation.goBack();
  }, [
    workoutName,
    workoutDescription,
    isPrivate,
    isPaid,
    price,
    selectedExercises,
    createWorkout,
    navigation,
  ]);

  // Handle adding custom exercise
  const handleAddCustomExercise = useCallback(async () => {
    if (search.trim() === "") return;

    const searchLower = search.toLowerCase();
    const existingExercise = exerciseLists.find(
      (exercise) => exercise.name.toLowerCase() === searchLower
    );

    if (existingExercise) {
      return;
    }

    try {
      const newExercise = await createCustomExercise({ name: search });
      const newExerciseId = newExercise.payload.id;

      setExerciseLists((prev) => [
        { id: newExerciseId, name: search },
        ...prev,
      ]);

      setSelectedExercises((prev) => [newExerciseId, ...prev]);
    } catch (error) {
      // Handle error
    }
  }, [search, exerciseLists, createCustomExercise]);

  // Create memoized selected exercises set for faster lookups
  const selectedExercisesSet = useMemo(() => {
    return new Set(selectedExercises);
  }, [selectedExercises]);

  // Combine exercises from different sources and memoize
  useEffect(() => {
    const combinedExercises = [
      ...(myExercisesData?.payload || []),
      ...(exercisesData?.payload || []),
    ];

    // Use Map for faster duplicate removal
    const uniqueExercisesMap = new Map();

    combinedExercises.forEach((item) => {
      if (!uniqueExercisesMap.has(item.id)) {
        uniqueExercisesMap.set(item.id, item);
      }
    });

    setExerciseLists(Array.from(uniqueExercisesMap.values()));
  }, [exercisesData, myExercisesData]);

  // Memoize filtered exercises
  const filteredExercises = useMemo(() => {
    if (!search) return exerciseLists;

    const searchLower = search.toLowerCase();
    return exerciseLists.filter((item) =>
      item.name.toLowerCase().includes(searchLower)
    );
  }, [exerciseLists, search]);

  // Memoized render item function for FlatList
  const renderExerciseItem = useCallback(
    ({ item }: { item: ExerciseListItem }) => {
      return (
        <ExerciseItem
          item={item}
          isSelected={selectedExercisesSet.has(item.id)}
          onToggle={toggleExerciseSelection}
        />
      );
    },
    [selectedExercisesSet, toggleExerciseSelection]
  );

  const keyExtractor = useCallback(
    (item: ExerciseListItem) => item.id.toString(),
    []
  );

  // Loading state
  if (isExercisesLoading || isMyExercisesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={stage === 1 ? () => navigation.goBack() : () => setStage(1)}
        >
          {stage === 1 ? (
            <CloseSquareIcon width={36} height={36} />
          ) : (
            <ArrowSquareLeftIcon width={36} height={36} />
          )}
        </TouchableOpacity>

        <View>
          <Text style={styles.headerHeading}>Create Workout</Text>
          <Text style={styles.headerName}>Use correct names</Text>
        </View>
      </View>

      {stage === 1 ? (
        // Stage 1: Workout Name and Description
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, styles.marginBottom]}
            placeholder="Lower Body, Upper Body, etc."
            placeholderTextColor="#999999"
            value={workoutName}
            onChangeText={handleWorkoutNameChange}
            maxLength={30}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.marginBottom]}
            placeholder="Set a description for the workout or a plan"
            placeholderTextColor="#999999"
            value={workoutDescription}
            onChangeText={setWorkoutDescription}
            multiline={true}
          />

          <View style={styles.toggleContainer}>
            <Text style={styles.label}>Private</Text>
            <Switch value={isPrivate} onValueChange={setIsPrivate} />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.label}>Paid</Text>
            <Switch value={isPaid} onValueChange={setIsPaid} />
          </View>

          {isPaid && (
            <View>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={[styles.input, styles.marginBottom]}
                placeholder="0.00"
                placeholderTextColor="#999999"
                value={price !== null ? price.toString() : ""}
                onChangeText={handlePriceChange}
                keyboardType="numeric"
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Stage 2: Search and Exercise Selection
        <View style={styles.exerciseContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for exercises"
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
          />

          <Text style={styles.label}>Exercises</Text>

          <View style={styles.sectionCard}>
            {search.length > 0 && (
              <TouchableOpacity
                style={styles.card3}
                onPress={handleAddCustomExercise}
              >
                <View style={styles.cardContent}>
                  <AddSquareLinearIcon width={24} height={24} />
                  <Text style={styles.cardTitle}>{search}</Text>
                </View>
              </TouchableOpacity>
            )}

            <FlatList
              data={filteredExercises}
              renderItem={renderExerciseItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.flatListContent}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              removeClippedSubviews={true}
              getItemLayout={(data, index) => ({
                length: 40,
                offset: 40 * index,
                index,
              })}
            />
          </View>
        </View>
      )}

      {/* Bottom Button */}
      {stage === 2 && (
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleSaveWorkout}
          disabled={isCreateLoading}
        >
          {isCreateLoading ? (
            <ActivityIndicator
              size={26}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
          ) : (
            <AddIcon width={24} height={24} color="#FFFFFF" />
          )}
          <Text style={styles.bottomButtonText}>CREATE NEW WORKOUT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  exerciseContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  marginBottom: {
    marginBottom: 18,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    backgroundColor: "#efefef",
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 8 : 2,
    borderRadius: 10,
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
    flex: 1,
  },
  card3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9f9",
    borderRadius: 10,
    marginBottom: 3,
    paddingVertical: 8,
    paddingHorizontal: 6,
    height: 40,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtonText: {
    color: "#fff",
    marginLeft: 10,
  },
  buttonIcon: {
    marginLeft: 10,
  },
});
