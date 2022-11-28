import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
// setup ant design date picker plugins
// https://github.com/ant-design/ant-design/issues/26190

const initDayjs = () => {
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(timezone);
    dayjs.locale('es');
    dayjs.tz.setDefault('America/Los_Angeles');
};

export default initDayjs;
