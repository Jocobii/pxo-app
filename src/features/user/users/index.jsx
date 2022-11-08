import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../../pages/notFound/NotFound';
import Table from './pages/table/Table';

const index = () => (
    <Routes>
        <Route exact path="/" element={<Table />} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
);

export default index;
