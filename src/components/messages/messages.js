import { message, notification } from 'antd';

const DEFAULT_PLACEMENT = 'topRight';
const NOTIFICATION_DURATION = 4.5;

const msgTypes = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
};

/**
 * Show message in a toast
 * @param  {string} //can be success, warning or error
 * @param  {string}
 */

const showMessage = (type, text) => {
    if (['success', 'warning', 'error', 'info'].includes(type)) {
        message[type](text, NOTIFICATION_DURATION);
        return;
    }
    message.warning(text, NOTIFICATION_DURATION);
};

const showNotification = (type, text, description = '', key, duration) => {
    if (['success', 'warning', 'error', 'info'].includes(type)) {
        notification[type]({
            message: String(text),
            description,
            placement: DEFAULT_PLACEMENT,
            duration: duration ?? NOTIFICATION_DURATION,
            key,
        });
        return;
    }
    notification.info({
        message: String(text),
        description,
        placement: DEFAULT_PLACEMENT,
        duration: NOTIFICATION_DURATION,
        key,
    });
};

const showErrorMessage = (text) => showMessage('error', text);
const showWarningMessage = (text) => showMessage('warning', text);
const showSuccessMessage = (text) => showMessage('success', text);

const closeNotification = (key) => notification.close(key);

export {
    showMessage,
    showWarningMessage,
    showSuccessMessage,
    showErrorMessage,
    showNotification,
    closeNotification,
    msgTypes,
};
