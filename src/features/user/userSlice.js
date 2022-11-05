/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { signIn, logout } from './services/auth/auth.service';
import { saveUserData, getUserData, removeUserData } from './utils/user.localstorage';

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
        usersLogout: (state) => {
            state.loading = false;
            state.data = {};
            state.loggedIn = false;
            state.error = false;
        },
    },
});

export const {
    createUser, usersLoading, usersError,
    usersLogout,
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

export const userLogout = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message } = await logout(values);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    dispatch(usersLogout());
    removeUserData();
    return { error, message };
};

export default userSlice.reducer;
