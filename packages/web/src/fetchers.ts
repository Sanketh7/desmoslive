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

export const useMyGraphsSWR = (
  authToken: string
): {
  myGraphs: string[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR("/api/user/me/myGraphs", (url: string) =>
    fetcher(url, authToken)
  );
  return {
    myGraphs: data ? (data.myGraphs as string[]) : undefined,
    isLoading: !error && data,
    isError: error,
  };
};
