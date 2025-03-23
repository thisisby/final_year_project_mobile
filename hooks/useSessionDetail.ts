import { useMutation, useQuery } from "@tanstack/react-query";
import { createSessionDetails, getSessionDetails, SessionDetails } from "@/services/sessionDetailsService";
import { queryClient } from "@/app/_layout";
import { useSessionDetailsStore } from "@/store/sessionDetailsStore";

export const useGetSessionDetails = (id: number) => {
  const query = useQuery({
    queryKey: ["sessionDetails", id],
    queryFn: () => getSessionDetails(id),
  });

  return {
    sessionDetails: query.data,
    isLoading: query.isLoading,
  };
};

export const useCreateSessionDetails = () => {
    const mutation = useMutation(createSessionDetails, {
        onSuccess: (response, variables) => {
            console.log("sessionDetails created", response);
            console.log("variables", variables);
            queryClient.invalidateQueries({ queryKey: ["session", variables.session_id] });
            queryClient.invalidateQueries({ queryKey: ["sessionDetails", variables.session_id] });
        },
    });

    return {
        createSessionDetails: mutation.mutateAsync,
        isLoading: mutation.isLoading,
    };
};
