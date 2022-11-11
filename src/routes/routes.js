import Login from '../features/user/login';
import NotFound from '../pages/notFound/NotFound';
import RecoveryPassword from '../pages/recovery-password/RecoveryPassword';
import IconSwitcher from '../components/IconSwitcher';

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
        icon: IconSwitcher('user'),
    },
    {
        to: '/quote/*',
        path: 'quote',
        Component: NotFound,
        name: 'Cotización',
        icon: IconSwitcher('quote'),
    },
    {
        to: '/polizas/*',
        path: 'polizas',
        Component: NotFound,
        name: 'Polizas',
        icon: IconSwitcher('policy'),
    },
    {
        to: '/catalogos/*',
        path: 'catalogos',
        Component: NotFound,
        name: 'Catalogos',
        icon: IconSwitcher('catalog'),
        children: [
            {
                label: 'Usuarios',
                key: 'menu-users',
                path: 'users',
                icon: IconSwitcher('users'),
            },
        ],
    },
    {
        to: '/reclamos/*',
        path: 'reclamos',
        Component: NotFound,
        name: 'Reclamos',
        icon: IconSwitcher('claims'),
    },
];
