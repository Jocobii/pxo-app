import React from 'react';

import {
    LogoutOutlined, UserOutlined, ProfileOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Menu, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../features/user/utils/user.localstorage';
import { userLogout } from '../../features/user/userSlice';

const getUserName = () => `${getUserData()?.firstName} ${getUserData()?.firstLastName}`;
const getUserEmail = () => `${getUserData()?.email}`;

export const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        const { error } = await dispatch(userLogout(getUserEmail()));
        if (error) {
            message.error('Error al cerrar sesión');
            return;
        }
        navigate('/login', { replace: true });
    };

    const items = [
        {
            key: 'menu-user',
            icon: <UserOutlined />,
            label: getUserName(),
            children: [
                {
                    key: 'menu-user-logout',
                    icon: <LogoutOutlined />,
                    label: 'Cerrar sesión',
                    onClick: () => logout(),
                },
                {
                    key: 'menu-user-profile',
                    icon: <ProfileOutlined />,
                    label: 'Perfil',
                    onClick: () => navigate('/user/profile'),
                },
            ],
        },
    ];

    return (<Menu mode="horizontal" items={items} />);
};

export default UserMenu;
