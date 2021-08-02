import axios, { AxiosResponse } from "axios";

export const createGraphRequest = async (authToken: string, graphName: string): Promise<AxiosResponse<unknown>> => {
  return await axios.post(`/api/user/me/createGraph`,
    { graphName: graphName },
    { headers: { Authorization: authToken } });
}

export const updateExpressionsRequest = async (authToken: string, graphID: string, expressions: string[]): Promise<AxiosResponse<unknown>> => {
  return await axios.put(`/api/graph/${graphID}/branch/me/expressions`,
    { expressions: expressions },
    { headers: { Authorization: authToken } });
}