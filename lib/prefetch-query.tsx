import { QueryClient } from "@tanstack/react-query";

export async function prefetchQueries(
  queries: {
    queryKey: any[];
    queryFn: () => Promise<any>;
  }[],
) {
  const queryClient = new QueryClient();

  await Promise.all(
    queries.map((q) =>
      queryClient.prefetchQuery({
        queryKey: q.queryKey,
        queryFn: q.queryFn,
      }),
    ),
  );

  return queryClient;
}
