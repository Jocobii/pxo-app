import React from 'react';
import PropTypes from 'prop-types';
import {
    UserOutlined,
} from '@ant-design/icons';
import './index.css';
import { Layout, Menu } from 'antd';
import routes from '../../routes/routes';

const { Sider } = Layout;
const SiderMenu = ({ collapsed }) => (
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={routes.map((route) => ({
                key: route.path,
                icon: <UserOutlined />,
                label: route.name,
            }))}
        />
    </Sider>
);

SiderMenu.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default SiderMenu;
