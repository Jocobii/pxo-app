import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import GenericTable from '../../../../components/GenericTable/GenericTable';

const getColor = (text) => {
    let color = text === 'Rechazada' ? 'red' : 'green';
    if (text === 'Pendiente') color = 'blue';
    return <Tag color={color}>{text}</Tag>;
};

const quote = [
    {
        id: '1',
        fullName: 'Manuel Lopez Flores',
        cellPhone: '331 123 5321',
        model: 'VR-V 2022',
        email: 'manuel@gmail.com',
        vin: '1HGCR2F3XFA027534',
        mileage: 1_0000,
        status: 'Pendiente',
        package: 'EXTENSION DE GARANTIA DE NUEVOS',
        date: '2021-01-01',
    },
    {
        id: '2',
        fullName: 'Noe Quintana Garcia',
        cellPhone: '331 123 5321',
        model: 'VR-V 2022',
        email: 'noe@gmail.com',
        vin: '1HGCR2F3XFA027534',
        mileage: 1_0000,
        status: 'Pendiente',
        package: 'EXTENSION DE GARANTIA DE NUEVOS',
        date: '2021-01-01',
    },
    {
        id: '3',
        fullName: 'Jose Gonzales Lopez',
        cellPhone: '331 123 5321',
        model: 'VR-V 2022',
        email: 'jose@gmail.com',
        vin: '1HGCR2F3XFA027534',
        mileage: 1_0000,
        status: 'Pendiente',
        package: 'EXTENSION DE GARANTIA DE NUEVOS',
        date: '2021-01-01',
    },
];

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
            <GenericTable
                controls={controls}
                columns={columns}
                dataSource={quote}
                scroll={{
                    x: 1300,
                }}
            />
        </>
    );
};
export default Table;
