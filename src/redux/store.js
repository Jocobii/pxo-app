import { configureStore } from '@reduxjs/toolkit';
// import userSlice from '../features/user/userSlice';
import rootReducer from './combineReducers';

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
