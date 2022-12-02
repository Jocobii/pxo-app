/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import fetcher from '../../utils/_request';

const initialState = {
    loading: false,
    data: {},
    pagination: {},
    list: [],
    modalName: '',
    index: '',
    error: null,
    isCompany: false,
};

export const crudSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {
        setToList: (state, action) => {
            state.list = action.payload;
            state.data = {};
        },
        deleteFromList: (state, action) => {
            state.list = state.list.filter((item) => item.id !== action.payload);
        },
        setError: (state) => {
            state.error = true;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const {
    setToList, deleteFromList,
    setError,
} = crudSlice.actions;

// Selectors
export const selectCrudList = (state) => state.crud.list;
export const selectCrudData = (state) => state.crud.data;

// memoized selectors

// Define a thunk that dispatches those action creators

export default crudSlice.reducer;
