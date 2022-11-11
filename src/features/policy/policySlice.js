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

export const policySlice = createSlice({
    name: 'policy',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = policySlice.actions;

// Selectors

// memoized selectors

// Define a thunk that dispatches those action creators

export default policySlice.reducer;
