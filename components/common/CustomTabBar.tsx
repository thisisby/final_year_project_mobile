import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import {
  Link,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import HomeIcon from "../ui/icons/HomeIcon";
import NoteIcon from "../ui/icons/NoteIcon";
import SmsIcon from "../ui/icons/SmsIcon";
import UserIcon from "../ui/icons/UserIcon";
import AddIcon from "../ui/icons/AddIcon";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeInUp,
  FadeOutDown,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import ArrangeSquareLinearIcon from "../ui/icons/ArrangeSquareLinearIcon";
import AddSquareLinearIcon from "../ui/icons/AddSquareLinearIcon";
import { useKeyboardStore } from "@/store/tabbarStore";
import { useSessionStore } from "@/store/sessionStore"; // Import our updated session store
import StopLinearIcon from "../ui/icons/StopLinearIcon";
import {
  useCreateSession,
  useGetSessions,
  useUpdateSession,
} from "@/hooks/useSessions";
import { useSessionDetailsStore } from "@/store/sessionDetailsStore";
import { useUpdateNutrition } from "@/hooks/useNutritions";
import { useNutritionStore } from "@/store/nutritionStore";
import PeopleBoldIcon from "../ui/icons/PeopleBoldIcon";
const { width } = Dimensions.get("window");

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const isDisabled = pathname.split("/").length === 2;
  const { count, inc } = useKeyboardStore();

  const { createSession, isLoading: isCreatingSession } = useCreateSession();

  // Use our session store
  const {
    startTime,
    endTime,
    isActive,
    startSession,
    stopSession,
    updateElapsedTime,
    formatTime,
    resetSession,
  } = useSessionStore();

  const { name, value, createdAt, setName, setValue, setCreatedAt } =
    useNutritionStore();

  // Set up interval for timer updates
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      // Update every second
      intervalId = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    // Cleanup on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, updateElapsedTime]);

  const handleStartSession = () => {
    startSession();
  };

  const handleStopSession = async () => {
    stopSession();
    const currentTime = new Date();

    if (startTime && currentTime) {
      const res = await createSession({
        start_time: startTime,
        end_time: currentTime,
        activity_id: 1,
      });

      resetSession();
      router.push(`/home/sessions/${res.payload.id}`);
    }
  };

  const id = pathname.split("/")[3];
  const { updateSession: updateSessionMutation, isLoading: isUpdatingSession } =
    useUpdateSession(Number(id));
  const {
    startDate,
    startTime: startTimeStore,
    endDate,
    endTime: endTimeStore,
    notes,
  } = useSessionDetailsStore();
  const updateSession = async () => {
    if (startDate && endDate && startTimeStore && endTimeStore) {
      startDate.setHours(startTimeStore.getHours());
      startDate.setMinutes(startTimeStore.getMinutes());
      startDate.setSeconds(startTimeStore.getSeconds());
      endDate.setHours(endTimeStore.getHours());
      endDate.setMinutes(endTimeStore.getMinutes());
      endDate.setSeconds(endTimeStore.getSeconds());
      const id = pathname.split("/")[3];

      await updateSessionMutation({
        id: Number(id),
        patchSession: {
          start_time: startDate,
          end_time: endDate,
          notes: notes,
        },
      });
    }
  };

  const {
    updateNutrition: updateNutritionMutation,
    isLoading: isUpdatingNutrition,
  } = useUpdateNutrition(Number(id));

  const handleUpdateNutrition = async () => {
    if (name && value && createdAt) {
      await updateNutritionMutation({
        id: Number(id),
        patchNutrition: {
          name: name,
          value: value,
          created_at: createdAt,
        },
      });
    }
  };

  const isWorkoutPage = pathname.startsWith("/home/workouts/");

  // Check if the current route matches `/home/workout-exercises/{slug}`
  const isWorkoutExercisePage = pathname.startsWith("/home/workout-exercises/");

  // Check if the current route matches `/home/sessions/{slug}`
  const isSessionPage = pathname.startsWith("/home/sessions/");
  const isSessionPageAdd = pathname.startsWith("/home/sessions");

  const isNutritionPage = pathname.startsWith("/home/nutritions/");
  const isNutritionPageAdd = pathname.startsWith("/home/nutritions");

  const tabs = [
    { href: "/home", icon: HomeIcon },
    { href: "/explore", icon: NoteIcon },
    { href: "/samba", icon: PeopleBoldIcon },
    { href: "/profile", icon: UserIcon },
  ];

  const isModal = pathname.includes("modal") && Platform.OS === "android";

  const render = () => {
    if (isWorkoutExercisePage) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            router.push(`/modal/add-exercise-set/${pathname.split("/")[3]}`)
          }
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <AddSquareLinearIcon color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
              ADD NEW RECORD
            </Text>
          </Animated.View>
        </TouchableOpacity>
      );
    } else if (isSessionPage) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={updateSession}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <ArrangeSquareLinearIcon color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
              {isUpdatingSession ? "Saving..." : "UPDATE SESSION"}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      );
    } else if (isSessionPageAdd && pathname.split("/").length === 3) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleStartSession}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <AddSquareLinearIcon color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
              START NEW SESSION
            </Text>
          </Animated.View>
        </TouchableOpacity>
      );
    } else if (isWorkoutPage) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            router.push(`/modal/add-exercise/${pathname.split("/")[3]}`)
          }
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <AddSquareLinearIcon color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
              ADD NEW EXERCISE
            </Text>
          </Animated.View>
        </TouchableOpacity>
      );
    } else if (isNutritionPageAdd && pathname.split("/").length === 3) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => router.push(`/modal/create-nutrition/page`)}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <AddSquareLinearIcon color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
              ADD NEW RECORD
            </Text>
          </Animated.View>
        </TouchableOpacity>
      );
    } else if (isNutritionPage) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleUpdateNutrition}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <ArrangeSquareLinearIcon color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
              UPDATE NUTRITION
            </Text>
          </Animated.View>
        </TouchableOpacity>
      );
    } else {
      return tabs.map(({ href, icon: Icon }, index) => {
        const isActive = pathname.split("/").includes(href.split("/")[1]);
        return (
          <Link href={href} asChild key={index}>
            <TouchableOpacity disabled={isDisabled && isActive}>
              <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                <Icon color={isActive ? "#FFFFFF" : "#8b8d92"} />
              </Animated.View>
            </TouchableOpacity>
          </Link>
        );
      });
    }
  };

  return (
    <View
      style={[styles.container, isModal && { opacity: 0 }]}
      pointerEvents={isModal ? "none" : "auto"}
    >
      {isActive && (
        <View
          style={{
            backgroundColor: "#000",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 6,
            zIndex: 1000,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: -6,
          }}
        >
          <Text style={{ color: "#FFFFFF", marginBottom: 0, paddingBottom: 0 }}>
            {formatTime()}
          </Text>
          <TouchableOpacity
            style={{
              marginLeft: 5,
            }}
            onPress={handleStopSession}
          >
            <Text
              style={{ color: "#FFFFFF", marginBottom: 0, paddingBottom: 0 }}
            >
              <StopLinearIcon color={"red"} width={20} height={20} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.tabBar}>{render()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.9,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
});
