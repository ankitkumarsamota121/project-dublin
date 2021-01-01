import { combineReducers } from 'redux';
import { IStoreState } from '../interfaces/rootInterfaces';

import { userLoginReducer } from './userReducers';

export default combineReducers<IStoreState>({
  token: userLoginReducer,
});
