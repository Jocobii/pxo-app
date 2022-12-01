import dayjs from 'dayjs';

export const formaFormValues = (values) => ({
    ...values,
    created_at: dayjs(values.created_at),
    updated_at: dayjs(values.updated_at),
    date_incorporation_company: dayjs(values.date_incorporation_company),
    is_company: Boolean(values.is_company),
    street: values.customer_addresses[0].street,
    external_number: values.customer_addresses[0].external_number,
    inner_number: values.customer_addresses[0].inner_number,
    district: values.customer_addresses[0].district,
    zip_code: values.customer_addresses[0].zip_code,
    city_id: Number(values.customer_addresses[0].city_id),
});

export const formatSaveValues = (values) => ({
    ...values,
    customer_addresses: [
        {
            id: values?.customer_addresses ? values?.customer_addresses[0]?.id : null,
            street: values.street,
            external_number: values.external_number,
            inner_number: values.inner_number,
            district: values.district,
            zip_code: values.zip_code,
            city_id: Number(values.city_id),
        },
    ],
});
