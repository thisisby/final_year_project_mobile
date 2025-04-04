import RowHorizontalIcon from "@/components/ui/icons/RowHorizontalIcon";
import RowVerticalIcon from "@/components/ui/icons/RowVerticalIcon";
import { useExploreWorkouts } from "@/hooks/useExploreWorkouts";
import { useExploreUsers } from "@/hooks/useUsers";
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
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function Page() {
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
    data: users,
    isLoading,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useExploreUsers(debouncedSearchQuery);

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

    if (users && users.pages) {
      const allWorkouts = users.pages.flatMap((page) => page.payload.data);
      setColumnOne(allWorkouts.filter((_, index) => index % 2 === 0));
      setColumnTwo(allWorkouts.filter((_, index) => index % 2 !== 0));
    }
  }, [users, fadeAnim]);

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
            <ActivityIndicator color="#000" />
            {/* <Text style={styles.loaderText}>
              {isLoading ? "Loading people..." : "Updating results..."}
            </Text> */}
          </View>
        </Animated.View>

        <Animated.View style={[styles.masonryContainer, { opacity: fadeAnim }]}>
          <View style={(styles.masonryColumn, { paddingRight: 2, flex: 1 })}>
            {columnOne.map((workout, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  // Manually dismiss keyboard before navigation to avoid React Native issues
                  Keyboard.dismiss();
                  router.push(`/samba/user-profile/${workout.id}`);
                }}
                style={styles.workoutItem}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#efefef",
                    padding: 4,
                    borderRadius: 10,
                    marginBottom: 24,
                  }}
                >
                  <ImageBackground
                    source={{
                      uri:
                        workout.avatar ||
                        "https://fyp-images-bucket.s3.us-west-2.amazonaws.com/avatar-1743004329677.jpg",
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#efefef",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  ></ImageBackground>
                </View>
                <Text style={styles.workoutTitle}>{workout.username}</Text>
                <View style={{ flexShrink: 1 }}>
                  {workout?.bio ? (
                    <Text
                      style={styles.workoutDescription}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      {workout.bio}
                    </Text>
                  ) : (
                    <Text
                      style={styles.workoutDescription}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      No bio available
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={(styles.masonryColumn, { paddingLeft: 2, flex: 1 })}>
            {columnTwo.map((workout, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => router.push(`/samba/user-profile/${workout.id}`)}
                style={styles.workoutItem}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#efefef",
                    padding: 4,
                    borderRadius: 6,
                    marginBottom: 24,
                  }}
                >
                  <ImageBackground
                    source={{
                      uri:
                        workout.avatar ||
                        "https://fyp-images-bucket.s3.us-west-2.amazonaws.com/avatar-1743004329677.jpg",
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#efefef",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  ></ImageBackground>
                </View>
                <Text style={styles.workoutTitle}>{workout.username}</Text>
                <View style={{ flexShrink: 1 }}>
                  {workout?.bio ? (
                    <Text
                      style={styles.workoutDescription}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      "No description available
                    </Text>
                  ) : (
                    <Text
                      style={styles.workoutDescription}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      No bio available
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* No results message */}
          {users &&
            users.pages &&
            users.pages[0]?.payload?.data?.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No people found</Text>
              </View>
            )}
        </Animated.View>
      </View>
    );
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const inputRef = useRef(null);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.mainContainer}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Explore People</Text>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Search: John Doe, Fitness Trainer..."
              placeholderTextColor="#999999"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              returnKeyType="search"
              clearButtonMode="while-editing"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={true}
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

                  // Keep focus on input after clearing
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
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
          {/* Render content section with proper loading states */}
          {renderContent()}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
  },
  scrollContainer: {
    paddingBottom: 130,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
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
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10,
  },
  customLoader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
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
    marginBottom: 4,
  },
  workoutDescription: {
    color: "#898989",
    fontSize: 12,
  },
});
