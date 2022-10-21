import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Navegation = () => {
    console.log('Hola Mundo');
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Hola mundo</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navegation;
