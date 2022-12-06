import React, { useEffect } from 'react';
import {
    Modal, Form, Input,
    Button, message, Select,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addOrUpdateWarranties } from '../../crudSlice';

const requireRule = [{ required: true, message: 'Este campo es requerido' }];

// eslint-disable-next-line react/prop-types
const CategoriesModal = ({ warrantyId, isOpen, setOpen }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.crud.list);
    const index = useSelector((state) => state.crud.index);
    const category = index ? categoryList.find((e) => e.id === Number(index)) : null;
    const warranty = warrantyId ? category?.warranties
        ?.find((e) => e.id === Number(warrantyId)) : null;

    useEffect(() => {
        if (index && isOpen) {
            form.setFieldsValue({
                ...warranty,
                categoryId: Number(warranty?.categoryId),
            });
        }
    }, [index, form, categoryList, warranty, isOpen]);

    const handleClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        const currentCategory = categoryList.find((e) => e?.id === category?.id);
        const data4Update = {
            ...warranty,
            ...values,
            categoryId: currentCategory?.id,
            ignoreValidations: true,
            mainModel: 'warranty',
        };
        const { error, message: msg } = await dispatch(addOrUpdateWarranties(data4Update));
        if (error) {
            message.error(msg);
            return;
        }
        message.success('Garantía actualizada');
        handleClose();
    };
    return (
        <Modal
            title={`${warrantyId ? 'Actualizar' : 'Agregar'} una garantía`}
            open={isOpen}
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
                    {`${warrantyId ? 'Actualizar' : 'Agregar'}`}
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
                    <Select
                        placeholder="Nombre de la garantia"
                    >
                        <Select.Option value="ELITE">ELITE</Select.Option>
                        <Select.Option value="PREMIUM">PREMIUM</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="months" label="Meses" rules={requireRule}>
                    <Select
                        placeholder="Meses"
                    >
                        <Select.Option value={12}>12</Select.Option>
                        <Select.Option value={24}>24</Select.Option>
                        <Select.Option value={36}>36</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="distance" label="Distancia" rules={requireRule}>
                    <Input placeholder="Distancia" />
                </Form.Item>
                <Form.Item name="price" label="Precio" rules={requireRule}>
                    <Input placeholder="Precio" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CategoriesModal;
