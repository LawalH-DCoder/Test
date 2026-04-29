'use client';

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@/lib/api/client';
import { ApiError, PaginatedApiResponse, PaginationParams } from '@/types';

type QueryKey = (string | number | Record<string, unknown>)[];

type UseApiOptions<TQueryFnData, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ApiError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

export function useGet<T>(key: QueryKey, url: string, options?: UseApiOptions<T>) {
  return useQuery<T, ApiError, T, QueryKey>({
    queryKey: key,
    queryFn: async () => {
      const response = await apiClient.get<T>(url);
      return response.data;
    },
    ...options,
  });
}

export function useGetPaginated<T>(
  key: QueryKey,
  url: string,
  params: PaginationParams = {},
  options?: UseApiOptions<PaginatedApiResponse<T>>,
) {
  const { page = 1, limit = 25, ...restParams } = params;

  return useQuery<PaginatedApiResponse<T>, ApiError, PaginatedApiResponse<T>, QueryKey>({
    queryKey: [...key, { page, limit, ...restParams }],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedApiResponse<T>>(url, {
        params: { page, limit, ...restParams },
      });
      return response.data;
    },
    ...options,
  });
}

export function useInfinitePaginated<T>(
  key: QueryKey,
  url: string,
  params: Omit<PaginationParams, 'page'> = {},
  options?: Omit<
    UseInfiniteQueryOptions<PaginatedApiResponse<T>, ApiError, PaginatedApiResponse<T>, QueryKey>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
) {
  return useInfiniteQuery<PaginatedApiResponse<T>, ApiError, PaginatedApiResponse<T>, QueryKey>({
    queryKey: [...key, params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get<PaginatedApiResponse<T>>(url, {
        params: { page: pageParam, ...params },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, page_size, total } = lastPage.data;
      const totalPages = Math.ceil(total / page_size);
      return page < totalPages ? page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) =>
      firstPage.data.page > 1 ? firstPage.data.page - 1 : undefined,
    ...options,
  });
}

function useApiMutation<TData, TVariables>(
  method: 'post' | 'put' | 'patch' | 'delete',
  url: string,
  invalidateKey?: QueryKey,
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      if (method === 'delete') {
        const response = await apiClient.delete<TData>(url, {
          data: variables,
        } as AxiosRequestConfig);
        return response.data;
      }

      const response = await apiClient[method]<TData>(url, variables as unknown);
      return response.data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey, exact: false });
      }
    },
  });
}

export function usePost<TData, TVariables = unknown>(url: string, invalidateKey?: QueryKey) {
  return useApiMutation<TData, TVariables>('post', url, invalidateKey);
}

export function usePut<TData, TVariables = unknown>(url: string, invalidateKey?: QueryKey) {
  return useApiMutation<TData, TVariables>('put', url, invalidateKey);
}

export function usePatch<TData, TVariables = unknown>(url: string, invalidateKey?: QueryKey) {
  return useApiMutation<TData, TVariables>('patch', url, invalidateKey);
}

export function useDelete<TData, TVariables = unknown>(url: string, invalidateKey?: QueryKey) {
  return useApiMutation<TData, TVariables>('delete', url, invalidateKey);
}

export function useDynamicDelete<TData>() {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, string>({
    mutationFn: async (url: string) => {
      const response = await apiClient.delete<TData>(url);
      return response.data;
    },
    onSuccess: (_, url) => {
      const segments = url.split('/').filter(Boolean);
      const mainKey = [segments[0]];
      queryClient.invalidateQueries({ queryKey: mainKey, exact: false });
    },
  });
}
