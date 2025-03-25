import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import TrashLinearIcon from "@/components/ui/icons/TrashLinearIcon";
import { useExerciseSets } from "@/hooks/useExerciseSets";
import { useDeleteWorkoutExercise } from "@/hooks/useWorkoutExercise";
import GlobalSearchLinearIcon from "@/components/ui/icons/GlobalSearchLinearIcon";
import EditLinearIcon from "@/components/ui/icons/EditLinearIcon";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Exercise } from "@/services/workoutsService";
import { useExerciseSetStore } from "@/store/exerciseSetStore";
import ActivityLinearIcon from "@/components/ui/icons/ActivityLinearIcon";
import FlashCircleLinearIcon from "@/components/ui/icons/FlashCircleLinearIcon";

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  const {
    reps: storeReps,
    weight: storeWeight,
    setReps,
    setWeight,
  } = useExerciseSetStore();

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const closeDropdown = () => setIsDropdownVisible(false);

  const { isLoading, data } = useExerciseSets(Number(id));
  const { deleteWorkoutExercise, isLoading: isDeleteLoading } =
    useDeleteWorkoutExercise();
  const { data: workoutData, isLoading: isWorkoutLoading } = useWorkouts();

  useEffect(() => {
    if (workoutData && !isWorkoutLoading) {
      workoutData.payload.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          if (exercise.id === Number(id)) {
            setCurrentExercise(exercise.exercise);
          }
        });
      });
    }

    if (data?.payload.length > 0) {
      setReps(data.payload[data.payload.length - 1].reps);
      setWeight(data.payload[data.payload.length - 1].weight);
    } else {
      setReps(0);
      setWeight(0);
    }
  }, [workoutData, isWorkoutLoading, data, storeReps, storeWeight]);

  const groupedByDate = useMemo(() => {
    if (!data?.payload) return {};
    return data.payload.reduce((acc, exercise) => {
      const date = exercise.created_at.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(exercise);
      return acc;
    }, {});
  }, [data]);

  const sortedGroupedByDate = useMemo(() => {
    return Object.keys(groupedByDate)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, date) => {
        acc[date] = groupedByDate[date];
        return acc;
      }, {});
  }, [groupedByDate]);

  const handleDelete = async () => {
    await deleteWorkoutExercise(Number(id));
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const getTimeFromISO = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getFormattedDate = (isoString: string): string => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={30} height={30} />
        </TouchableOpacity>
        <Text style={styles.headerHeading}>Records</Text>
        <TouchableOpacity onPress={toggleDropdown}>
          {isDropdownVisible ? (
            <CloseSquareIcon width={30} height={30} />
          ) : (
            <SettingLinearIcon width={30} height={30} />
          )}
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.overlay}>
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <View style={[styles.dropdown]}>
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    setIsDropdownVisible(false);
                    router.push(`/modal/edit-workout-exercise/${id}`);
                  }}
                >
                  <View style={styles.cardIcon2}>
                    <EditLinearIcon width={22} height={22} color="#fff" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Edit</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    { borderBottomWidth: 1, borderBottomColor: "#000" },
                  ]}
                  onPress={() => {
                    setIsDropdownVisible(false);
                    router.push(
                      `/modal/get-exercise-info/${currentExercise?.name}`
                    );
                  }}
                >
                  <View style={styles.cardIcon2}>
                    <GlobalSearchLinearIcon
                      width={22}
                      height={22}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Info</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    setIsDropdownVisible(false);
                    handleDelete();
                  }}
                >
                  <View style={styles.cardIcon2}>
                    {isDeleteLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <TrashLinearIcon color="#fff" width={23} height={23} />
                    )}
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.analyticsButton}
          onPress={() => router.push(`/home/analytics/${id}`)}
        >
          <View style={styles.iconContainer}>
            <ActivityLinearIcon width={22} height={22} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.analyticsText}>Graphs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oneRMButton}>
          <View style={styles.iconContainer}>
            <FlashCircleLinearIcon width={22} height={22} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.oneRMText}>1RM</Text>
          </View>
        </TouchableOpacity>
      </View>

      {Object.keys(sortedGroupedByDate).length < 1 ? (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>You have no records yet</Text>
        </View>
      ) : (
        Object.entries(sortedGroupedByDate).map(([date, exercises]) => (
          <View key={date} style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>{getFormattedDate(date)}</Text>
            <View style={styles.exerciseContainer}>
              {[...exercises].reverse().map((exercise, i) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={[
                    styles.card3,
                    i === exercises.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Text>{getTimeFromISO(exercise.created_at)}</Text>
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.reps}>{exercise.reps} reps</Text>
                    <Text style={styles.weight}>{exercise.weight} kg</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContainer: { paddingBottom: 130 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 10,
  },
  headerHeading: { fontWeight: "700", fontSize: 16 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 70,
    width: "50%",
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#1f1f1f",
  },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 14, color: "#fff" },
  sectionCard: { marginBottom: 20 },
  sectionHeader: {
    fontSize: 12,
    marginBottom: 4,
    color: "#b7b8bc",
    textTransform: "uppercase",
  },
  exerciseContainer: {
    backgroundColor: "#f8f9f9",
    borderRadius: 10,
    paddingVertical: 4,
  },
  card3: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e7eded",
    alignItems: "center",
  },
  exerciseDetails: { flexDirection: "row", gap: 30, alignItems: "center" },
  reps: {
    color: "#525e75",
    fontWeight: "500",
    minWidth: 50,
    textAlign: "left",
  },
  weight: {
    color: "#d74a49",
    fontWeight: "500",
    minWidth: 50,
    textAlign: "left",
  },
  analyticsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f8f9f9",
    borderBottomColor: "#e7eded",
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  oneRMButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f8f9f9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconContainer: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#efefef",
    borderRadius: 8,
  },
  analyticsText: {
    fontSize: 16,
    color: "#1f1f1f",
  },
  oneRMText: {
    fontSize: 16,
    color: "#1f1f1f",
  },
  noRecordsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7eded",
    borderStyle: "dashed",
    padding: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  noRecordsText: { textAlign: "center" },
});
