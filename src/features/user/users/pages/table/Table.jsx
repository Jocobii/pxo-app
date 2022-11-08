import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button, message } from 'antd';
import GenericTable from '../../../../../components/GenericTable/GenericTable';
import {
    getUserList, openModalName, removeUser,
    selectPagination, selectLoading,
} from '../../../userSlice';
import UserModal from './components/Modal';

const Table = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.user.list);
    const pagination = useSelector(selectPagination);
    const loading = useSelector(selectLoading);
    const getAllUser = useCallback(() => {
        dispatch(getUserList());
    }, [dispatch]);

    const openDrawer = (id) => dispatch(openModalName({ modalName: 'USER_MODAL', index: id }));

    const handleDelete = async (id) => {
        const { error, message: msg } = await dispatch(removeUser(id));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
    };

    useEffect(() => {
        getAllUser();
    }, [getAllUser]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'first_name',
            key: 'firstName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Segundo Nombre',
            dataIndex: 'middle_name',
            key: 'middleName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Apellido Paterno',
            dataIndex: 'first_last_name',
            key: 'firstLastName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Apellido Materno',
            dataIndex: 'second_last_name',
            key: 'firstName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const controls = [
        {
            type: 'edit',
            handle: (id) => openDrawer(id),
        },
        {
            type: 'delete',
            handle: (id) => handleDelete(id),
        },
    ];

    const handleTableChange = (pag, filters, sorter) => {
        dispatch(
            getUserList({
                results: pag.pageSize,
                page: pag.current,
                sortOrder: sorter.order,
            }),
        );
    };

    return (
        <>
            <Row
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    marginBottom: '10px',
                }}
            >
                <UserModal />
                <Button onClick={() => openDrawer()} type="primary">
                    Agregar
                </Button>
            </Row>
            <GenericTable
                columns={columns}
                controls={controls}
                pagination={{ ...pagination, showSizeChanger: true }}
                loading={loading}
                onChange={handleTableChange}
                dataSource={data}
            />
        </>
    );
};
export default Table;
