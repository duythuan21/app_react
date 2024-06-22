// redux
import { createStore, combineReducers, applyMiddleware} from 'redux';
//import thunk from 'redux-thunk';
import logger from 'redux-logger';
// reducers
import { leaders } from './leaders';
import { books } from'./books';
import { comments } from './comments';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = { key: 'root', storage: AsyncStorage, debug: true };
const thunk = require('redux-thunk').thunk;//since version 3.x
export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, { leaders, books, comments, promotions, favorites }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};