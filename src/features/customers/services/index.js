import fetcher from '../../../utils/_request';

export const getCustomer = (props) => fetcher
    .get('/customers', props)
    .then((data) => data)
    .catch((error) => error);

export const createCustomer = (props) => fetcher
    .post('/customers/', props)
    .then((data) => data)
    .catch((error) => error);
