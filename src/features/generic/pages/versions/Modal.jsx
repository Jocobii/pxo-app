import React, { useEffect } from 'react';
import {
    Modal, Form, Input,
    Button, message, Select,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, addOrUpdate } from '../../crudSlice';
import { defaultFilterV4 } from '../../../../utils/antd';

const requireRule = [{ required: true, message: 'Este campo es requerido' }];

const VersionsModal = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const modalName = useSelector((state) => state.crud.modalName);
    const categoryList = useSelector((state) => state.crud.list);
    const categories = useSelector((state) => state.catalog.carCategories);
    const index = useSelector((state) => state.crud.index);
    const category = index ? categoryList.find((e) => e.id === Number(index)) : null;
    const isVisible = modalName === 'VERSION_MODAL';

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
        const { error, message: msg } = await dispatch(addOrUpdate({
            id: category?.id || null,
            name: category?.name,
            category_id: values?.category_id,
            ...values,
            mainModel: 'version',
        }));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
        handleClose();
    };

    return (
        <Modal
            title={`${index ? 'Actualizar' : 'Agregar'} una version`}
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
                <Form.Item name="category_id" label="Categoria" rules={requireRule}>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={defaultFilterV4}
                        placeholder="Seleccione una categoria"
                    >
                        {categories.map((e) => (
                            <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default VersionsModal;
