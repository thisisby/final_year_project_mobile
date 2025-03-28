import RowHorizontalIcon from "@/components/ui/icons/RowHorizontalIcon";
import RowVerticalIcon from "@/components/ui/icons/RowVerticalIcon";
import { useExploreWorkouts } from "@/hooks/useExploreWorkouts";
import { router } from "expo-router";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Animated,
} from "react-native";

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMasonryView, setIsMasonryView] = useState(true);
  const [columnOne, setColumnOne] = useState([]);
  const [columnTwo, setColumnTwo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const loaderFadeAnim = useRef(new Animated.Value(0)).current;
  const isSearching = useRef(false);

  const {
    data: workouts,
    isLoading,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useExploreWorkouts(debouncedSearchQuery);

  // Handle loader animation
  useEffect(() => {
    if (isLoading || isRefetching) {
      // Fade in loader
      Animated.timing(loaderFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out loader
      Animated.timing(loaderFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, isRefetching, loaderFadeAnim]);

  // Reset columns when workouts data changes
  useEffect(() => {
    // Fade in when new results are available
    if (isSearching.current) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        isSearching.current = false;
      });
    }

    if (workouts && workouts.pages) {
      const allWorkouts = workouts.pages.flatMap((page) => page.payload.data);
      setColumnOne(allWorkouts.filter((_, index) => index % 2 === 0));
      setColumnTwo(allWorkouts.filter((_, index) => index % 2 !== 0));
    }
  }, [workouts, fadeAnim]);

  // Debounce the search query with 500ms delay and trigger fade animation
  const handleSearchInputChange = useCallback(
    (text) => {
      setSearchQuery(text);

      // Start fade out animation if this is a new search
      if (!isSearching.current) {
        isSearching.current = true;
        Animated.timing(fadeAnim, {
          toValue: 0.4,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }

      // Clear any existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set a new timeout for 500ms
      const timeout = setTimeout(() => {
        setDebouncedSearchQuery(text);
      }, 500);

      setSearchTimeout(timeout);
    },
    [searchTimeout, fadeAnim]
  );

  // Handle category selection with animation
  const handleCategoryPress = useCallback(
    (category) => {
      setActiveCategory(category);

      // Trigger fade out animation
      if (!isSearching.current) {
        isSearching.current = true;
        Animated.timing(fadeAnim, {
          toValue: 0.4,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }

      // If "All" is selected, clear the search
      if (category === "All") {
        setSearchQuery("");
        setDebouncedSearchQuery("");
        return;
      }

      // Otherwise, set the search query to the category name
      const categorySearchText = category;
      setSearchQuery(categorySearchText);

      // Trigger search immediately for category selection
      setDebouncedSearchQuery(categorySearchText);
    },
    [fadeAnim]
  );

  // Clean up the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const categories = [
    "All",
    "Full Body",
    "Upper Body",
    "Lower Body",
    "Lats",
    "Core",
    "Legs",
  ];

  // Render the content for the data section
  const renderContent = () => {
    return (
      <View style={{ position: "relative", minHeight: 300 }}>
        {/* Custom animated loader that shows during initial load or refetching */}
        <Animated.View
          style={[
            styles.customLoaderContainer,
            {
              opacity: loaderFadeAnim,
              zIndex: isLoading || isRefetching ? 10 : -1,
            },
          ]}
          pointerEvents={isLoading || isRefetching ? "auto" : "none"}
        >
          <View style={styles.customLoader}>
            <ActivityIndicator size="small" color="#6371f6" />
            <Text style={styles.loaderText}>
              {isLoading ? "Loading workouts..." : "Updating results..."}
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.masonryContainer, { opacity: fadeAnim }]}>
          <View style={styles.masonryColumn}>
            {columnOne.map((workout) => (
              <TouchableOpacity
                onPress={() => router.push(`/modal/copy-workout/${workout.id}`)}
                key={workout.id}
                style={styles.workoutItem}
              >
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={{ flexShrink: 1 }}>
                  <Text
                    style={styles.workoutDescription}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {workout?.description || "No description available"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.masonryColumn}>
            {columnTwo.map((workout) => (
              <TouchableOpacity
                onPress={() => router.push(`/modal/copy-workout/${workout.id}`)}
                key={workout.id}
                style={styles.workoutItem}
              >
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={{ flexShrink: 1 }}>
                  <Text
                    style={styles.workoutDescription}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {workout?.description || "No description available"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* No results message */}
          {workouts &&
            workouts.pages &&
            workouts.pages[0]?.payload?.data?.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No workouts found</Text>
              </View>
            )}
        </Animated.View>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          handleLoadMore();
        }
      }}
      scrollEventThrottle={400}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Explore</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search: e.g. Push-ups, Squats, etc."
          placeholderTextColor="#999999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearchInputChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              // Trigger fade out animation
              if (!isSearching.current) {
                isSearching.current = true;
                Animated.timing(fadeAnim, {
                  toValue: 0.4,
                  duration: 200,
                  useNativeDriver: true,
                }).start();
              }

              setSearchQuery("");
              setDebouncedSearchQuery("");
              setActiveCategory("All");
            }}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
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
            onPress={() => handleCategoryPress(category)}
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

      {/* Render content section with proper loading states */}
      {renderContent()}
    </ScrollView>
  );
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

// Updated styles
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
    paddingRight: 40, // Space for the clear button
  },
  clearButton: {
    position: "absolute",
    right: 10,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "bold",
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
    backgroundColor: "#f4f4f4",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#69787b",
  },
  activeCategoryText: {
    color: "#1f1f1f",
  },
  customLoaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10,
    borderRadius: 12,
  },
  customLoader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loaderText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  noResultsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
  },
  // Masonry View Styles
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    minHeight: 300,
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
});
