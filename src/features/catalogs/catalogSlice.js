/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    agencies, cities, policyTypes, banks,
} from './defaultCatalogs';
import { getCarCategories } from './services';

const initialState = {
    carCategories: [],
    carVersions: [],
    agencies,
    cities,
    products: [],
    policyTypes,
    banks,
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
        selCarProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const {
    selCarCategories, selCarVersions, selCarProducts,
} = catalogSlice.actions;

// Selectors
export const selectCatalogs = (state) => state.catalog;
export const selectCarCategories = (state) => state.catalog.carCategories;
export const selectCarVersions = (state) => state.catalog.carVersions;
export const selectCarAgencies = (state) => state.catalog.agencies;
export const selectCarProducts = (state) => state.catalog.products;
export const selectPolicyTypes = (state) => state.catalog.policyTypes;
export const selectBanks = (state) => state.catalog.banks;
// memoized selectors

// Define a thunk that dispatches those action creators

export const getCategories = (categoryId) => async (dispatch) => {
    const { data } = await getCarCategories(categoryId);
    dispatch(selCarCategories(data));
};

export default catalogSlice.reducer;
