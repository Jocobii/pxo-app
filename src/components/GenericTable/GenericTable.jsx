/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import { ToolOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    Button, Card, Empty, Table as AntTable,
} from 'antd';
import ControlList from './components/Controls';

/**
 * Generic table component for CRUD operations
 * @component SmartTable
 * @params {Object} colmuns - columns to display
 * @params {Object[]} data - data to display
 * @params {Object} pagination - pagination table
 * @params {Boolean} loading - loading table
 * @params {function} onChange - function to handle table change
 * @params {object} controls - controls to display
 * @params {object} restProps - rest of props
 * @return {React.FC} The generic table component
 */

const SmartTable = ({
    columns,
    dataSource,
    pagination,
    loading,
    onChange,
    controls,
    editControls,
    selectFilters,
    ...restProps
}) => {
    const getControls = () => ({
        title: <ToolOutlined />,
        key: 'x',
        width: 50 * controls.length,
        align: 'center',
        render: (_text, record) => (
            <ControlList
                rowIndex={`record-${record.id}`}
                record={record}
                options={controls.map((e) => ({
                    ...e,
                    type:
                        typeof e.type === 'function' ? e.type(record) : e.type,
                    disabled: e.disabled ? e.disabled(record) : false,
                }))}
                editOptions={editControls}
            />
        ),
    });

    const getLinkRows = (newColumn, index) => {
        if (newColumn.render !== undefined) return false;
        if (newColumn.link?.to) {
            return (text, record) => {
                const { id } = record;
                return (
                    <Link to={newColumn.link.to(id, index)}>
                        {newColumn.link.bold !== undefined ? (
                            <b>{text}</b>
                        ) : (
                            text
                        )}
                    </Link>
                );
            };
        }
        if (typeof newColumn.link?.fn === 'function') {
            return (text, record) => {
                const { id } = record;
                return (
                    <Button
                        style={{ margin: 0, padding: 0 }}
                        type="link"
                        onClick={() => newColumn.link.fn(id, index, record)}
                    >
                        {newColumn.link.bold !== undefined ? (
                            <b>{text}</b>
                        ) : (
                            text
                        )}
                    </Button>
                );
            };
        }
        return false;
    };

    const getColumns = () => {
        const transformColumns = columns.map((c, i) => {
            const newColumn = {
                ...c,
                filteredValue: selectFilters[c.dataIndex] || null,
                filterSearch: true,
            };

            if (typeof c.dataIndex === 'string' && c.dataIndex.indexOf('.') >= 0) newColumn.dataIndex = c.dataIndex.split('.');

            if (newColumn.render === undefined) newColumn.render = getLinkRows(newColumn, i);
            return {
                ...newColumn,
            };
        });
        if (controls) {
            transformColumns.push(getControls());
        }
        return transformColumns;
    };
    return (
        <Card>
            <AntTable
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...restProps}
                dataSource={dataSource || []}
                size="small"
                pagination={pagination}
                onChange={onChange}
                loading={loading}
                columns={getColumns()}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Datos no encontrados"
                        />
                    ),
                }}
            />
        </Card>
    );
};

SmartTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    controls: PropTypes.arrayOf(PropTypes.shape({})),
    tableKey: PropTypes.string,
    dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pagination: PropTypes.shape({}),
    loading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    restProps: PropTypes.shape({}),
    editControls: PropTypes.shape({}),
    selectFilters: PropTypes.shape({}),
};

SmartTable.defaultProps = {
    restProps: {},
    controls: null,
    tableKey: '',
    editControls: null,
    loading: false,
    pagination: 1,
    selectFilters: {},
};

export default SmartTable;
