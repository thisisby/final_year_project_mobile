import { queryClient } from "@/app/_layout";
import { createNutrition, deleteNutrition, getNutritionByID, getNutritions, updateNutrition } from "@/services/nutritionService";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useGetNutritions = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["nutritions"],
        queryFn: getNutritions,
    });
    
    return {
        nutritions: data?.payload,
        isLoading: isLoading,
    };
};


export const useCreateNutrition = () => {
    const mutation = useMutation({
        mutationFn: createNutrition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["nutritions"] });
        },
        onError: (error) => {
            console.error("nutrition create error", error);
        },
    });

    return {
        createNutrition: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
};

export const useGetNutritionByID = (id: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ["nutrition", id],
        queryFn: () => getNutritionByID(id),
    }
);

    return {
        nutrition: data?.payload,
        isLoading: isLoading,
    };
};

export const useUpdateNutrition = (id: number) => {
    const mutation = useMutation({
        mutationFn: updateNutrition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["nutrition", id] });
            queryClient.invalidateQueries({ queryKey: ["nutritions"] });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Nutrition updated successfully",
            });
        },
        onError: (error) => {
            console.error("nutrition update error", error);

            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Nutrition update failed",
            });
        },
    });

    return {
        updateNutrition: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
};

export const useDeleteNutrition = (id: number) => {
    const mutation = useMutation({
        mutationFn: deleteNutrition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["nutritions"] });
        },
        onError: (error) => {
            console.error("nutrition delete error", error);
        },
    });

    return {
        deleteNutrition: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
};




