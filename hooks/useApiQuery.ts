import api from "@/lib/apiClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const fetcher = async <T, TParams extends Record<string, any> = {}>(
  path: string,
  params?: TParams,
): Promise<T> => {
  const { data } = await api.get<T>(path, { params });
  return data;
};

export const useApiQuery = <T, TParams extends Record<string, any> = {}>(
  key: string,
  path: string,
  params?: TParams,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> & {
    queryFn?: () => Promise<T>;
  },
) => {
  const defaultQueryFn = () => fetcher<T, TParams>(path, params);

  return useQuery<T>({
    queryKey: [key, params],
    queryFn: options?.queryFn ?? defaultQueryFn,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
