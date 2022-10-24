import Login from '../features/login';
import Counter from '../features/counter/Counter';
import NotFound from '../pages/notFound/NotFound';

export const publicRoutes = [
    {
        to: '/login',
        path: '/login',
        Component: Login,
        name: 'Login',
    },
    {
        to: '/*',
        path: '/*',
        Component: NotFound,
        name: 'NotFound',
    },
];

export const privateRoutes = [
    {
        to: '/cliente/*',
        path: '/cliente',
        Component: Counter,
        name: 'Clientes',
    },
    {
        to: '/cotizacion/*',
        path: 'cotizacion',
        Component: Counter,
        name: 'Cotización',
    },
    {
        to: '/polizas/*',
        path: 'polizas',
        Component: Counter,
        name: 'Polizas',
    },
    {
        to: '/catalogos/*',
        path: 'catalogos',
        Component: Counter,
        name: 'Catalogos',
    },
    {
        to: '/reclamos/*',
        path: 'reclamos',
        Component: Counter,
        name: 'Reclamos',
    },
];
