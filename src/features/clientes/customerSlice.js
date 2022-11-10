/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    data: {},
    pagination: {},
    list: [],
    modalName: '',
    index: '',
    error: null,
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.list = action.payload;
        },
        closeModalName: (state) => {
            state.modalName = null;
            state.index = null;
        },
        customerDelete: (state, action) => {
            state.list = state.list.filter((item) => item.id !== action.payload);
        },
    },
});

export const {
    closeModalName, setData, customerDelete,
} = customerSlice.actions;

// Selectors
export const selectCustomerList = (state) => state.customer.list;

// memoized selectors

// Define a thunk that dispatches those action creators

export default customerSlice.reducer;
