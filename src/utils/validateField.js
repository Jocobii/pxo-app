import fetcher from './_request';

export const validateIfExistsByField = async (modelName, fieldLike, searchLike) => {
    if (!modelName || !fieldLike || !searchLike) {
        return false;
    }
    const { data } = await fetcher.get('/validateByField', { modelName, fieldLike, searchLike });
    return data.exists;
};

export default validateIfExistsByField;
