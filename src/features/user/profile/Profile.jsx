/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react';
import {
    Button, Form, Input, Row, message,
    Card,
} from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';

const validateMessages = {
    required: '${label} es requerido',
    types: {
        email: '${label} no es un correo válido',
    },
};

export const Profile = () => {
    const userData = useSelector(selectUser);
    const [form] = Form.useForm();
    useEffect(() => {
        console.log('profile');
        if (userData.id) {
            form.setFieldsValue(userData);
        }
    }, [form, userData]);

    const onFinish = (values) => {
        console.log(values);
        message.success('Perfil actualizado');
    };
    return (
        <Row justify="space-around" align="middle">
            <Card>
                <Form
                    name="nest-messages"
                    onFinish={onFinish}
                    layout="vertical"
                    validateMessages={validateMessages}
                    form={form}
                >
                    <Form.Item
                        name="firstName"
                        label="Nombre"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="middleName" label="Segundo nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="firstLastName"
                        label="Apellido paterno"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="secondLastName"
                        label="Apellido materno"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                            {
                                type: 'password',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    );
};
export default Profile;
