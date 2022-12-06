import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Row, Col, Button, message,
} from 'antd';
import GenericTable from '../../../../components/GenericTable/GenericTable';
import WarrantyModal from './WarrantyModal';
import { deleteCatalog, deleteWarrantyOfProduct } from '../../crudSlice';

const WarrantyTable = () => {
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.crud.list);
    const index = useSelector((state) => state.crud.index);
    const category = index
        ? categoryList.find((e) => e.id === Number(index))
        : null;
    const [isOpen, setOpen] = useState(false);
    const [warrantySelected, setWarrantyId] = useState(false);

    const handleDelete = async (id) => {
        const { error, message: msg } = await dispatch(deleteCatalog({ id, mainModel: 'warranty' }));
        if (error) {
            message.error(msg);
            return;
        }
        dispatch(deleteWarrantyOfProduct({ categoryId: index, warrantyId: id }));
        message.success(msg);
    };

    const controls = [
        {
            type: 'edit',
            fixed: 'right',
            handle: (id) => {
                setWarrantyId(id);
                setOpen(true);
            },
        },
        {
            type: 'delete',
            handle: (id) => handleDelete(id),
        },
    ];
    return (
        <>
            <WarrantyModal
                warrantyId={warrantySelected}
                isOpen={isOpen}
                setOpen={setOpen}
            />
            <Row justify="space-between" style={{ marginBottom: '1rem', flexDirection: 'row-reverse' }}>
                <Col>
                    <Button
                        onClick={() => {
                            setOpen(true);
                            setWarrantyId(null);
                        }}
                        disabled={!category?.id}
                        type="primary"
                    >
                        Agregar
                    </Button>
                </Col>
            </Row>
            <GenericTable
                dataSource={category?.warranties || []}
                controls={controls}
                columns={[
                    {
                        title: 'Nombre',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text) => <p>{text}</p>,
                    },
                    {
                        title: 'Meses',
                        dataIndex: 'months',
                        key: 'months',
                        render: (text) => (
                            <p>
                                {` ${text} meses `}
                            </p>
                        ),
                    },
                    {
                        title: 'Nombre',
                        dataIndex: 'price',
                        key: 'price',
                        render: (text) => (
                            <p>
                                {` ${text} pesos MXN `}
                            </p>
                        ),
                    },
                    {
                        title: 'Nombre',
                        dataIndex: 'distance',
                        key: 'distance',
                        render: (text) => (
                            <p>
                                {` ${text} KM `}
                            </p>
                        ),
                    },
                ]}
            />
        </>
    );
};
export default WarrantyTable;
