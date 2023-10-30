import axios from "axios";
import { BASE_URL_API } from "../utils";
import { ISearchMovie } from "../utils/type";

export const movieApi = {
  searchMovie: (payload: ISearchMovie) => {
    return axios.post(`${BASE_URL_API}/movie/search`, payload);
  },
  addMovie: (payload: any) => {
    return axios.post(`${BASE_URL_API}/movie`, payload);
  },
  editMovie: (payload: any) => {
    return axios.put(`${BASE_URL_API}/movie`, payload);
  },
  deleteMovie: (payload: any) => {
    return axios.delete(`${BASE_URL_API}/movie`, { data: payload });
  },
  getMovieById: (payload: any) => {
    return axios.post(`${BASE_URL_API}/movie/get`, payload);
  },
  addSeason: (payload: any) => {
    return axios.post(`${BASE_URL_API}/movie/add-season`, payload);
  },
};
