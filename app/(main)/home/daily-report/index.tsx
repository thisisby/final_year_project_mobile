import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import { LinearGradient } from "expo-linear-gradient";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import Heading from "@/components/ui/Heading";
import { Calendar } from "react-native-calendars";
import CalendarLinearIcon from "@/components/ui/icons/CalendarLinearIcon";
import { router } from "expo-router";
import SmsIcon from "@/components/ui/icons/SmsIcon";
import NoteIcon from "@/components/ui/icons/NoteIcon";
import TimerIcon from "@/components/ui/icons/TimerIcon";
import AddIcon from "@/components/ui/icons/AddIcon";
import AddSquareLinearIcon from "@/components/ui/icons/AddSquareLinearIcon";
import TimerLinearIcon from "@/components/ui/icons/TimerLinearIcon";
import { useGetAnalytics } from "@/hooks/useAnalytics";
import { useAnalyticsStore } from "@/store/analyticsStore";

function createDatesArray(year: number, month: number): Date[] {
  const datesArray: Date[] = [];
  const numDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= numDays; day++) {
    datesArray.push(new Date(year, month, day, 0, 0, 0));
  }

  return datesArray;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date();
  });
  const scrollRef = React.useRef<ScrollView>(null);

  const { selectedDate, setSelectedDate, isIncrease, setIsIncrease } =
    useAnalyticsStore();

  const getDateOnIncrease = (date: Date) => {
    return date
      .toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  };
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalytics(
    getDateOnIncrease(selectedDate)
  );

  const datesArray = createDatesArray(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  // Width of each date item
  const dateItemWidth = 65;

  // Get the screen width
  const screenWidth = Dimensions.get("window").width;

  // Function to calculate and scroll to the selected date
  const scrollToSelectedDate = () => {
    const index = datesArray.findIndex(
      (date) => date.getDate() === selectedDate.getDate()
    );

    if (index !== -1) {
      // Calculate the scroll position to center the selected date
      const scrollPosition =
        index * dateItemWidth - (screenWidth / 2 - dateItemWidth / 2);

      // Scroll to the calculated position
      scrollRef.current?.scrollTo({
        x: scrollPosition,
        animated: true,
      });
    }
  };

  const [selectedDateCalendar, setSelectedDateCalendar] = useState(
    new Date().toISOString().split("T")[0]
  );

  React.useLayoutEffect(() => {
    // Add a small delay to ensure the layout is fully calculated
    const timeout = setTimeout(() => {
      scrollToSelectedDate();
    }, 100); // 100ms delay

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [selectedDate, datesArray]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1); // Move to the previous month
    setCurrentDate(newDate);
    setSelectedDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1)); // Reset selected date to the first day of the month
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1); // Move to the next month
    setCurrentDate(newDate);
    setSelectedDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1)); // Reset selected date to the first day of the month
  };

  const prevMonthName = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  ).toLocaleString("default", { month: "short" }); // "Sep" for September

  const nextMonthName = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  ).toLocaleString("default", { month: "short" }); // "Nov" for November

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

  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleDateSelection = (date: Date) => {
    // Ensure the date is created in the local time zone
    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0 // Set time to midnight in local time
    );

    setSelectedDate(localDate);
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
          <ArrowSquareLeftIcon width={36} height={36} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerHeading}>Report</Text>
          <Text style={styles.headerName}>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/modal/calendar-list`)}>
            <CalendarLinearIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scrollViewWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={styles.datesContainer}
          decelerationRate="fast"
        >
          <TouchableOpacity
            onPress={handlePrevMonth}
            style={[
              styles.dateItem,
              { backgroundColor: "#1f1f1f", borderColor: "#1f1f1f" },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 600, color: "#fff" }}>
                {prevMonthName}
              </Text>
            </View>
          </TouchableOpacity>
          {datesArray.map((date) => (
            <TouchableOpacity
              key={date.toISOString()}
              onPress={() => handleDateSelection(new Date(date))}
              style={[
                styles.dateItem,
                date.getFullYear() === selectedDate.getFullYear() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getDate() === selectedDate.getDate() &&
                  styles.selectedDateItem,
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    { marginBottom: 8 },
                    date.getFullYear() === selectedDate.getFullYear() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getDate() === selectedDate.getDate()
                      ? { color: "#fff" } // Priority 1: selected date
                      : today.getFullYear() === date.getFullYear() &&
                        today.getMonth() === date.getMonth() &&
                        today.getDate() === date.getDate()
                      ? { color: "#de713f" } // Priority 2: today's date
                      : { color: "#898989" }, // Default color
                  ]}
                >
                  {date.toLocaleString("en-US", { weekday: "short" })}
                </Text>
                <Text
                  style={[
                    date.getFullYear() === selectedDate.getFullYear() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getDate() === selectedDate.getDate()
                      ? { color: "#fff" } // Priority 1: selected date
                      : today.getFullYear() === date.getFullYear() &&
                        today.getMonth() === date.getMonth() &&
                        today.getDate() === date.getDate()
                      ? { color: "#de713f" } // Priority 2: today's date
                      : { color: "#898989" }, // Default color
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleNextMonth}
            style={[
              styles.dateItem,
              { backgroundColor: "#1f1f1f", borderColor: "#1f1f1f" },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 600, color: "#fff" }}>
                {nextMonthName}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <LinearGradient
          colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.leftOverlay}
          pointerEvents="none"
        />

        {/* Right Gradient Overlay */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rightOverlay}
          pointerEvents="none"
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 1 }}>
        <Heading level={2} style={{ marginBottom: 10 }}>
          Summary
        </Heading>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: "48%",
            backgroundColor: "#272D34",
            padding: 16,
            borderRadius: 10,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <ChartIcon width={24} height={24} color="#5c9782" />
          </View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.4,
              fontWeight: "300",
              color: "#fff",
            }}
          >
            Duration
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff" }}>
            {analytics?.session_time}
          </Text>
        </View>
        <View
          style={{
            width: "48%",
            backgroundColor: "#E1F0F4",
            padding: 16,
            borderRadius: 10,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <ChartIcon width={24} height={24} color="#5c9782" />
          </View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.4,
              fontWeight: "300",
            }}
          >
            Exercises
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {analytics?.exercises}
          </Text>
        </View>
        <View
          style={{
            width: "48%",
            backgroundColor: "#EDE1F3",
            padding: 16,
            borderRadius: 10,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <ChartIcon width={24} height={24} color="#5c9782" />
          </View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.4,
              fontWeight: "300",
            }}
          >
            Sets
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {analytics?.sets}
          </Text>
        </View>
        <View
          style={{
            width: "48%",
            backgroundColor: "#FFE9CA",
            padding: 16,
            borderRadius: 10,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <ChartIcon width={24} height={24} color="#5c9782" />
          </View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 0.4,
              fontWeight: "300",
            }}
          >
            Reps
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {analytics?.reps}
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 20,

          marginBottom: 30,
        }}
      >
        <Heading level={2} style={{ marginBottom: 14, fontSize: 16 }}>
          Exercises
        </Heading>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {analytics?.details && Object.keys(analytics?.details).length > 0 ? (
            Object.keys(analytics?.details).map((item, id) => {
              return (
                <View style={styles.card3} key={id}>
                  <Text style={styles.cardTitle}>{item}</Text>
                </View>
              );
            })
          ) : (
            <View style={styles.card3}>
              <Text style={styles.cardTitle}>No exercises</Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Heading level={2} style={{ marginBottom: 14, fontSize: 16 }}>
          Sessions
        </Heading>

        <View>
          {analytics?.sessions.length > 0 ? (
            analytics?.sessions.map((item, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => router.push(`/home/sessions/${item.id}`)}
                >
                  <View
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
                      <Text style={styles.cardTitle}>{item.activity.name}</Text>
                      <Text
                        style={{ fontSize: 12, color: "#666", marginTop: 2 }}
                      >
                        {calculateDuration(item.start_time, item.end_time)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={styles.card3}>
                <Text style={styles.cardTitle}>No sessions</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    paddingHorizontal: 20,
  },
  headerHeading: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
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
  cardContent: {},
  cardTitle: { fontSize: 14, fontWeight: "bold" },
  headerName: {
    color: "#898989",
    textAlign: "center",
    fontSize: 12,
  },
  datesContainer: {
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    position: "relative",
  },
  dateItem: {
    width: 51,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  selectedDateItem: {
    backgroundColor: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },

  leftOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 50, // Width of the gradient overlay
  },
  rightOverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 50, // Width of the gradient overlay
  },
  scrollViewWrapper: {
    position: "relative",
    marginBottom: 40,
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
});
