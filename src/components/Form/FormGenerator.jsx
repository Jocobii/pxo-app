/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Col, Divider, Form, Row,
} from 'antd';
import PropTypes from 'prop-types';

const FormItem = ({ id, field }) => (
    <Col key={id} span={field.col}>
        <Form.Item
            label={field.label}
            name={field.scope}
            type={field?.elementType || ''}
            rules={field?.opts?.rules}
            validateTrigger={field?.opts?.validateTrigger}
            {...field.propsCustomFormItems}
        >
            {field.component}
        </Form.Item>
    </Col>
);

FormItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    field: PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        scope: PropTypes.string,
        col: PropTypes.number,
        elementType: PropTypes.string,
        opts: PropTypes.shape({
            rules: PropTypes.arrayOf(PropTypes.shape({})),
            validateTrigger: PropTypes.string,
        }),
        propsCustomFormItems: PropTypes.shape({
            rules: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        component: PropTypes.oneOfType([PropTypes.node]),
    }).isRequired,
};

const FormFields = ({ fields }) => fields.map((f, i) => {
    const {
        display = true,
        section = [],
        bordered,
        col = 24,
        orientation = 'horizontal',
        title,
    } = f;
    if (!display) return null;

    if (f.divider !== undefined && f.divider !== null) {
        const { props } = f.divider;
        return (
            <Divider
                key={`divider-${i}`}
                {...props}
                // style={{ height: '100%' }}
            />
        );
    }
    if (section !== undefined && section.length >= 1) {
        const style = bordered
            ? {
                border: '1px solid #EEE',
                borderRadius: '5px',
                marginBottom: '1.5em 1.5em 0 1.5em',
                padding: '1em',
                flexDirection:
                    orientation === 'vertical' ? 'column' : 'row',
            }
            : {};
        const titleStyle = title
            ? {
                fontWeight: '500',
                fontSize: 16,
            }
            : {};

        return (
            <Col
                span={col}
                key={`form-item-${i + 1}`}
                style={bordered ? { padding: '1.5em' } : {}}
            >
                {title && <p style={titleStyle}>{title}</p>}
                <Row gutter="16" style={style}>
                    {FormFields({
                        fields: f.section,
                    })}
                </Row>
            </Col>
        );
    }

    return (
        <FormItem
            id={`field-${i}-${f.scope}`}
            key={`${i}-${f.scope}`}
            field={f}
        />
    );
});
export default FormFields;
