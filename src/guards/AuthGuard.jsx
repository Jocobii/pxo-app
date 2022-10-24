import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const AuthGuard = () => {
    const userState = useSelector((state) => state.user.data.name);
    return (
        userState ? (
            <MainLayout>
                <Outlet />
            </MainLayout>
        ) : <Navigate replace to="/login" />
    );
};

export default AuthGuard;
