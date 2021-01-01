import { ActionTypes } from '../actions';

export interface IStoreState {
  token: string;
}

export interface IActionType {
  type: ActionTypes;
  payload: string;
}
