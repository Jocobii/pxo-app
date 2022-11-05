import React from 'react';
import {
    Form, Input, Button, Row, Col,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const RecoveryPassword = () => (
    <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col span={4}>
            <img
                alt="logo"
                style={{ marginBottom: '20px', width: '100%' }}
                src="http://www.alasdeeric.com/gdc/archivos/Screen%20Shot%202019-10-24%20at%2011.24.37%20PM(1).png"
            />
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message:
                                'Por favor ingresa un correo electrónico valido',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Correo electronico"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

export default RecoveryPassword;
