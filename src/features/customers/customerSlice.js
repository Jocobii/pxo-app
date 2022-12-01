/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetcher from '../../utils/_request';
import { getCustomer } from './services';

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

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomerList: (state, action) => {
            state.list = action.payload;
            state.data = {};
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
        setData: (state, action) => {
            state.data = action.payload;
        },
        setIsEmpresa: (state) => {
            state.isCompany = !state.isCompany;
        },
    },
});

export const {
    closeModalName, setCustomerList, customerDelete,
    setError, setData, setIsEmpresa,
} = customerSlice.actions;

// Selectors
export const selectCustomerList = (state) => state.customer.list;

// memoized selectors

// Define a thunk that dispatches those action creators

export const saveCustomer = (props) => async (dispatch) => {
    try {
        console.log(props);
        const { error, message, data } = props.id ? await fetcher.put('/customers/', props) : await fetcher.post('/customers/', props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        dispatch(setData(data));
        console.log(data?.id);
        return { newId: data?.id, error, message };
    } catch (error) {
        console.log(error);
        return dispatch(setError());
    }
};

export const getCustomers = (props) => async (dispatch) => {
    try {
        const { error, data, message } = await getCustomer(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        dispatch(setCustomerList(data));
        return { data, message };
    } catch (error) {
        return dispatch(setError());
    }
};

export const getOneCustomer = (props) => async (dispatch) => {
    try {
        const { error, data, message } = await getCustomer(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        dispatch(setData(data));
        return { data, message };
    } catch (error) {
        return dispatch(setError());
    }
};

export default customerSlice.reducer;
