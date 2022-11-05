import React from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { privateRoutes } from '../../routes/routes';

const { Sider } = Layout;
const SiderMenu = ({ collapsed }) => {
    const navigate = useNavigate();
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={privateRoutes.map((route) => ({
                    key: route.path,
                    icon: <UserOutlined />,
                    label: `${route.name}`,
                    onClick: () => navigate(route.path, { replace: true }),
                    children: route?.children,
                }))}
            />
        </Sider>
    );
};

SiderMenu.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default SiderMenu;
