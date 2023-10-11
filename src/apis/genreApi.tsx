import axios from "axios";
import { BASE_URL_API } from "../utils";
import { ISearchActor } from "../utils/type";

export const genreApi = {
  searchGenre: (payload: ISearchActor) => {
    return axios.post(`${BASE_URL_API}/genre/search`, payload);
  },
  addGenre: (payload: any) => {
    return axios.post(`${BASE_URL_API}/genre`, payload);
  },
  editGenre: (payload: any) => {
    return axios.put(`${BASE_URL_API}/genre`, payload);
  },
  deleteGenre: (payload: any) => {
    return axios.delete(`${BASE_URL_API}/genre`, { data: payload });
  },
};
