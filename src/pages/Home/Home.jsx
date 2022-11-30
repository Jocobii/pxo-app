import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'antd';
import grupoOptimaLogo from '../../assets/PXLogo.png';
import { getInitialCatalogs } from '../../features/catalogs/catalogSlice';

const Home = () => {
    const dispatch = useDispatch();
    const isInitCatalogsLoaded = useSelector(
        (state) => state.catalog.isInitCatalogsLoaded,
    );

    useEffect(() => {
        if (!isInitCatalogsLoaded) {
            dispatch(getInitialCatalogs());
        }
    }, [dispatch, isInitCatalogsLoaded]);
    return (
        <Row justify="space-around" align="middle" style={{ height: '100vh' }}>
            <div style={{ width: '100%', height: '100%' }}>
                <img
                    alt="logo"
                    style={{ opacity: 0.3 }}
                    src={grupoOptimaLogo}
                    width="100%"
                    height="100%"
                />
            </div>
        </Row>
    );
};
export default Home;
