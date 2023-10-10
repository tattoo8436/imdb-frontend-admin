export interface IAccountLogin {
  username: string;
  password: string;
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
  username: string;
  password: string;
  pageIndex: number;
  pageSize: number;
  name: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IActor {
  id: number | null;
  image: any;
  name: string;
  description: string;
  dob: any;
}

export interface ISearchDirector {
  username: string;
  password: string;
  pageIndex: number;
  pageSize: number;
  name: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IDirector {
  id: number | null;
  image: any;
  name: string;
  description: string;
  dob: any;
}
