import React, { useEffect } from 'react';
import './index.css';
import {
    Form, Input, Button,
    Row, Col, message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login, selectUser } from '../userSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(selectUser)?.id;

    useEffect(() => {
        if (userId) {
            navigate('/home');
        }
    }, [navigate, userId]);

    const onFinish = async (values) => {
        const {
            error, message: msg,
        } = await dispatch(login(values));

        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
        navigate('/home');
    };

    return (
        <Row
            justify="space-around"
            align="middle"
            style={{ height: '100vh' }}
        >
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
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa un correo electrónico valido',
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
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa tu contraseña',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
