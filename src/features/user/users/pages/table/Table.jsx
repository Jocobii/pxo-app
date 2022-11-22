import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Row, Button, message, Input,
    Select,
} from 'antd';
import debounce from 'lodash.debounce';
import GenericTable from '../../../../../components/GenericTable/GenericTable';
import {
    getUserList,
    openModalName,
    removeUser,
    selectPagination,
    selectLoading,
} from '../../../userSlice';
import UserModal from './components/Modal';

const searchFields = [
    { id: 'email', text: 'Correo electronico' },
    { id: 'first_name', text: 'Nombre' },
    { id: 'first_last_name', text: 'Apellido paterno' },
    { id: 'second_last_name', text: 'Apellido materno' },
];

const Table = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.user.list);
    const pagination = useSelector(selectPagination);
    const loading = useSelector(selectLoading);
    const [searchField, setSearchField] = useState('email');

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
            title: 'Correo electrónico',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const controls = [
        {
            type: 'edit',
            fixed: 'right',
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

    const handleSearch = debounce((value) => {
        dispatch(getUserList({
            searchLike: value,
            fieldLike: searchField,
        }));
    }, [500]);

    return (
        <>
            <Row
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    marginBottom: '10px',
                }}
            >
                <Input.Search
                    style={{ width: '30%' }}
                    onChange={(e) => handleSearch(e.target.value)}
                    addonBefore={(
                        <Select
                            defaultValue="email"
                            onChange={(value) => setSearchField(value)}
                        >
                            {searchFields.map((e) => (
                                <Select.Option key={e.id} value={e.id}>
                                    {e.text}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                    placeholder="Buscar..."
                />
            </Row>
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
