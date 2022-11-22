import dayjs from 'dayjs';

export const defaultFilterV4 = (input, option) => {
    if (Array.isArray(option.children)) {
        return option.children.join('').toLowerCase().indexOf(input.toLowerCase().trim()) >= 0;
    }

    return option.children.toLowerCase().indexOf(input.toLowerCase().trim()) >= 0;
};
export const disableStartDate = (current, endDate) => endDate && dayjs(current).isAfter(endDate, 'day');

export const disableEndDate = (current, endDate) => endDate && dayjs(current).isBefore(endDate, 'day');
