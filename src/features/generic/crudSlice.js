/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    getAnyCatalog, addOrUpdateCatalog, deleteAnyCatalog,
} from './services';

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
    modal: '',
    reducers: {
        setToList: (state, action) => {
            state.list = action.payload.data;
            state.pagination = action.payload.info;
            state.loading = false;
        },
        openModal: (state, action) => {
            state.modalName = action.payload.modalName;
            state.index = action.payload.index;
        },
        closeModal: (state) => {
            state.modalName = null;
            state.index = null;
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
        setNewCatalog: (state, action) => {
            state.list.unshift(action.payload);
            state.loading = false;
        },
        setCatalogUpdated: (state, action) => {
            state.list = state.list.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...action.payload };
                }
                return item;
            });
        },
        updateWarrantyOfProduct: (state, action) => {
            state.list = state.list.map((item) => {
                if (item.id === action.payload.categoryId) {
                    item.warranties = item.warranties.map((warranty) => {
                        if (warranty.id === action.payload.warrantyId) {
                            return action.payload.warranty;
                        }
                        return warranty;
                    });
                }
                return item;
            });
        },
        setWarrantyOfProduct: (state, action) => {
            state.list = state.list.map((item) => {
                if (item.id === action.payload.categoryId) {
                    if (!item.warranties) item.warranties = [];
                    item.warranties.unshift(action.payload.warranty);
                }
                return item;
            });
        },
        deleteWarrantyOfProduct: (state, action) => {
            state.list = state.list.map((item) => {
                if (item.id === action.payload.categoryId) {
                    item.warranties = item.warranties
                        .filter((warranty) => warranty.id !== action.payload.warrantyId);
                }
                return item;
            });
        },
    },
});

export const {
    setToList, deleteFromList, setCatalogUpdated,
    setError, openModal, closeModal, setNewCatalog,
    updateWarrantyOfProduct, deleteWarrantyOfProduct,
    setWarrantyOfProduct,
} = crudSlice.actions;

// Selectors
export const selectCrudList = (state) => state.crud.list;
export const selectCrudData = (state) => state.crud.data;
export const selectPagination = (state) => state.crud.pagination;
export const selectLoading = (state) => state.crud.loading;

// memoized selectors

// Define a thunk that dispatches those action creators

export const getCatalogList = (props) => async (dispatch) => {
    try {
        const {
            error, message, data, info,
        } = await getAnyCatalog(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        dispatch(setToList({ data, info }));
        return { error, message };
    } catch (error) {
        return dispatch(setError());
    }
};

export const addOrUpdate = (props) => async (dispatch) => {
    try {
        const {
            error, message, data,
        } = await addOrUpdateCatalog(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        if (props?.id) dispatch(setCatalogUpdated(data));
        else dispatch(setNewCatalog(data));
        return { error, message, data };
    } catch (error) {
        return dispatch(setError());
    }
};

export const addOrUpdateWarranties = (props) => async (dispatch) => {
    try {
        const {
            error, message, data,
        } = await addOrUpdateCatalog(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        if (props?.id) {
            dispatch(updateWarrantyOfProduct({
                categoryId: props.categoryId,
                warrantyId: props.id,
                warranty: data,
            }));
        } else dispatch(setWarrantyOfProduct({ categoryId: props.categoryId, warranty: data }));
        return { error, message, data };
    } catch (error) {
        return dispatch(setError());
    }
};

export const deleteCatalog = (props) => async (dispatch) => {
    try {
        const {
            error, message,
        } = await deleteAnyCatalog(props);
        if (error) {
            dispatch(setError());
            return { error, message };
        }
        dispatch(deleteFromList(props.id));
        return { error, message };
    } catch (error) {
        return dispatch(setError());
    }
};

export default crudSlice.reducer;
