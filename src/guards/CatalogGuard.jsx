import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialCatalogs } from '../features/catalogs/catalogSlice';

function CatalogGuard() {
    const dispatch = useDispatch();
    const isInitCatalogsLoaded = useSelector(
        (state) => state.catalog.isInitCatalogsLoaded,
    );

    useEffect(() => {
        if (!isInitCatalogsLoaded) {
            dispatch(getInitialCatalogs());
        }
    }, [dispatch, isInitCatalogsLoaded]);
    return null;
}

export default CatalogGuard;
