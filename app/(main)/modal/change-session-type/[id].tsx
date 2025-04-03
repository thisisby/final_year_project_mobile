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
import { router, useLocalSearchParams } from "expo-router";
import TickSquareIcon from "@/components/ui/icons/TickSquareIcon";
import TickSquareBoldIcon from "@/components/ui/icons/TickSquareBoldIcon";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import AddIcon from "@/components/ui/icons/AddIcon";
import AddSquareLinearIcon from "@/components/ui/icons/AddSquareLinearIcon";
import RecordCircleBoldIcon from "@/components/ui/icons/RecordCircleBoldIcon";
import RecordCircleLinearIcon from "@/components/ui/icons/RecordCircleLinearIcon";
import { useActivities } from "@/hooks/useActivities";
import { useGetSessionByID, useUpdateSession } from "@/hooks/useSessions";

interface ExerciseListItem {
  id: string;
  title: string;
  count: number;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { data: activities } = useActivities();
  const { session, isLoading: isLoadingSession } = useGetSessionByID(
    Number(id)
  );
  const { updateSession, isLoading: isLoadingUpdateSession } = useUpdateSession(
    Number(id)
  );

  const handleUpdateSession = async (activityId: number) => {
    await updateSession({
      id: Number(id),
      patchSession: { activity_id: activityId },
    });
  };

  const handleAddCustomExercise = () => {};
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
            <Text style={styles.headerHeading}>Session Types</Text>
          </View>
        </View>

        <View>
          <View style={styles.sectionCard}>
            {activities?.payload.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card3}
                onPress={() => {
                  handleUpdateSession(item.id);
                }}
              >
                <View style={styles.cardContent}>
                  {session?.payload.activity_id === item.id ? (
                    <RecordCircleBoldIcon width={26} height={26} />
                  ) : (
                    <RecordCircleLinearIcon width={26} height={26} />
                  )}
                  <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
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
