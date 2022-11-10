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

export const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = quoteSlice.actions;

// Selectors

// memoized selectors

// Define a thunk that dispatches those action creators

export default quoteSlice.reducer;
