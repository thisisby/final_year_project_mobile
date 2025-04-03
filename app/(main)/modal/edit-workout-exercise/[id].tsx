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
  useGetWorkoutExerciseByID,
  usePatchWorkoutExercise,
} from "@/hooks/useWorkoutExercise";
import { useGetWorkoutByID, useWorkouts } from "@/hooks/useWorkouts";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [secondary_note, setSecondaryNote] = useState("");

  // const { isLoading, data } = useWorkouts();
  const { id } = useLocalSearchParams();

  const { patchWorkoutExercise, isLoading: isPatchLoading } =
    usePatchWorkoutExercise();

  const { data, isLoading } = useGetWorkoutExerciseByID(Number(id));

  const handleSave = async () => {
    await patchWorkoutExercise({
      id: Number(id),
      patchWorkoutExercise: {
        main_note: exerciseDescription,
        secondary_note: secondary_note,
      },
    });

    navigation.goBack();
  };

  useEffect(() => {
    if (!isLoading && data) {
      setExerciseDescription(data?.payload?.main_note);
      setSecondaryNote(data?.payload?.secondary_note);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }} // Center the loader
        size="large"
        color="#1f1f1f"
      />
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseSquareIcon width={34} height={34} />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerHeading}>Edit Exercise</Text>
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
            Note
          </Text>
          <TextInput
            style={[styles.input, { marginBottom: 18 }]}
            placeholder="3 sets of 10 reps with 10kg weight"
            placeholderTextColor="#999999"
            value={exerciseDescription}
            onChangeText={setExerciseDescription}
            multiline={true}
          />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Link
          </Text>
          <TextInput
            style={[styles.input, { marginBottom: 18 }]}
            placeholder="https://www.youtube.com/watch?v=example"
            placeholderTextColor="#999999"
            value={secondary_note}
            onChangeText={setSecondaryNote}
          />

          <TouchableOpacity style={styles.continueButton} onPress={handleSave}>
            {isPatchLoading ? (
              <ActivityIndicator size="small" color="#fff " />
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
