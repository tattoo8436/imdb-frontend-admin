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
  pageIndex: number;
  name: string;
}
