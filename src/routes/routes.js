import Login from '../features/user/login';
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
        to: '/customer/*',
        path: '/customer',
        Component: NotFound,
        name: 'Clientes',
    },
    {
        to: '/cotizacion/*',
        path: 'cotizacion',
        Component: NotFound,
        name: 'Cotización',
    },
    {
        to: '/polizas/*',
        path: 'polizas',
        Component: NotFound,
        name: 'Polizas',
    },
    {
        to: '/catalogos/*',
        path: 'catalogos',
        Component: NotFound,
        name: 'Catalogos',
        children: [
            {
                label: 'Usuarios',
                key: 'menu-users',
                path: 'users',
            },
        ],
    },
    {
        to: '/reclamos/*',
        path: 'reclamos',
        Component: NotFound,
        name: 'Reclamos',
    },
];
