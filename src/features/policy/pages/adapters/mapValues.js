export default function mapValues(values) {
    return {
        number_extension: values.number_extension,
        date_issue: values.date_issue,
        beginning_effective_date: values.beginning_effective_date,
        end_effective_date: values.end_effective_date,
        agency_id: values.agency_id,
        car: {
            category_id: values.category_id,
            version_id: values.version_id,
            year: values.year,
            vin: values.vin,
            mileage: values.mileage,
        },
        customer: {
            name: values.name,
            middle_name: values.middle_name,
            first_last_name: values.first_last_name,
            second_last_name: values.second_last_name,
            email: values.email,
            rfc: values.rfc,
            is_company: values.is_company,
            customer_address: [
                {
                    street: values.street,
                    external_number: values.external_number,
                    inner_number: values.inner_number,
                    district: values.district,
                    zip_code: values.zip_code,
                    city_id: values.city_id,
                },
            ],
        },
    };
}
