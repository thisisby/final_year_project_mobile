import { useQuery } from "@tanstack/react-query";
import { getAnalytics, getAnalyticsByDateRange } from "@/services/analyticsService";

export const useGetAnalytics = (date: string) => {
    const query = useQuery({
        queryKey: ["analytics", date],
        queryFn: () => getAnalytics(date),
    });

    return {
        data: query.data?.payload,
        isLoading: query.isLoading,
    };
};

export const useGetAnalyticsByDateRange = (startDate: string, endDate: string) => {
    const query = useQuery({
        queryKey: ["analytics", startDate, endDate],
        queryFn: () => getAnalyticsByDateRange(startDate, endDate),
    });

    return {
        data: query.data?.payload,
        isLoading: query.isLoading,
    };
};

