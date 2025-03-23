import api from "./apiBase";

type Session = {
    start_time: Date;
    end_time: Date;
    activity_id: number;
}

export const createSession = async (session: Session) => {
    const response = await api.post("/sessions", session);
    return response.data;
};

export const getSessions = async () => {
    const response = await api.get("/sessions");
    return response.data;
};

export const getSessionByID = async (id: number) => {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
};

type PatchSession = {
    notes?: string;
    start_time?: Date;
    end_time?: Date;
    activity_id?: number;
}

interface PatchSessionParams {
    id: number;
    patchSession: PatchSession;
}

export const updateSession = async ({ id, patchSession }: PatchSessionParams) => {
    const response = await api.patch(`/sessions/${id}`, patchSession);
    return response.data;
};

export const deleteSession = async (id: number) => {
    const response = await api.delete(`/sessions/${id}`);
    return response.data;
};









