import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import globalReducer from './modules/global';

const middleware = [];
const reducers = combineReducers({
  global: globalReducer,
});
const generateStore = () => {
  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }
  return window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducers,
        compose(
          applyMiddleware(...middleware),
          window.__REDUX_DEVTOOLS_EXTENSION__({})
        )
      )
    : createStore(reducers, applyMiddleware(...middleware));
};

const store = generateStore();
export default store;
