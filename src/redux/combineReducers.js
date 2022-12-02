import { combineReducers } from '@reduxjs/toolkit';

import user from '../features/user/userSlice';
import customer from '../features/customers/customerSlice';
import policy from '../features/policy/policySlice';
import quote from '../features/quotes/quoteSlice';
import catalog from '../features/catalogs/catalogSlice';
import crud from '../features/generic/genericSlice';

export default combineReducers({
    catalog,
    crud,
    customer,
    policy,
    quote,
    user,
});
