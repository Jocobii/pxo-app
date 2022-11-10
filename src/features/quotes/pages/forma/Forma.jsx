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
    name: 'Alexander',
    first_last_name: 'Vazquez',
    second_last_name: 'Jocobi',
    email: 'adalbertojocobi@gmail.com',
    rfc: 'VAJA980101',
    cellphone: '3311234567',
    type: 1,
    street: 'Calle 1',
    colonia: 'Colonia 1',
    exterior_number: '7403',
    interior_number: '1',
    postal_code: '12345',
    city: 'Guadalajara',
    state: 'Jalisco',
    country: 1,
};

const Forma = () => {
    const { id } = useParams();
    console.log('id', id);
    const [form] = Form.useForm();
    form.setFieldsValue(initData);
    const personalFields = [
        { divider: <Divider orientation="left">Datos personales</Divider> },
        {
            label: 'Nombre',
            col: 6,
            scope: 'name',
            component: <Input placeholder="Nombre" />,
            opts: {},
        },
        {
            label: 'Apellido paterno',
            col: 6,
            scope: 'first_last_name',
            component: <Input placeholder="Apellido paterno" />,
            opts: {},
        },
        {
            label: 'Apellido materno',
            col: 6,
            scope: 'second_last_name',
            component: <Input placeholder="Apellido materno" />,
            opts: {},
        },
        {
            label: 'Correo electrónico',
            col: 6,
            scope: 'email',
            component: <Input placeholder="Correo electrónico" />,
            opts: {},
        },
        {
            label: 'RFC',
            col: 6,
            scope: 'rfc',
            component: <Input placeholder="RFC" />,
            opts: {},
        },
        {
            label: 'Telefono',
            col: 6,
            scope: 'cellphone',
            component: <Input placeholder="Telefono" />,
            opts: {},
        },
        {
            label: 'Plaza',
            col: 6,
            scope: 'type',
            component: (
                <Select
                    placeholder="Selecciona el plazo"
                >
                    <Select.Option value={1}>EXT. GOLD 12</Select.Option>
                    <Select.Option value={2}>EXT. GOLD 24</Select.Option>
                    <Select.Option value={3}>EXT. GOLD 46</Select.Option>
                </Select>
            ),
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
            label: 'Numero exterior',
            col: 6,
            scope: 'exterior_number',
            component: <Input placeholder="Numero exterior" />,
            opts: {},
        },
        {
            label: 'Grupo',
            col: 6,
            scope: 'group',
            component: <Input placeholder="Grupo" />,
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
            scope: 'kg',
            component: <Input placeholder="Kilometraje" />,
            opts: {},
        },
        {
            label: 'Estado',
            col: 6,
            scope: 'state',
            component: <Input placeholder="Estado" />,
            opts: {},
        },
        {
            label: 'País',
            col: 6,
            scope: 'country',
            component: (
                <Select
                    placeholder="País"
                >
                    <Select.Option key={1} value={1}>Mexico</Select.Option>
                    <Select.Option key={2} value={2}>USA</Select.Option>
                    <Select.Option key={3} value={3}>Canada</Select.Option>
                </Select>
            ),
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
