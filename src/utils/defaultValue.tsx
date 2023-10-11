import { IActor, IDirector, IGenre } from "./type";

export const DEFAULT_ACTOR: IActor = {
  id: null,
  image: [],
  name: "",
  description: "",
  dob: null,
};

export const DEFAULT_DIRECTOR: IDirector = {
  id: null,
  image: [],
  name: "",
  description: "",
  dob: null,
};

export const DEFAULT_GENRE: IGenre = {
  id: null,
  name: "",
};
