import useSWR from "swr";
import axios from "axios";
import GraphData from "@desmoslive/api/src/interfaces/GraphData";
import BranchData from "../../../api/src/interfaces/BranchData";

const fetcher = (url: string, authToken: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: authToken,
      },
    })
    .then((res) => res.data);

export const useMyGraphsSWR = (
  authToken: string | null
): {
  myGraphs: GraphData[] | undefined;
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
    myGraphs:
      data && data.myGraphs ? (data.myGraphs as GraphData[]) : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate,
  };
};

export const useSharedGraphsSWR = (
  authToken: string | null
): {
  sharedGraphs: GraphData[] | undefined;
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
      data && data.sharedGraphs
        ? (data.sharedGraphs as GraphData[])
        : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate,
  };
};

export const useBranchExpressionsSWR = (
  authToken: string | null,
  branchID: string | null
): {
  expressions: string[] | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: (
    data?: unknown,
    shouldRevalidate?: boolean | undefined
  ) => Promise<unknown>;
} => {
  const { data, mutate, error } = useSWR(
    authToken && branchID ? `/api/branch/${branchID}/expressions` : null,
    (url: string) => fetcher(url, authToken as string)
  );
  return {
    expressions:
      data && data.expressions ? (data.expressions as string[]) : undefined,
    isLoading: !error && data,
    isError: error,
    mutate: mutate,
  };
};

export const useBranchesDataSWR = (
  authToken: string | null,
  graphID: string | null
): {
  branches: BranchData[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(
    authToken && graphID ? `/api/graph/${graphID}/branches` : null,
    (url: string) => fetcher(url, authToken as string)
  );
  return {
    branches: data && data.branches ? data.branches : undefined,
    isLoading: !error && data,
    isError: error,
  };
};
