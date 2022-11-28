import React from 'react';
import {
    Row, Button, Col, Input, Select,
} from 'antd';

const searchFields = [
    { id: 'email', text: 'Distribuidor' },
    { id: 'first_name', text: 'Nombre completo' },
    { id: 'first_last_name', text: 'Telefono' },
    { id: 'second_last_name', text: 'VIN' },
];

const HeaderButtons = () => (
    <>
        <Row
            style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginBottom: '10px',
            }}
        >
            <Input.Search
                style={{ width: '30%' }}
                addonBefore={(
                    <Select
                        defaultValue="second_last_name"
                    >
                        {searchFields.map((e) => (
                            <Select.Option key={e.id} value={e.id}>
                                {e.text}
                            </Select.Option>
                        ))}
                    </Select>
                )}
                placeholder="Buscar..."
            />
        </Row>
        <Row justify="space-between" style={{ marginBottom: '1rem' }}>
            <Col>
                <Button type="primary" style={{ marginRight: '1rem' }}>
                    Aprobadas
                </Button>
                <Button type="primary" style={{ marginRight: '1rem' }}>
                    Rechazadas
                </Button>
                <Button type="primary" style={{ marginRight: '1rem' }}>
                    En proceso
                </Button>
            </Col>
            <Col>
                <Button type="primary">Agregar</Button>
            </Col>
        </Row>
    </>
);

export default HeaderButtons;
