import { ActionTypes } from '../actions/types';

export interface IUserLogin {
  type: ActionTypes.USER_LOGIN;
  payload: string;
}

export interface IUserLogout {
  type: ActionTypes.USER_LOGOUT;
  payload: null;
}
