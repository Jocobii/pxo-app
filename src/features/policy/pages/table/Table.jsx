import React, { useCallback, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import HeaderButtons from './components/HeaderButtons';
import { getPolicies, selectPolicyList, deletePolicy } from '../../policySlice';

const Table = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(selectPolicyList);

    const getAllPolicies = useCallback(() => {
        dispatch(getPolicies({ simple: true }));
    }, [dispatch]);

    const handleDelete = async (id) => {
        const { error, message: msg } = await dispatch(deletePolicy(id));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
    };

    useEffect(() => {
        getAllPolicies();
    }, [getAllPolicies]);

    const columns = [
        {
            title: 'Nombre completo',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (_, record) => `${record.policy_detail.customer.fullName || ''}`,
        },
        {
            title: 'Telefono',
            dataIndex: 'cellPhone',
            key: 'cellPhone',
            render: (_, record) => `${record.policy_detail.customer.cellPhone || ''}`,
        },
        {
            title: 'Correo electronico',
            dataIndex: 'email',
            key: 'email',
            render: (_, record) => `${record.policy_detail.customer.email || ''}`,
        },
        {
            title: 'Automovil',
            dataIndex: 'model',
            key: 'model',
            render: (_, record) => `${record.policy_detail.car.category.name || ''} - ${record.policy_detail.car.version.name || ''}`,
        },
        {
            title: 'Kilometraje',
            dataIndex: 'mileage',
            key: 'mileage',
            render: (_, record) => `${record.policy_detail.car.mileage || 0} KM`,
        },
        {
            title: 'VIN',
            dataIndex: 'vin',
            key: 'vin',
            render: (_, record) => `${record.policy_detail.car.vin || ''}`,
        },
        {
            title: 'Fecha de la poliza',
            dataIndex: 'date',
            key: 'date',
            render: (_, record) => `${record.date_issue || ''}`,
        },
    ];

    const controls = [
        {
            type: 'edit',
            fixed: 'right',
            handle: (id) => navigate(`/policy/${id}`),
        },
        {
            type: 'delete',
            handle: (id) => handleDelete(id),
        },
    ];

    return (
        <>
            <HeaderButtons />
            <GenericTable
                controls={controls}
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 1300,
                }}
            />
        </>
    );
};
export default Table;
