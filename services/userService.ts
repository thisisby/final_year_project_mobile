import api from "./apiBase";
import * as FileSystem from "expo-file-system";

interface ChangeAvatarParams {
  uri: string;
  name: string;
  type: string;
}

export const changeAvatar = async (avatar: ChangeAvatarParams) => {
  const formData = new FormData();
  formData.append("avatar", {
    uri: avatar.uri,
    name: avatar.name,
    type: avatar.type,
  });

  try {
    const response = await api.post(`/me/change-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error changing avatar for user :`, error);
    throw error;
  }
};

type PatchUser = {
  username?: string;
  email?: string;
  bio?: string;
  card_pan?: string;
};

interface PatchUserParams {
  id: number;
  patchUser: PatchUser;
}

export const patchUser = async ({ id, patchUser }: PatchUserParams) => {
  const response = await api.patch(`/users/${id}`, patchUser);
  return response.data;
};

export type UsersFilters = {
  like_username: string;
  page: number;
  limit: number;
};
export const getUsers = async (filters: UsersFilters) => {
  const response = await api.get("/users", { params: filters });
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
