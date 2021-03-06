import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

let tokenFromStorage: string = '';

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    tokenFromStorage = JSON.parse(token);
  }
}

const initialState = {
  token: tokenFromStorage,
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const Root = ({ children }: { children: React.FC }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
