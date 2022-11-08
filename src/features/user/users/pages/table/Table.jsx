import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button } from 'antd';
import GenericTable from '../../../../../components/GenericTable/GenericTable';
import { getUserList, openModalName } from '../../../userSlice';
import UserModal from './components/Modal';

const Table = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.user.list);
    const getAllUser = useCallback(() => {
        dispatch(getUserList());
    }, [dispatch]);

    const openDrawer = (id) => dispatch(openModalName({ modalName: 'USER_MODAL', index: id }));

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
            handle: (id) => console.log(id),
        },
    ];

    return (
        <>
            <Row style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginBottom: '10px',
            }}
            >
                <UserModal />
                <Button onClick={() => openDrawer()} type="primary">Agregar</Button>
            </Row>
            <GenericTable
                columns={columns}
                controls={controls}
                dataSource={data}
            />
        </>
    );
};
export default Table;
