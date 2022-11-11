import React from 'react';
import {
    Row, Button, Col,
} from 'antd';

const HeaderButtons = () => (
    <Row justify="space-between" style={{ marginBottom: '1rem' }}>
        <Col>
            <Button type="primary" style={{ marginRight: '1rem' }}>
                Filtro 1
            </Button>
            <Button type="primary" style={{ marginRight: '1rem' }}>
                Filtro 2
            </Button>
            <Button type="primary" style={{ marginRight: '1rem' }}>
                Filtro 3
            </Button>
        </Col>
        <Col>
            <Button type="primary">Agregar</Button>
        </Col>
    </Row>
);

export default HeaderButtons;
