import api from "./apiBase";

export const getSessionDetails = async (id: number) => {
  const response = await api.get(`/sessions/${id}/session-details`);
  return response.data;
};

export type SessionDetails = {
  name: string;
  value: string;
  session_id: number;
};

export const createSessionDetails = async (sessionDetails: SessionDetails) => {
  const response = await api.post(`/admin/session-details`, sessionDetails);
  return response.data;
};
