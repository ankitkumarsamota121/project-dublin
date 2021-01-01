import { ActionTypes } from '../actions/types';

export const userLoginReducer = (state = '', action: any) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return action.payload;
    case ActionTypes.USER_LOGOUT:
      return '';
    default:
      return state;
  }
};
