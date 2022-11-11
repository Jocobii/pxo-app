import { combineReducers } from '@reduxjs/toolkit';

import userSlice from '../features/user/userSlice';
import customerSlice from '../features/customers/customerSlice';
import productSlice from '../features/products/productSlice';
import quoteSlice from '../features/quotes/quoteSlice';

export default combineReducers({
    customer: customerSlice,
    user: userSlice,
    product: productSlice,
    quote: quoteSlice,
});
