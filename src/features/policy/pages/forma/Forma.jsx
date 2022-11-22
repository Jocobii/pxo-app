import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import dayjs from 'dayjs';
import {
    Form, Input,
    Divider, Row,
    Select, DatePicker,
    Switch, message,
} from 'antd';
import FormFields from '../../../../components/Form';
import { defaultFilterV4, disableStartDate, disableEndDate } from '../../../../utils/antd';
import FooterControl from '../../../../components/FooterControl/FooterControl';
import mapValues from '../adapters/mapValues';
import { createPolicy } from '../../policySlice';
import {
    selCarCategories, selectCarCategories,
    selCarVersions, selectCarVersions,
    selectCatalogs,
} from '../../../catalogs/catalogSlice';
import fetcher from '../../../../utils/_request';
import { validatePolicyNumber, validateCarVIN } from '../utils/formaValidations';

const Forma = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const categories = useSelector(selectCarCategories);
    const versions = useSelector(selectCarVersions);
    const { agencies, cities } = useSelector(selectCatalogs);
    const [isCompany, setIsCompany] = useState(false);
    console.log('id', id);
    const [form] = Form.useForm();

    const getInitCatalog = async () => {
        const { data } = await fetcher.get('/car-categories');
        dispatch(selCarCategories(data));
    };

    useEffect(() => {
        getInitCatalog();
    }, []);

    const onFinish = async () => {
        const values = await form.validateFields();
        const { error, message: msg } = await dispatch(createPolicy(mapValues(values)));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
    };

    const policyFields = [
        { divider: <Divider orientation="left">Datos de la poliza</Divider> },
        {
            label: 'No. poliza',
            col: 6,
            scope: 'number_extension',
            component: (
                <Input
                    disabled
                    placeholder="No. poliza"
                />
            ),
            opts: {
                rules: [
                    { required: true, message: 'El numero de poliza es requerido' },
                    { max: 50, message: 'Max de 50' },
                    {
                        validator: validatePolicyNumber,
                    },
                ],
            },
        },
        {
            label: 'Inicio de Vigencia',
            col: 6,
            scope: 'beginning_effective_date',
            component: (
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Inicio de Vigencia"
                    disabledDate={(e) => disableStartDate(e, form.getFieldValue('end_effective_date'))}
                />
            ),
            opts: {
                rules: [{ required: true, message: 'La fecha de vigencia es requerida' }],
            },
        },
        {
            label: 'Fin de Vigencia',
            col: 6,
            scope: 'end_effective_date',
            component: (
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Fin de Vigencia"
                    disabledDate={(e) => disableEndDate(e, form.getFieldValue('beginning_effective_date'))}
                />
            ),
            opts: {
                rules: [{ required: true, message: 'La fecha de vigencia es requerida' }],
            },
        },
        {
            label: 'Agencia',
            col: 6,
            scope: 'agency_id',
            component: (
                <Select
                    placeholder="Agencia"
                >
                    {
                        agencies.map((e) => (
                            <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
                        ))
                    }
                </Select>
            ),
            opts: {
                rules: [{ required: true, message: 'La agencia es requerida' }],
            },
        },
    ];
    const carFields = [
        { divider: <Divider orientation="left">Automovil</Divider> },
        {
            label: 'Categoria',
            col: 6,
            scope: 'category_id',
            component: (
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Grupo"
                    onSelect={(value) => {
                        form.resetFields(['version_id']);
                        const category = categories.find((item) => item.id === value);
                        dispatch(selCarVersions(category.versions));
                    }}
                    filterOption={defaultFilterV4}
                >
                    {
                        categories.map((item) => (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        ))
                    }
                </Select>
            ),
            opts: { rules: [{ required: true, message: 'La categoria es requerida' }] },
        },
        {
            label: 'Version',
            col: 6,
            scope: 'version_id',
            component: (
                <Select
                    placeholder="Grupo"
                >
                    {
                        versions.map((item) => (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        ))
                    }
                </Select>
            ),
            opts: { rules: [{ required: true, message: 'La version es requerida' }] },
        },
        {
            label: 'Año',
            col: 6,
            scope: 'year',
            component: (
                <DatePicker style={{ width: '100%' }} picker="year" />
            ),
            opts: {},
        },
        {
            label: 'Kilometraje inicial',
            col: 6,
            scope: 'mileage',
            component: (<Input placeholder="Kilometraje" />),
            opts: {
                rules: [{ max: 10, message: 'Max de 10' }],
            },
        },
        {
            label: 'VIN',
            col: 6,
            scope: 'vin',
            component: (<Input placeholder="Serie" />),
            opts: {
                rules: [
                    { required: true, message: 'El VIN es requerido' },
                    { validator: validateCarVIN },
                ],
            },
        },
        {
            label: 'Fecha de factura',
            col: 6,
            scope: 'date_issue',
            component: <DatePicker style={{ width: '100%' }} placeholder="Fecha emision" />,
            opts: {
                rules: [{ required: true, message: 'La fecha de emision es requerida' }],
            },
        },
    ];
    const personalFields = [
        { divider: <Divider orientation="left">Datos personales</Divider> },
        {
            label: 'Correo electronico',
            col: 6,
            scope: 'email',
            component: <Input placeholder="Correo electronico" />,
            opts: {
                rules: [
                    { required: true, message: 'El correo electronico es requerido' },
                    { max: 100, message: 'Max de 100' },
                    { type: 'email', message: 'No es un correo valido' },
                ],
            },
        },
        {
            label: !isCompany ? 'Nombre' : 'Razon social',
            col: 6,
            scope: 'name',
            component: <Input placeholder="Nombre" />,
            opts: {
                rules: [
                    { required: true, message: 'El nombre es requerido' },
                    { max: 100, message: 'Max de 100' },
                ],
            },
        },
        {
            display: !isCompany,
            label: 'Segundo nombre',
            col: 6,
            scope: 'middle_name',
            component: <Input placeholder="Segundo nombre" />,
            opts: {
                rules: [
                    { max: 30, message: 'Max de 30' },
                ],
            },
        },
        {
            display: !isCompany,
            label: 'Apellido paterno',
            col: 6,
            scope: 'first_last_name',
            component: <Input placeholder="Apellido paterno" />,
            opts: {
                rules: [
                    { required: !isCompany, message: 'El apellido paterno es requerido' },
                    { max: 30, message: 'Max de 30' },
                ],
            },
        },
        {
            display: !isCompany,
            label: 'Apellido materno',
            col: 6,
            scope: 'second_last_name',
            component: <Input placeholder="Apellido materno" />,
            opts: {
                rules: [
                    { max: 30, message: 'Max de 30' },
                ],
            },
        },
        {
            label: 'RFC',
            col: 6,
            scope: 'rfc',
            component: <Input placeholder="RFC" />,
            opts: {
                rules: [
                    { required: true, message: 'El RFC es requerido' },
                    { max: 30, message: 'Max de 30' },
                ],
            },
        },
        {
            label: 'Es persona moral',
            col: 6,
            scope: 'is_company',
            component: <Switch onChange={() => setIsCompany(!isCompany)} />,
            opts: {},
        },
    ];

    const customerAddress = [
        { divider: <Divider orientation="left">Datos del domicilio</Divider> },
        {
            label: 'Calle',
            col: 6,
            scope: 'street',
            component: <Input placeholder="Calle" />,
            opts: {
                rules: [
                    { required: true, message: 'La calle es obligatoria' },
                ],
            },
        },
        {
            label: 'Numero exterior',
            col: 6,
            scope: 'external_number',
            component: <Input placeholder="Numero exterior" />,
            opts: {
                rules: [
                    { required: true, message: 'El numero de exterior es obligatorio' },
                ],
            },
        },
        {
            label: 'Numero interior',
            col: 6,
            scope: 'inner_number',
            component: <Input placeholder="Numero exterior" />,
            opts: {},
        },
        {
            label: 'Colonia',
            col: 6,
            scope: 'district',
            component: <Input placeholder="Numero exterior" />,
            opts: {
                rules: [
                    { required: true, message: 'La colonia es obligatoria' },
                ],
            },
        },
        {
            label: 'Codigo postal',
            col: 6,
            scope: 'zip_code',
            component: <Input placeholder="Codigo postal" />,
            opts: {
                rules: [
                    { required: true, message: 'El codigo postal es obligatorio' },
                ],
            },
        },
        {
            label: 'Ciudad',
            col: 6,
            scope: 'city_id',
            component: (
                <Select
                    placeholder="Ciudad"
                >
                    {
                        cities.map((item) => (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        ))
                    }
                </Select>
            ),
            opts: {
                rules: [
                    { required: true, message: 'La ciudad es obligatoria' },
                ],
            },
        },
        { divider: <Divider orientation="left">.</Divider> },
    ];

    return (
        <>
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={24}>
                    <FormFields fields={[
                        ...carFields,
                        ...policyFields,
                        ...personalFields,
                        ...customerAddress,
                    ]}
                    />
                </Row>
            </Form>
            <FooterControl onFinish={onFinish} form={form} />
        </>
    );
};

export default Forma;
