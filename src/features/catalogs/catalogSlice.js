/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { agencies, cities } from './defaultCatalogs';

const initialState = {
    carCategories: [],
    carVersions: [],
    agencies,
    cities,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        selCarCategories: (state, action) => {
            state.carCategories = action.payload;
        },
        selCarVersions: (state, action) => {
            state.carVersions = action.payload;
        },
    },
});

export const {
    selCarCategories, selCarVersions,
} = catalogSlice.actions;

// Selectors
export const selectCatalogs = (state) => state.catalog;
export const selectCarCategories = (state) => state.catalog.carCategories;
export const selectCarVersions = (state) => state.catalog.carVersions;
export const selectCarAgencies = (state) => state.catalog.agencies;
// memoized selectors

// Define a thunk that dispatches those action creators

export default catalogSlice.reducer;
