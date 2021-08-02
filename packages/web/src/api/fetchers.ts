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
  authToken: string
): {
  myGraphs: GraphData | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: (data?: unknown, shouldRevalidate?: boolean | undefined) => Promise<unknown>
} => {
  const { data, mutate, error } = useSWR("/api/user/me/myGraphs", (url: string) =>
    fetcher(url, authToken)
  );
  return {
    myGraphs: data && data.myGraphs ? (data.myGraphs as GraphData) : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate
  };
};

export const useSharedGraphsSWR = (
  authToken: string
): {
  sharedGraphs: GraphData | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: (data?: unknown, shouldRevalidate?: boolean | undefined) => Promise<unknown>
} => {
  const { data, mutate, error } = useSWR("/api/user/me/sharedGraphs", (url: string) =>
    fetcher(url, authToken)
  );
  return {
    sharedGraphs:
      data && data.sharedGraphs ? (data.sharedGraphs as GraphData) : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate
  };
};

export const useGraphExpressionsSWR = (
  authToken: string,
  graphID: string | null | undefined
): {
  expressions: string[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(
    graphID ? `/api/graph/${graphID}/branch/me/expressions` : null,
    (url: string) => fetcher(url, authToken)
  );
  return {
    expressions:
      data && data.expressions ? (data.expressions as string[]) : undefined,
    isLoading: !error && data,
    isError: error,
  };
};
