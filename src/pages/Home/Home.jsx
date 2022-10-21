import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import './index.css';
import MainContainer from '../../components/MainContainer/MainContainer';
import SiderMenu from '../../components/SiderMenu/SiderMenu';

const { Header } = Layout;
const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
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
                    {
                        collapsed
                            ? <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
                            : <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
                    }
                </Header>
                <MainContainer />
            </Layout>
        </Layout>
    );
};
export default Home;
