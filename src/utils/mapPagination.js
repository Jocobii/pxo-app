export const mapPagination = (info) => {
    try {
        const { results, total, page } = info;
        return {
            pageSize: results,
            total,
            current: page,
        };
    } catch (e) {
        return {};
    }
};

export default mapPagination;
