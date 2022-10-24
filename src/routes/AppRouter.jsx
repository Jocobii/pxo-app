/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Layout from '../layouts/MainLayout';

const AppRoute = ({ component: Component, rest }) => (
    <>
        <Route
            {...rest}
            element={(
                <Layout>
                    <Component />
                </Layout>
            )}
        />
    </>
);

AppRoute.propTypes = {
    component: PropTypes.node.isRequired,
    rest: PropTypes.shape({}),
};

AppRoute.defaultProps = {
    rest: {},
};

export default AppRoute;
