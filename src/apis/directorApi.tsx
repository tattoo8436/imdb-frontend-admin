import axios from "axios";
import { BASE_URL_API } from "../utils";
import { ISearchDirector } from "../utils/type";

export const directorApi = {
  searchDirector: (payload: ISearchDirector) => {
    return axios.post(`${BASE_URL_API}/director/search`, payload);
  },
  addDirector: (payload: any) => {
    return axios.post(`${BASE_URL_API}/director`, payload);
  },
  editDirector: (payload: any) => {
    return axios.put(`${BASE_URL_API}/director`, payload);
  },
  deleteDirector: (payload: any) => {
    return axios.delete(`${BASE_URL_API}/director`, { data: payload });
  },
};
