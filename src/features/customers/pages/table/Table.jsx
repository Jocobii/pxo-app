import React, { useEffect } from 'react';
import { Tabs, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import { selectCustomerList, getCustomer } from '../../customerSlice';
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
    const controls = [
        {
            fixed: 'right',
            type: 'edit',
            handle: (id) => navigate(customerModule.forma(id)),
        },
        {
            type: 'delete',
            handle: (id) => dispatch({ type: 'customer/customerDelete', payload: id }),
        },
    ];

    useEffect(() => {
        dispatch(getCustomer({ simple: true, is_company: false }));
    }, [dispatch]);

    const handleChangeTab = (key) => {
        dispatch(getCustomer({ simple: true, is_company: key === 'item-2' }));
    };

    const items = [
        { label: 'Fisica', key: 'item-1', children: <GenericTable controls={controls} columns={columns} dataSource={data} /> },
        { label: 'Moral', key: 'item-2', children: <GenericTable controls={controls} columns={columns} dataSource={data} /> },
    ];

    return (
        <Tabs
            tabBarExtraContent={<Button type="primary">Agregar</Button>}
            onChange={handleChangeTab}
            items={items}
        />
    );
};
export default Table;
