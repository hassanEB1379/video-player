import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

// @ts-ignore
const root = ReactDom.createRoot(document.getElementById('root'));

root.render(<App/>)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}