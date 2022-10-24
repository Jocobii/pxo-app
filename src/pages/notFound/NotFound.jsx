import React from 'react';
import { Button, Result } from 'antd';

const NotFound = () => (
    <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que tratas de visitar no existe."
        extra={<Button type="primary">Back Home</Button>}
    />
);
export default NotFound;
