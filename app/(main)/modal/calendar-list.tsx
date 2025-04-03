import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import CalendarLinearIcon from "@/components/ui/icons/CalendarLinearIcon";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import { useGetAnalyticsByDateRange } from "@/hooks/useAnalytics";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { useAnalyticsStore } from "@/store/analyticsStore";
const CalendarScreen = () => {
  const [selectedDates, setSelectedDates] = useState("");
  const today = new Date();
  const navigation = useNavigation();
  // const activeDates = {
  //   "2025-02-09": { selected: true },
  //   "2025-02-14": { selected: true },
  // };

  const [activeDates, setActiveDates] = useState<any>({});

  function convertDate(isoDateString: string) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getFirstDayOfPreviousMonths(monthsAgo: number) {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - monthsAgo,
      1
    );
    return targetDate.toISOString().split("T")[0];
  }

  const { data, isLoading } = useGetAnalyticsByDateRange(
    getFirstDayOfPreviousMonths(4),
    today.toISOString().split("T")[0]
  );

  const { selectedDate, setSelectedDate } = useAnalyticsStore();

  useEffect(() => {
    if (data) {
      const markedDates = data.reduce((acc, session) => {
        const date = convertDate(session);
        acc[date] = { selected: true };
        return acc;
      }, {});
      setActiveDates(markedDates);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseSquareIcon width={34} height={34} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <CalendarList
          current={today.toISOString().split("T")[0]}
          pastScrollRange={4} // Количество прошлых месяцев
          futureScrollRange={0} // Количество будущих месяцев
          scrollEnabled={true}
          showScrollIndicator={false}
          showWeekNumbers={false}
          hideDayNames={true}
          hideArrows={true}
          onDayPress={(day) => setSelectedDates(day.dateString)}
          markingType={"custom"}
          markedDates={{
            ...activeDates,
            [selectedDates]: { selected: true },
          }}
          monthFormat="MMM yyyy"
          dayComponent={({ date, state }) => {
            const isSelected = date.dateString === selectedDates;
            const isActive = activeDates[date.dateString];
            const isToday =
              date.dateString === today.toISOString().split("T")[0];

            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDates(date.dateString);
                  setSelectedDate(new Date(date.dateString));
                  navigation.goBack();
                }}
              >
                <View
                  style={[
                    styles.dayContainer,
                    isActive && styles.activeDay,
                    isSelected && styles.selectedDay,
                    isToday && styles.todayDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      state === "disabled" && styles.disabledText,
                      isActive && styles.activeText,
                      isToday && { color: "#fff" },
                    ]}
                  >
                    {date.day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          theme={{
            textMonthFontWeight: "bold",
            "stylesheet.calendar.header": {
              header: {
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginBottom: 0,
              },
            },
          }}
          calendarHeight={300}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Делаем квадрат с мягкими углами
    borderColor: "#f1f1f1",
    borderWidth: 2,
  },
  activeDay: {
    backgroundColor: "#1f1f1f",
    borderColor: "#1f1f1f",
  },
  selectedDay: {
    borderColor: "#BFCFD4", // Серый обвод выбранного дня
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  activeText: {
    color: "#fff", // Белый текст для активных дней
  },
  disabledText: {
    color: "#C4C4C4", // Серый цвет для неактивных дат
  },
  todayDay: {
    borderWidth: 2,
    borderColor: "#059669",
    backgroundColor: "#059669",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default CalendarScreen;
