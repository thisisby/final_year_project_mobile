import { getExploreWorkouts } from "@/services/exploreService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useExploreWorkouts(searchQuery) {
  return useInfiniteQuery({
    queryKey: ["explore-workouts", searchQuery], // Include searchQuery in the queryKey
    queryFn: ({ pageParam = 1 }) =>
      getExploreWorkouts({
        like_title: searchQuery,
        page: pageParam,
        limit: 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.payload.data.length ? allPages.length + 1 : undefined;
    },
    // Only refetch when searchQuery actually changes
    // This works with our debounced approach
    enabled: true,
    onSuccess: (data) => {
      console.log("explore workouts fetched successfully");
    },
    onError: (error) => {
      console.error("explore workouts error", error);
    },
  });
}
