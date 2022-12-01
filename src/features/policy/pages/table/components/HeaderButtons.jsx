import React from 'react';
import {
    Row, Button, Col, Input, Select,
} from 'antd';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPolicies } from '../../../policySlice';

const searchFields = [
    { id: 'vin', text: 'VIN' },
];

const HeaderButtons = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                        onChange={debounce((e) => dispatch(getPolicies({
                            vin: e.target.value.trim(),
                            simple: true,
                        })), [500])}
                        addonBefore={(
                            <Select
                                defaultValue="vin"
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
