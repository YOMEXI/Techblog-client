export interface UserInput {
  email: string;
  password: string;
  username?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface DisplayUser {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
  imgUrl: string;
}
