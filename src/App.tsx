import React from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import Providers from './context';

import 'regenerator-runtime/runtime.js';
import './assets/css/normalize.css'
import './assets/css/global.css'

const App = () => {
    return (
        <Providers>
            <VideoPlayer />
        </Providers>
    );
};

export default App;