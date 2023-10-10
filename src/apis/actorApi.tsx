import axios from "axios";
import { BASE_URL_API } from "../utils";
import { ISearchActor } from "../utils/type";

export const actorApi = {
  searchActor: (payload: ISearchActor) => {
    return axios.post(`${BASE_URL_API}/actor/search`, payload);
  },
  addActor: (payload: any) => {
    return axios.post(`${BASE_URL_API}/actor`, payload);
  },
  editActor: (payload: any) => {
    return axios.put(`${BASE_URL_API}/actor`, payload);
  },
  deleteActor: (payload: any) => {
    return axios.delete(`${BASE_URL_API}/actor`, { data: payload });
  },
};
