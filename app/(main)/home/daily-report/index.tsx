import React from "react";
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
import { LineChart } from "react-native-gifted-charts";

function createDatesArray(year: number, month: number): Date[] {
  const datesArray: Date[] = [];
  const numDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= numDays; day++) {
    datesArray.push(new Date(year, month, day));
  }

  return datesArray;
}

export default function Page(): JSX.Element {
  const navigation = useNavigation();
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState(today); // Tracks the current month/year
  const [selectedDate, setSelectedDate] = React.useState(today);
  const scrollRef = React.useRef<ScrollView>(null);

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

  const data = [
    { value: 6, date: new Date(2023, 9, 5) }, // October 1, 2023
    { value: 6, date: new Date(2023, 9, 6) }, // October 2, 2023
    { value: 8, date: new Date(2023, 9, 7) }, // October 3, 2023
    { value: 5, date: new Date(2023, 9, 8) }, // October 4, 2023
    { value: 5, date: new Date(2023, 9, 9) }, // October 5, 2023
    { value: 8, date: new Date(2023, 9, 10) }, // October 6, 2023
    { value: 0, date: new Date(2023, 9, 11) }, // October 7, 2023
  ];

  const xAxisLabels = data.map((item) => {
    return item.date.toLocaleDateString("en-US", { weekday: "short" }); // Display only the day (e.g., "1", "2", etc.)
  });
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
            style={[styles.dateItem, { backgroundColor: "#1f1f1f" }]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: 600, color: "#fff" }}>
                {prevMonthName}
              </Text>
            </View>
          </TouchableOpacity>
          {datesArray.map((date) => (
            <TouchableOpacity
              key={date.getDate()}
              onPress={() => setSelectedDate(date)}
              style={[
                styles.dateItem,
                date.getDate() === selectedDate.getDate() &&
                  styles.selectedDateItem,
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    { marginBottom: 8 },
                    selectedDate.getDate() === date.getDate()
                      ? { color: "#fff" } // Приоритет 1: выбранная дата
                      : today.getDate() === date.getDate()
                      ? { color: "#de713f" } // Приоритет 2: сегодняшняя дата
                      : { color: "#898989" }, // Стандартный цвет
                  ]}
                >
                  {date.toLocaleString("en-US", { weekday: "short" })}
                </Text>
                <Text
                  style={[
                    selectedDate.getDate() === date.getDate()
                      ? { color: "#fff" } // Приоритет 1: выбранная дата
                      : today.getDate() === date.getDate()
                      ? { color: "#de713f" } // Приоритет 2: сегодняшняя дата
                      : { color: "#898989" }, // Стандартный цвет
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleNextMonth}
            style={[styles.dateItem, { backgroundColor: "#1f1f1f" }]}
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
          marginBottom: 20,
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
            20m
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
          <Text style={{ fontSize: 18, fontWeight: "500" }}>17</Text>
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
          <Text style={{ fontSize: 18, fontWeight: "500" }}>6</Text>
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
          <Text style={{ fontSize: 18, fontWeight: "500" }}>40</Text>
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
    textAlign: "right",
  },
  headerName: {
    color: "#898989",
    textAlign: "right",
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
    width: 50, // Fixed width for each date item
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#f1f1f1",
  },
  selectedDateItem: {
    backgroundColor: "#1f1f1f",
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
});
