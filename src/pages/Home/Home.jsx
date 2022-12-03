import React from 'react';
import { Row } from 'antd';
import grupoOptimaLogo from '../../assets/PXLogo.png';

const Home = () => (
    <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
        <div style={{ width: '100%', height: '100%' }}>
            <img
                alt="logo"
                style={{ opacity: 0.3 }}
                src={grupoOptimaLogo}
                width="100%"
                height="100%"
            />
        </div>
    </Row>
);
export default Home;
