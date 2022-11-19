/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';
import {
    Popconfirm, Divider, Button, Tooltip,
} from 'antd';
import IconSwitcher from '../../IconSwitcher/IconSwitcher';

export const CONTROL_LIST_TYPES = {
    VIEW: 'view',
    EDIT: 'edit',
    DELETE: 'delete',
    SAVE: 'save',
    CANCEL: 'cancel',
};

const getTextByType = (type, attr) => {
    const defaults = {
        view: {
            title: 'Ver',
            btnType: 'default',
            icon: 'eye',
        },
        edit: {
            title: 'Editar',
            btnType: 'primary',
            icon: 'edit',
        },
        delete: {
            title: 'Eliminar',
            btnType: 'primary',
            icon: 'delete',
            confirm: true,
            extra: '¿Estas seguro?',
        },
        save: {
            title: 'Guardar',
            btnType: 'default',
            icon: 'save',
            confirm: false,
        },
        cancel: {
            title: 'Cancelar',
            btnType: 'default',
            icon: 'close',
            confirm: false,
        },
    };
    return defaults[type] && defaults[type][attr];
};

const ControlListComponent = ({
    record, rowIndex, options, editOptions,
}) => {
    if (options && Array.isArray(options)) {
        return options.map((o, i) => (
            <span key={i}>
                {options.length > 1 && i !== 0 && <Divider type="vertical" />}
                <Tooltip title={o.title || getTextByType(o.type, 'title')}>
                    <Popconfirm
                        title={o.extra || getTextByType(o.type, 'extra')}
                        onConfirm={() => o.handle(record.id, rowIndex, record)}
                        disabled={
                            o.disabled || !(o.confirm || getTextByType(o.type, 'confirm'))
                        }
                    >
                        <Button
                            danger={o.type === 'delete'}
                            type={o.btnType || getTextByType(o.type, 'btnType')}
                            shape="circle"
                            size="small"
                            data-cy="edit-btn"
                            disabled={o.disabled}
                            {...(!(
                                o.confirm || getTextByType(o.type, 'confirm')
                            ) && {
                                onClick: () => o.handle(record.id, rowIndex, record),
                            })}
                        >
                            <span style={{ fontSize: 12 }}>
                                {IconSwitcher(o.icon || getTextByType(o.type, 'icon'))}
                            </span>
                        </Button>
                    </Popconfirm>
                </Tooltip>
            </span>
        ));
    }
    return editOptions.map((o, i) => (
        <span key={i}>
            {editOptions.length > 1 && i !== 0 && <Divider type="vertical" />}
            <Tooltip title={o.title || getTextByType(o.type, 'title')}>
                <Popconfirm
                    title={o.extra || getTextByType(o.type, 'extra')}
                    onConfirm={() => o.handle(record.id, i, record)}
                    disabled={!(o.confirm || getTextByType(o.type, 'confirm'))}
                >
                    <Button
                        type={o.btnType || getTextByType(o.type, 'btnType')}
                        shape="circle"
                        size="small"
                        disabled={o.disabled}
                        {...(!(
                            o.confirm || getTextByType(o.type, 'confirm')
                        ) && { onClick: () => o.handle(record.id, rowIndex, record) })}
                    >
                        <span style={{ fontSize: 12 }}>
                            {IconSwitcher(
                                o.icon || getTextByType(o.type, 'icon'),
                            )}
                        </span>
                    </Button>
                </Popconfirm>
            </Tooltip>
        </span>
    ));
};

ControlListComponent.propTypes = {
    record: PropTypes.shape({}).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['view', 'edit', 'delete']),
            title: PropTypes.string,
            extra: PropTypes.string,
            confirm: PropTypes.bool,
            btnType: PropTypes.string,
            icon: PropTypes.string,
            handle: PropTypes.func.isRequired,
        }),
    ).isRequired,
};

export default ControlListComponent;
