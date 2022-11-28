import fetcher from '../../../../utils/_request';

const checkPolicyField = async (field, value) => {
    const response = fetcher.get('/policies/validate', { fieldLike: field, searchLike: value });
    return response;
};

const getPolicies = (props) => fetcher
    .get('/policies', props)
    .then((data) => data)
    .catch((error) => error);

const updatePolicy = (props) => fetcher
    .put('/policies', props)
    .then((data) => data)
    .catch((error) => error);

export default {
    checkPolicyField,
    getPolicies,
    updatePolicy,
};
