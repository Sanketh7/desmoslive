import axios, { AxiosResponse } from "axios";

export const createGraphRequest = async (authToken: string, graphName: string): Promise<AxiosResponse<unknown>> => {
  return await axios.post(`/api/user/me/createGraph`,
    { graphName: graphName },
    { headers: { Authorization: authToken } });
}