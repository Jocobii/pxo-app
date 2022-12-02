import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import Table from '../../components/table/Table';
import { getCatalogList } from '../../crudSlice';
import Modal from './Modal';

function CategoryTable() {
    const dispatch = useDispatch();

    const getCategories = useCallback(async () => dispatch(getCatalogList({ mainModel: 'category' })), [dispatch]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
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
            <Modal />
            <Table columns={columns} mainModel="category" modalName="CATEGORIES_MODAL" />
        </>
    );
}

export default CategoryTable;
