import axios from "axios";
import { BASE_URL_API } from "../utils";

export const fileApi = {
  uploadImage: (payload: any) => {
    return axios.post(`${BASE_URL_API}/image/upload`, payload);
  },
};
