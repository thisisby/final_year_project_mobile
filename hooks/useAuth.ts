import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getMe,
  login,
  LoginCredentials,
  signup,
} from "../services/authService";
import { useUserStore } from "../store/userStore";
import { useNavigation, useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export function useSignIn() {
  const router = useRouter();
  const saveUser = useUserStore((state) => state.saveUser);

  return useMutation(login, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem("jwtToken", data.payload.access_token);

      const userData = await getMe(data.payload.access_token);
      saveUser(userData.payload);
      router.replace("/(main)/home");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  const saveUser = useUserStore((state) => state.saveUser);
  const { mutate: signIn, isLoading, isError } = useSignIn();

  return useMutation(signup, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem("jwtToken", data.payload.access_token);

      const userData = await getMe(data.payload.access_token);
      saveUser(userData.payload);
      router.replace("/(main)/home");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    onSuccess: (data) => {},
  });
}
