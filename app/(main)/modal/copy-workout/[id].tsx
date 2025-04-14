import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import HeartBoldIcon from "@/components/ui/icons/HeartBoldIcon";
import HeartLinearIcon from "@/components/ui/icons/HeartLinearIcon";
import {
  useCopyWorkout,
  useGetWorkoutByID,
  useLikeWorkout,
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
  const scrollViewRef = useRef(null);
  const commentInputRef = useRef(null);

  const { data: workout, isLoading } = useGetWorkoutByID(Number(id));
  const { copyWorkout, isLoading: isCopyLoading } = useCopyWorkout();
  const { likeWorkout, isLoading: isLikeLoading } = useLikeWorkout();

  const handleCopyWorkout = async () => {
    const res = await copyWorkout(Number(id));
    navigation.goBack();
  };

  // Function to handle input focus
  const handleCommentFocus = () => {
    // Give time for the keyboard to appear
    setTimeout(() => {
      // Scroll to the comment input
      if (scrollViewRef.current && commentInputRef.current) {
        commentInputRef.current.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current.scrollTo({
            y: pageY - 100, // Scroll to position with some extra space
            animated: true,
          });
        });
      }
    }, 300);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CloseSquareIcon width={34} height={34} />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerHeading}>Copy Workout</Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 10,
              borderRadius: 10,
              padding: 10,
              flexDirection: "column",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              {workout?.payload?.title}
            </Text>
            <Text
              style={{
                color: "#666",
                lineHeight: 18,
                letterSpacing: 0.4,
              }}
            >
              {workout?.payload?.description}
            </Text>

            <View style={styles.sectionCard}>
              {workout?.payload?.exercises.map((item) => (
                <View key={item.id} style={styles.card3}>
                  <View style={[styles.cardContent, { paddingVertical: 6 }]}>
                    <Text style={styles.cardTitle}>{item.exercise.name}</Text>

                    {item.main_note && (
                      <Text style={styles.cardDescription}>
                        {item.main_note}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#efefef",
                padding: 10,
                paddingVertical: 14,
                borderRadius: 10,
                flex: 1,
              }}
              onPress={() => {
                likeWorkout(Number(id));
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HeartBoldIcon width={24} height={24} color="#991b1b" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#efefef",
                padding: 10,
                paddingVertical: 14,
                borderRadius: 10,
                flex: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleCopyWorkout}
            >
              {isCopyLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#059669",
                  }}
                >
                  Copy Workout
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#991b1b",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Total likes: {workout?.payload?.likes_count}
            </Text>
          </View>

          {/* <View style={{ padding: 10, borderRadius: 10 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              Comments
            </Text>

            <View
              style={{
                marginBottom: 14,
              }}
              ref={commentInputRef}
            >
              <TextInput
                placeholder="Add a comment"
                placeholderTextColor="#999999"
                style={{
                  width: "100%",
                  backgroundColor: "#F6F6F6",
                  padding: 14,
                  borderRadius: 8,
                  marginBottom: 6,
                }}
                onFocus={handleCommentFocus}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  paddingVertical: 14,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Add Comment
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#f8f9f9",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Alex</Text>
              <Text style={{ color: "#666", fontWeight: "300" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </Text>
            </View>

            <View
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#f8f9f9",
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Alex</Text>
              <Text style={{ color: "#666", fontWeight: "300" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </Text>
            </View>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  section: {
    backgroundColor: "#F7F8FA",
    borderRadius: 5,
    marginHorizontal: 16,
    padding: 10,
    marginVertical: 10,
  },
  section2: {
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  card2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  sectionCard: {
    borderRadius: 12,
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  listItem: { fontSize: 16, paddingVertical: 8 },
  greenText: { color: "white" },
  card3: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f8f9f9",
    borderRadius: 10,
    marginBottom: 6,
  },
  cardIcon: { marginRight: 10 },
  cardIcon2: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "#f2f3f8",
    borderRadius: 8,
  },
  cardContent: {},
  cardTitle: { fontSize: 14, fontWeight: "bold" },
  cardDescription: { fontSize: 12, color: "#666", marginTop: 4 },
  cardCount: { fontSize: 16, fontWeight: "bold", color: "#777" },
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  templateCard: {
    width: "48%",
    backgroundColor: "#F7F8FA",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  templateTitle: { fontSize: 16, marginBottom: 4 },
  templateExercises: { fontSize: 14, color: "#666" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray", marginTop: 4 },
  habbit: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  habbitItem: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: "#ced4da",
    borderRadius: 10,
    padding: 14,
  },
  headerHeading: {
    fontWeight: 900,
    fontSize: 18,
    textTransform: "uppercase",
  },
  headerName: {
    color: "#898989",
    textAlign: "center",
    fontSize: 12,
  },
});
