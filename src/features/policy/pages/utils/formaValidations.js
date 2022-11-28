import debounce from 'lodash.debounce';
import policyServices from '../services';
import { validateIfExistsByField } from '../../../../utils/validateField';

// eslint-disable-next-line import/prefer-default-export
export const validatePolicyNumber = debounce((_, value, callback) => {
    if (!value) return;
    policyServices.checkPolicyField('number_extension', value)
        .then(({ error, message }) => {
            if (error) {
                callback(message);
            }
            callback();
        });
}, [500]);

export const validateCarVIN = debounce((_, value, callback) => {
    if (!value) return;
    validateIfExistsByField('car', 'vin', value)
        .then((exists) => {
            if (exists) {
                callback(exists ? 'Este VIN ya le pertenece a otro automovil' : '');
            }
            callback();
        });
}, [500]);
