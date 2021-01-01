import { ActionTypes } from './types';

export const login = (token: string) => {
  try {
    localStorage.setItem('token', JSON.stringify(token));

    return {
      type: ActionTypes.USER_LOGIN,
      payload: token,
    };
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => {
  try {
    localStorage.setItem('token', '');

    return {
      type: ActionTypes.USER_LOGOUT,
      payload: '',
    };
  } catch (err) {
    console.log(err);
  }
};
