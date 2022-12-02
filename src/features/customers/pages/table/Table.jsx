import React, { useEffect } from 'react';
import { Tabs, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import {
    selectCustomerList, getCustomers, setIsEmpresa,
    deleteCustomer,
} from '../../customerSlice';
import customerModule from '../../router';

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'fullName',
        key: 'fullName',
        link: {
            bold: true,
            to: (id) => customerModule.forma(id),
        },
    },
    {
        title: 'Correo electrónico',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Teléfono',
        dataIndex: 'cellPhone',
        key: 'cellPhone',
    },
    {
        title: 'RFC',
        dataIndex: 'rfc',
        key: 'rfc',
    },
];

const Table = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectCustomerList);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const { error, message: msg } = await dispatch(deleteCustomer(id));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
    };
    const controls = [
        {
            fixed: 'right',
            type: 'edit',
            handle: (id) => navigate(customerModule.forma(id)),
        },
        {
            type: 'delete',
            handle: (id) => handleDelete(id),
        },
    ];

    useEffect(() => {
        dispatch(getCustomers({ simple: true, is_company: false }));
    }, [dispatch]);

    const handleChangeTab = (key) => {
        dispatch(setIsEmpresa());
        dispatch(getCustomers({ simple: true, is_company: key === 'item-2' }));
    };

    const items = [
        { label: 'Fisica', key: 'item-1', children: <GenericTable controls={controls} columns={columns} dataSource={data} /> },
        { label: 'Moral', key: 'item-2', children: <GenericTable controls={controls} columns={columns} dataSource={data} /> },
    ];

    return (
        <Tabs
            tabBarExtraContent={<Button onClick={() => navigate(customerModule.forma('add'))} type="primary">Agregar</Button>}
            onChange={handleChangeTab}
            items={items}
        />
    );
};
export default Table;
