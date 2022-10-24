import React from 'react';
import { Row, Col } from 'antd';

const Home = () => (
    <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col style={{ }}>
            <img
                alt="logo"
                style={{ opacity: 0.3 }}
                // style={{ height: '80%', width: '80%' }}
                src="http://www.alasdeeric.com/gdc/archivos/Screen%20Shot%202019-10-24%20at%2011.24.37%20PM(1).png"
            />
        </Col>
    </Row>
);
export default Home;
