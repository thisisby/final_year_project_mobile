import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import NoteLinearIcon from "@/components/ui/icons/NoteLinearIcon";
import { useGetUserByID } from "@/hooks/useUsers";
import {
  useCopyWorkout,
  useFindAllWorkoutsByUserID,
  useGetWorkoutByID,
} from "@/hooks/useWorkouts";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Switch,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const { data, isLoading } = useGetUserByID(Number(id));
  const { data: workoutData, isLoading: workoutLoading } =
    useFindAllWorkoutsByUserID(Number(id));

  if (isLoading || workoutLoading) {
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
          paddingBottom: 100,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowSquareLeftIcon width={34} height={34} />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerHeading}>User Profile</Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            {data?.payload?.username}
          </Text>
          <Text
            style={{
              color: "#666",
              fontWeight: 300,
            }}
          >
            {data?.payload?.bio || "No bio available yet."}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Workouts
          </Text>

          <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
            {workoutData?.payload?.length === 0 && (
              <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#efefef",
                  borderRadius: 6,
                  borderStyle: "dashed",
                  width: "100%",
                }}
              >
                <Text style={{ color: "#666" }}>
                  No public workouts available yet.
                </Text>
              </View>
            )}
            {workoutData?.payload?.map((workout) => {
              return (
                <View
                  key={workout?.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: "#efefef",
                    width: "48%",
                    height: "auto",
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-start",
                      padding: 10,
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: "flex-start",
                        display: "flex",
                      }}
                    >
                      <View
                        style={{
                          padding: 4,
                          borderRadius: 6,
                          backgroundColor: "#f1f1f1",
                          marginBottom: 14,
                        }}
                      >
                        <NoteLinearIcon width={30} height={30} />
                      </View>
                      <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                          {workout?.title}
                        </Text>

                        <Text
                          style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                          numberOfLines={3}
                          ellipsizeMode="tail"
                        >
                          {workout?.description ||
                            "No description available yet."}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 16, width: "100%" }}>
                      {workout?.price === 0 ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#bbf7d0",
                            padding: 10,
                            borderRadius: 6,
                            width: "100%",
                          }}
                          onPress={() =>
                            router.push(`/modal/copy-workout/${workout?.id}`)
                          }
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            View
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#bbf7d0",
                            padding: 10,
                            borderRadius: 6,
                            width: "100%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Purchase
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
  },
  headerHeading: {
    fontWeight: 900,
    fontSize: 18,
    textTransform: "uppercase",
  },
});
