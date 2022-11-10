import dates from 'dayjs';
import React from 'react';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Button, Col, DatePicker, Form, Row,
} from 'antd';
import Dynamic from './Dynamic';
// eslint-disable-next-line react/prop-types
const FooterControl = ({ form }) => (
    <Dynamic dynamic>
        {
            <Form form={form}>
                <Row>
                    <Col span={12} style={{ marginTop: '5px' }}>
                        <Row gutter={16}>
                            <Col md={8} sm={24} offset={1}>
                                <small>Fecha de creación</small>
                                <Form.Item
                                    name="created_at"
                                    initialValue={dates()}
                                >
                                    <DatePicker
                                        placeholder="Fecha creación"
                                        style={{ width: '100%' }}
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={24}>
                                <small>Fecha de última modificación</small>
                                <Form.Item name="updated_at">
                                    <DatePicker
                                        placeholder="Fecha ultima modificación"
                                        style={{ width: '100%' }}
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        span={10}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Row>
                            <Col span={24} align="right">
                                <Row align="middle">
                                    {/* <Col span={4}>
                                        <Row>
                                            <ErrorsFormInfo errors={errors} />
                                        </Row>
                                    </Col> */}
                                    <Col span={24}>
                                        <Row
                                            style={{
                                                flexWrap: 'wrap-reverse',
                                            }}
                                        >
                                            <Button
                                                style={{ margin: 8 }}
                                                icon={<CloseOutlined />}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                type="primary"
                                                style={{ margin: 8 }}
                                                icon={<SaveOutlined />}
                                            >
                                                Guardar cambios
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        }
    </Dynamic>
);

export default FooterControl;
