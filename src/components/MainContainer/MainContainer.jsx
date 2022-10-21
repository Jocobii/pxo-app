import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;

const MainContainer = ({ children }) => (
    <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
        }}
    >
        {children}
    </Content>
);

MainContainer.propTypes = {
    children: PropTypes.node,
};

MainContainer.defaultProps = {
    children: null,
};

export default MainContainer;
