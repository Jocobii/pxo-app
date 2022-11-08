/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react';
import {
    Button, Form, Input, Row, message,
    Card,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateMyUser } from '../userSlice';

const validateMessages = {
    required: '${label} es requerido',
    types: {
        email: '${label} no es un correo válido',
    },
};

export const Profile = () => {
    const userData = useSelector(selectUser);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        if (userData.id) {
            form.setFieldsValue(userData);
        }
    }, [form, userData]);

    const onFinish = async (values) => {
        const data = { ...userData, ...values };
        const { error, message: msg } = await dispatch(updateMyUser(data));
        if (error) {
            message.error(msg || 'Error al actualizar el usuario');
            return;
        }
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
                        name="first_name"
                        label="Nombre"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="middle_name" label="Segundo nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="first_last_name"
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
                        name="second_last_name"
                        label="Apellido materno"
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
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    );
};
export default Profile;
