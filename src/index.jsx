import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import Home from './pages/Home/Home';
import Navegation from './routes/Navegation';
import './index.css';
import 'antd/dist/antd.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <Home>
                <div>Test</div>
            </Home> */}
            <Navegation />
        </Provider>
    </React.StrictMode>,
);
