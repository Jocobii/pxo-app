import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Lo sentimos, la página que tratas de visitar no existe."
            extra={(
                <Button onClick={() => navigate('/home')} type="primary">
                    Regresar
                </Button>
            )}
        />
    );
};
export default NotFound;
