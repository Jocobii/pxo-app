import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/notFound/NotFound';
import CategoriesTable from './pages/categories/Table';

const index = () => (
    <Routes>
        <Route exact path="/categories" element={<CategoriesTable />} />
        <Route exact path="/versions" element={<CategoriesTable />} />
        <Route exact path="/products" element={<CategoriesTable />} />
        <Route exact path="/banks" element={<CategoriesTable />} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
);

export default index;
