import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Form, Input,
    Divider, Row,
    Select,
} from 'antd';
import FormFields from '../../../../components/Form';
import FooterControl from '../../../../components/FooterControl/FooterControl';

const initData = {
    polizaNumber: '123456',
    name: 'G-Global',
    street: 'Calle 1',
    externalNumber: 123,
    postalCode: 42220,
    type: 1,
    brand: 'Honda',
    model: 'Civic',
    group: 1,
    subGroup: 1,
    year: '2019',
    mileage: '10000',
    series: 'ASDFMSADFSADF',
};

const Forma = () => {
    const { id } = useParams();
    console.log('id', id);
    const [form] = Form.useForm();
    form.setFieldsValue(initData);
    const personalFields = [
        { divider: <Divider orientation="left">Datos personales</Divider> },
        {
            label: 'No. poliza',
            col: 6,
            scope: 'polizaNumber',
            component: <Input placeholder="Nombre" />,
            opts: {},
        },
        {
            label: 'Calle',
            col: 6,
            scope: 'street',
            component: <Input placeholder="Calle" />,
            opts: {},
        },
        {
            label: 'Numero exterior',
            col: 6,
            scope: 'externalNumber',
            component: <Input placeholder="Numero exterior" />,
            opts: {},
        },
        {
            label: 'Codigo postal',
            col: 6,
            scope: 'postalCode',
            component: <Input placeholder="Codigo postal" />,
            opts: {},
        },
    ];
    const carFields = [
        { divider: <Divider orientation="left">Automovil</Divider> },
        {
            label: 'Marca',
            col: 6,
            scope: 'brand',
            component: <Input placeholder="Marca" />,
            opts: {},
        },
        {
            label: 'Modelo',
            col: 6,
            scope: 'model',
            component: <Input placeholder="Modelo" />,
            opts: {},
        },
        {
            label: 'Grupo',
            col: 6,
            scope: 'group',
            component: (
                <Select
                    placeholder="Grupo"
                >
                    <Select.Option value={1}>HONDA TRADICIONES</Select.Option>
                </Select>
            ),
            opts: {},
        },
        {
            label: 'Sub grupo',
            col: 6,
            scope: 'subGroup',
            component: (
                <Select
                    placeholder="Sub grupo"
                >
                    <Select.Option value={1}>OPTIMA</Select.Option>
                </Select>
            ),
            opts: {},
        },
        {
            label: 'Año',
            col: 6,
            scope: 'year',
            component: <Input placeholder="Año" />,
            opts: {},
        },
        {
            label: 'Kilometraje',
            col: 6,
            scope: 'mileage',
            component: <Input placeholder="Kilometraje" />,
            opts: {},
        },
        {
            label: 'Serie',
            col: 6,
            scope: 'series',
            component: <Input placeholder="Serie" />,
            opts: {},
        },
    ];
    return (
        <>
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={24}>
                    <FormFields fields={[...personalFields, ...carFields]} />
                </Row>
            </Form>
            <FooterControl form={form} />
        </>
    );
};

export default Forma;
