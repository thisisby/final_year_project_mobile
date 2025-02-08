import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Link, usePathname } from "expo-router";
import HomeIcon from "../ui/icons/HomeIcon";

const { width } = Dimensions.get("window");

export default function CustomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { href: "/home", icon: HomeIcon },
    { href: "/home", icon: HomeIcon },
    { href: "/home", icon: HomeIcon },
    { href: "/login", icon: HomeIcon },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map(({ href, icon: Icon }, index) => {
          const isActive = pathname === href;
          return (
            <Link href={href} asChild key={index}>
              <TouchableOpacity disabled={isActive}>
                <Icon color={isActive ? "#FFFFFF" : "#8b8d92"} />
              </TouchableOpacity>
            </Link>
          );
        })}
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
    justifyContent: "space-between",
    width: width * 0.9,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
});
