import { IUserLogin, IUserLogout } from '../interfaces/actionInterfaces';

export enum ActionTypes {
  USER_LOGIN,
  USER_LOGOUT,
}

export type Action = IUserLogin | IUserLogout;
