import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/notFound/NotFound';
import CategoriesTable from './pages/categories/Table';
import VersionTable from './pages/versions';
import BanksTable from './pages/bank';

const index = () => (
    <Routes>
        <Route exact path="/categories" element={<CategoriesTable />} />
        <Route exact path="/versions" element={<VersionTable />} />
        <Route exact path="/banks" element={<BanksTable />} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
);

export default index;
