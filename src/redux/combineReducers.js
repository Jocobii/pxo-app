import { combineReducers } from '@reduxjs/toolkit';

import userSlice from '../features/user/userSlice';
import customerSlice from '../features/clientes/customerSlice';

export default combineReducers({
    customer: customerSlice,
    user: userSlice,
});
