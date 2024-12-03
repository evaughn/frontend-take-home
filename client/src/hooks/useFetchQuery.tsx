import { keepPreviousData, useQuery } from "@tanstack/react-query";

type FetchQueryParams = {
  key: string;
  page: number;
  search?: string;
}

const useFetchQuery = ({ key, page, search }: FetchQueryParams) => {
  const params = new URLSearchParams({
    page: `${page}`
  });

  if (search != null) {
    params.append('search', search);
  }

  const dataFetch = useQuery({
    queryKey: [key, page, search],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3002/${key}?${params}`);
      if (!response.ok) {
        throw new Error('New error');
      }

      return await response.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60,
    enabled: window.navigator.onLine
  });

  return dataFetch;
}

export default useFetchQuery;
