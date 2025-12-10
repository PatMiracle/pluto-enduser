import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { TicketResponse } from "./ticket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";

interface Params {
  pageSize?: number;
}

export const useConsultations = (p: Params) =>
  usePaginatedQuery<TicketResponse>("consultations", "/user/consultations", p);

export const useCreateConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      try {
        const res = await api.post("/user/consultations/", data);
        return res.data;
      } catch (error) {
        defaultErrorHandler(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consultations"],
      });
    },
  });
};
