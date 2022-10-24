import React, { useEffect } from 'react';
import './index.css';
import {
    Form, Input, Button, Checkbox,
    Row, Col,
} from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import getCharacters from '../../services/auth.service';
import { createUser } from './userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        console.log('login');
    }, []);
    const signIn = async () => {
        try {
            const result = await getCharacters();
            dispatch(createUser(result));
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
                        name="username"
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
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={() => signIn()}
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
