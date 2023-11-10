export interface IAccountLogin {
  username: string;
  password: string;
}

export interface IOption {
  label: any;
  value: any;
}

export interface IAccountRegister {
  username: string;
  password: string;
  email: string;
}

export interface IAccount {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface ISearchActor {
  accountAdmin?: {
    username: string;
    password: string;
  };
  pageIndex: number;
  pageSize: number;
  name?: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IActor {
  accountAdmin?: {
    username: string;
    password: string;
  };
  id?: number | null;
  image: Array<any>;
  name: string;
  description: string;
  dob: any;
}

export interface ISearchDirector {
  accountAdmin?: {
    username: string;
    password: string;
  };
  pageIndex: number;
  pageSize: number;
  name?: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IDirector {
  accountAdmin?: {
    username: string;
    password: string;
  };
  id?: number | null;
  image: Array<any>;
  name: string;
  description: string;
  dob: any;
}

export interface ISearchGenre {
  accountAdmin?: {
    username: string;
    password: string;
  };
  pageIndex: number;
  pageSize: number;
  name?: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IGenre {
  accountAdmin?: {
    username: string;
    password: string;
  };
  id: number | null;
  name: string;
}

export interface ISearchMovie {
  pageIndex: number;
  pageSize: number;
  name: string;
  type: number | null;
  genreId: number | null;
  score: number | null;
  numberVote?: number | null;
  releaseDate: number | string | null;
  language: string | null;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IActorInMovie {
  id: number | null;
  nameInMovie: string;
}
export interface IMovie {
  id: number | null;
  name: string;
  description: string;
  image: Array<any>;
  trailer: string;
  releaseDate: any;
  duration: string;
  type: number | null;
  ended: boolean;
  numberSeason: string;
  numberVote: number;
  score: number;
  language: string;
  listGenres?: Array<IGenre>;
  listGenreIds?: Array<number>;
  listMovieGenres?: Array<any>;
  listActors?: Array<IActorInMovie>;
  listActorIds?: Array<number>;
  listMovieActors?: Array<any>;
  director?: IDirector;
  directorId?: number | null;
  listDirectorIds?: Array<number>;
  listMovieDirectors?: Array<any>;
  listEpisode?: Array<any>;
  numberLastVote?: number;
}

export interface IEpisode {
  id: number | null;
  ep: number;
  season: number;
  name: string;
  description: string;
  image: Array<any>;
  releaseDate: any;
  duration: string;
  numberVote: number;
  score: number;
  listMovieActorIds?: number[];
  listMovieActorEpisodes?: any[];
}

export interface IMovieStatistic {
  id: number;
  name: string;
  listNumberVotes: number[];
}
