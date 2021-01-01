import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

// Interfaces
import { IToken } from './interfaces/rootInterfaces';

let tokenFromStorage: IToken | null = null;

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    tokenFromStorage = JSON.parse(token);
  }
}

const initialState = {
  userLogin: { token: tokenFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const Root = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
