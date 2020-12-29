import { Model } from 'mongoose';
import { ITodoModel } from './todoInterfaces';
import { IAuth, IUserModel } from './userInterfaces';

export interface IContext {
  User: Model<IUserModel>;
  Todo: Model<ITodoModel>;
  auth: IAuth;
}
