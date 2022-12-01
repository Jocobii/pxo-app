import fetcher from './_request';

export const validateIfExistsByField = async (modelName, fieldLike, searchLike, id) => {
    if (!modelName || !fieldLike || !searchLike) {
        return false;
    }
    const { error, message, data } = await fetcher.get('/validateByField', {
        modelName,
        fieldLike,
        searchLike,
        id,
    });
    return { error, message, data };
};

export default validateIfExistsByField;
