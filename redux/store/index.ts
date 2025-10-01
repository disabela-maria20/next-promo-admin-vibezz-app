'use client';
import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
