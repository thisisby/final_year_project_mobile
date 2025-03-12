import axios from "axios";

// const API_URL = "http://3.87.183.239/api/v1";
const API_URL = "http://192.168.0.75:8080/api/v1";


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

export const getMe = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};
