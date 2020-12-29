import { Model } from 'mongoose';
import { ITodo } from './todoInterfaces';
import { IAuth, IUser } from './userInterfaces';

export interface IContext {
  User: Model<IUser>;
  Todo: Model<ITodo>;
  auth: IAuth;
}
