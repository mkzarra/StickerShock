import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import imagesReducer from './reducers/images';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
  images: imagesReducer,
  ui: uiReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
