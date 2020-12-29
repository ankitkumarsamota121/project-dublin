import { Document, Types } from 'mongoose';
import { ITodo } from './todoInterfaces';

export interface IUser {
  name: string;
  email: string;
  password: string;
  todos: Types.ObjectId[] | ITodo[];
}

export interface IUserModel extends IUser, Document {
  matchPassword(password: string): Promise<boolean>;
}

export interface IAuthResp {
  user: IUser;
  token: string;
}

export interface IDelUserResp {
  success: boolean;
  message: string;
}

export interface IAuth {
  userId?: Types.ObjectId;
  isAuth: boolean;
}

export interface ILoginArgs {
  email: IUser['email'];
  password: IUser['password'];
}

export interface IRegisterArgs {
  email: IUser['email'];
  name: IUser['name'];
  password: IUser['password'];
}
