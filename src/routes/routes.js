import Login from '../features/user/login';
import Counter from '../features/counter/Counter';
import NotFound from '../pages/notFound/NotFound';
import RecoveryPassword from '../pages/recovery-password/RecoveryPassword';

export const publicRoutes = [
    {
        to: '/login',
        path: '/login',
        Component: Login,
        name: 'Login',
    },
    {
        to: '/recovery-password',
        path: '/recovery-password',
        Component: RecoveryPassword,
        name: 'Recovery Password',
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
