import React, { useState, useMemo } from "react";
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
import BubbleLinearIcon from "@/components/ui/icons/BubbleLinearIcon";
import { useGetNutritions } from "@/hooks/useNutritions";

const categories = [
  "All",
  "Strength Training",
  "Cardio",
  "Yoga",
  "Pilates",
  "Stretching",
  "Meditation",
];

interface Nutrition {
  id: string;
  name: string;
  value: string;
  created_at: string;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();
  const { nutritions, isLoading } = useGetNutritions();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const groupedNutritions = useMemo(() => {
    if (!nutritions || nutritions.length === 0) return {};

    const sortedNutritions = [...nutritions].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return sortedNutritions.reduce((acc, nutrition) => {
      const dateKey = formatDate(nutrition.created_at);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(nutrition);
      return acc;
    }, {} as Record<string, Nutrition[]>);
  }, [nutritions]);

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
          <Text style={styles.headerHeading}>Nutritions</Text>
        </View>
        <View>
          <TouchableOpacity>
            <SettingLinearIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Loading nutritions...</Text>
      ) : Object.keys(groupedNutritions).length === 0 ? (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>You have no nutritions yet</Text>
        </View>
      ) : (
        Object.entries(groupedNutritions).map(([date, nutritions]) => (
          <View key={date}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginVertical: 10,
                color: "#1f1f1f",
              }}
            >
              {date}
            </Text>
            {nutritions.map((nutrition) => (
              <TouchableOpacity
                key={nutrition.id}
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
                onPress={() => router.push(`/home/nutritions/${nutrition.id}`)}
              >
                <View
                  style={{
                    padding: 4,
                    borderRadius: 6,
                    backgroundColor: "#f1f1f1",
                  }}
                >
                  <BubbleLinearIcon width={24} height={24} />
                </View>
                <View>
                  <Text style={styles.cardTitle}>{nutrition.name}</Text>
                  <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                    {nutrition.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))
      )}
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
  noRecordsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7eded",
    borderStyle: "dashed",
    padding: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  noRecordsText: { textAlign: "center" },
});
