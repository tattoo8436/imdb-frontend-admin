import axios from "axios"
import { BASE_URL_API } from "../utils"
import { IAccountLogin } from "../utils/type";

export const actorApi = {
    getAllActors: () => {
        return axios.get(`${BASE_URL_API}/actor`);
    }
}