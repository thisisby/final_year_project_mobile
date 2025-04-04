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
import { useCreateExerciseSet } from "@/hooks/useExerciseSets";
import { useExerciseSetStore } from "@/store/exerciseSetStore";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [newExercise, setNewExercise] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Search and exercise selection
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  const { reps: storeReps, weight: storeWeight } = useExerciseSetStore();

  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setReps(storeReps);
    setWeight(storeWeight);
  }, [storeReps, storeWeight]);

  const handleContinue = () => {
    if (workoutName) {
      setStage(2); // Move to the next stage
    }
  };

  const { createExerciseSet, isLoading } = useCreateExerciseSet();

  const handleSave = async () => {
    await createExerciseSet({
      reps,
      weight,
      workout_exercise_id: Number(id),
    });

    navigation.goBack();
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
            <CloseSquareIcon width={34} height={34} />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerHeading}>new record</Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Reps
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <TouchableOpacity
              onPress={() => setReps((reps) => Number(reps) - 1)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setReps((reps) => Number(reps) - 5)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>-5</Text>
            </TouchableOpacity>
            <TextInput
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
                flex: 1,
                textAlign: "center",
              }}
              placeholderTextColor="#999999"
              value={String(reps)}
              onChangeText={(text) => setReps(Number(text))}
              keyboardType="numeric"
              maxLength={3}
            />
            <TouchableOpacity
              onPress={() => setReps((reps) => Number(reps) + 1)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setReps((reps) => Number(reps) + 5)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>+5</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Weight
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <TouchableOpacity
              onPress={() => setWeight((weight) => Number(weight) - 1)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWeight((weight) => Number(weight) - 5)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>-5</Text>
            </TouchableOpacity>
            <TextInput
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
                flex: 1,
                textAlign: "center",
              }}
              placeholder="Enter value"
              placeholderTextColor="#999999"
              value={String(weight)}
              onChangeText={(text) => setWeight(Number(text))}
              maxLength={3}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => setWeight((weight) => Number(weight) + 1)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWeight((weight) => Number(weight) + 5)}
              style={{
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
              }}
            >
              <Text>+5</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleSave}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.continueText}>Save</Text>
            )}
          </TouchableOpacity>
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
    fontWeight: 900,
    fontSize: 18,
    textTransform: "uppercase",
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
