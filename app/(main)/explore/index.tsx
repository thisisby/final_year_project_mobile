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
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const inputRef = useRef(null);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const loaderFadeAnim = useRef(new Animated.Value(0)).current;
  const isSearching = useRef(false);
  const scrollViewRef = useRef(null);

  const {
    data: workouts,
    isLoading,
    fetchNextPage,
    isRefetching,
  } = useExploreWorkouts(debouncedSearchQuery);

  // Extract all workouts from paginated data
  const allWorkouts =
    workouts?.pages?.flatMap((page) => page.payload.data) || [];

  // Prepare masonry columns
  const columnOne = allWorkouts.filter((_, index) => index % 2 === 0);
  const columnTwo = allWorkouts.filter((_, index) => index % 2 !== 0);

  // Handle loader animation
  useEffect(() => {
    Animated.timing(loaderFadeAnim, {
      toValue: isLoading || isRefetching ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isLoading, isRefetching, loaderFadeAnim]);

  // Fade in animation when new results are available
  useEffect(() => {
    if (isSearching.current) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        isSearching.current = false;
      });
    }
  }, [workouts, fadeAnim]);

  // Debounce search query WITHOUT dismissing keyboard
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
      setSearchQuery(category);
      setDebouncedSearchQuery(category);
    },
    [fadeAnim]
  );

  // Clear search with animation
  const handleClearSearch = useCallback(() => {
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

    // Keep focus on input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [fadeAnim]);

  // Function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  // Render a workout card component
  const WorkoutCard = ({ workout }) => (
    <TouchableOpacity
      onPress={() => {
        // Manually dismiss keyboard before navigation to avoid React Native issues
        Keyboard.dismiss();
        router.push(`/modal/copy-workout/${workout.id}`);
      }}
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
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Explore Workouts</Text>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Search: e.g. Push-ups, Squats, etc."
              placeholderTextColor="#999999"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              returnKeyType="search"
              clearButtonMode="while-editing" // iOS only clear button
              // Modified these props to allow unfocus
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={true}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearSearch}
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
            keyboardShouldPersistTaps="handled" // Changed from "always" to "handled"
            contentContainerStyle={styles.categoryContentContainer}
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
        </View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ ...styles.scrollContainer, flexGrow: 1 }} // Added flexGrow: 1
          style={styles.container}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              handleLoadMore();
            }
          }}
          scrollEventThrottle={400}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Content with loading and results */}
          <View style={{ position: "relative", minHeight: 300 }}>
            {/* Custom animated loader */}
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
                <ActivityIndicator color="#000" />
                {/* <Text style={styles.loaderText}>
                  {isLoading || (isRefetching && "Searching for workouts...")}
                </Text> */}
              </View>
            </Animated.View>

            <Animated.View
              style={[styles.masonryContainer, { opacity: fadeAnim }]}
            >
              {/* First column */}
              <View
                style={(styles.masonryColumn, { flex: 1, paddingRight: 2 })}
              >
                {columnOne.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </View>

              {/* Second column */}
              <View style={(styles.masonryColumn, { flex: 1, paddingLeft: 2 })}>
                {columnTwo.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </View>

              {/* No results message */}
              {allWorkouts.length === 0 && !isLoading && !isRefetching && (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No workouts found</Text>
                </View>
              )}
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
    zIndex: 10,
  },
  container: {
    paddingHorizontal: 20,
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
  categoryContentContainer: {
    paddingRight: 20,
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
  customLoaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10,
  },
  customLoader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "50%",
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
    width: "50%",
  },
  workoutItem: {
    backgroundColor: "#fafafa",
    borderRadius: 6,
    padding: 12,
    marginBottom: 4,
  },
  workoutTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
  },
  workoutDescription: {
    color: "#898989",
    fontSize: 12,
  },
});
