import React, { useEffect } from 'react';
import {
    Modal, Form, Input, message,
    Button, Select,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectModalName,
    closeModalName,
    createUser,
    updateUser,
} from '../../../../userSlice';

const requireRule = [{ required: true, message: 'Este campo es requerido' }];

const UserModal = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const modalName = useSelector(selectModalName);
    const userList = useSelector((state) => state.user.list);
    const agencies = useSelector((state) => state.catalog.agencies);
    const index = useSelector((state) => state.user.index);
    const user = index ? userList.find((e) => e.id === Number(index)) : null;
    const isVisible = modalName === 'USER_MODAL';

    useEffect(() => {
        if (index) {
            form.setFieldsValue(user);
        }
    }, [index, form, userList, user]);

    const handleClose = () => {
        dispatch(closeModalName());
        form.resetFields();
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        const addOrUpdate = user?.id ? updateUser : createUser;
        const { error, message: msg } = await dispatch(addOrUpdate({ ...user, ...values }));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
        handleClose();
    };

    return (
        <Modal
            title={`${index ? 'Actualizar' : 'Agregar'} un usuario`}
            open={isVisible}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    Cancelar
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                >
                    {`${index ? 'Actualizar' : 'Agregar'}`}
                </Button>,
            ]}
        >
            <Form
                name="nest-messages"
                onFinish={handleOk}
                layout="vertical"
                form={form}
            >
                <Form.Item name="first_name" label="Nombre" rules={requireRule}>
                    <Input placeholder="Nombre" />
                </Form.Item>
                <Form.Item name="middle_name" label="Segundo Nombre">
                    <Input placeholder="Segundo Nombre" />
                </Form.Item>
                <Form.Item
                    name="first_last_name"
                    label="Apellido paterno"
                    rules={requireRule}
                >
                    <Input placeholder="Apellido paterno" />
                </Form.Item>
                <Form.Item
                    name="agency_id"
                    label="Agencia"
                    rules={requireRule}
                >
                    <Select
                        placeholder="Selecciona una agencia"
                    >
                        {agencies.map((agency) => (
                            <Select.Option key={agency.id} value={agency.id}>
                                {agency.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="second_last_name" label="Apellido materno">
                    <Input placeholder="Apellido materno" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Correo electrónico"
                    rules={requireRule}
                >
                    <Input placeholder="Correo electronico" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[{ required: !index, message: 'Este campo es requerido' }]}
                >
                    <Input type="password" placeholder="Contrasena" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UserModal;
