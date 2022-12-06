/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    cities,
} from './defaultCatalogs';
import { getCarCategories, getInitCatalogs } from './services';

const initialState = {
    agencies: [],
    banks: [],
    carCategories: [],
    carVersions: [],
    cities,
    isInitCatalogsLoaded: false,
    policyTypes: [],
    products: [],
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
        setInitCatalogs: (state, action) => ({
            ...state,
            ...action.payload,
            isInitCatalogsLoaded: true,
        }),
    },
});

export const {
    selCarCategories, selCarVersions, selCarProducts,
    setInitCatalogs, initCatalogLoaded,
} = catalogSlice.actions;

// Selectors
export const selectCatalogs = (state) => state.catalog;
export const selectCarCategories = (state) => state.catalog.carCategories;
export const selectCarVersions = (state) => state.catalog.carVersions;
export const selectCarAgencies = (state) => state.catalog.agencies;
export const selectCarProducts = (state) => state.catalog.products;
export const selectPolicyTypes = (state) => state.catalog.policyTypes;
export const selectBanks = (state) => state.catalog.banks;
export const selectIsInitCatalogLoaded = (state) => state.catalog.isInitCatalogsLoaded;
// memoized selectors

// Define a thunk that dispatches those action creators

export const getCategories = (categoryId) => async (dispatch) => {
    const { data } = await getCarCategories(categoryId);
    dispatch(selCarCategories(data));
};

export const getInitialCatalogs = () => async (dispatch) => {
    const { error, message, data } = await getInitCatalogs();
    if (error) {
        console.log(message);
        return;
    }
    dispatch(setInitCatalogs(data));
};
export default catalogSlice.reducer;
