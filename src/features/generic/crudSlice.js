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
                    console.log(action.payload);
                    return action.payload;
                }
                return item;
            });
        },
    },
});

export const {
    setToList, deleteFromList, setCatalogUpdated,
    setError, openModal, closeModal, setNewCatalog,
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
        return { error, message };
    } catch (error) {
        return dispatch(setError());
    }
};

// eslint-disable-next-line consistent-return
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
