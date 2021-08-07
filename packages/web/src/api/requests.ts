import axios, { AxiosResponse } from "axios";

export const loginRequest = async (
  authToken: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.post(
    `/api/auth/google`,
    {},
    { headers: { Authorization: authToken } }
  );
};

export const createGraphRequest = async (
  authToken: string,
  graphName: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.post(
    `/api/user/me/createGraph`,
    { graphName: graphName },
    { headers: { Authorization: authToken } }
  );
};

export const updateBranchExpressionsRequest = async (
  authToken: string,
  branchID: string,
  expressions: string[]
): Promise<AxiosResponse<unknown>> => {
  return await axios.put(
    `/api/branch/${branchID}/expressions`,
    { expressions: expressions },
    { headers: { Authorization: authToken } }
  );
};

export const shareGraphRequest = async (
  authToken: string,
  graphID: string,
  shareEmail: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.put(
    `/api/graph/${graphID}/share`,
    { email: shareEmail },
    { headers: { Authorization: authToken } }
  );
};

export const deleteGraphRequest = async (
  authToken: string,
  graphID: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.delete(`/api/graph/${graphID}/delete`, {
    headers: { Authorization: authToken },
  });
};

export const renameGraphRequest = async (
  authToken: string,
  graphID: string,
  graphName: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.put(
    `/api/graph/${graphID}/rename`,
    { graphName: graphName },
    { headers: { Authorization: authToken } }
  );
};

export const getMergeBranchRequest = async (
  authToken: string,
  srcBranchID: string,
  targetBranchID: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.put(
    `/api/branch/merge?source=${srcBranchID}&target=${targetBranchID}`,
    {},
    { headers: { Authorization: authToken } }
  );
};

export const logoutRequest = async (
  authToken: string
): Promise<AxiosResponse<unknown>> => {
  return await axios.delete(`/api/auth/logout`, {
    headers: { Authorization: authToken },
  });
};
