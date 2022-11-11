import React from 'react';
import { Row, Col } from 'antd';
import grupoOptimaLogo from '../../assets/grupo-optima.png';

const Home = () => (
    <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col style={{ }}>
            <img
                alt="logo"
                style={{ opacity: 0.3 }}
                // style={{ height: '80%', width: '80%' }}
                src={grupoOptimaLogo}
            />
        </Col>
    </Row>
);
export default Home;
