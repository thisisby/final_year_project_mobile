import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import CloseSquareIcon from "@/components/ui/icons/CloseSquareIcon";
import RowHorizontalIcon from "@/components/ui/icons/RowHorizontalIcon";
import RowVerticalIcon from "@/components/ui/icons/RowVerticalIcon";
import SettingLinearIcon from "@/components/ui/icons/SettingLinearIcon";
import { router, useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";

const { width: screenWidth } = Dimensions.get("window");

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMasonryView, setIsMasonryView] = useState(true); // Toggle between views
  const navigation = useNavigation();
  const router = useRouter();
  const categories = ["Week", "2 Week", "Month", "3 Month", "6 Month", "All"];

  // Fake data for workout list
  const workouts = [
    {
      id: 1,
      title: "Push-ups",
      description:
        "A basic upper body exercise to strengthen your chest, shoulders, and arms.",
    },
  ];
  // Split workouts into two columns for masonry effect
  const column1 = workouts.filter((_, index) => index % 2 === 0);
  const column2 = workouts.filter((_, index) => index % 2 !== 0);

  const lineData = [
    { value: 10, dataPointText: "20" },
    { value: 10, dataPointText: "24" },
    { value: 20, dataPointText: "28" },
    { value: 40, dataPointText: "32" },
    { value: 30, dataPointText: "36" },
    { value: 20, dataPointText: "40" },
    { value: 50, dataPointText: "44" },
    { value: 60, dataPointText: "48" },
    { value: 30, dataPointText: "52" },
  ];

  const lineData2 = [
    { value: 10, dataPointText: "20" },
    { value: 10, dataPointText: "24" },
    { value: 20, dataPointText: "28" },
    { value: 40, dataPointText: "32" },
    { value: 30, dataPointText: "36" },
    { value: 20, dataPointText: "40" },
    { value: 50, dataPointText: "44" },
    { value: 60, dataPointText: "48" },
    { value: 30, dataPointText: "52" },
  ];
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeftIcon width={30} height={30} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerHeading}>Analytics</Text>
        </View>
        <View>
          <SettingLinearIcon width={30} height={30} />
        </View>
      </View>

      {/* Horizontal Scroll for Categories */}
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

      <View
        style={{
          borderWidth: 2,
          borderColor: "#f4f6f6",
          borderRadius: 8,
          padding: 0,
          margin: 0,
          flex: 1,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Sets
        </Text>
        <LineChart
          data={lineData}
          color1="#e36b7c"
          color2="#4d578d"
          dataPointsColor="#333"
          curved
          animateOnDataChange
          animationDuration={1000}
          onDataChangeAnimationDuration={300}
          hideAxesAndRules
          xAxisLabelsHeight={0}
          yAxisLabelWidth={0}
          initialSpacing={20}
          endSpacing={0}
          dataPointsRadius={4}
          height={150}
          textShiftY={-10}
          xAxisTextNumberOfLines={1}
          showValuesAsDataPointsText
          adjustToWidth
        />
      </View>

      <View
        style={{
          borderWidth: 2,
          borderColor: "#f4f6f6",
          borderRadius: 8,
          padding: 0,
          margin: 0,
          flex: 1,
          width: "100%",
          overflow: "hidden",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Weights
        </Text>
        <LineChart
          data={lineData2}
          height={150}
          color1="#6e6aff"
          dataPointsColor="#333"
          curved
          animateOnDataChange
          animationDuration={1000}
          onDataChangeAnimationDuration={300}
          hideAxesAndRules
          xAxisLabelsHeight={0}
          yAxisLabelWidth={0}
          initialSpacing={20}
          dataPointsRadius={4}
          adjustToWidth
          textShiftY={-10}
          xAxisTextNumberOfLines={1}
          showValuesAsDataPointsText
        />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 130,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
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
  searchInput: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Masonry View Styles
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  masonryColumn: {
    width: "48%",
  },
  workoutItem: {
    backgroundColor: "#f4f6f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  workoutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  workoutDescription: {
    color: "#898989",
    fontSize: 12,
  },
  // List View Styles
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    backgroundColor: "#f4f6f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  headerHeading: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "right",
  },
});
