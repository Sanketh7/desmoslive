import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string, authToken: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: authToken,
      },
    })
    .then((res) => res.data);

type GraphData = { id: string; name: string }[];

export const useMyGraphsSWR = (
  authToken: string | null
): {
  myGraphs: GraphData | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: (
    data?: unknown,
    shouldRevalidate?: boolean | undefined
  ) => Promise<unknown>;
} => {
  const { data, mutate, error } = useSWR(
    authToken ? "/api/user/me/myGraphs" : null, // doesn't fetch if authToken is null
    (url: string) => fetcher(url, authToken as string)
  );
  return {
    myGraphs: data && data.myGraphs ? (data.myGraphs as GraphData) : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate,
  };
};

export const useSharedGraphsSWR = (
  authToken: string | null
): {
  sharedGraphs: GraphData | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: (
    data?: unknown,
    shouldRevalidate?: boolean | undefined
  ) => Promise<unknown>;
} => {
  const { data, mutate, error } = useSWR(
    authToken ? "/api/user/me/sharedGraphs" : null, // doesn't fetch if authToken is null
    (url: string) => fetcher(url, authToken as string)
  );
  return {
    sharedGraphs:
      data && data.sharedGraphs ? (data.sharedGraphs as GraphData) : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate,
  };
};

export const useGraphExpressionsSWR = (
  authToken: string | null,
  graphID: string | null | undefined
): {
  expressions: string[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(
    graphID && authToken ? `/api/graph/${graphID}/branch/me/expressions` : null, // doesn't fetch if graphID or authToken are falsey
    (url: string) => fetcher(url, authToken as string)
  );
  return {
    expressions:
      data && data.expressions ? (data.expressions as string[]) : undefined,
    isLoading: !error && data,
    isError: error,
  };
};
