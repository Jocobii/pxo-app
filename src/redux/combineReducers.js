import { combineReducers } from '@reduxjs/toolkit';

import userSlice from '../features/user/userSlice';
import customerSlice from '../features/customers/customerSlice';
import policySlice from '../features/policy/policySlice';
import quoteSlice from '../features/quotes/quoteSlice';

export default combineReducers({
    customer: customerSlice,
    user: userSlice,
    policy: policySlice,
    quote: quoteSlice,
});
