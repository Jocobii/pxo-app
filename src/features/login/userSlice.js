/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    data: { name: 'Alex' },
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.loading = true;
            state.data = action.payload;
            state.error = false;
        },
    },
});

export const { createUser } = userSlice.actions;

// Selectors

// state-changing functions

export default userSlice.reducer;
