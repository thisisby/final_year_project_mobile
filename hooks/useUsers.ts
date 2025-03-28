import { queryClient } from "@/app/_layout";
import {
  changeAvatar,
  getUserById,
  getUsers,
  patchUser,
} from "@/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChangeAvatar = () => {
  const mutation = useMutation(changeAvatar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("avatar change error", error);
    },
  });

  return {
    changeAvatar: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
};

export const usePatchUser = () => {
  const mutation = useMutation(patchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message.split(" ");
      console.log("msggg: ", msg);

      if (msg.includes("exists")) {
        Toast.show({
          type: "error",
          text1: "Oops",
          text2: "Username already exists",
        });
      }
      console.error("user update error", error);
    },
  });

  return {
    patchUser: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
};

export function useExploreUsers(searchQuery) {
  return useInfiniteQuery({
    queryKey: ["explore-users", searchQuery], // Include searchQuery in the queryKey
    queryFn: ({ pageParam = 1 }) =>
      getUsers({
        like_username: searchQuery,
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
      console.log("explore users fetched successfully");
    },
    onError: (error) => {
      console.error("explore users error", error);
    },
  });
}

export function useGetUserByID(id: number) {
  return useQuery({
    queryKey: ["explore-user-by-id", id],
    queryFn: () => getUserById(id),
    onSuccess: (data) => {
      console.log("explore user by id", data);
    },
    onError: (error) => {
      console.error("explore user by id error", error);
    },
  });
}
