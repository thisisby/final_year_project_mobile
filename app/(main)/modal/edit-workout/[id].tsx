import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
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

  const handleContinue = () => {
    if (workoutName) {
      setStage(2); // Move to the next stage
    }
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
            <Text style={styles.headerHeading}>Edit Workout</Text>
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
            Name
          </Text>
          <TextInput
            style={[styles.input, { marginBottom: 18 }]}
            placeholder="Lower Body, Upper Body, etc."
            placeholderTextColor="#999999"
            value={workoutName}
            onChangeText={setWorkoutName}
            multiline={true}
          />

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Save</Text>
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
