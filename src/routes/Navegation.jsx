import React from 'react';
import {
    BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Login from '../features/user';
import AuthGuard from '../guards/AuthGuard';
import Home from '../pages/Home';
import NotFound from '../pages/notFound/NotFound';
import RecoveryPassword from '../pages/recovery-password/RecoveryPassword';
import Customer from '../features/customers';
import Cotizacion from '../features/quotes';
import Profile from '../features/user/profile';
import Users from '../features/user/users';
import Policy from '../features/policy';
import Catalogos from '../features/generic';

const Navegation = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recovery-password" element={<RecoveryPassword />} />
            <Route element={<AuthGuard />}>
                <Route path="/*" element={<NotFound />} />
                <Route path="/home" element={<Home />} />
                <Route path="/customer/*" element={<Customer />} />
                <Route path="/quote/*" element={<Cotizacion />} />
                <Route path="/user/*" element={<Profile />} />
                <Route path="/users/*" element={<Users />} />
                <Route path="/policy/*" element={<Policy />} />
                <Route path="/catalogo/*" element={<Catalogos />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Navegation;
