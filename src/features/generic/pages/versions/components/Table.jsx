import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import Table from '../../../components/table/Table';
import { getCatalogList } from '../../../crudSlice';
import VersionsModal from './Modal';

function VersionTable() {
    const dispatch = useDispatch();

    const getCategories = useCallback(async () => dispatch(getCatalogList({
        mainModel: 'version',
        include: 'category',
    })), [dispatch]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'categoria',
            dataIndex: 'category_id',
            key: 'category_id',
            render: (_, record) => <p>{record.category?.name}</p>,
        },
        {
            title: 'Fecha de creación',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => <p>{dayjs(text).format('YYYY/MM/DD')}</p>,
        },
        {
            title: 'Ultima actualización',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text) => <p>{text ? dayjs(text).format('YYYY/MM/DD') : 'A un no se ha actualizado'}</p>,
        },
    ];

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <>
            <VersionsModal />
            <Table
                columns={columns}
                mainModel="version"
                include="category"
                modalName="VERSION_MODAL"
            />
        </>
    );
}

export default VersionTable;
