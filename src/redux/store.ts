import { configureStore, combineReducers } from '@reduxjs/toolkit';
import countReducer from './reducers/countReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  count: countReducer,
})
const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware
})

export default store;