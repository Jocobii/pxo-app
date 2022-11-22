import React from 'react';
import {
    Row, Button, Col, Input, Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';

const searchFields = [
    { id: 'email', text: 'Distribuidor' },
    { id: 'first_name', text: 'Nombre completo' },
    { id: 'first_last_name', text: 'Telefono' },
    { id: 'second_last_name', text: 'VIN' },
];

const HeaderButtons = () => {
    const navigate = useNavigate();
    return (
        (
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
                <Row justify="space-between" style={{ marginBottom: '1rem', flexDirection: 'row-reverse' }}>
                    <Col>
                        <Button type="primary" onClick={() => navigate('/policy/add')}>Agregar</Button>
                    </Col>
                </Row>
            </>
        )
    );
};

export default HeaderButtons;
