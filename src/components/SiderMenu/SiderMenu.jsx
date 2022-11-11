import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { privateRoutes } from '../../routes/routes';
import logo from '../../assets/logo512.png';

const { Sider } = Layout;
const SiderMenu = ({ collapsed }) => {
    const navigate = useNavigate();
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="divLogo">
                <img className="logo" src={logo} alt="logo-img" />
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={privateRoutes.map((route) => ({
                    key: route.path,
                    icon: route?.icon,
                    label: `${route.name}`,
                    children: route?.children?.map((child) => ({
                        key: child.path,
                        icon: child?.icon,
                        label: `${child.label}`,
                        path: child.path,
                        onClick: () => navigate(child.path, { replace: true }),
                    })),
                    onClick: () => (!route?.children?.length
                        ? navigate(route.path, { replace: true }) : null),
                }))}
            />
        </Sider>
    );
};

SiderMenu.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default SiderMenu;
