import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import HeaderButtons from './components/HeaderButtons';

const getColor = (text) => {
    let color = text === 'Rechazada' ? 'red' : 'green';
    if (text === 'Pendiente') color = 'blue';
    return <Tag color={color}>{text}</Tag>;
};

const columns = [
    {
        title: 'Nombre completo',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Telefono',
        dataIndex: 'cellPhone',
        key: 'cellPhone',
    },
    {
        title: 'Correo electronico',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Automovil',
        dataIndex: 'model',
        key: 'model',
    },
    {
        title: 'Kilometraje',
        dataIndex: 'mileage',
        key: 'mileage',
    },
    {
        title: 'VIN',
        dataIndex: 'vin',
        key: 'vin',
    },
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        render: getColor,
    },
    {
        title: 'Fecha de la poliza',
        dataIndex: 'date',
        key: 'date',
    },
];

const Table = () => {
    const navigate = useNavigate();
    const controls = [
        {
            type: 'edit',
            fixed: 'right',
            handle: (id) => navigate(`/policy/${id}`),
        },
        {
            type: 'delete',
            handle: (id) => console.log(id),
        },
    ];

    return (
        <>
            <HeaderButtons />
            <GenericTable
                controls={controls}
                columns={columns}
                dataSource={[]}
                scroll={{
                    x: 1300,
                }}
            />
        </>
    );
};
export default Table;
