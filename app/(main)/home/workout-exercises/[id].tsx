import React, { useState, useEffect } from "react";
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

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const closeDropdown = () => setIsDropdownVisible(false);

  const { isLoading, data } = useExerciseSets(Number(id));

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  function getTimeFromISO(isoString: string): string {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  function getFormattedDate(isoString: string): string {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  }
  const groupedByDate = data.payload.reduce((acc, exercise) => {
    const date = exercise.created_at.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(exercise);
    return acc;
  }, {});

  const renderDropdownItem = (title, icon, onPress) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
      <View style={styles.cardIcon2}>{icon}</View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

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
            <View style={styles.dropdown}>
              {renderDropdownItem(
                "Edit",
                <Ionicons name="reader-outline" size={22} color="#fff" />,
                () => router.push(`/modal/edit-workout-exercise/${id}`)
              )}
              {renderDropdownItem(
                "Delete",
                <Ionicons name="reader-outline" size={22} color="#fff" />,
                () => router.push(`/modal/edit-workout/${id}`)
              )}
              {renderDropdownItem(
                "Info",
                <TrashLinearIcon color="#fff" width={24} height={24} />,
                () => {}
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {Object.entries(groupedByDate).map(([date, exercises]) => (
        <View key={date} style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>{getFormattedDate(date)}</Text>
          <View style={styles.exerciseContainer}>
            {exercises.map((exercise, i) => (
              <TouchableOpacity
                key={exercise.id}
                style={[
                  styles.card3,
                  i === exercises.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => router.push(`/home/workouts/${exercise.id}`)}
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
      ))}
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
    padding: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 16, color: "#fff" },
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
  },
  exerciseDetails: { flexDirection: "row", gap: 30 },
  reps: { color: "#525e75", fontWeight: "500" },
  weight: { color: "#d74a49", fontWeight: "500" },
});
