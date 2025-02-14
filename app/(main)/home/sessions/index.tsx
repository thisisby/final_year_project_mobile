import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import MagicPenIcon from "@/components/ui/icons/MagicPenIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import NutritionIcon from "@/components/ui/icons/NutritionIcon";
import WorkoutIcon from "@/components/ui/icons/WorkoutIcon";
import NoteIcon from "@/components/ui/icons/NoteIcon";
import Avatar from "@/components/ui/Avatar";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import TimerLinearIcon from "@/components/ui/icons/TimerLinearIcon";

const categories = [
  "All",
  "Full Body",
  "Upper Body",
  "Lower Body",
  "Lats",
  "Core",
  "Legs",
];

interface Session {
  id: string;
  title: string;
  duration: string;
  date: string;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();
  const [isDelete, setIsDelete] = React.useState(false);
  const sessions: Session[] = [
    {
      id: "1",
      title: "Strength Training",
      duration: "10 mins",
      date: "December 2024",
    },
    {
      id: "2",
      title: "Cardio",
      duration: "20 mins",
      date: "December 2024",
    },
    {
      id: "3",
      title: "Yoga",
      duration: "30 mins",
      date: "November 2024",
    },
    {
      id: "4",
      title: "Pilates",
      duration: "15 mins",
      date: "November 2024",
    },
  ];

  const groupedSessions = sessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date].push(session);
    return acc;
  }, {} as Record<string, Session[]>);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 130,
      }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={30} height={30} />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerHeading}>Sessions</Text>
        </View>
        <View>
          <TouchableOpacity>
            <SettingLinearIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              activeCategory === category && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {Object.entries(groupedSessions).map(([date, sessions]) => (
        <View key={date}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginVertical: 10,
              color: "#333",
            }}
          >
            {date}
          </Text>
          {sessions.map((session) => (
            <TouchableOpacity
              key={session.id}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#efefef",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  padding: 4,
                  borderRadius: 6,
                  backgroundColor: "#f1f1f1",
                }}
              >
                <TimerLinearIcon width={24} height={24} />
              </View>
              <View>
                <Text style={styles.cardTitle}>{session.title}</Text>
                <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  {session.duration}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  // Sticky Header
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  headerHeading: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center",
  },
  headerName: {
    color: "#898989",
    textAlign: "center",
    fontSize: 12,
  },

  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  activeCategory: {
    borderColor: "#333",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#69787b",
  },
  activeCategoryText: {
    color: "#1f1f1f",
  },

  card3: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#efefef",
  },

  cardTitle: { fontSize: 14, fontWeight: "bold" },
});
