import { Document } from 'mongoose';
import { ITodo } from './todoInterfaces';

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  todos?: ITodo[];
  matchPassword(password: string): Promise<boolean>;
}

export interface IGetUserArgs {
  id: string;
}

export interface IAuthResp {
  user: IUser;
  token: string;
}

export interface IAuth {
  userId?: string;
  isAuth: boolean;
}

export interface ILoginArgs {
  email: IUser['email'];
  password: IUser['password'];
}
