import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import NoteLinearIcon from "@/components/ui/icons/NoteLinearIcon";
import { useCopyWorkout, useGetWorkoutByID } from "@/hooks/useWorkouts";
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseSquareIcon width={36} height={36} />
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
            John Doe
          </Text>
          <Text
            style={{
              color: "#666",
              fontWeight: 300,
            }}
          >
            A highly motivated person who loves to workout. I am a personal
            trainer and I love to help people achieve their goals. I have been
            working out for 10 years and I love to share my knowledge with
            others. I am a certified personal trainer and I love to help people
            achieve their goals. I am a certified personal trainer and I love to
            help people achieve their goals. I am a certified personal trainer
            and I love to help people achieve their goals. I am a certified
            personal trainer and I love to help people achieve their goals. I am
            a certified personal trainer and I love to help people achieve their
            goals.
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
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#efefef",
                width: "48%",
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  padding: 10,
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
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Full Body
                  </Text>

                  <Text
                    style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    Quick way to get a full body workout, no equipment needed.
                  </Text>
                </View>
                <View style={{ marginTop: 16, width: "100%" }}>
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
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#efefef",
                marginBottom: 6,
                width: "48%",
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  padding: 10,
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
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Full Body
                  </Text>

                  <Text
                    style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    Quick way to get a full body workout, no equipment needed.
                  </Text>
                </View>
                <View style={{ marginTop: 16, width: "100%" }}>
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
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#efefef",
                marginBottom: 6,
                width: "48%",
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  padding: 10,
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
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Full Body
                  </Text>

                  <Text
                    style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    Quick way to get a full body workout, no equipment needed.
                  </Text>
                </View>
                <View style={{ marginTop: 16, width: "100%" }}>
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
                </View>
              </View>
            </View>
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
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center",
  },
});
