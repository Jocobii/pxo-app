import React from 'react';
import { Button, Result } from 'antd';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        return hasError ? (
            <Result
                status="500"
                title="Lo siento, algo salió mal."
                extra={[
                    <Button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        type="primary"
                    >
                        Regresar
                    </Button>,
                    <Button
                        onClick={() => window.location.reload()}
                        type="primary"
                    >
                        Reintentar
                    </Button>,
                ]}
            />
        ) : (
            children
        );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
