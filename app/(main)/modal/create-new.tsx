import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import { router } from "expo-router";
import TickSquareIcon from "@/components/ui/icons/TickSquareIcon";
import TickSquareBoldIcon from "@/components/ui/icons/TickSquareBoldIcon";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import AddIcon from "@/components/ui/icons/AddIcon";
import AddSquareLinearIcon from "@/components/ui/icons/AddSquareLinearIcon";
import { useCreateWorkout, useWorkouts } from "@/hooks/useWorkouts";
import {
  useCreateCustomExercise,
  useExercises,
  useMyExercises,
} from "@/hooks/useExercise";
import { CreateCustomExercise } from "@/services/exercisesService";
import { CreateWorkoutRequest } from "@/services/workoutsService";

const windowHeight = Dimensions.get("window").height;

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [newExercise, setNewExercise] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Search and exercise selection
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exerciseLists, setExerciseLists] = useState<ExerciseListItem[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(null);

  const { createWorkout, isLoading: isCreateLoading } = useCreateWorkout();

  interface ExerciseListItem {
    id: number;
    name: string;
  }

  const handleContinue = () => {
    if (workoutName) {
      setStage(2); // Move to the next stage
    }
  };

  const handleSaveWorkout = async () => {
    const newWorkout: CreateWorkoutRequest = {
      title: workoutName,
      description: workoutDescription,
      is_private: isPrivate,
      price: isPaid ? Number(price) : 0,
      workoutExercises: selectedExercises,
    };

    if (selectedExercises.length === 0) {
      return;
    }

    await createWorkout(newWorkout);

    navigation.goBack();
  };
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
      setSelectedExercises([newExercise.payload.id, ...selectedExercises]);
    } catch (error) {
      console.error("Failed to create exercise:", error);
    }
  };

  const [keyboardStatus, setKeyboardStatus] = useState(false);

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
  }, [exercisesData, myExercisesData]);

  const filteredExercises = exerciseLists.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isExercisesLoading || isMyExercisesLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
                onChangeText={(text) =>
                  setWorkoutName(text.replace(/\s{2,}/g, " "))
                }
                maxLength={30}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                  backgroundColor: "#efefef",
                  paddingHorizontal: 8,
                  paddingVertical: Platform.OS === "ios" ? 8 : 2,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    marginBottom: 4,
                  }}
                >
                  Private
                </Text>
                <Switch value={isPrivate} onValueChange={setIsPrivate} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  backgroundColor: "#efefef",
                  paddingHorizontal: 8,
                  paddingVertical: Platform.OS === "ios" ? 8 : 2,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    marginBottom: 4,
                  }}
                >
                  Paid
                </Text>
                <Switch value={isPaid} onValueChange={setIsPaid} />
              </View>
              {isPaid && (
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      marginBottom: 4,
                    }}
                  >
                    Price
                  </Text>
                  <TextInput
                    style={[styles.input, { marginBottom: 18 }]}
                    placeholder="0.00"
                    placeholderTextColor="#999999"
                    value={price !== null ? price.toString() : ""} // Display as string
                    onChangeText={(text) => {
                      const parsed = parseFloat(text);
                      if (!isNaN(parsed)) {
                        setPrice(parsed);
                      } else if (text === "") {
                        setPrice(null);
                      }
                    }}
                    keyboardType="numeric"
                  />
                </View>
              )}
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
              onFocus={() => setKeyboardStatus(true)}
              onBlur={() => setKeyboardStatus(false)}
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
                {filteredExercises.reverse().map((item) => (
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
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      {stage === 2 && (
        <TouchableOpacity
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: "#000",
              padding: 14,
              borderRadius: 20,
              paddingVertical: 16,
              paddingHorizontal: 20,
            },
          ]}
          onPress={handleSaveWorkout}
        >
          {isCreateLoading ? (
            <ActivityIndicator
              size={26}
              color="#FFFFFF"
              style={{ marginLeft: 10 }}
            />
          ) : (
            <AddIcon width={26} height={26} color={"#FFFFFF"} />
          )}

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
