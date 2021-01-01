import { IActionType } from '../interfaces/rootInterfaces';
import { ActionTypes } from './types';

export const login = (token: string): IActionType => {
  try {
    localStorage.setItem('token', JSON.stringify(token));

    return {
      type: ActionTypes.USER_LOGIN,
      payload: token,
    };
  } catch (err) {
    console.log(err);
    return {
      type: ActionTypes.USER_LOGIN,
      payload: '',
    };
  }
};

export const logout = (): IActionType => {
  try {
    localStorage.setItem('token', '');

    return {
      type: ActionTypes.USER_LOGOUT,
      payload: '',
    };
  } catch (err) {
    console.log(err);
    return {
      type: ActionTypes.USER_LOGOUT,
      payload: '',
    };
  }
};
