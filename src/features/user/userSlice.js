/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { signIn, logout } from './services/auth/auth.service';
import { saveUserData, getUserData, removeUserData } from './utils/user.localstorage';
import { updatedUser } from './services/user/user.service';

const getData = () => {
    const userData = getUserData() || {};
    if (userData?.accessToken) delete userData.accessToken;
    return userData;
};

const userData = getData();

const initialState = {
    loading: false,
    data: userData,
    loggedIn: !!userData.id,
    accessToken: getUserData()?.accessToken || '',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createOrUpdateUser: (state, action) => {
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
        usersToken: (state, action) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
        },
    },
});

export const {
    createUser, usersLoading, usersError,
    createOrUpdateUser,
    usersLogout, usersToken,
    usersUpdate,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.data;
export const selectUserFullName = (state) => `${state.user.data.firstName} ${state.user.data.firstLastName}`;

// Define a thunk that dispatches those action creators

export const login = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await signIn(values);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    saveUserData(data);
    dispatch(usersToken(data));
    delete data.accessToken;
    dispatch(createOrUpdateUser(data));
    return { error, message };
};

export const updateUser = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await updatedUser(values);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }

    const accessToken = !data?.accessToken ? getUserData().accessToken : '';

    saveUserData({ ...data, accessToken });
    dispatch(createOrUpdateUser(data));
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
