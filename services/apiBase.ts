// api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";

// const BASE_URL = "http://3.87.183.239/api/v1";
const BASE_URL = `http://18.206.248.41/api/v1`;

const api = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to handle 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const clearUser = useUserStore.getState().clearUser;

      await AsyncStorage.removeItem("jwtToken");
      clearUser();
      router.replace("/(auth)/login");
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
