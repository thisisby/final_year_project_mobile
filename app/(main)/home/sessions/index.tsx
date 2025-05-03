import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import TimerLinearIcon from "@/components/ui/icons/TimerLinearIcon";
import { useGetSessions } from "@/hooks/useSessions";
import { useActivities } from "@/hooks/useActivities";

const categories = [
  "All",
  "Strength Training",
  "Cardio",
  "Yoga",
  "Pilates",
  "Stretching",
  "Meditation",
];

interface Activity {
  id: number;
  name: string;
  activity_group_id: number;
}

interface Session {
  id: number;
  notes: string;
  start_time: string;
  end_time: string;
  activity_id: number;
  activity: Activity;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();
  const { sessions, isLoading: isLoadingSessions } = useGetSessions();

  // Format date for display and grouping
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate duration between start and end times
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();

    // Convert to hours, minutes, seconds
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
    const hours = Math.floor(durationMs / (1000 * 60 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Group sessions by date and process for display, with filtering by category
  const groupedSessions = useMemo(() => {
    if (!sessions || sessions.length === 0) return {};

    // First filter sessions based on activeCategory
    const filteredSessions =
      activeCategory === "All"
        ? sessions
        : sessions.filter(
            (session) => session.activity.name === activeCategory
          );

    // Then sort sessions by start_time (newest first)
    const sortedSessions = [...filteredSessions].sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    );

    // Then group by formatted date
    return sortedSessions.reduce((acc, session) => {
      const dateKey = formatDate(session.start_time);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      // Add processed session with formatted data
      acc[dateKey].push({
        id: session.id,
        title: session.activity.name,
        notes: session.notes,
        duration: calculateDuration(session.start_time, session.end_time),
        date: dateKey,
        rawData: session, // Keep original data for reference if needed
      });

      return acc;
    }, {} as Record<string, any[]>);
  }, [sessions, activeCategory]); // Added activeCategory as a dependency

  const { data: activities, isLoading: isLoadingActivities } = useActivities();

  const handleSetActiveCategory = (activityName: string) => {
    setActiveCategory(activityName);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 130,
      }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={34} height={34} />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerHeading}>Sessions</Text>
        </View>
        <View>
          <TouchableOpacity>
            <SettingLinearIcon width={34} height={34} color="#d4d4d8" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        <TouchableOpacity
          key="All"
          style={[
            styles.categoryItem,
            activeCategory === "All" && styles.activeCategory,
          ]}
          onPress={() => handleSetActiveCategory("All")}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === "All" && styles.activeCategoryText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {activities?.payload.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[
              styles.categoryItem,
              activeCategory === activity.name && styles.activeCategory,
            ]}
            onPress={() => handleSetActiveCategory(activity.name)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === activity.name && styles.activeCategoryText,
              ]}
            >
              {activity.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoadingSessions ? (
        <Text style={styles.loadingText}>Loading sessions...</Text>
      ) : Object.keys(groupedSessions).length === 0 ? (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>You have no sessions yet</Text>
        </View>
      ) : (
        Object.entries(groupedSessions).map(([date, dateSessions]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{date}</Text>
            {dateSessions.map((session) => (
              <TouchableOpacity
                key={session.id}
                style={styles.sessionCard}
                onPress={() => router.push(`/home/sessions/${session.id}`)}
              >
                <View style={styles.iconContainer}>
                  <TimerLinearIcon width={24} height={24} />
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.cardTitle}>{session.title}</Text>
                  <Text style={styles.durationText}>{session.duration}</Text>
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
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  headerHeading: {
    fontWeight: 900,
    fontSize: 18,
    textTransform: "uppercase",
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
  dateGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#1f1f1f",
  },
  sessionCard: {
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
  },
  iconContainer: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#fef3c7",
  },
  sessionInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  durationText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  notesText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    fontStyle: "italic",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
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
