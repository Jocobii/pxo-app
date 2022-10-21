import Counter from '../features/counter/Counter';

export const routes = [
    {
        to: '/cliente',
        path: 'cliente',
        Component: Counter,
        name: 'Clientes',
    },
    {
        to: '/cotizacion',
        path: 'cotizacion',
        Component: Counter,
        name: 'Cotización',
    },
    {
        to: '/polizas',
        path: 'polizas',
        Component: Counter,
        name: 'Polizas',
    },
    {
        to: '/catalogos',
        path: 'catalogos',
        Component: Counter,
        name: 'Catalogos',
    },
    {
        to: '/reclamos',
        path: 'reclamos',
        Component: Counter,
        name: 'Reclamos',
    },
];

export default routes;
