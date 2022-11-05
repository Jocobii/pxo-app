import React from 'react';
import {
    BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Login from '../features/login';
import AuthGuard from '../guards/AuthGuard';
import Home from '../pages/home/Home';
import NotFound from '../pages/notFound/NotFound';
import RecoveryPassword from '../pages/recovery-password/RecoveryPassword';
import Clientes from '../features/clientes';
import Cotizacion from '../features/cotizacion';

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
                <Route path="/cliente/*" element={<Clientes />} />
                <Route path="/cotizacion/*" element={<Cotizacion />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Navegation;
