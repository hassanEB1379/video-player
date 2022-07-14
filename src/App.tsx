import React from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import {IconContext} from 'react-icons';

import 'regenerator-runtime/runtime.js';
import './assets/css/normalize.css'
import './assets/css/global.css'

const App = () => {
    return (
        <IconContext.Provider value={{color: 'white', size: '1.2rem'}}>
            <VideoPlayer />
        </IconContext.Provider>
    );
};

export default App;