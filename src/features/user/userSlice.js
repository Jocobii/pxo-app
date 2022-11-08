/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { signIn, logout } from './services/auth/auth.service';
import { saveUserData, getUserData, removeUserData } from './utils/user.localstorage';
import { updatedUser, getAllUsers, createAUser } from './services/user/user.service';

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
    list: [],
    modalName: '',
    index: '',
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
        usersList: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        openModalName: (state, action) => {
            state.modalName = action.payload.modalName;
            state.index = action.payload.index;
        },
        closeModalName: (state) => {
            state.modalName = null;
            state.index = null;
        },
        createNewUser: (state, action) => {
            state.list.unshift(action.payload);
        },
        updateUsers: (state, action) => {
            const dataFiltered = state.list.filter((item) => item.id !== action.payload.id);
            state.list = [...dataFiltered, action.payload];
            state.loading = false;
            state.error = false;
        },
    },
});

export const {
    usersLoading, usersError, createNewUser,
    createOrUpdateUser, usersList, openModalName,
    usersLogout, usersToken, closeModalName,
    usersUpdate, updateUsers,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.data;
export const selectUserFullName = (state) => `${state.user.data.first_name} ${state.user.data.first_last_name}`;
export const selectModalName = (state) => state.user.modalName;
export const selectUserId = (state) => state.user.index;
export const selectUserList = (state) => state.user.list;

// memoized selectors

export const selectUserById = createSelector(
    selectUserId,
    selectUserList,
    (
        id,
        userList = [],
    ) => userList.find((e) => e.id === Number(id) || []),
);

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

export const createUser = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await createAUser(values);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    dispatch(createNewUser(data));
    return { error, message };
};

export const updateMyUser = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await updatedUser(values);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    const accessToken = !data?.accessToken ? getUserData().accessToken : '';
    console.log({ ...data, accessToken });
    saveUserData({ ...data, accessToken });
    dispatch(createOrUpdateUser(data));
    return { error, message };
};

export const updateUser = (values) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await updatedUser(values);
    console.log('user update', error, message, data);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    dispatch(updateUsers(data));
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

export const getUserList = (params) => async (dispatch) => {
    dispatch(usersLoading());
    const { error, message, data } = await getAllUsers(params);
    if (error) {
        dispatch(usersError(error));
        return { error, message };
    }
    dispatch(usersList(data));
    return { error, message };
};

export default userSlice.reducer;
