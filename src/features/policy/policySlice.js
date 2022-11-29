/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetcher from '../../utils/_request';
import policiesServices from './pages/services';

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
        savePolicyList: (state, action) => {
            state.list = action.payload;
            state.data = {};
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setLoading, savePolicy, savePolicyList,
    setError,
} = policySlice.actions;

// Selectors

export const selectPolicyList = (state) => state.policy.list;
export const selectPolicyData = (state) => state.policy.data;
// memoized selectors

// Define a thunk that dispatches those action creators

export const createPolicy = (props) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { error, message, data } = await fetcher.post('/policies/', props);
        if (error) {
            dispatch(setError(true));
            return { error, message };
        }
        dispatch(savePolicy({ ...data, car: data.car, customer: data.customer }));
        dispatch(setLoading(false));
        return { error, message, id: data?.id };
    } catch (error) {
        dispatch(setLoading(false));
        return error;
    }
};

export const updatePolicy = (props) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { error, message, data } = await policiesServices.updatePolicy(props);
        console.log('data updated', data);
        if (error) {
            dispatch(setError(true));
            return { error, message };
        }
        dispatch(savePolicy(data));
        dispatch(setLoading(false));
        return { error, message };
    } catch (error) {
        dispatch(setLoading(false));
        return error;
    }
};

export const getPolicies = (props) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { error, message, data } = await policiesServices.getPolicies(props);
        if (props.id) {
            dispatch(savePolicy(data));
        } else dispatch(savePolicyList(data));

        dispatch(setLoading(false));
        return { error, message };
    } catch (error) {
        dispatch(setLoading(false));
        return error;
    }
};
export default policySlice.reducer;
