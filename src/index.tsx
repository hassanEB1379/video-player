import React from 'react';
import ReactDom from 'react-dom/client';
import App from '@app/main';

import './css/normalize.css';
import './css/global.css';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(<App/>)