import axios from "axios";
import api from "./apiBase";

// const API_URL = "http://3.87.183.239/api/v1";
const API_URL = "http://192.168.1.16:8080/api/v1";

export type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  email: string;
  password: string;
};

export const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, credentials);
  return response.data;
};

export const signup = async (credentials: SignupCredentials) => {
  const response = await axios.post(`${API_URL}/auth/sign-up`, credentials);
  const loginResponse = await login(credentials);
  return loginResponse;
};

export const getMe = async () => {
  const response = await api.get(`/me`);
  return response.data;
};
