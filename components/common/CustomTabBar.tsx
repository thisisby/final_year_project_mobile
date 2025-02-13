import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link, usePathname } from "expo-router";
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

const { width } = Dimensions.get("window");

export default function CustomTabBar() {
  const pathname = usePathname();
  const isDisabled = pathname.split("/").length === 2;

  // Check if the current route matches `/home/workout-exercises/{slug}`
  const isWorkoutExercisePage = pathname.startsWith("/home/workout-exercises/");

  const tabs = [
    { href: "/home", icon: HomeIcon },
    { href: "/explore", icon: NoteIcon },
    { href: "/samba", icon: SmsIcon },
    { href: "/profile", icon: UserIcon },
  ];

  const isModal = pathname.includes("modal");

  return (
    <View
      style={[styles.container, isModal && { opacity: 0 }]}
      pointerEvents={isModal ? "none" : "auto"}
    >
      <View style={styles.tabBar}>
        {isWorkoutExercisePage ? (
          <TouchableOpacity
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => console.log("Add Button Pressed")}
          >
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              <AddIcon color={"#FFFFFF"} />
              <Text style={{ color: "#FFFFFF", marginLeft: 10 }}>
                ADD NEW RECORD
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          // Render the regular tab bar routes
          tabs.map(({ href, icon: Icon }, index) => {
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
          })
        )}
      </View>
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
