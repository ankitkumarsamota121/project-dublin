import { ActionTypes } from '../actions/types';
import { IActionType } from '../interfaces/rootInterfaces';

export const userLoginReducer = (state = '', action: IActionType) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return action.payload;
    case ActionTypes.USER_LOGOUT:
      return '';
    default:
      return state;
  }
};
