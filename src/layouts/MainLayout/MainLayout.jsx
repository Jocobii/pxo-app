import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
    Layout, Row, Col,
} from 'antd';
import './index.css';
import PropTypes from 'prop-types';
import UserMenu from '../../components/UserMenu';
import MainContainer from '../../components/MainContainer/MainContainer';
import SiderMenu from '../../components/SiderMenu/SiderMenu';

const { Header } = Layout;

const getCollapsed = () => !!JSON.parse(localStorage.getItem('@collapsed'));
const saveCollapsed = () => localStorage.setItem('@collapsed', !JSON.parse(localStorage.getItem('@collapsed')));

export const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(getCollapsed);
    return (
        <Layout>
            <SiderMenu collapsed={collapsed} />
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    <Row>
                        <Col span={12}>
                            {collapsed ? (
                                <MenuUnfoldOutlined
                                    className="trigger"
                                    onClick={() => {
                                        setCollapsed(!collapsed);
                                        saveCollapsed();
                                    }}
                                />
                            ) : (
                                <MenuFoldOutlined
                                    className="trigger"
                                    onClick={() => {
                                        setCollapsed(!collapsed);
                                        saveCollapsed();
                                    }}
                                />
                            )}
                        </Col>
                        <Col span={12} style={{ alignContent: 'end' }}>
                            <UserMenu />
                        </Col>
                    </Row>
                </Header>
                <MainContainer>{children}</MainContainer>
            </Layout>
        </Layout>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
};

MainLayout.defaultProps = {
    children: null,
};

export default MainLayout;
