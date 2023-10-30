import { IActor, IDirector, IEpisode, IGenre, IMovie } from "./type";

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

export const DEFAULT_MOVIE: IMovie = {
  id:  null,
  name: '',
  description: '',
  image: [],
  trailer: '',
  listGenreIds: [],
  listActors: [{id: null, nameInMovie: ''}],
  listDirectorIds: [],
  directorId: null,
  releaseDate: null,
  duration: '',
  type: 1,
  ended: true,
  numberSeason: '',
  numberVote: 0,
  score: 0,
  language: 'ENGLISH',
};

export const DEFAULT_EPISODE: IEpisode = {
  id:  null,
  ep: 1,
  season: 1,
  name: '',
  description: '',
  image: [],
  releaseDate: null,
  duration: '',
  numberVote: 0,
  score: 0,
};