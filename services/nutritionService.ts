import api from "./apiBase";

export const getNutritions = async () => {
    const response = await api.get("/nutritions");
    return response.data;
};

type Nutrition = {
    name: string;
    value: string;
}

export const createNutrition = async (nutrition: Nutrition) => {
    const response = await api.post("/nutritions", nutrition);
    return response.data;
};

export const getNutritionByID = async (id: number) => {
    const response = await api.get(`/nutritions/${id}`);
    return response.data;
};

type PatchNutrition = {
    name?: string;
    value?: string;
    created_at?: Date;
}

interface PatchNutritionParams {
    id: number;
    patchNutrition: PatchNutrition;
}

export const updateNutrition = async ({ id, patchNutrition }: PatchNutritionParams) => {
    const response = await api.patch(`/nutritions/${id}`, patchNutrition);
    return response.data;
};

export const deleteNutrition = async (id: number) => {
    const response = await api.delete(`/nutritions/${id}`);
    return response.data;
};
