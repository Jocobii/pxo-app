/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './services/auth/auth.service';
import { saveUserData, getUserData } from './utils/user.localstorage';

const userData = getUserData() || {};
const initialState = {
    loading: false,
    data: userData,
    loggedIn: !!userData.id,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = false;
        },
        usersLoading: (state) => {
            state.loading = true;
        },
        usersError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    createUser, usersLoading, usersError,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.data;

// Define a thunk that dispatches those action creators

export const login = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await signIn(values);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    dispatch(createUser(data));
    saveUserData(data);
    return { error, message };
};

export default userSlice.reducer;
