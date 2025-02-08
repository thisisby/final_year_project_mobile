import Avatar from "@/components/ui/Avatar";
import Heading from "@/components/ui/Heading";
import TextCustom from "@/components/ui/Text";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import ArrowLeftIcon from "../../components/ui/icons/ArrowLeftIcon";
import SimcardIcon from "@/components/ui/icons/SimcardIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import CloudAddIcon from "@/components/ui/icons/CloudAddIcon";
import HotYogaIcon from "@/components/ui/icons/HotYogaIcon";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/store/userStore";

export default function Page() {
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    clearUser();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar title="BA" />
        <View>
          <Text style={styles.headerHeading}>Good Morning!</Text>
          <Text style={styles.headerName}>Shelley Marsh</Text>
        </View>
      </View>

      <View style={{ marginBottom: 40 }}>
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 12, fontSize: 26, fontWeight: 700 }}>
              Set Your{"\n"}Workout Plan
            </Text>
            <TextCustom variant="secondary">Training and Nutrition</TextCustom>
          </View>
          <View style={{ position: "absolute", top: -30, right: 0 }}>
            <Image
              style={{ width: 180, height: 180 }}
              source={require("@/assets/images/bottle-image.png")}
            />
          </View>
        </View>
      </View>

      <View>
        <Heading level={2} style={{ marginBottom: 20 }}>
          Your habbit
        </Heading>

        <View style={styles.habbit}>
          <View style={styles.habbitItem}>
            <View style={styles.card}>
              <View style={{ marginBottom: 30 }}>
                <Text>Daily Report</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <ArrowLeftIcon />
              </View>
            </View>
            <View style={styles.card}>
              <View
                style={{
                  marginBottom: 50,
                }}
              >
                <CloudAddIcon width={40} height={40} />
              </View>
              <View>
                <Text style={{ fontWeight: 600 }}>Workouts</Text>
                <Text style={{ color: "#898989", fontSize: 12 }}>
                  22 workout guides
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.habbitItem}>
            <View style={styles.card}>
              <View
                style={{
                  marginBottom: 50,
                }}
              >
                <ChartIcon width={40} height={40} />
              </View>
              <View>
                <Text style={{ fontWeight: 600 }}>Workouts</Text>
                <Text style={{ color: "#898989", fontSize: 12 }}>
                  22 workout guides
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={{ marginBottom: 30 }}>
                <Text>Daily Report</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <SimcardIcon />
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },
  headerHeading: {
    fontWeight: 700,
    fontSize: 20,
  },
  headerName: {
    color: "#898989",
    textAlign: "right",
  },

  hero: {
    backgroundColor: "#ced4da",
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  habbit: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  habbitItem: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: "#ced4da",
    borderRadius: 16,
    padding: 14,
  },
});
