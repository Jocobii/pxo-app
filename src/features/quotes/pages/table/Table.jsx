import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import HeaderButtons from './HeaderButtons';

const getColor = (text) => {
    let color = text === 'Rechazada' ? 'red' : 'green';
    if (text === 'En proceso') color = 'blue';
    return <Tag color={color}>{text}</Tag>;
};

const quote = [
    {
        id: '1',
        branch: 'Honda Tijuana',
        fullName: 'Manuel Lopez Flores',
        cellPhone: '331 123 5321',
        car: 'VR-V 2022',
        email: 'manuel@gmail.com',
        vin: '1HGCR2F3XFA027534',
        status: 'Aprobada',
        package: 'EXTENSION DE GARANTIA DE NUEVOS',
        date: '2021-01-01',
    },
    {
        id: '2',
        branch: 'Honda Tijuana',
        fullName: 'Noe Quintana Garcia',
        cellPhone: '331 123 5321',
        car: 'VR-V 2022',
        email: 'manuel@gmail.com',
        vin: '1HGCR2F3XFA027534',
        status: 'Rechazada',
        package: 'EXTENSION DE GARANTIA DE NUEVOS',
        date: '2021-01-01',
    },
    {
        id: '3',
        branch: 'Honda Mexicali',
        fullName: 'Jose Gonzales Lopez',
        cellPhone: '331 123 5321',
        car: 'VR-V 2022',
        email: 'manuel@gmail.com',
        vin: '1HGCR2F3XFA027534',
        status: 'En proceso',
        package: 'EXTENSION DE GARANTIA DE NUEVOS',
        date: '2021-01-01',
    },
];

const columns = [
    {
        title: 'Distribuidor',
        dataIndex: 'branch',
        key: 'branch',
        fixed: 'left',
        render: (text) => <p>{text}</p>,
    },
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
        title: 'VIN',
        dataIndex: 'vin',
        key: 'vin',
    },
    {
        title: 'Paquete',
        dataIndex: 'package',
        key: 'package',
    },
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        render: getColor,
    },
    {
        title: 'Fecha',
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
            handle: (id) => navigate(`/quote/${id}`),
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
                dataSource={quote}
                scroll={{
                    x: 1300,
                }}
            />
        </>
    );
};
export default Table;
