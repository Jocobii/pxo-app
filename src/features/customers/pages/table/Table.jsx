import React, { useEffect } from 'react';
import { Tabs, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import { selectCustomerList } from '../../customerSlice';
import customerModule from '../../router';

const personasFisicas = [
    {
        id: '1',
        type: 'Fisica',
        fullName: 'Alexander Vazquez Jocobi',
        cellPhone: '331 123 4567',
    },
    {
        id: '2',
        type: 'Fisica',
        fullName: 'Jose Perez Hernandez',
        cellPhone: '331 123 4567',
    },
    {
        id: '3',
        type: 'Fisica',
        fullName: 'Axxel Romero Perez',
        cellPhone: '331 123 4567',
    },
];

const personasMorales = [
    {
        id: '1',
        type: 'Moral',
        fullName: 'Manuel Lopez Flores',
        cellPhone: '331 123 5321',
    },
    {
        id: '2',
        type: 'Moral',
        fullName: 'Angela Rodriguez Bravo',
        cellPhone: '331 123 7548',
    },
    {
        id: '3',
        type: 'Moral',
        fullName: 'Daniela Herrera Moreno',
        cellPhone: '331 123 1256',
    },
];

const columns = [
    {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Nombre completo',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Teléfono',
        dataIndex: 'cellPhone',
        key: 'cellPhone',
    },
];

const Table = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectCustomerList);
    const navigate = useNavigate();
    const controls = [
        {
            type: 'edit',
            handle: (id) => navigate(customerModule.forma(id)),
        },
        {
            type: 'delete',
            handle: (id) => dispatch({ type: 'customer/customerDelete', payload: id }),
        },
    ];

    useEffect(() => {
        if (data.length === 0) {
            dispatch({ type: 'customer/setData', payload: personasFisicas });
        }
    }, [data, dispatch]);

    const handleChangeTab = (key) => {
        if (key === 'item-2') {
            dispatch({ type: 'customer/setData', payload: personasMorales });
            return;
        }
        dispatch({ type: 'customer/setData', payload: personasFisicas });
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
