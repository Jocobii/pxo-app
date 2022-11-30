import fetcher from '../../../utils/_request';

const getCustomerList = (props) => fetcher
    .get('/customers', props)
    .then((data) => data)
    .catch((error) => error);

export default getCustomerList;
