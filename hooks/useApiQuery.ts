import api from "@/lib/apiClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

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

export const usePaginatedQuery = <
  T extends { data?: any[]; pagination?: Pagination },
  TParams extends Record<string, any> = {},
>(
  key: string,
  path: string,
  params?: TParams,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
) => {
  const [page, setPage] = useState(0);

  const queryParams = useMemo(
    () => ({
      ...(params ?? {}),
      page,
    }),
    [params, page],
  ) as TParams & { page: number };

  const query = useQuery<T, Error>({
    queryKey: [key, queryParams],
    queryFn: () => fetcher<T, typeof queryParams>(path, queryParams),
    staleTime: 1000 * 60 * 5,
    ...options,
  });

  const fetchNext = useCallback(() => setPage((p) => p + 1), []);
  const fetchPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const fetchPage = useCallback((p: number) => p && setPage(p), []);

  const isPaginated = query.data && "pagination" in query.data;

  const data: NonNullable<T["data"]> | undefined = isPaginated
    ? query.data!.data
    : (query.data as any);

  const pagination = isPaginated ? query.data!.pagination : undefined;

  return {
    ...query,
    data,
    isPaginated,
    pagination: {
      currentPage: pagination?.currentPage ?? page,
      fetchNext,
      fetchPrev,
      fetchPage,
      totalPages: pagination?.totalPages ?? 1,
    },
  };
};
