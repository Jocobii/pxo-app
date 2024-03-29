import fetcher from '../../../utils/_request';

export const getCarCategories = (categoryId) => fetcher
    .get('/car-categories', { categoryId, results: 50 })
    .then((data) => data)
    .catch((error) => error);

export const getInitCatalogs = () => fetcher
    .get('/catalogs/init-catalogs')
    .then((data) => data)
    .catch((error) => error);
