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
} => {
  const { data, error } = useSWR("/api/user/me/myGraphs", (url: string) =>
    fetcher(url, authToken)
  );
  return {
    myGraphs: data ? (data.myGraphs as GraphData) : undefined,
    isLoading: !error && data,
    isError: error,
  };
};

export const useSharedGraphsSWR = (
  authToken: string
): {
  sharedGraphs: GraphData | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR("/api/user/me/sharedGraphs", (url: string) =>
    fetcher(url, authToken)
  );
  return {
    sharedGraphs: data ? (data.sharedGraphs as GraphData) : undefined,
    isLoading: !error && data,
    isError: error,
  };
};
