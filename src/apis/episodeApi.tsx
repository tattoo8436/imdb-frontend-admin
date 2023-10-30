import axios from "axios";
import { BASE_URL_API } from "../utils";

export const episodeApi = {
  addEpisode: (payload: any) => {
    return axios.post(`${BASE_URL_API}/episode`, payload);
  },
  editEpisode: (payload: any) => {
    return axios.put(`${BASE_URL_API}/episode`, payload);
  },
  deleteEpisode: (payload: any) => {
    return axios.delete(`${BASE_URL_API}/episode`, { data: payload });
  },
};
