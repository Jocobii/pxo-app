/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getCustomerList from './services';

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
        setCustomerList: (state, action) => {
            state.list = action.payload;
        },
        closeModalName: (state) => {
            state.modalName = null;
            state.index = null;
        },
        customerDelete: (state, action) => {
            state.list = state.list.filter((item) => item.id !== action.payload);
        },
        setError: (state) => {
            state.error = true;
        },
    },
});

export const {
    closeModalName, setCustomerList, customerDelete,
    setError,
} = customerSlice.actions;

// Selectors
export const selectCustomerList = (state) => state.customer.list;

// memoized selectors

// Define a thunk that dispatches those action creators

export const getCustomer = (props) => async (dispatch) => {
    try {
        const { error, data, message } = await getCustomerList(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        dispatch(setCustomerList(data));
        return { data, message };
    } catch (error) {
        console.log(error);
        return dispatch(setError());
    }
};

export default customerSlice.reducer;
