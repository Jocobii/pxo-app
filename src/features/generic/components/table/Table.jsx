import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Row, Button, message, Input,
    Select,
} from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import {
    selectPagination, selectLoading, openModal,
    deleteCatalog, getCatalogList,
} from '../../crudSlice';

const Table = ({ columns, modalName, mainModel }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.crud.list);
    const pagination = useSelector(selectPagination);
    const loading = useSelector(selectLoading);
    const [searchField, setSearchField] = useState(columns[0].key);
    const openDrawer = (id) => dispatch(openModal({ modalName, index: id }));

    const handleDelete = async (id) => {
        const { error, message: msg } = await dispatch(deleteCatalog({ id, mainModel }));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
    };

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

    const handleTableChange = (pag, _filters, sorter) => {
        dispatch(
            getCatalogList({
                results: pag.pageSize,
                page: pag.current,
                mainModel,
                sortOrder: sorter.order,
            }),
        );
    };

    const handleSearch = debounce((value) => {
        dispatch(getCatalogList({
            searchLike: value,
            mainModel,
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
                            defaultValue="name"
                            onChange={(value) => setSearchField(value)}
                        >
                            {columns.map((e) => (
                                <Select.Option key={e.key} value={e.key}>
                                    {e.title}
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

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    modalName: PropTypes.string.isRequired,
    mainModel: PropTypes.string.isRequired,
};

export default Table;
