import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/login/userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userSlice,
    },
});

export default store;
