import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import register from './service-worker-register';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(<App/>)

register();