/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetcher from '../../utils/_request';

const initialState = {
    loading: false,
    data: {},
    pagination: {},
    list: [],
    modalName: '',
    index: '',
    error: null,
};

export const policySlice = createSlice({
    name: 'policy',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        savePolicy: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const {
    setLoading, savePolicy,
} = policySlice.actions;

// Selectors

// memoized selectors

// Define a thunk that dispatches those action creators

export const createPolicy = (props) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        console.log('props', props);
        const { error, message, data } = await fetcher.post('/policies/', props);
        dispatch(savePolicy({ ...data, car: data.car, customer: data.customer }));
        dispatch(setLoading(false));
        return { error, message };
    } catch (error) {
        dispatch(setLoading(false));
        return error;
    }
};

export default policySlice.reducer;
