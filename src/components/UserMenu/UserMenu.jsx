import React from 'react';

import {
    LogoutOutlined, UserOutlined, ProfileOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../features/user/utils/user.localstorage';
import { userLogout, selectUserFullName } from '../../features/user/userSlice';

const getUserEmail = () => `${getUserData()?.email}`;

export const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserFullName);
    const logout = async () => {
        await dispatch(userLogout(getUserEmail()));
        navigate('/login', { replace: true });
    };

    const items = [
        {
            key: 'menu-user',
            icon: <UserOutlined />,
            label: userName,
            children: [
                {
                    key: 'menu-user-profile',
                    icon: <ProfileOutlined />,
                    label: 'Perfil',
                    onClick: () => navigate('/user/profile'),
                },
                {
                    key: 'menu-user-logout',
                    icon: <LogoutOutlined />,
                    label: 'Cerrar sesión',
                    onClick: () => logout(),
                },
            ],
        },
    ];

    return (<Menu style={{ display: 'flex', flexDirection: 'row-reverse' }} mode="horizontal" items={items} />);
};

export default UserMenu;
