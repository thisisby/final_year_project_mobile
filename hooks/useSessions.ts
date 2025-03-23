import { useMutation, useQuery } from "@tanstack/react-query";
import { createSession, deleteSession, getSessionByID, getSessions, updateSession } from "@/services/sessionsService";
import { queryClient } from "@/app/_layout";

export const useCreateSession = () => {
    const mutation = useMutation(createSession, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
        },
        onError: (error) => {
            console.error("session create error", error);
        },
    });

    return {
        createSession: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
}   

export const useGetSessions = () => {
    const query = useQuery({
        queryKey: ["sessions"],
        queryFn: getSessions,
    });

    return {
        sessions: query.data?.payload,
        isLoading: query.isLoading,
    };
}

export const useGetSessionByID = (id: number) => {
    const query = useQuery({
        queryKey: ["session", id],
        queryFn: () => getSessionByID(id),
    });

    return {
        session: query.data,
        isLoading: query.isLoading,
    };
}

export const useUpdateSession = (id: number) => {
    const mutation = useMutation(updateSession, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            queryClient.invalidateQueries({ queryKey: ["session", id] });
        },
        onError: (error) => {
            console.error("session update error", error);
        },
    });

    return {
        updateSession: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
}

export const useDeleteSession = (id: number) => {
    const mutation = useMutation(deleteSession, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            queryClient.invalidateQueries({ queryKey: ["session", id] });
        },
        onError: (error) => {
            console.error("session delete error", error);
        },
    });

    return {
        deleteSession: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
}       