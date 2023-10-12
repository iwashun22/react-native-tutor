import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import countReducer from './reducers/countReducer';
import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  count: countReducer,
  todo: todoReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware
})
const persistore = persistStore(store)

export { 
  store, 
  persistore 
};