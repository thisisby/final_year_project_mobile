import api from "./apiBase";

export const getAnalytics = async (date: string) => {
    const response = await api.get(`/analytics/day-wise?date=${date}`);
    return response.data;
};

export const getAnalyticsByDateRange = async (startDate: string, endDate: string) => {
    const response = await api.get(`/analytics/training-days?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
};



