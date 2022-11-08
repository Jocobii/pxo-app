import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navegation from './routes/Navegation';
import './index.css';
import 'antd/dist/antd.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Poner <React.StrictMode>

root.render(
    <Provider store={store}>
        <Navegation />
    </Provider>,
);
