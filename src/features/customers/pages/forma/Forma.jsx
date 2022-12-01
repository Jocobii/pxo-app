import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Form,
    Input,
    Divider,
    Row,
    Select,
    DatePicker,
    message,
} from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import FooterControl from '../../../../components/FooterControl/FooterControl';
import { getOneCustomer, saveCustomer } from '../../customerSlice';
import FormFields from '../../../../components/Form';
import { formaFormValues, formatSaveValues } from '../adapters/mapValues';
import { selectCatalogs } from '../../../catalogs/catalogSlice';
import validateIfExistsByField from '../../../../utils/validateField';

const Forma = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const data = useSelector((state) => state.customer.data);
    const { cities } = useSelector(selectCatalogs);
    const itIsCompany = useSelector((state) => state.customer.isCompany);
    const [isCompany, setIsCompany] = useState(itIsCompany);
    useEffect(() => {
        if (Number(id)) {
            dispatch(getOneCustomer({ id }));
        }
    }, [dispatch, form, id]);

    useEffect(() => {
        if (Number(data?.id)) {
            form.setFieldsValue(formaFormValues(data));
            setIsCompany(Boolean(data.is_company));
        }
    }, [data, dispatch, form, id]);

    const onFinish = async () => {
        const values = await form.validateFields();
        const {
            error,
            message: msg,
        } = await dispatch(saveCustomer(formatSaveValues({
            ...data,
            ...values,
            is_company: isCompany,
        })));
        if (error) {
            message.error(msg);
            return;
        }
        message.success(msg);
    };

    const validateField = (item, value) => {
        if (!value) return;
        validateIfExistsByField('customer', item.field, value, data?.id).then(
            ({ error, message: msg }) => {
                if (error) {
                    form.setFields([
                        {
                            name: item.field,
                            errors: [msg],
                        },
                    ]);
                }
            },
        );
    };

    const personalFields = [
        { divider: <Divider orientation="left">Datos personales</Divider> },
        {
            label: 'Nombre',
            col: 6,
            scope: 'name',
            component: <Input placeholder="Nombre" />,
            opts: {
                rules: [{ required: true, message: 'Este campo es requerido' }],
            },
        },
        {
            display: !isCompany,
            label: 'Segundo nombre',
            col: 6,
            scope: 'middle_name',
            component: <Input placeholder="Segundo Nombre" />,
        },
        {
            display: !isCompany,
            label: 'Apellido paterno',
            col: 6,
            scope: 'first_last_name',
            component: <Input placeholder="Apellido paterno" />,
            opts: {
                rules: [
                    {
                        required: !isCompany,
                        message: 'Este campo es requerido',
                    },
                ],
            },
        },
        {
            display: !isCompany,
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
            component: (
                <Input
                    onChange={debounce((e) => {
                        validateField({ field: 'email' }, e.target.value);
                    }, [500])}
                    placeholder="Correo electrónico"
                />
            ),
            opts: {
                rules: [{ required: true, message: 'Este campo es requerido' }],
            },
        },
        {
            label: 'RFC',
            col: 6,
            scope: 'rfc',
            component: (
                <Input
                    onChange={debounce((e) => {
                        validateField({ field: 'rfc' }, e.target.value);
                    }, [500])}
                    placeholder="RFC"
                />
            ),
            opts: {
                rules: [
                    { required: true, message: 'Este campo es requerido' },
                ],
            },
        },
        {
            label: 'Telefono',
            col: 6,
            scope: 'cellPhone',
            component: <Input placeholder="Telefono" />,
            opts: {},
        },
        {
            display: isCompany,
            label: 'Fecha de constitucion de la empresa',
            col: 6,
            scope: 'date_incorporation_company',
            component: (
                <DatePicker
                    defaultPickerValue={dayjs()}
                    style={{ width: '100%' }}
                    picker="La Fecha de constitucion"
                />
            ),
            opts: {
                rules: [
                    {
                        required: true,
                        message: 'La Fecha de constitucion es requerida',
                    },
                ],
            },
        },
    ];
    const addressFields = [
        { divider: <Divider orientation="left">Dirección</Divider> },
        {
            label: 'Calle',
            col: 6,
            scope: 'street',
            component: <Input placeholder="Calle" />,
            opts: {
                rules: [
                    {
                        required: true,
                        message: 'La Fecha de constitucion es requerida',
                    },
                ],
            },
        },
        {
            label: 'Colonia',
            col: 6,
            scope: 'district',
            component: <Input placeholder="Colonia" />,
            opts: {
                rules: [
                    {
                        required: true,
                        message: 'La Fecha de constitucion es requerida',
                    },
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
                    {
                        required: true,
                        message: 'La Fecha de constitucion es requerida',
                    },
                ],
            },
        },
        {
            label: 'Numero interior',
            col: 6,
            scope: 'inner_number',
            component: <Input placeholder="Numero interior" />,
            opts: {},
        },
        {
            label: 'Código postal',
            col: 6,
            scope: 'zip_code',
            component: <Input placeholder="Código postal" />,
            opts: {
                rules: [
                    {
                        required: true,
                        message: 'La Fecha de constitucion es requerida',
                    },
                ],
            },
        },
        {
            label: 'Ciudad',
            col: 6,
            scope: 'city_id',
            component: (
                <Select placeholder="Ciudad">
                    {cities.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
            opts: {
                rules: [
                    { required: true, message: 'La ciudad es obligatoria' },
                ],
            },
        },
    ];
    return (
        <>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <FormFields
                        fields={[...personalFields, ...addressFields]}
                    />
                </Row>
            </Form>
            <FooterControl onFinish={onFinish} form={form} />
        </>
    );
};

export default Forma;
