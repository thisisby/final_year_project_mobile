import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import LineArrowRightLinearIcon from "@/components/ui/icons/LineArrowRightLinearIcon";
import { useCreateWorkout, useGenerateAIWorkout } from "@/hooks/useWorkouts";
import { GenerateAIWorkoutRequest } from "@/services/workoutsService";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const levels = [
  { id: 1, name: "Beginner" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Advanced" },
  { id: 4, name: "Expert" },
];

const goals = [
  { id: 1, name: "Lose weight" },
  { id: 2, name: "Gain muscle" },
  { id: 3, name: "Improve endurance" },
  { id: 4, name: "Increase flexibility" },
  { id: 5, name: "Improve strength" },
];

const bodyAreas = [
  { id: 1, name: "Full Body" },
  { id: 2, name: "Upper Body" },
  { id: 3, name: "Lower Body" },
  { id: 4, name: "Chest" },
  { id: 5, name: "Back" },
  { id: 6, name: "Shoulders" },
  { id: 7, name: "Legs" },
  { id: 8, name: "Arms" },
  { id: 9, name: "Biceps" },
  { id: 10, name: "Triceps" },
  { id: 11, name: "Abs" },
  { id: 12, name: "Core" },
  { id: 13, name: "Glutes" },
  { id: 14, name: "Calves" },
  { id: 15, name: "Forearms" },
];

const genders = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
];

const ages = [
  { id: 1, name: "18-24" },
  { id: 2, name: "25-34" },
  { id: 3, name: "35-44" },
  { id: 4, name: "45-54" },
  { id: 5, name: "55-64" },
];

/**
 * This is a React Native component that provides a modal for creating a new AI workout plan.
 * It allows users to select their fitness level, goal, and target body areas.
 * The component uses Expo Router for navigation and manages state using React's useState hook.
 */

export default function Page() {
  const navigation = useNavigation();
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [bodyArea, setBodyArea] = useState([""]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");

  const { generateAIWorkout, isLoading } = useGenerateAIWorkout();

  const handleCreateAIWorkout = async () => {
    if (
      level === "" ||
      goal === "" ||
      bodyArea.length === 0 ||
      gender === "" ||
      age === ""
    ) {
      alert("Please choose all options");
      return;
    }

    const newRequest: GenerateAIWorkoutRequest = {
      level,
      goal,
      body_areas: bodyArea,
      gender,
      age,
      details: description,
    };

    await generateAIWorkout(newRequest);
    Alert.alert(
      "Generating Workout Plan",
      "Workout plan will be generated soon! It will be available in the 'Workouts' section when ready.",
      [
        {
          text: "OK",
          onPress: async () => {
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={120}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            height: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseSquareIcon width={34} height={34} />
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: 900,
              fontSize: 18,
              textTransform: "uppercase",
            }}
          >
            Create with AI
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Choose your level
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {levels.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  },
                  l.name === level
                    ? { backgroundColor: "#000", borderColor: "#000" }
                    : { borderColor: "#eee" },
                ]}
                onPress={() => setLevel(l.name)}
              >
                <Text
                  style={[
                    { fontSize: 14 },
                    l.name === level ? { color: "#fff" } : { color: "#333" },
                  ]}
                >
                  {l.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Choose your goal
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {goals.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  },
                  l.name === goal
                    ? { backgroundColor: "#000", borderColor: "#000" }
                    : { borderColor: "#eee" },
                ]}
                onPress={() => setGoal(l.name)}
              >
                <Text
                  style={[
                    { fontSize: 14 },
                    l.name === goal ? { color: "#fff" } : { color: "#333" },
                  ]}
                >
                  {l.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Choose body areas
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {bodyAreas.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  },
                  bodyArea.includes(l.name)
                    ? { backgroundColor: "#000", borderColor: "#000" }
                    : { borderColor: "#eee" },
                ]}
                onPress={() =>
                  setBodyArea((prev) => {
                    if (prev.includes(l.name)) {
                      return prev.filter((item) => item !== l.name);
                    } else {
                      return [...prev, l.name];
                    }
                  })
                }
              >
                <Text
                  style={[
                    { fontSize: 14 },
                    bodyArea.includes(l.name)
                      ? { color: "#fff" }
                      : { color: "#333" },
                  ]}
                >
                  {l.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Choose your gender
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {genders.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  },
                  l.name === gender
                    ? { backgroundColor: "#000", borderColor: "#000" }
                    : { borderColor: "#eee" },
                ]}
                onPress={() => setGender(l.name)}
              >
                <Text
                  style={[
                    { fontSize: 14 },
                    l.name === gender ? { color: "#fff" } : { color: "#333" },
                  ]}
                >
                  {l.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Choose your age
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {ages.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  },
                  l.name === age
                    ? { backgroundColor: "#000", borderColor: "#000" }
                    : { borderColor: "#eee" },
                ]}
                onPress={() => setAge(l.name)}
              >
                <Text
                  style={[
                    { fontSize: 14 },
                    l.name === age ? { color: "#fff" } : { color: "#333" },
                  ]}
                >
                  {l.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Extra Details
          </Text>
          <View>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#F6F6F6",
                padding: 14,
                borderRadius: 8,
                marginBottom: 12,
              }}
              placeholder="Add any unique needs, preferences, or circumstances we haven't covered yet. E.g. training limitations, workout environment, etc."
              placeholderTextColor="#999999"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "#000",
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
          onPress={handleCreateAIWorkout}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {isLoading ? "Creating..." : "Generate plan"}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
});
