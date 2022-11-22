import fetcher from '../../../../utils/_request';

export const checkPolicyField = async (field, value) => {
    const response = fetcher.get('/policies/validate', { fieldLike: field, searchLike: value });
    return response;
};

export const DATE = '';
