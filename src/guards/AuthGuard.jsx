import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CatalogGuard from './CatalogGuard';

const AuthGuard = () => {
    const userState = useSelector((state) => state.user?.data?.id);
    return (
        userState ? (
            <MainLayout>
                <CatalogGuard />
                <Outlet />
            </MainLayout>
        ) : <Navigate replace to="/login" />
    );
};

export default AuthGuard;
