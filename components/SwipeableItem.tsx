import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import NoteLinearIcon from "./ui/icons/NoteLinearIcon";
import TrashLinearIcon from "./ui/icons/TrashLinearIcon";

const SwipeableWorkoutItem = ({ item, onDelete, isLoading, onPress }) => {
  const translateX = useSharedValue(0);
  const MAX_SWIPE_DISTANCE = -65; // Maximum swipe distance to reveal the delete button

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < MAX_SWIPE_DISTANCE) {
        translateX.value = withSpring(MAX_SWIPE_DISTANCE);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleDelete = () => {
    translateX.value = withSpring(0); // Reset the position
    onDelete(item.id); // Call the delete function
  };

  return (
    <View style={styles.container}>
      {/* Delete Button */}
      <View style={styles.deleteButtonContainer}>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <TrashLinearIcon width={24} height={24} color="red" />
          )}
        </Pressable>
      </View>

      {/* Swipeable Item */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.item, animatedStyle]}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingVertical: 8,
              paddingHorizontal: 10,
            }}
            onPress={onPress}
          >
            <View
              style={{
                padding: 4,
                borderRadius: 6,
                backgroundColor: "#f1f1f1",
              }}
            >
              <NoteLinearIcon width={24} height={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {item.title}
              </Text>
              {item.description && (
                <Text
                  style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.description}
                </Text>
              )}
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginBottom: 6,
  },
  deleteButtonContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    width: 60,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#efefef",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#efefef",
  },
});

export default SwipeableWorkoutItem;
