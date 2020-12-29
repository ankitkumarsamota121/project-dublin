import { Document } from 'mongoose';
import { IUser } from './userInterfaces';

export interface ITodo extends Document {
  desc: string;
  user: IUser;
}

export interface ICreateTodoArgs {
  desc: string;
}
