import fetcher from '../../../utils/_request';

// eslint-disable-next-line import/prefer-default-export
export const getAnyCatalog = async (props) => {
    const response = await fetcher.get('/catalogs/', props);
    return response;
};

export const addOrUpdateCatalog = async (props) => {
    const response = props?.id ? await fetcher.put('/catalogs/', props) : await fetcher.post('/catalogs/', props);
    return response;
};

export const deleteAnyCatalog = async (props) => {
    const response = await fetcher.delete('/catalogs/', props);
    return response;
};
