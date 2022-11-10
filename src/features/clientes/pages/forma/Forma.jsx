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
            label: 'Tipo de cliente',
            col: 6,
            scope: 'type',
            component: (
                <Select
                    placeholder="Tipo de cliente"
                >
                    <Select.Option value={1}>Persona física</Select.Option>
                    <Select.Option value={2}>Persona moral</Select.Option>
                </Select>
            ),
            opts: {},
        },
    ];
    const addressFields = [
        { divider: <Divider orientation="left">Dirección</Divider> },
        {
            label: 'Calle',
            col: 6,
            scope: 'street',
            component: <Input placeholder="Calle" />,
            opts: {},
        },
        {
            label: 'Colonia',
            col: 6,
            scope: 'colonia',
            component: <Input placeholder="Colonia" />,
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
            label: 'Numero interior',
            col: 6,
            scope: 'interior_number',
            component: <Input placeholder="Numero interior" />,
            opts: {},
        },
        {
            label: 'Código postal',
            col: 6,
            scope: 'postal_code',
            component: <Input placeholder="Código postal" />,
            opts: {},
        },
        {
            label: 'Ciudad',
            col: 6,
            scope: 'city',
            component: <Input placeholder="Ciudad" />,
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
        <Form
            form={form}
            layout="vertical"
        >
            <Row gutter={24}>
                <FormFields fields={[...personalFields, ...addressFields]} />
            </Row>
            <FooterControl form={form} />
        </Form>
    );
};

export default Forma;
