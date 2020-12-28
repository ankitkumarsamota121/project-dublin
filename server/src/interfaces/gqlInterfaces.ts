import { Model } from 'mongoose';
import { IUser } from './userInterfaces';

export interface IContext {
  User: Model<IUser>;
}
