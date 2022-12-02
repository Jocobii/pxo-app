import React, { useEffect } from 'react';
import {
    Modal, Form, Input,
    Button, message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, addOrUpdate } from '../../crudSlice';

const requireRule = [{ required: true, message: 'Este campo es requerido' }];

const CategoriesModal = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const modalName = useSelector((state) => state.crud.modalName);
    const categoryList = useSelector((state) => state.crud.list);
    const index = useSelector((state) => state.crud.index);
    const category = index ? categoryList.find((e) => e.id === Number(index)) : null;
    const isVisible = modalName === 'CATEGORIES_MODAL';
    useEffect(() => {
        if (index) {
            form.setFieldsValue(category);
        }
    }, [index, form, categoryList, category]);

    const handleClose = () => {
        dispatch(closeModal());
        form.resetFields();
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        const { error, message: msg } = await dispatch(addOrUpdate({ ...category, ...values, mainModel: 'category' }));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
        handleClose();
    };

    return (
        <Modal
            title={`${index ? 'Actualizar' : 'Agregar'} una categoria`}
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
                <Form.Item name="name" label="Nombre" rules={requireRule}>
                    <Input placeholder="Nombre" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CategoriesModal;
